import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/model/cliente.model';
import { __values } from 'tslib';
import { ClienteServicio } from './../../Services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente={
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id:string;
  idConEspacio: string;

  constructor(private ClienteServicio: ClienteServicio,
    private FlashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idConEspacio = this.route.snapshot.params['id'];
    this.id = this.idConEspacio.replace(/\s{2,}/g, ' ').trim();
    this.ClienteServicio.getCliente(this.id).subscribe( cliente => {
      this.cliente = cliente;
    });
  }

  guardar({value,valid}:NgForm){
    if(!valid){
      this.FlashMessages.show('por favor llena el formulario correctamente',{
      cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      value.id = this.id;
      //modificar el cliente
      this.ClienteServicio.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar(){
    if(confirm('seguro que desea eliminar el cliente?')){
      this.ClienteServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/'])
    }
  }

}
