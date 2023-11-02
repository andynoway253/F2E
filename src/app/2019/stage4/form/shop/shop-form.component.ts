import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'shop-form',
  templateUrl: './shop-form.component.html',
})
export class ShopFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Output() next = new EventEmitter<FormGroup>();

  @Output() prev = new EventEmitter<any>();

  shopForm: FormGroup = this.fb.group({
    shop: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    check: [false, [Validators.requiredTrue]],
  });

  shops = ['711', '全家', 'OK', '萊爾富'];

  ngOnInit(): void {}

  //  當欄位無效且已被觸碰
  isFieldValid(field: string): boolean {
    return (
      !this.shopForm?.get(field).valid && this.shopForm?.get(field).touched
    );
  }

  prevStep() {
    this.prev.emit();
  }

  nextStep() {
    this.next.emit(this.shopForm);
  }

  onSubmit() {
    this.shopForm.markAllAsTouched();
  }
}
