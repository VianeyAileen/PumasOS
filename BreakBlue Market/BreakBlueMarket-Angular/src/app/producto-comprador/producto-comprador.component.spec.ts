import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCompradorComponent } from './producto-comprador.component';

describe('ProductoCompradorComponent', () => {
  let component: ProductoCompradorComponent;
  let fixture: ComponentFixture<ProductoCompradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoCompradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
