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

import { Injectable } from '@angular/core';
import { Comic, Page } from 'app/comics';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  SAVE_PAGE_URL,
  BLOCK_PAGE_HASH_URL,
  UNBLOCK_PAGE_HASH_URL
} from 'app/comics/comics.constants';
import { interpolate } from 'app/app.functions';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(private http: HttpClient) {}

  savePage(page: Page): Observable<any> {
    return this.http.put(interpolate(SAVE_PAGE_URL, { id: page.id }), page);
  }

  setPageHashBlocking(page: Page, blocked: boolean): Observable<any> {
    if (blocked) {
      return this.http.post(
        interpolate(BLOCK_PAGE_HASH_URL, {
          id: page.id,
          hash: page.hash
        }),
        { hash: page.hash }
      );
    } else {
      return this.http.delete(
        interpolate(UNBLOCK_PAGE_HASH_URL, {
          id: page.id,
          hash: page.hash
        })
      );
    }
  }
}
