import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/Modelo/cliente.model';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  @ViewChild('clienteForm', { static: false }) clienteForm: NgForm;
  clientes: Cliente[ ];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };
  constructor(
    private clientesServicio: ClienteServicio,
    private flashMessages: FlashMessagesService) { }

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
      this.clientes.forEach( clientes => {
        saldoTotal += clientes.saldo;
      });
    }
    return saldoTotal;
  }

  agregar({value, valid}: {value: Cliente, valid: boolean}) {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente' , {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // agregar el nuevo cliente
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();

    }
  }

}
