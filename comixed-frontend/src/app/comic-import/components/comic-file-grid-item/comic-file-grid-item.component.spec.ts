/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2019, The ComiXed Project
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
import { ComicFileGridItemComponent } from './comic-file-grid-item.component';
import { ComicFileCoverUrlPipe } from 'app/comic-import/pipes/comic-file-cover-url.pipe';
import {
  CardModule,
  MessageService,
  OverlayPanelModule,
  PanelModule
} from 'primeng/primeng';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { REDUCERS } from 'app/app.reducers';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from 'app/app.effects';
import { ComicService } from 'app/services/comic.service';
import { UserService } from 'app/services/user.service';
import { LibraryModule } from 'app/library/library.module';
import { COMIC_FILE_1 } from 'app/comic-import/models/comic-file.fixtures';
import { ComicImportAdaptor } from 'app/comic-import/adaptors/comic-import.adaptor';

describe('ComicFileGridItemComponent', () => {
  let component: ComicFileGridItemComponent;
  let fixture: ComponentFixture<ComicFileGridItemComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LibraryModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(REDUCERS),
        EffectsModule.forRoot(EFFECTS),
        PanelModule,
        OverlayPanelModule,
        CardModule
      ],
      declarations: [ComicFileGridItemComponent, ComicFileCoverUrlPipe],
      providers: [ComicService, UserService, MessageService, ComicImportAdaptor]
    }).compileComponents();

    fixture = TestBed.createComponent(ComicFileGridItemComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    component.comic_file = COMIC_FILE_1;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an id based on the comic file id', () => {
    expect(
      fixture.debugElement.query(
        By.css(`#comic-file-${component.comic_file.id}`)
      )
    ).toBeTruthy();
  });

  it('should have a comic cover with an id based on the comic file id', () => {
    expect(
      fixture.debugElement.query(
        By.css(`#comic-file-cover-${component.comic_file.id}`)
      )
    ).toBeTruthy();
  });
});
