import { Component, OnInit, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: false,

  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {
  progress = 0;
  percentageText = '0%';
  loading = true;

  @Output() onComplete = new EventEmitter<void>();

  constructor(private renderer: Renderer2, private elementRef: ElementRef){}

  ngOnInit(): void {
    this.startLoading();
    this.simularCarregamentoInicial();
  }

  startLoading(): void {
    const interval = setInterval(() => {
      this.progress += 5;
      this.percentageText = `${this.progress}%`;

      if (this.progress >= 100) {
        clearInterval(interval);
        this.onComplete.emit();
      }
    }, 50);
  }

  private simularCarregamentoInicial(): void {
    setTimeout(() => {
      const loadingOverlay = this.elementRef.nativeElement.querySelector('.loading-overlay');
      if (loadingOverlay) {
        this.renderer.addClass(loadingOverlay, 'hidden');
      }
      setTimeout(() => (this.loading = false), 500);
    }, 1500);
  }
}
