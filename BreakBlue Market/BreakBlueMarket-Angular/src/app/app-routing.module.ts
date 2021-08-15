import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CoverComponent } from './cover/cover.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { HomeVendedorComponent } from './home-vendedor/home-vendedor.component';
import { AltaProductoComponent } from './alta-producto/alta-producto.component';
import { ProductoVendedorComponent } from './producto-vendedor/producto-vendedor.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { HomeCompradorComponent } from './home-comprador/home-comprador.component';
import { ProductoCompradorComponent } from './producto-comprador/producto-comprador.component';
import { OpinionComponent } from './opinion/opinion.component';
import { DatosPagoComponent } from './datos-pago/datos-pago.component';


const routes: Routes = [
  { path: '', component: CoverComponent },
  { path: 'login', component: IniciarSesionComponent},
  { path: 'comprador', component: RegistrarseComponent},
  { path: 'homeVendedor', component: HomeVendedorComponent},
  { path: 'altaProducto', component: AltaProductoComponent},
  { path: 'informacionVendedor', component: ProductoVendedorComponent},
  { path: 'editar', component: ActualizarComponent},
  { path: 'homeComprador', component: HomeCompradorComponent},
  { path: 'informacionComprador', component: ProductoCompradorComponent},
  { path: 'opinion', component: OpinionComponent},
  { path: 'datosPago', component: DatosPagoComponent},
];

@NgModule({
  imports: [CommonModule ,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
  // providers: []
})
export class AppRoutingModule { }
