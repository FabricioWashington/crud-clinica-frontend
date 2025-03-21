import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MENU_ITEMS } from '../../../menu/menu-items';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  tipoLogin: string = '';
  nomeUsuario: string = '';
  isMenuCollapsed: boolean = false;
  menuItems = MENU_ITEMS;

  constructor(
    private readonly router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  expandMenu() {
    this.isMenuCollapsed = false;
  }

  collapseMenu() {
    this.isMenuCollapsed = true;
  }

}
