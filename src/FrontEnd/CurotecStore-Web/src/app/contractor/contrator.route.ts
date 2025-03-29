import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorAppComponent } from './contractor.app.component';
import { NovoComponent } from './new/new.component';
import { ListaComponent } from './list/list.component';
import { EditarComponent } from './edit/edit.component';
import { DetalhesComponent } from './detail/detail.component';
import { ExcluirComponent } from './delete/delete.component';
import { FornecedorResolve } from './services/contractor.resolve';
import { FornececedorGuard } from './services/contractor.guard';

const fornecedorRouterConfig: Routes = [
  {
    path: '',
    component: FornecedorAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canDeactivate: [FornececedorGuard],
        canActivate: [FornececedorGuard],
        data: [{ claim: { nome: 'Fornecedor', valor: 'Adicionar' } }],
      },
      {
        path: 'editar/:id',
        component: EditarComponent,
        canActivate: [FornececedorGuard],
        data: [{ claim: { nome: 'Fornecedor', valor: 'Atualizar' } }],
        resolve: {
          fornecedor: FornecedorResolve,
        },
      },
      {
        path: 'detalhes/:id',
        component: DetalhesComponent,
        resolve: {
          fornecedor: FornecedorResolve,
        },
      },
      {
        path: 'excluir/:id',
        component: ExcluirComponent,
        canActivate: [FornececedorGuard],
        data: [{ claim: { nome: 'Fornecedor', valor: 'Excluir' } }],
        resolve: {
          fornecedor: FornecedorResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fornecedorRouterConfig)],
  exports: [RouterModule],
})
export class FornecedorRoutingModule {}
