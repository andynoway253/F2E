import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaskMapComponent } from './mask-map.component';
import { NavBarComponent } from './component/nav-bar.component';
import { NbListModule, NbSelectModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, NbListModule, NbSelectModule],
  declarations: [MaskMapComponent, NavBarComponent],
  exports: [MaskMapComponent, NavBarComponent],
})
export class MaskMapModule {}
