import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html',
  styleUrls:['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Output() next = new EventEmitter<FormGroup>();

  @Output() prev = new EventEmitter<FormGroup>();

  get cardNumber() {
    return this.cardForm.get('cardNumber');
  }

  cardForm: FormGroup = this.fb.group({
    radio: ['full'],
    cardNumber: this.fb.group({
      number1: ['', [Validators.required, Validators.minLength(4)]],
      number2: ['', [Validators.required, Validators.minLength(4)]],
      number3: ['', [Validators.required, Validators.minLength(4)]],
      number4: ['', [Validators.required, Validators.minLength(4)]],
    }),
    month: ['', [Validators.required]],
    year: ['', [Validators.required]],
    cvc: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    check: [false, [Validators.requiredTrue]],
  });

  visaUrl = 'assets/image/stage4/visa.svg';

  jcbUrl = 'assets/image/stage4/jcb.svg';

  masterCardUrl = 'assets/image/stage4/mastercard.svg';

  months = Array(13)
    .fill(1)
    .map((_, i) => i);

  years = Array(25)
    .fill(new Date().getFullYear())
    .map((x, i) => x + i);

  ngOnInit(): void {
    this.cardNumber?.get('number1')?.valueChanges.subscribe({
      next: (res) => {
        if (this.cardNumber?.get('number1')?.valid) {
          const first = res.charAt(0);
          //  JCB
          this.jcbUrl =
            first === '3'
              ? 'assets/image/stage4/jcb2.svg'
              : 'assets/image/stage4/jcb.svg';
          //  Visa
          this.visaUrl =
            first === '4'
              ? 'assets/image/stage4/visa2.svg'
              : 'assets/image/stage4/visa.svg';
          //  萬事達卡
          this.masterCardUrl =
            first === '5'
              ? 'assets/image/stage4/mastercard2.svg'
              : 'assets/image/stage4/mastercard.svg';
        }
      },
    });
  }

  //  當欄位無效且已被觸碰
  isFieldValid(field: string): boolean {
    return (
      !this.cardForm?.get(field).valid && this.cardForm?.get(field).touched
    );
  }

  prevStep() {
    this.prev.emit(this.cardForm);
  }

  nextStep() {
    this.next.emit(this.cardForm);
  }

  onSubmit() {
    this.cardForm.markAllAsTouched();
  }
}
