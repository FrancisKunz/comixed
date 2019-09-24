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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { SINGLE_COMIC_SCRAPING_STATE } from 'app/models/scraping/single-comic-scraping.fixtures';
import { ComicDetailsPageComponent } from './comic-details-page.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { COMIC_1, COMIC_2, COMIC_3 } from 'app/library';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { UserModule } from 'app/user/user.module';
import { Router } from '@angular/router';
import { ComicAdaptor } from 'app/comics/adaptors/comic.adaptor';
import { COMIC_FEATURE_KEY, reducer } from 'app/comics/reducers/comic.reducer';
import { ComicEffects } from 'app/comics/effects/comic.effects';
import { routes } from 'app/comics/comics-routing.module';
import { ComicService } from 'app/comics/services/comic.service';
import { ComicTitlePipe } from 'app/comics/pipes/comic-title.pipe';
import { ComicCoverUrlPipe } from 'app/comics/pipes/comic-cover-url.pipe';
import { ComicDownloadLinkPipe } from 'app/comics/pipes/comic-download-link.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ComicOverviewComponent } from 'app/comics/components/comic-overview/comic-overview.component';
import { ComicStoryComponent } from 'app/comics/components/comic-story/comic-story.component';
import { ComicCreditsComponent } from 'app/comics/components/comic-credits/comic-credits.component';
import { ComicPagesComponent } from 'app/comics/components/comic-pages/comic-pages.component';
import { ComicDetailsEditorComponent } from 'app/comics/components/comic-details-editor/comic-details-editor.component';
import { DropdownModule } from 'primeng/dropdown';
import { InplaceModule } from 'primeng/inplace';
import { DataViewModule } from 'primeng/dataview';
import { ComicGroupingCardComponent } from 'app/comics/components/comic-grouping-card/comic-grouping-card.component';
import { ComicPageUrlPipe } from 'app/comics/pipes/comic-page-url.pipe';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressBarModule, SplitButtonModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VolumeListComponent } from 'app/comics/components/volume-list/volume-list.component';
import { ScrapingIssueTitlePipe } from 'app/comics/pipes/scraping-issue-title.pipe';
import { AppState } from 'app/comics';
import { ComicGotIssue } from 'app/comics/actions/comic.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ComicDetailsPageComponent', () => {
  const COMICS = [COMIC_1, COMIC_2, COMIC_3];

  let component: ComicDetailsPageComponent;
  let fixture: ComponentFixture<ComicDetailsPageComponent>;
  let downloadLink: DebugElement;
  let comicAdaptor: ComicAdaptor;
  let messageService: MessageService;
  let router: Router;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        StoreModule.forRoot({}),
        StoreModule.forFeature(COMIC_FEATURE_KEY, reducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ComicEffects]),
        CardModule,
        DropdownModule,
        InplaceModule,
        DataViewModule,
        BlockUIModule,
        ProgressBarModule,
        SplitButtonModule
      ],
      declarations: [
        ComicDetailsPageComponent,
        ComicOverviewComponent,
        ComicStoryComponent,
        ComicCreditsComponent,
        ComicPagesComponent,
        ComicDetailsEditorComponent,
        ComicGroupingCardComponent,
        VolumeListComponent,
        ComicTitlePipe,
        ComicCoverUrlPipe,
        ComicDownloadLinkPipe,
        ComicPageUrlPipe,
        ScrapingIssueTitlePipe
      ],
      providers: [
        ComicAdaptor,
        ComicService,
        MessageService,
        ConfirmationService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComicDetailsPageComponent);
    component = fixture.componentInstance;
    comicAdaptor = TestBed.get(ComicAdaptor);
    router = TestBed.get(Router);
    messageService = TestBed.get(MessageService);
    component.single_comic_scraping = SINGLE_COMIC_SCRAPING_STATE;
    store = TestBed.get(Store);

    store.dispatch(new ComicGotIssue({ comic: COMIC_1 }));

    fixture.detectChanges();

    downloadLink = fixture.debugElement.query(By.css('#cx-download-link'));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('download link', () => {
    it('contains a link', () => {
      expect(downloadLink).toBeTruthy();
    });

    it('the link text is accurate', () => {
      expect(downloadLink.nativeElement.innerText).toEqual(
        'comic-details-page.text.download-link'
      );
    });
  });

  describe('setting the comic navigation buttons', () => {
    it('disables the previous button if there is no previous comic', () => {
      component.comic = { ...COMIC_1, previousIssueId: -1 };
      expect(component.hasPreviousComic()).toBeFalsy();
    });

    it('enables the previous button if there is a previous comic', () => {
      component.comic = { ...COMIC_1, previousIssueId: 17 };
      expect(component.hasPreviousComic()).toBeTruthy();
    });

    it('disables the next button if there is no next comic', () => {
      component.comic = { ...COMIC_1, nextIssueId: -1 };
      expect(component.hasNextComic()).toBeFalsy();
    });

    it('enables the next button if there is a next comic', () => {
      component.comic = { ...COMIC_1, nextIssueId: 17 };
      expect(component.hasNextComic()).toBeTruthy();
    });
  });
});
