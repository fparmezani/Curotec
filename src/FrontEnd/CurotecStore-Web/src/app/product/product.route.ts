import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoAppComponent } from './product.app.component';
import { ListaComponent } from './list/list.component';
import { NovoComponent } from './new/new.component';
import { EditarComponent } from './edit/edit.component';
import { DetalhesComponent } from './detail/detail.component';
import { ExcluirComponent } from './delete/delete.component';
import { ProdutoResolve } from './services/product.resolve';
import { ProdutoGuard } from './services/product.guard';

const produtoRouterConfig: Routes = [
  {
    path: '',
    component: ProdutoAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canDeactivate: [ProdutoGuard],
        canActivate: [ProdutoGuard],
        data: [{ claim: { nome: 'Produto', valor: 'Adicionar' } }],
      },
      {
        path: 'editar/:id',
        component: EditarComponent,
        canActivate: [ProdutoGuard],
        data: [{ claim: { nome: 'Produto', valor: 'Atualizar' } }],
        resolve: {
          produto: ProdutoResolve,
        },
      },
      {
        path: 'detalhes/:id',
        component: DetalhesComponent,
        resolve: {
          produto: ProdutoResolve,
        },
      },
      {
        path: 'excluir/:id',
        component: ExcluirComponent,
        canActivate: [ProdutoGuard],
        data: [{ claim: { nome: 'Produto', valor: 'Excluir' } }],
        resolve: {
          produto: ProdutoResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(produtoRouterConfig)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
