import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Injectable()
export class AccountGuard
  implements CanDeactivate<RegisterComponent>, CanActivate
{
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {}

  canDeactivate(component: RegisterComponent) {
    if (component.unsavedChanges) {
      return window.confirm(
        'Tem certeza que deseja abandonar o preenchimento do formulario?'
      );
    }

    return true;
  }

  canActivate() {
    if (this.localStorageUtils.getUserToken()) {
      this.router.navigate(['/home']);
    }

    return true;
  }
}
