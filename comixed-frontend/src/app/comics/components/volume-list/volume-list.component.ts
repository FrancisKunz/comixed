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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comic } from 'app/library';
import { Volume } from 'app/comics/models/volume';
import { Issue } from 'app/models/scraping/issue';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import * as ScrapingActions from 'app/actions/single-comic-scraping.actions';

interface VolumeOptions {
  volume: Volume;
  matchability: string;
}

@Component({
  selector: 'app-volume-list',
  templateUrl: './volume-list.component.html',
  styleUrls: ['./volume-list.component.scss']
})
export class VolumeListComponent implements OnInit {
  @Input() api_key: string;
  @Input() comic: Comic;
  @Input() current_volume: Volume;
  @Input() current_issue: Issue;
  @Output() selectVolume = new EventEmitter<Volume>();
  @Output() selectIssue = new EventEmitter<Issue>();
  @Output() cancelSelection = new EventEmitter<Issue>();

  _volumes: Array<VolumeOptions>;
  protected volume_selection_title = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  @Input()
  set volumes(volumes: Array<Volume>) {
    const exact_matches: Array<VolumeOptions> = [];

    this._volumes = [];
    volumes.forEach((volume: Volume) => {
      const entry = {
        volume: volume,
        matchability: this.isGoodMatch(volume)
          ? '1'
          : this.isPerfectMatch(volume)
          ? '0'
          : '2'
      };
      this._volumes.push(entry);
      if (entry.matchability === '0') {
        exact_matches.push(entry);
      }
    });

    if (exact_matches.length === 1) {
      this.current_volume = exact_matches[0].volume;
      this.setCurrentVolume(exact_matches[0].volume);
    }
  }

  setCurrentVolume(volume: Volume): void {
    this.selectVolume.next(volume);
    if (this.current_issue) {
      this.volume_selection_title = `${this.current_issue.volume_name} #${this.current_issue.issue_number}`;
    }
  }

  private isGoodMatch(volume: Volume): boolean {
    if (!this.isPerfectMatch(volume)) {
      return this.comic.volume === volume.start_year;
    }

    return false;
  }

  private isPerfectMatch(volume: Volume): boolean {
    return (
      this.comic.volume === volume.start_year &&
      this.comic.series === volume.name
    );
  }

  getCurrentIssueImageURL(): string {
    if (this.current_issue === null) {
      return '';
    }
    return `${this.current_issue.cover_url}?api_key=${this.api_key.trim()}`;
  }

  returnToEditing(): void {
    this.store.dispatch(new ScrapingActions.SingleComicScrapingResetVolumes());
  }

  setCurrentIssue(): void {
    this.selectIssue.next(this.current_issue);
  }

  stopSelection(): void {
    this.cancelSelection.next(null);
  }
}
