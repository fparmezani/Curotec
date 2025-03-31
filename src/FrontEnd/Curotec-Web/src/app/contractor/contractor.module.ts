import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractorRoutingModule } from './contractor.route';
import { ContractorAppComponent } from './contractor.app.component';
import { ListComponent } from './list/list.component';
import { ContractorService } from './services/contractor.service';

import { NgxSpinnerModule } from 'ngx-spinner';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailComponent } from './detail/detail.component';
import { ContractorResolve } from './services/contractor.resolve';
import { ContractorGuard } from './services/contractor.guard';
import { ListProductsComponent } from './products/list-products.component';

@NgModule({
  declarations: [
    ContractorAppComponent,
    NewComponent,
    ListComponent,
    EditComponent,
    DeleteComponent,
    DetailComponent,
    ListProductsComponent,
  ],
  imports: [
    CommonModule,
    ContractorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [ContractorService, ContractorResolve, ContractorGuard],
})
export class ContractorModule {}
