import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appPostHover]',
})
export class PostHover implements OnInit {

  constructor(private myRef : ElementRef) {}

  ngOnInit(): void {
      this.myRef.nativeElement.style.transition = 'all 300ms ease';
  }

  @HostListener('mouseover') changeElemStyle(){
    this.myRef.nativeElement.style.transform = 'translateY(-0.25rem)';
    this.myRef.nativeElement.style.borderColor = '#0369a1'; 
  }

  @HostListener('mouseleave')
  onLeave() {
    this.myRef.nativeElement.style.transform = 'translateY(0)';
    this.myRef.nativeElement.style.borderColor = '';
  }
}
