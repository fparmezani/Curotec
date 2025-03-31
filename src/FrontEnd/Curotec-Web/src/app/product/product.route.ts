import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAppComponent } from './product.app.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { DeleteComponent } from './delete/delete.component';
import { ProductResolve } from './services/product.resolve';
import { ProdutoGuard } from './services/product.guard';

const produtoRouterConfig: Routes = [
  {
    path: '',
    component: ProductAppComponent,
    children: [
      { path: 'list-all', component: ListComponent },
      {
        path: 'add-new',
        component: NewComponent,
        canDeactivate: [ProdutoGuard],
        canActivate: [ProdutoGuard],
        data: [{ claim: { nome: 'Product', valor: 'Add' } }],
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        canActivate: [ProdutoGuard],
        data: [{ claim: { nome: 'Product', valor: 'Update' } }],
        resolve: {
          produto: ProductResolve,
        },
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        resolve: {
          produto: ProductResolve,
        },
      },
      {
        path: 'delete/:id',
        component: DeleteComponent,
        canActivate: [ProdutoGuard],
        data: [{ claim: { nome: 'Product', valor: 'Delete' } }],
        resolve: {
          produto: ProductResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(produtoRouterConfig)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
