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
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { ComicPageUrlPipe } from 'app/comics/pipes/comic-page-url.pipe';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { UserService } from 'app/services/user.service';
import { UserServiceMock } from 'app/services/user.service.mock';
import { DuplicatePage } from 'app/comics';
import { DuplicatePagesViewComponent } from './duplicate-pages-view.component';
import { REDUCERS } from 'app/app.reducers';

describe('DuplicatePagesViewComponent', () => {
  let component: DuplicatePagesViewComponent;
  let fixture: ComponentFixture<DuplicatePagesViewComponent>;
  let store: Store<AppState>;
  const userService = new UserServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        FormsModule,
        CardModule,
        ButtonModule,
        SliderModule,
        DropdownModule,
        DataViewModule,
        StoreModule.forRoot(REDUCERS),
        RouterModule.forRoot([])
      ],
      declarations: [DuplicatePagesViewComponent, ComicPageUrlPipe],
      providers: [{ provide: UserService, useValue: userService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatePagesViewComponent);
    component = fixture.componentInstance;
    component.duplicates = {
      busy: false,
      pages: [],
      hashes: [],
      pages_by_hash: new Map<string, Array<DuplicatePage>>(),
      current_hash: '',
      current_duplicates: [],
      last_hash: '',
      pages_deleted: 0,
      pages_undeleted: 0
    };
    fixture.detectChanges();
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
