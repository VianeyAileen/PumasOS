import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CoverComponent,
    IniciarSesionComponent,
    RegistrarseComponent,
    HomeVendedorComponent,
    AltaProductoComponent,
    ProductoVendedorComponent,
    ActualizarComponent,
    HomeCompradorComponent,
    ProductoCompradorComponent,
    OpinionComponent,
    DatosPagoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
