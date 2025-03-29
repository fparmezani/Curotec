import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ProdutoRoutingModule } from './product.route';
import { ProdutoAppComponent } from './product.app.component';
import { ListaComponent } from './list/list.component';
import { NovoComponent } from './new/new.component';
import { EditarComponent } from './edit/edit.component';
import { ExcluirComponent } from './delete/delete.component';
import { DetalhesComponent } from './detail/detail.component';
import { ProdutoService } from './services/product.service';
import { ProdutoResolve } from './services/product.resolve';
import { ProdutoGuard } from './services/product.guard';

@NgModule({
  declarations: [
    ProdutoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent,
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ],
  providers: [ProdutoService, ProdutoResolve, ProdutoGuard],
})
export class ProdutoModule {}
