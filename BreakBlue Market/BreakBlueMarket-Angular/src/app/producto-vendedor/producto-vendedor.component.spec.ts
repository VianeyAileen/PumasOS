import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoVendedorComponent } from './producto-vendedor.component';

describe('ProductoVendedorComponent', () => {
  let component: ProductoVendedorComponent;
  let fixture: ComponentFixture<ProductoVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoVendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
