import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../../shared.module';
import { AppMaterialModule } from '../../app-material/app-material.module';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    SharedModule,
    AppMaterialModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }
