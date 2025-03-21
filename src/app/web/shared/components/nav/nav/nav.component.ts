import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: false,

  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  isMenuOpen: boolean = false;
  isDarkMode: boolean = false;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }


}
