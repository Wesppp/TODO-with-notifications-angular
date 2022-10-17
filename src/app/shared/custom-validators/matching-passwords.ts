import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const passwordsMatching: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  if (!repeatPassword) { return null }

  return password && repeatPassword && repeatPassword.value === password.value ?
    null : { passwordsMatch: false };
};
