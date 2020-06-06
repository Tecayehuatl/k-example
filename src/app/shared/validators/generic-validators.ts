import { AbstractControl, FormGroup, FormArray } from '@angular/forms';

export class GenericValidators {
  constructor(private formErrors: { [key: string]: string }) {}

  private assingErrorMessage(control: AbstractControl): string {
    if (control.errors.required) {
      return 'Por favor introduce un valor en este campo';
    } else if (control.errors.pattern) {
      return 'Verifique los valores proporcionados';
    } else if (control.errors.email) {
      return 'Por favor inserte un correo válido';
    } else {
      return '';
    }
  }

  // Make this code(dirty) recursive
  logValidationErrors(group: FormGroup | FormArray): { [key: string]: string } {
    const messages = this.formErrors;
    Object.keys(group.controls).map((key: string) => {
      const control = group.get(key);
      messages[key] = '';
      if (control.errors && (control.dirty || control.touched)) {
        messages[key] = this.assingErrorMessage(control);
      }
    });
    return messages;
  }
}
