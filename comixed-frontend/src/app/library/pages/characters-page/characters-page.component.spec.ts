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
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { StoreModule } from '@ngrx/store';
import { LibraryFilterComponent } from 'app/library/components/library-filter/library-filter.component';
import { CharactersPageComponent } from './characters-page.component';
import { REDUCERS } from 'app/app.reducers';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from 'app/app.effects';
import { UserService } from 'app/services/user.service';
import { MessageService } from 'primeng/api';
import { ComicService } from 'app/services/comic.service';
import { COMIC_1, ComicCollectionEntry, LibraryAdaptor } from 'app/library';
import { BreadcrumbAdaptor } from 'app/adaptors/breadcrumb.adaptor';
import { ComicsModule } from 'app/comics/comics.module';
import { CheckboxModule } from 'primeng/checkbox';

describe('CharactersPageComponent', () => {
  const CHARACTER = 'Superhero Man';
  const COMICS = [{ ...COMIC_1, characters: [CHARACTER] }];
  const CHARACTERS: ComicCollectionEntry[] = [
    { name: CHARACTER, comics: COMICS, last_comic_added: 0, count: 1 }
  ];
  let component: CharactersPageComponent;
  let fixture: ComponentFixture<CharactersPageComponent>;
  let library_adaptor: LibraryAdaptor;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ComicsModule,
        EffectsModule.forRoot(EFFECTS),
        TranslateModule.forRoot(),
        FormsModule,
        StoreModule.forRoot(REDUCERS),
        RouterTestingModule,
        ButtonModule,
        DropdownModule,
        TableModule,
        PanelModule,
        CheckboxModule
      ],
      declarations: [CharactersPageComponent, LibraryFilterComponent],
      providers: [
        MessageService,
        UserService,
        ComicService,
        BreadcrumbAdaptor,
        LibraryAdaptor
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersPageComponent);
    component = fixture.componentInstance;
    library_adaptor = TestBed.get(LibraryAdaptor);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
