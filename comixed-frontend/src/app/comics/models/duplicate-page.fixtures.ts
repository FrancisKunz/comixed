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

import { DuplicatePage } from 'app/comics';
import { COMIC_1, COMIC_2, FORMAT_1 } from 'app/library';

export const DUPLICATE_PAGE_1: DuplicatePage = {
  id: 1000,
  filename: 'duplicate_page_1.png',
  hash: 'abcdef1234567890',
  deleted: false,
  blocked: false,
  page_type: FORMAT_1,
  index: 0,
  comic: COMIC_1
};

export const DUPLICATE_PAGE_2: DuplicatePage = {
  id: 1000,
  filename: 'duplicate_page_2.png',
  hash: 'abcdef1234567890',
  deleted: false,
  blocked: false,
  page_type: FORMAT_1,
  index: 0,
  comic: COMIC_2
};
