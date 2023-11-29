import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaskMapComponent } from './mask-map.component';
import { NavBarComponent } from './component/nav-bar.component';
import { NbListModule, NbSelectModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NbListModule,
    NbSelectModule,

    RouterModule.forChild([{ path: '', component: MaskMapComponent }]),
  ],
  declarations: [MaskMapComponent, NavBarComponent],
  exports: [MaskMapComponent],
})
export class MaskMapModule {}
