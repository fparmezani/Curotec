import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoComponent } from './new/new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FornecedorRoutingModule } from './contrator.route';
import { FornecedorAppComponent } from './contractor.app.component';
import { ListaComponent } from './list/list.component';
import { FornecedorService } from './services/contractor.service';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

import { EditarComponent } from './edit/edit.component';
import { ExcluirComponent } from './delete/delete.component';
import { DetalhesComponent } from './detail/detail.component';
import { FornecedorResolve } from './services/contractor.resolve';
import { FornececedorGuard } from './services/contractor.guard';
import { ListaProdutosComponent } from './products/list-produtos.component';

@NgModule({
  declarations: [
    FornecedorAppComponent,
    NovoComponent,
    ListaComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent,
    ListaProdutosComponent,
  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgxSpinnerModule,
  ],
  providers: [FornecedorService, FornecedorResolve, FornececedorGuard],
})
export class FornecedorModule {}
