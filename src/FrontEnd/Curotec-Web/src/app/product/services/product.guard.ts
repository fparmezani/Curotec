import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { NewComponent } from '../new/new.component';
import { BaseGuard } from 'src/app/services/base.guard';

@Injectable()
export class ProdutoGuard
  extends BaseGuard
  implements CanActivate, CanDeactivate<NewComponent>
{
  constructor(protected override router: Router) {
    super(router);
  }

  canDeactivate(component: NewComponent) {
    return true;
  }

  canActivate(routeAc: ActivatedRouteSnapshot) {
    return super.validarClaims(routeAc);
  }
}
