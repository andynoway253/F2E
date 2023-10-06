import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  NbButtonModule,
  NbStepperModule,
  NbTooltipModule,
} from '@nebular/theme';
import { PaymentComponent } from './payment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    NbButtonModule,
    NbStepperModule,
    NbTooltipModule,
  ],
  declarations: [PaymentComponent],
  exports: [PaymentComponent],
})
export class PaymentModule {}
