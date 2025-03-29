import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';

import {
  GenericValidator,
  DisplayMessage,
  ValidationMessages,
} from '../utils/generic-form-validation';

export abstract class FormBaseComponent {
  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  changesnotSave: boolean | undefined;

  protected configMessagValidationBase(validationMessages: ValidationMessages) {
    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected configValidationFormBase(
    formInputElements: ElementRef[],
    formGroup: FormGroup
  ) {
    let controlBlurs: Observable<any>[] = formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.validForm(formGroup);
    });
  }

  protected validForm(formGroup: FormGroup) {
    this.displayMessage = this.genericValidator.processMessage(formGroup);
    this.changesnotSave = true;
  }
}
