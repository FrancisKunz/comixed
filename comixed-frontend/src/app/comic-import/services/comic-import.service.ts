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
import { Observable } from 'rxjs';
import { ComicFile } from 'app/comic-import/models/comic-file';
import { interpolate } from 'app/app.functions';
import {
  GET_COMIC_FILES_URL,
  START_IMPORT_URL
} from 'app/comic-import/comic-import.constants';
import { GetComicFilesRequest } from 'app/comic-import/models/net/get-comic-files-request';
import { HttpClient } from '@angular/common/http';
import { StartImportRequest } from 'app/comic-import/models/net/start-import-request';

@Injectable({
  providedIn: 'root'
})
export class ComicImportService {
  constructor(private http: HttpClient) {}

  getFiles(directory: string): Observable<any> {
    return this.http.post(interpolate(GET_COMIC_FILES_URL), {
      directory: directory
    } as GetComicFilesRequest);
  }

  startImport(
    comicFiles: ComicFile[],
    ignoreMetadata: boolean,
    deleteBlockedPages: boolean
  ): Observable<any> {
    return this.http.post(interpolate(START_IMPORT_URL), {
      filenames: comicFiles.map(entry => entry.filename),
      ignoreMetadata: ignoreMetadata,
      deleteBlockedPages: deleteBlockedPages
    } as StartImportRequest);
  }
}
