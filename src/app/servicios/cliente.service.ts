import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../Modelo/cliente.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class ClienteServicio {
    clientesColeccion: AngularFirestoreCollection<Cliente>;
    clienteDoc: AngularFirestoreDocument<Cliente>;
    clientes: Observable<Cliente[]>;
    cliente: Observable<Cliente>;

    constructor(private db: AngularFirestore) {
        this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
    }

    obtenerClientes(): Observable<Cliente[]> {
        // obtener clientes
        this.clientes = this.clientesColeccion.snapshotChanges().pipe(
            map(cambios => {
                return cambios.map(action => {
                    const datos = action.payload.doc.data() as Cliente;
                    datos.id = action.payload.doc.id;
                    return datos;
                });
            })
        );
        return this.clientes;
    }
    agregarCliente(cliente: Cliente) {
       this.clientesColeccion.add(cliente);
    }
}
