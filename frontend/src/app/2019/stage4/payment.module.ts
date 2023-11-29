import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCheckboxModule,
  NbRadioModule,
  NbInputModule,
  NbSelectModule,
  NbStepperModule,
  NbTooltipModule,
  NbToastrModule,
} from '@nebular/theme';
import { SanitizeUrlPipe } from '../shared/pipe/sanitize-url';
import { ATMFormComponent } from './component/atm/atm-form.component';
import { CardFormComponent } from './component/card/card-form.component';
import { ShopFormComponent } from './component/shop/shop-form.component';
import { MoveFocusToNextDirective } from './directive/move-focus-to-next.directive';
import { NumberDirective } from './directive/numbers-only.directive';
import {
  PaymentComponent,
  FormErrorDisplayComponent,
} from './payment.component';
import { RouterModule } from '@angular/router';

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

    RouterModule.forChild([{ path: '', component: PaymentComponent }]),
  ],
  declarations: [
    PaymentComponent,
    FormErrorDisplayComponent,

    ATMFormComponent,
    CardFormComponent,
    ShopFormComponent,

    NumberDirective,
    MoveFocusToNextDirective,
    SanitizeUrlPipe,
  ],
  exports: [PaymentComponent],
})
export class PaymentModule {}
