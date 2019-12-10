import { Injectable } from '@angular/core';
import { NgForm, FormGroup, AbstractControl, NgControl } from '@angular/forms';
//#region Bibliotecas
import * as _ from 'lodash';
import Swal from 'sweetalert2';
//#endregion Bibliotecas

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }
  /**
   * Comprueba que un formulario de clase `NgForm` o `NgForm` sea válido
   *
   * @param formulario Objeto que hace referencia al formulario a validar
   */
  esFormularioValido(formulario: NgForm | FormGroup): boolean {
    const formGroup = (formulario instanceof NgForm) ? formulario.form : formulario;

    Object.keys(formulario.controls).forEach(controlKey => {
      const control = formGroup.controls[controlKey] as AbstractControl;
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity({ onlySelf: true });
    });
    formGroup.updateValueAndValidity();
    const formularioValido: boolean = formGroup.valid;
    return formularioValido;
  }

  /**
   * Comprueba que el campo de un formulario sea válido
   *
   * @params campo Objeto que hace referencia al campo a validar
   */
  esCampoValido(campo: AbstractControl | NgControl): boolean {
    return (
      campo.valid && (campo.dirty || campo.touched || campo.value !== null)
    );
  }
  esCampoInvalido(campo: AbstractControl | NgControl, errorClave?: string): boolean {
    if (campo instanceof NgControl) {
      campo.control.updateValueAndValidity();
    } else {
      campo.updateValueAndValidity();
    }

    if (!_.isEmpty(errorClave)) {
      return (
        campo.invalid &&
        (campo.dirty || campo.touched || campo.value !== null) &&
        campo.errors[errorClave]
      );
    }
    return (
      campo.invalid && (campo.dirty || campo.touched || campo.value !== null)
    );
    return (
      campo.invalid && (campo.dirty || campo.touched || campo.value !== null)
    );
  }
}
