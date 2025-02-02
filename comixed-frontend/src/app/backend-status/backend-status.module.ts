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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildDetailsService } from 'app/backend-status/services/build-details.service';
import { BuildDetailsPageComponent } from './pages/build-details-page/build-details-page.component';
import { BackendStatusRoutingModule } from 'app/backend-status/backend-status-routing.module';
import { BuildDetailsAdaptor } from 'app/backend-status/adaptors/build-details.adaptor';
import { StoreModule } from '@ngrx/store';
import * as fromBuildDetails from './reducers/build-details.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BuildDetailsEffects } from 'app/backend-status/effects/build-details.effects';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BuildDetailsPageComponent],
  imports: [
    CommonModule,
    BackendStatusRoutingModule,
    TranslateModule.forRoot(),
    StoreModule.forFeature(
      fromBuildDetails.BUILD_DETAILS_FEATURE_KEY,
      fromBuildDetails.reducer
    ),
    EffectsModule.forFeature([BuildDetailsEffects])
  ],
  exports: [CommonModule],
  providers: [BuildDetailsService, BuildDetailsAdaptor]
})
export class BackendStatusModule {}
