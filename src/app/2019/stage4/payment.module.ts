import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbStepperModule,
  NbToastrModule,
  NbTooltipModule,
} from '@nebular/theme';
import { PaymentComponent } from './payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberDirective } from './directive/numbers-only.directive';
import { SanitizeUrlPipe } from './pipe/sanitize-url';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    NbButtonModule,
    NbCheckboxModule,
    NbRadioModule,
    NbInputModule,
    NbSelectModule,
    NbStepperModule,
    NbTooltipModule,
    NbToastrModule.forRoot(),
  ],
  declarations: [PaymentComponent, NumberDirective, SanitizeUrlPipe],
  exports: [PaymentComponent, NumberDirective, SanitizeUrlPipe],
})
export class PaymentModule {}
