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
 * along with this program. If not, see <http:/www.gnu.org/licenses/>.package
 * org.comixed;
 */

import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {
  COMIC_IMPORT_FEATURE_KEY,
  reducer
} from 'app/comic-import/reducers/comic-import.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ComicImportEffects } from 'app/comic-import/effects/comic-import.effects';
import { ComicImportAdaptor } from 'app/comic-import/adaptors/comic-import.adaptor';
import { ComicFileListComponent } from 'app/comic-import/components/comic-file-list/comic-file-list.component';
import { ImportPageComponent } from 'app/comic-import/pages/import-page/import-page.component';
import { ComicFileCoverUrlPipe } from 'app/comic-import/pipes/comic-file-cover-url.pipe';
import { ComicFileListToolbarComponent } from 'app/comic-import/components/comic-file-list-toolbar/comic-file-list-toolbar.component';
import { ComicFileGridItemComponent } from 'app/comic-import/components/comic-file-grid-item/comic-file-grid-item.component';
import { ComicImportRoutingModule } from 'app/comic-import/comic-import-routing.module';
import { ComicFileListItemComponent } from 'app/comic-import/components/comic-file-list-item/comic-file-list-item.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TranslateModule } from '@ngx-translate/core';
import { DataViewModule } from 'primeng/dataview';
import {
  CheckboxModule,
  DropdownModule,
  ProgressBarModule,
  SliderModule,
  ToolbarModule
} from 'primeng/primeng';
import { UserModule } from 'app/user/user.module';
import { ComicsModule } from 'app/comics/comics.module';

@NgModule({
  declarations: [
    ComicFileListComponent,
    ImportPageComponent,
    ComicFileCoverUrlPipe,
    ComicFileListToolbarComponent,
    ComicFileGridItemComponent,
    ComicFileListItemComponent,
    ComicFileCoverUrlPipe
  ],
  imports: [
    CommonModule,
    UserModule,
    ComicsModule,
    TranslateModule.forRoot(),
    ComicImportRoutingModule,
    StoreModule.forFeature(COMIC_IMPORT_FEATURE_KEY, reducer),
    EffectsModule.forFeature([ComicImportEffects]),
    ContextMenuModule,
    DataViewModule,
    ProgressBarModule,
    DropdownModule,
    CheckboxModule,
    SliderModule,
    ToolbarModule
  ],
  exports: [CommonModule],
  providers: [ComicImportAdaptor]
})
export class ComicImportModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComicImportModule
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: ComicImportModule) {
    if (parentModule) {
      throw new Error(
        'ComicImportModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
