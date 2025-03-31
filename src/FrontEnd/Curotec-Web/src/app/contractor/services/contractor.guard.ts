import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  CanDeactivate,
} from '@angular/router';
import { NewComponent } from '../new/new.component';
import { BaseGuard } from 'src/app/services/base.guard';

@Injectable()
export class ContractorGuard
  extends BaseGuard
  implements CanActivate, CanDeactivate<NewComponent>
{
  constructor(protected override router: Router) {
    super(router);
  }

  canDeactivate(component: NewComponent) {
    if (component.unsavedChanges) {
      return window.confirm(
        'Are you sure you want to leave the form without saving?'
      );
    }
    return true;
  }

  canActivate(routeAc: ActivatedRouteSnapshot) {
    return super.validarClaims(routeAc);
  }
}
