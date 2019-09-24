/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2018, The ComiXed Project
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.package
 * org.comixed;
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import * as ScrapingActions from 'app/actions/single-comic-scraping.actions';
import { Observable, Subscription } from 'rxjs';
import { SingleComicScraping } from 'app/models/scraping/single-comic-scraping';
import { AuthenticationAdaptor } from 'app/user';
import { Comic } from 'app/library';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ComicAdaptor } from 'app/comics/adaptors/comic.adaptor';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs/operators';

export const PAGE_SIZE_PARAMETER = 'pagesize';
export const CURRENT_PAGE_PARAMETER = 'page';

@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details-page.component.html',
  styleUrls: ['./comic-details-page.component.scss']
})
export class ComicDetailsPageComponent implements OnInit, OnDestroy {
  comicSubscription: Subscription;
  comic: Comic;
  id = -1;
  characters: string[];
  teams: string[];
  locations: string[];
  storyArcs: string[];

  readonly TAB_PARAMETER = 'tab';

  single_comic_scraping$: Observable<SingleComicScraping>;
  single_comic_scraping_subscription: Subscription;
  single_comic_scraping: SingleComicScraping;
  authSubscription: Subscription;
  isAdmin = false;
  protected currentTab: number;
  protected pageSize: number;
  protected currentPage: number;

  constructor(
    private titleService: Title,
    private translateService: TranslateService,
    private messageService: MessageService,
    private authenticationAdaptor: AuthenticationAdaptor,
    private comicAdaptor: ComicAdaptor,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.single_comic_scraping$ = store.select('single_comic_scraping');
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.comicAdaptor.getComicById(+params['id']);
      } else {
        this.router.navigateByUrl('/home');
      }
    });
    activatedRoute.queryParams.subscribe(params => {
      this.currentTab = this.loadParameter(params[this.TAB_PARAMETER], 0);
    });
  }

  ngOnInit() {
    this.authSubscription = this.authenticationAdaptor.role$.subscribe(
      roles => (this.isAdmin = roles.is_admin)
    );
    this.comicSubscription = this.comicAdaptor.comic$.subscribe(comic => {
      if (comic) {
        this.comic = comic;
        this.characters = comic.characters;
        this.teams = comic.teams;
        this.locations = comic.locations;
        this.storyArcs = comic.storyArcs;

        this.titleService.setTitle(
          this.translateService.instant('comic-details-page.title', {
            id: this.comic.id,
            series: this.comic.series,
            volume: this.comic.volume,
            issue_number: this.comic.issueNumber
          })
        );
      } else {
        this.messageService.add({
          severity: 'error',
          detail: this.translateService.instant(
            'comic-details-page.error.no-such-comic.detail',
            { id: this.id }
          )
        });
        this.router.navigateByUrl('/home');
      }
    });
    this.single_comic_scraping_subscription = this.single_comic_scraping$
      .pipe(filter(state => !!state))
      .subscribe((library_scrape: SingleComicScraping) => {
        this.single_comic_scraping = library_scrape;

        if (this.single_comic_scraping.data_scraped) {
          this.comic = this.single_comic_scraping.comic;
          this.store.dispatch(
            new ScrapingActions.SingleComicScrapingClearDataScrapedFlag()
          );
        }
      });
    this.activatedRoute.queryParams.subscribe(params => {
      this.setPageSize(
        parseInt(this.loadParameter(params[PAGE_SIZE_PARAMETER], '100'), 10)
      );
      this.setCurrentPage(
        parseInt(this.loadParameter(params[CURRENT_PAGE_PARAMETER], '0'), 10)
      );
      this.currentTab = this.loadParameter(params[this.TAB_PARAMETER], 0);
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.comicSubscription) {
      this.comicSubscription.unsubscribe();
    }

    this.single_comic_scraping_subscription.unsubscribe();
  }

  setPageSize(page_size: number): void {
    this.pageSize = page_size;
    this.updateParams(PAGE_SIZE_PARAMETER, `${this.pageSize}`);
  }

  setCurrentPage(current_page: number): void {
    this.currentPage = current_page;
    this.updateParams(CURRENT_PAGE_PARAMETER, `${this.currentPage}`);
  }

  setCurrentTab(current_tab: number): void {
    this.currentTab = current_tab;
    this.updateParams(this.TAB_PARAMETER, `${this.currentTab}`);
  }

  hasNextComic(): boolean {
    return this.comic.nextIssueId !== -1;
  }

  hasPreviousComic(): boolean {
    return this.comic.previousIssueId !== -1;
  }

  gotToNextComic(): void {
    this.navigateToComic(this.comic.nextIssueId);
  }

  goToPreviousComic(): void {
    this.navigateToComic(this.comic.previousIssueId);
  }

  private updateParams(name: string, value: string): void {
    const queryParams: Params = Object.assign(
      {},
      this.activatedRoute.snapshot.queryParams
    );
    if (value && value.length) {
      queryParams[name] = value;
    } else {
      queryParams[name] = null;
    }
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams
    });
  }

  private loadParameter(value: string, defvalue: any): any {
    if (value && value.length) {
      return parseInt(value, 10);
    }
    return defvalue;
  }

  private navigateToComic(id: number): void {
    const queryParams: Params = Object.assign(
      {},
      this.activatedRoute.snapshot.queryParams
    );

    this.router.navigate(['comics', id], { queryParams: queryParams });
  }
}
