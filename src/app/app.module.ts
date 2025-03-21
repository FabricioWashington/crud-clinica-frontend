import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './web/shared/shared.module';
import { AppMaterialModule } from './web/shared/app-material/app-material.module';
import { HeaderModule } from './web/shared/components/header/header.module';
import { NavModule } from './web/shared/components/nav/nav.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AppMaterialModule,
    HeaderModule,
    NavModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
