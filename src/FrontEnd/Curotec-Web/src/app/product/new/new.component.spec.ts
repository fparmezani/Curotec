import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { ProdutoModule } from '../product.module';
import { ProdutoService } from '../services/product.service';

import { NovoComponent } from './new.component';

describe('NovoComponent', () => {
  let component: NovoComponent;
  let fixture: ComponentFixture<NovoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ProdutoModule, AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
