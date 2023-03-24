import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from './../../model/cliente.model';
import { ClienteServicio } from './../../Services/cliente.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private ClienteServicio: ClienteServicio,
              private FlashMessages: FlashMessagesService) { }

  clientes : Cliente[];
  cliente: Cliente={
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  ngOnInit(): void {
    this.ClienteServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal: number =0;
    if(this.clientes!=null){
      this.clientes.forEach(cliente => {
        saldoTotal += cliente.saldo
      })
    }
    return saldoTotal;
  }

  agregar(f:NgForm){
    let value = this.cliente;
    if(!f.valid){
      this.FlashMessages.show('por favor llena el formulario correctamente.', {
        cssClass: 'alert-danger', timeout: 4000
      })
    }
    else{
      this.ClienteServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
