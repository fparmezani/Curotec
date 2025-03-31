import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ProductRoutingModule } from './product.route';
import { ProductAppComponent } from './product.app.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailComponent } from './detail/detail.component';
import { ProductService } from './services/product.service';
import { ProductResolve } from './services/product.resolve';
import { ProdutoGuard } from './services/product.guard';

@NgModule({
  declarations: [
    ProductAppComponent,
    ListComponent,
    NewComponent,
    EditComponent,
    DeleteComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService, ProductResolve, ProdutoGuard],
})
export class ProductModule {}
