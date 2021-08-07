import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCompradorComponent } from './home-comprador.component';

describe('HomeCompradorComponent', () => {
  let component: HomeCompradorComponent;
  let fixture: ComponentFixture<HomeCompradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCompradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
