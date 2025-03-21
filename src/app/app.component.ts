import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showHeader = false;
  title = 'frontend';
  loading = true;

  constructor(
      private router: Router,
      private renderer: Renderer2,
      private elementRef: ElementRef,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const noHeaderPaths = ['/login-empresa'];
        const noHeaderPrefixes = ['/estoque/', '/caixa/', '/vendas/', '/404', '/login'];

        this.showHeader = !(
          noHeaderPaths.includes(event.urlAfterRedirects) ||
          noHeaderPrefixes.some(prefix => event.urlAfterRedirects.startsWith(prefix))
        );
      }
    });

    this.simularCarregamentoInicial();
  }

  private simularCarregamentoInicial(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const overlay = this.elementRef.nativeElement.querySelector('.loading-overlay');
        if (overlay) {
          this.renderer.addClass(overlay, 'hidden');
        }
        setTimeout(() => (this.loading = false), 500);
      }, 4800);
    }
  }



  setLoading(isLoading: boolean): void {
    this.loading = isLoading;
  }
}
