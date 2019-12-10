import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/Modelo/cliente.model';
// import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { UtilidadesService } from 'src/app/servicios/utilidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  @ViewChild('ngValidadorInicial', { static: false }) public ngValidadorInicial: NgForm;
  @ViewChild('clienteForm', { static: false }) clienteForm: NgForm;
  @ViewChild('botonCerrar', { static: false }) botonCerrar: ElementRef;
  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };
  constructor(
    private clientesServicio: ClienteServicio,
    // private flashMessages: FlashMessagesService,
    public utilidadesService: UtilidadesService,
  ) { }

  ngOnInit() {
    this.clientesServicio.obtenerClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );
  }
  obtenerSaldoTotal() {
    let saldoTotal = 0;
    if (this.clientes) {
      this.clientes.forEach(clientes => {
        saldoTotal += clientes.saldo;
      });
    }
    return saldoTotal;
  }

  agregar({ value, valid }: { value: Cliente, valid: boolean }) {
    if (!this.utilidadesService.esFormularioValido(this.ngValidadorInicial)) {
      //  Swal.fire({
      //   type: 'warning',
      //   title: 'Campos obligatorios',
      //   text: 'Asegurese de diligencaiar todos los campos',
      //   footer: ''
      // });
      // return;
    } else {
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
    // agregar el nuevo cliente
  }
  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }

}
