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
import { CardModule } from 'primeng/card';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { ComicDetailsEditorComponent } from 'app/comics/components/comic-details-editor/comic-details-editor.component';
import { ComicCoverUrlPipe } from 'app/comics/pipes/comic-cover-url.pipe';
import { MultipleComicScrapingComponent } from './multiple-comic-scraping.component';
import { BlockUIModule } from 'primeng/blockui';
import {
  InplaceModule,
  ProgressBarModule,
  SplitButtonModule,
  TooltipModule
} from 'primeng/primeng';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VolumeListComponent } from 'app/comics/components/volume-list/volume-list.component';
import { TableModule } from 'primeng/table';
import { ScrapingIssueTitlePipe } from 'app/comics/pipes/scraping-issue-title.pipe';
import { REDUCERS } from 'app/app.reducers';

describe('MultipleComicScrapingComponent', () => {
  let component: MultipleComicScrapingComponent;
  let fixture: ComponentFixture<MultipleComicScrapingComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(REDUCERS),
        CardModule,
        BlockUIModule,
        ProgressBarModule,
        InplaceModule,
        TooltipModule,
        SplitButtonModule,
        TableModule
      ],
      declarations: [
        MultipleComicScrapingComponent,
        ComicDetailsEditorComponent,
        ComicCoverUrlPipe,
        VolumeListComponent,
        ScrapingIssueTitlePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleComicScrapingComponent);
    component = fixture.componentInstance;
    component.multi_scraping = {
      selecting: false,
      started: false,
      busy: false,
      api_key: '',
      selected_comics: [],
      current_comic: null
    };
    fixture.detectChanges();
    store = TestBed.get(Store);
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
