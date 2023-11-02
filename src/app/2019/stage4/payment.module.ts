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
import { MoveFocusToNextDirective } from './directive/move-focus-to-next.directive';
import { NumberDirective } from './directive/numbers-only.directive';
import { ATMFormComponent } from './form/atm/atm-form.component';
import {
  PaymentComponent,
  FormErrorDisplayComponent,
} from './payment.component';
import { SanitizeUrlPipe } from './pipe/sanitize-url';
import { ShopFormComponent } from './form/shop/shop-form.component';
import { CardFormComponent } from './form/card/card-form.component';

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
  exports: [
    PaymentComponent,
    FormErrorDisplayComponent,

    ATMFormComponent,
    CardFormComponent,
    ShopFormComponent,

    NumberDirective,
    MoveFocusToNextDirective,
    SanitizeUrlPipe,
  ],
})
export class PaymentModule {}
