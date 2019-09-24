/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2017, The ComiXed Project
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

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { InplaceModule } from 'primeng/inplace';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChartModule } from 'primeng/chart';
import { AppRouting } from 'app/app.routing';
import { AppComponent } from 'app/app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XhrInterceptor } from 'app/xhr.interceptor';
import { ComicService } from 'app/services/comic.service';
import { MainPageComponent } from 'app/ui/pages/main-page/main-page.component';
import { LoginComponent } from 'app/ui/components/login/login.component';
import { UserService } from 'app/services/user.service';
import { LibraryPageComponent } from 'app/ui/pages/library/library-page/library-page.component';
import { ImportPageComponent } from 'app/ui/pages/import-page/import-page.component';
import { DuplicatesPageComponent } from 'app/ui/pages/library/duplicates-page/duplicates-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DuplicatePagesViewComponent } from 'app/ui/views/library/duplicate-pages-view/duplicate-pages-view.component';
import { PageHashViewComponent } from 'app/ui/views/library/page-hash-view/page-hash-view.component';
import { MultipleComicScrapingComponent } from 'app/ui/components/scraping/multiple-comic-scraping/multiple-comic-scraping.component';
import { LibraryScrapingToolbarComponent } from 'app/ui/components/library/library-scraping-toolbar/library-scraping-toolbar.component';
import { ScrapingComicListComponent } from 'app/ui/components/scraping/scraping-comic-list/scraping-comic-list.component';
import { ComicFileCoverUrlPipe } from 'app/pipes/comic-file-cover-url.pipe';
import { LibraryFilterComponent } from 'app/ui/components/library/library-filter/library-filter.component';
import { LibraryFilterPipe } from 'app/pipes/library-filter.pipe';
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { MenubarComponent } from 'app/ui/components/main/menubar/menubar.component';
import { ComicListItemComponent } from 'app/ui/components/library/comic-list-item/comic-list-item.component';
import { ComicGridItemComponent } from 'app/ui/components/library/comic-grid-item/comic-grid-item.component';
import { SeriesPageComponent } from 'app/ui/pages/series/series-page/series-page.component';
import { SeriesDetailsPageComponent } from 'app/ui/pages/series/series-details-page/series-details-page.component';
import { ComicListToolbarComponent } from 'app/ui/components/library/comic-list-toolbar/comic-list-toolbar.component';
import { PublishersPageComponent } from 'app/ui/pages/publishers/publishers-page/publishers-page.component';
import { PublisherDetailsPageComponent } from 'app/ui/pages/publishers/publisher-details-page/publisher-details-page.component';
import { CharactersPageComponent } from 'app/ui/pages/characters/characters-page/characters-page.component';
import { CharacterDetailsPageComponent } from 'app/ui/pages/characters/character-details-page/character-details-page.component';
import { TeamsPageComponent } from 'app/ui/pages/teams/teams-page/teams-page.component';
import { TeamDetailsPageComponent } from 'app/ui/pages/teams/team-details-page/team-details-page.component';
import { LocationsPageComponent } from 'app/ui/pages/locations/locations-page/locations-page.component';
import { LocationDetailsPageComponent } from 'app/ui/pages/locations/location-details-page/location-details-page.component';
import { StoryArcsPageComponent } from 'app/ui/pages/story-arcs/story-arcs-page/story-arcs-page.component';
import { StoryArcDetailsPageComponent } from 'app/ui/pages/story-arcs/story-arc-details-page/story-arc-details-page.component';
import { ComicListComponent } from 'app/ui/components/library/comic-list/comic-list.component';
import { MultiComicScrapingPageComponent } from 'app/ui/pages/library/multi-comic-scraping-page/multi-comic-scraping-page.component';
import { ComicFileListToolbarComponent } from 'app/ui/components/import/comic-file-list-toolbar/comic-file-list-toolbar.component';
import { ComicFileGridItemComponent } from 'app/ui/components/import/comic-file-grid-item/comic-file-grid-item.component';
import { ComicFileListComponent } from 'app/ui/components/import/comic-file-list/comic-file-list.component';
import { FileSaverModule } from 'ngx-filesaver';
import { LibraryAdminPageComponent } from 'app/ui/pages/admin/library-admin-page/library-admin-page.component';
import { MissingComicsPipe } from './pipes/missing-comics.pipe';
import { MissingComicsPageComponent } from './ui/pages/library/missing-comics-page/missing-comics-page.component';
import { ReadingListPageComponent } from './ui/pages/reading-lists/reading-list-page/reading-list-page.component';
import { ReadingListsPageComponent } from './ui/pages/reading-lists/reading-lists-page/reading-lists-page.component';
import { REDUCERS } from 'app/app.reducers';
import { ContextMenuModule } from 'primeng/primeng';
import { UserPreferencePipe } from './pipes/user-preference.pipe';
import { ComicFileListItemComponent } from './ui/components/import/comic-file-list-item/comic-file-list-item.component';
import { LibraryDisplayAdaptor } from 'app/adaptors/library-display.adaptor';
import { UserModule } from 'app/user/user.module';
import { EFFECTS } from 'app/app.effects';
import { LibraryModule } from 'app/library/library.module';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { BackendStatusModule } from 'app/backend-status/backend-status.module';
import { ComicsModule } from 'app/comics/comics.module';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    LibraryPageComponent,
    ImportPageComponent,
    DuplicatesPageComponent,
    DuplicatePagesViewComponent,
    PageHashViewComponent,
    MultipleComicScrapingComponent,
    LibraryScrapingToolbarComponent,
    ScrapingComicListComponent,
    ComicFileCoverUrlPipe,
    LibraryFilterComponent,
    LibraryFilterPipe,
    MenubarComponent,
    ComicListItemComponent,
    ComicGridItemComponent,
    SeriesPageComponent,
    SeriesDetailsPageComponent,
    ComicListToolbarComponent,
    PublishersPageComponent,
    PublisherDetailsPageComponent,
    CharactersPageComponent,
    CharacterDetailsPageComponent,
    TeamsPageComponent,
    TeamDetailsPageComponent,
    LocationsPageComponent,
    LocationDetailsPageComponent,
    StoryArcsPageComponent,
    StoryArcDetailsPageComponent,
    ComicListComponent,
    MultiComicScrapingPageComponent,
    ComicFileListToolbarComponent,
    ComicFileGridItemComponent,
    ComicFileListComponent,
    LibraryAdminPageComponent,
    MissingComicsPipe,
    MissingComicsPageComponent,
    ReadingListPageComponent,
    ReadingListsPageComponent,
    UserPreferencePipe,
    ComicFileListItemComponent
  ],
  imports: [
    UserModule,
    ComicsModule,
    LibraryModule,
    BackendStatusModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    HttpClientModule,
    MenubarModule,
    SidebarModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    SliderModule,
    TabViewModule,
    TableModule,
    ToastModule,
    CardModule,
    DataViewModule,
    DialogModule,
    ScrollPanelModule,
    ToggleButtonModule,
    PanelModule,
    TooltipModule,
    ToolbarModule,
    SplitButtonModule,
    ProgressBarModule,
    BlockUIModule,
    ConfirmDialogModule,
    PasswordModule,
    InplaceModule,
    OverlayPanelModule,
    ChartModule,
    PickListModule,
    ContextMenuModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forRoot(REDUCERS),
    EffectsModule.forRoot(EFFECTS),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    FileSaverModule
  ],
  providers: [
    LibraryDisplayAdaptor,
    UserService,
    ComicService,
    MessageService,
    [{ provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/app-', suffix: '.json' },
    { prefix: './assets/i18n/comics-', suffix: '.json' },
    { prefix: './assets/i18n/library-', suffix: '.json' },
    { prefix: './assets/i18n/backend-status-', suffix: '.json' }
  ]);
}
