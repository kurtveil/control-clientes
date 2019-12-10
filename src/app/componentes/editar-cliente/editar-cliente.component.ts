import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilidadesService } from 'src/app/servicios/utilidades.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };
  id: string;
  constructor(
    private clientesServicio: ClienteServicio,
    public utilidadesService: UtilidadesService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // debugger;
    this.id = this.activatedRoute.snapshot.params.id;
    this.clientesServicio.getCliente(this.id).subscribe(cliente => {
      this.cliente = cliente;
    });
  }

  guardar() {
    //
  }
  eliminar() {
    //
  }

}
