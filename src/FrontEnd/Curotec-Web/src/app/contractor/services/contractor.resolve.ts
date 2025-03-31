import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Contractor } from '../models/contractor';
import { ContractorService } from './contractor.service';

@Injectable()
export class ContractorResolve implements Resolve<Contractor> {
  constructor(private contractorService: ContractorService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.contractorService.getById(route.params['id']);
  }
}
