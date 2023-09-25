import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red'; //color por defecto cuando se inicializa
  private _errors?: ValidationErrors | null;
  //recibir el color hexadecimal
  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    //console.log(value);
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    //console.log('constructor de la directiva')
    //console.log(el);
    this.htmlElement = el;
  }
  ngOnInit(): void {
    //console.log('Directica - NgOnInit');
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);
    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${min} caracteres.`;
      return;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo';
      return;
    }
  }
}
