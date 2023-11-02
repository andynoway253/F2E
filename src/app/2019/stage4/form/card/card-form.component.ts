import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html',
})
export class CardFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Output() next = new EventEmitter<FormGroup>();

  @Output() prev = new EventEmitter<any>();

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

  ngOnInit(): void {}

  //  當欄位無效且已被觸碰
  isFieldValid(field: string): boolean {
    return (
      !this.cardForm?.get(field).valid && this.cardForm?.get(field).touched
    );
  }

  prevStep() {
    this.prev.emit();
  }

  nextStep() {
    this.next.emit(this.cardForm);
  }

  onSubmit() {
    this.cardForm.markAllAsTouched();
  }
}
