import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorAppComponent } from './contractor.app.component';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { DeleteComponent } from './delete/delete.component';
import { ContractorResolve } from './services/contractor.resolve';
import { ContractorGuard } from './services/contractor.guard';

const contractorRouterConfig: Routes = [
  {
    path: '',
    component: ContractorAppComponent,
    children: [
      { path: 'list-all', component: ListComponent },
      {
        path: 'add-new',
        component: NewComponent,
        canDeactivate: [ContractorGuard],
        canActivate: [ContractorGuard],
        data: [{ claim: { nome: 'Contractor', valor: 'Add' } }],
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        canActivate: [ContractorGuard],
        data: [{ claim: { nome: 'Contractor', valor: 'Update' } }],
        resolve: {
          contractor: ContractorResolve,
        },
      },
      {
        path: 'details/:id',
        component: DetailComponent,
        resolve: {
          contractor: ContractorResolve,
        },
      },
      {
        path: 'delete/:id',
        component: DeleteComponent,
        canActivate: [ContractorGuard],
        data: [{ claim: { nome: 'Contractor', valor: 'Delete' } }],
        resolve: {
          contractor: ContractorResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(contractorRouterConfig)],
  exports: [RouterModule],
})
export class ContractorRoutingModule {}
