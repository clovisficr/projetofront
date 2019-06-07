import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente'
import {ClienteService} from './cliente.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente()
  private titulo:string = "Criar Cliente"
  
  private errores: string[];

  constructor(private clienteService: ClienteService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.carregarCliente()
  }

  carregarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  criarCliente(): void {
    this.clienteService.criarCliente(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        swal('Novo cliente', `O cliente ${cliente.nome} foi criado com sucesso`, 'success')
      },
	  err => {
	    this.errores = err.error.errors as string[];
		console.error('Codigo do error do backend: ' + err.status);
		console.error(err.error.errors);
	  }
      );
  }

  atualizarCliente():void{
    this.clienteService.atualizarCliente(this.cliente)
    .subscribe( json => {
      this.router.navigate(['/clientes'])
      swal('Cliente Atualizado', `${json.mensagem}: ${json.cliente.nome}`, 'success')
    },
	  err => {
	    this.errores = err.error.errors as string[];
		console.error('Codigo do error do backend: ' + err.status);
		console.error(err.error.errors);
	  }
    )
  }
}
