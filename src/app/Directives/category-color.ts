import { Directive, ElementRef,Input,OnChanges,SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCategoryColor]',
})
export class CategoryColor implements OnChanges {

  @Input() appCategoryColor : string = '';
  constructor(private myRef : ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
      this.setColor();
  }

  private setColor() {

  let bgColor = '#0f172a';
  let textColor = '#94a3b8';
  let borderColor = '#334155'; //default

  switch (this.appCategoryColor) {

    case 'AI':
      bgColor = '#082f49';
      textColor = '#38bdf8';
      borderColor = '#0c4a6e';
      break;

    case 'Hardware':
      bgColor = '#3b0764';
      textColor = '#c084fc';
      borderColor = '#581c87';
      break;

    case 'Cybersecurity':
      bgColor = '#022c22';
      textColor = '#34d399';
      borderColor = '#064e3b';
      break;

    case 'Cloud Computing':
      bgColor = '#042f2e';
      textColor = '#2dd4bf';
      borderColor = '#134e4a';
      break;

    case 'Mobile':
      bgColor = '#2e1065';
      textColor = '#a78bfa';
      borderColor = '#4c1d95';
      break;

    case 'Web Development':
      bgColor = '#451a03';
      textColor = '#fbbf24';
      borderColor = '#78350f';
      break;
  }

  this.myRef.nativeElement.style.backgroundColor = bgColor;
  this.myRef.nativeElement.style.color = textColor;
  this.myRef.nativeElement.style.borderColor = borderColor;
}
}
