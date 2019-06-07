import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2'
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;

  constructor(private clienteService: ClienteService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

	this.activatedRoute.paramMap.subscribe( params => {
    let page: number = + params.get('page');
	
	if(!page) {
	  page = 0;
	}
	
    this.clienteService.getClientes(page)
	.pipe(
	  tap(response => {
        console.log('ClientesComponent: tap 3');
	    (response.content as Cliente[]).forEach(cliente => console.log(cliente.nome));
	    })
      ).subscribe(response => {
	    this.clientes = response.content as Cliente[];
		this.paginador = response;
		});
	  });
  }

  deletarCliente(cliente: Cliente): void {
    swal({
      title: 'Tem certeza?',
      text: `Deseja realmente eliminar o cliente ${cliente.nome} ${cliente.sobrenome} e todo seu conteudo?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Nao',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.deletarCliente(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal(
              'Cliente Eliminado!',
              `Cliente ${cliente.nome} foi eliminado.`,
              'success'
            )
          }
        )

      }
    })
  }

}
