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

import { Volume } from 'app/comics/models/volume';
import { Issue } from './issue';
import { Comic } from 'app/library';

export interface SingleComicScraping {
  busy: boolean;
  api_key: string;
  comic: Comic;
  series: string;
  volume: string;
  issue_number: string;
  volumes: Array<Volume>;
  current_volume: Volume;
  current_issue: Issue;
  data_scraped: boolean;
}
