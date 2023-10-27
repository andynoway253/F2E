import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';

@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,

    private toastrService: NbToastrService
  ) {}

  @ViewChild('stepper') stepper: NbStepperComponent;

  get cardNumber() {
    return this.cardForm.get('cardNumber');
  }

  identityRevealedValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.get('number1')?.invalid ||
      control.get('number2')?.invalid ||
      control.get('number3')?.invalid ||
      control.get('number4')?.invalid
      ? { identityRevealed: true }
      : null;
  };

  activeOption = '';

  visaUrl = 'assets/image/stage4/visa.svg';

  jcbUrl = 'assets/image/stage4/jcb.svg';

  masterCardUrl = 'assets/image/stage4/mastercard.svg';

  checked = false;

  cards = [
    { name: '信用卡/金融卡', image: 'assets/image/stage4/credit-card.svg' },
    { name: '銀聯卡', image: 'assets/image/stage4/unionpay.svg' },
    { name: '超商付款', image: 'assets/image/stage4/shop.svg' },
    { name: 'Web ATM', image: 'assets/image/stage4/web-atm.svg' },
    { name: 'ATM 轉帳', image: 'assets/image/stage4/atm.svg' },
  ];

  months = Array(13)
    .fill(1)
    .map((_, i) => i);

  years = Array(25)
    .fill(new Date().getFullYear())
    .map((x, i) => x + i);

  cardForm: FormGroup = this.fb.group({
    radio: ['full'],
    cardNumber: this.fb.group(
      {
        number1: ['1111', [Validators.required, Validators.minLength(4)]],
        number2: ['2222', [Validators.required, Validators.minLength(4)]],
        number3: ['3333', [Validators.required, Validators.minLength(4)]],
        number4: ['4444', [Validators.required, Validators.minLength(4)]],
      },
      { validators: this.identityRevealedValidator }
    ),
    month: [1, [Validators.required]],
    year: [2023, [Validators.required]],
    cvc: ['123', [Validators.required, Validators.minLength(3)]],
    email: ['andynoway@gmial.com', [Validators.required, Validators.email]],
    check: [false, [Validators.requiredTrue]],
  });

  // shopForm: FormGroup = this.fb.group({
  //   shop: [''],
  //   email: ['andynoway@gmial.com', [Validators.required, Validators.email]],
  //   check: [false, [Validators.requiredTrue]],
  // });

  // WebForm: FormGroup = this.fb.group({
  //   radio: ['full'],
  //   cardNumber: this.fb.group(
  //     {
  //       number1: ['1111', [Validators.required, Validators.minLength(4)]],
  //       number2: ['2222', [Validators.required, Validators.minLength(4)]],
  //       number3: ['3333', [Validators.required, Validators.minLength(4)]],
  //       number4: ['4444', [Validators.required, Validators.minLength(4)]],
  //     },
  //     { validators: this.identityRevealedValidator }
  //   ),
  //   month: [1, [Validators.required]],
  //   year: [2023, [Validators.required]],
  //   cvc: ['123', [Validators.required, Validators.minLength(3)]],
  //   email: ['andynoway@gmial.com', [Validators.required, Validators.email]],
  //   check: [false, [Validators.requiredTrue]],
  // });

  ngOnInit(): void {
    this.cardNumber?.valueChanges.subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    // this.cardNumber?.get('number1')?.valueChanges.subscribe({
    //   next: (res) => {
    //     if (this.cardNumber?.get('number1')?.valid) {
    //       const first = res.charAt(0);

    //       //  JCB
    //       this.jcbUrl =
    //         first === '3'
    //           ? 'assets/image/stage4/jcb2.svg'
    //           : 'assets/image/stage4/jcb.svg';

    //       //  Visa
    //       this.visaUrl =
    //         first === '4'
    //           ? 'assets/image/stage4/visa2.svg'
    //           : 'assets/image/stage4/visa.svg';

    //       //  萬事達卡
    //       this.masterCardUrl =
    //         first === '5'
    //           ? 'assets/image/stage4/mastercard2.svg'
    //           : 'assets/image/stage4/mastercard.svg';
    //     }
    //   },
    // });
  }

  setActive(option: string) {
    this.activeOption = option;
  }

  isActive(option: string) {
    return this.activeOption === option;
  }

  toggle(e: boolean) {
    this.checked = e;
  }

  checkPayType() {
    if (!this.activeOption) {
      this.toastrService.warning('請先選擇付款方式', '警告', {
        preventDuplicates: true,
      });
      return;
    }

    this.stepper.next();
  }
}
