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
import * as fromLibrary from './reducers/library.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LibraryEffects } from './effects/library.effects';
import { LibraryService } from './services/library.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { LibraryAdaptor } from './adaptors/library.adaptor';
import * as fromImport from './reducers/import.reducer';
import { ImportEffects } from './effects/import.effects';
import { ImportAdaptor } from 'app/library/adaptors/import.adaptor';
import { ImportService } from 'app/library/services/import.service';
import * as fromSelection from 'app/library/reducers/selection.reducer';
import { SelectionAdaptor } from 'app/library/adaptors/selection.adaptor';
import * as fromReadingList from './reducers/reading-list.reducer';
import { ReadingListEffects } from './effects/reading-list.effects';
import { ReadingListService } from 'app/library/services/reading-list.service';
import { ReadingListAdaptor } from 'app/library/adaptors/reading-list.adaptor';
import { ComicCoverComponent } from 'app/library/components/comic-cover/comic-cover.component';
import { CardModule } from 'primeng/card';
import { LibraryRoutingModule } from 'app/library/library-routing.module';
import { ComicDetailsPageComponent } from 'app/library/pages/comic-details-page/comic-details-page.component';
import { ComicTitlePipe } from 'app/library/pipes/comic-title.pipe';
import { ComicDownloadLinkPipe } from 'app/library/pipes/comic-download-link.pipe';
import { ComicCoverUrlPipe } from 'app/library/pipes/comic-cover-url.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import {
  BlockUIModule,
  DropdownModule,
  InplaceModule,
  PanelModule,
  ProgressBarModule,
  SplitButtonModule,
  TabViewModule,
  TooltipModule
} from 'primeng/primeng';
import { ComicOverviewComponent } from 'app/library/components/comic-overview/comic-overview.component';
import { ComicStoryComponent } from 'app/library/components/comic-story/comic-story.component';
import { ComicReaderComponent } from 'app/library/components/comic-reader/comic-reader.component';
import { ComicCreditsComponent } from 'app/library/components/comic-credits/comic-credits.component';
import { ComicPagesComponent } from 'app/library/components/comic-pages/comic-pages.component';
import { ComicDetailsEditorComponent } from 'app/library/components/comic-details-editor/comic-details-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { ComicGroupingCardComponent } from 'app/library/components/comic-grouping-card/comic-grouping-card.component';
import { ComicPageUrlPipe } from 'app/library/pipes/comic-page-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LibraryRoutingModule,
    TranslateModule.forRoot(),
    EffectsModule.forFeature([
      LibraryEffects,
      ImportEffects,
      ReadingListEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Testing Store DevTools',
      logOnly: environment.production
    }),
    StoreModule.forFeature(
      fromLibrary.LIBRARY_FEATURE_KEY,
      fromLibrary.reducer
    ),
    StoreModule.forFeature(fromImport.IMPORT_FEATURE_KEY, fromImport.reducer),
    StoreModule.forFeature(
      fromSelection.SELECTION_FEATURE_KEY,
      fromSelection.reducer
    ),
    StoreModule.forFeature(
      fromReadingList.READING_LIST_FEATURE_KEY,
      fromReadingList.reducer
    ),
    CardModule,
    ButtonModule,
    TabViewModule,
    DropdownModule,
    InplaceModule,
    PanelModule,
    DataViewModule,
    BlockUIModule,
    ProgressBarModule,
    TooltipModule,
    SplitButtonModule
  ],
  declarations: [
    ComicDetailsPageComponent,
    ComicCoverComponent,
    ComicOverviewComponent,
    ComicStoryComponent,
    ComicReaderComponent,
    ComicCreditsComponent,
    ComicPagesComponent,
    ComicDetailsEditorComponent,
    ComicGroupingCardComponent,
    ComicCoverUrlPipe,
    ComicTitlePipe,
    ComicDownloadLinkPipe,
    ComicPageUrlPipe
  ],
  providers: [
    LibraryService,
    LibraryAdaptor,
    ImportService,
    ImportAdaptor,
    SelectionAdaptor,
    ReadingListService,
    ReadingListAdaptor
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComicCoverComponent,
    CardModule,
    ButtonModule,
    TabViewModule,
    DropdownModule,
    InplaceModule,
    PanelModule,
    DataViewModule,
    BlockUIModule,
    ProgressBarModule,
    TooltipModule,
    SplitButtonModule
  ]
})
export class LibraryModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibraryModule
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: LibraryModule) {
    if (parentModule) {
      throw new Error(
        'LibraryModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
