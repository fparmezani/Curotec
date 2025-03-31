import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

export abstract class BaseGuard {
  private localStorageUtils = new LocalStorageUtils();

  constructor(protected router: Router) {}

  protected validarClaims(routeAc: ActivatedRouteSnapshot): boolean {
    if (!this.localStorageUtils.getUserToken()) {
      this.router.navigate(['/conta/login/'], {
        queryParams: { returnUrl: this.router.url },
      });
    }

    let user = this.localStorageUtils.getUser();

    let claim: any = routeAc.data[0];
    if (claim !== undefined) {
      let claim = routeAc.data[0]['claim'];

      if (claim) {
        if (!user.claims) {
          this.navigateAccessDenied();
        }

        let userClaims = user.claims.find(
          (x: { type: any }) => x.type === claim.nome
        );

        if (!userClaims) {
          this.navigateAccessDenied();
        }

        let valoresClaim = userClaims.value as string;

        if (!valoresClaim.includes(claim.valor)) {
          this.navigateAccessDenied();
        }
      }
    }

    return true;
  }

  private navigateAccessDenied() {
    this.router.navigate(['/access-denied']);
  }
}
