import { Component, ElementRef, HostListener, OnInit, Renderer2, inject, viewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <div style="
      height: 300vh;
      background-color: black;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <img #image width="700" />
    </div>
  `,
})
export class AppComponent implements OnInit {
  renderer = inject(Renderer2);

  image = viewChild<ElementRef<HTMLImageElement>>('image');

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // TODO: improve calculating for threshold
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const end = height / 3 * 2 + (285 / 2);
    const threshold = (document.documentElement.clientHeight + 285) / 2;

    if (winScroll > threshold && winScroll < end) {
      const percent =  Math.round((winScroll - threshold) / (end - threshold) * 100);

      if (percent > 0 && percent <= 86) {
        this.renderer.setProperty(this.image()?.nativeElement, 'src', `images/${percent}.webp`);
      }
    }
  }

  ngOnInit(): void {
  }
}
