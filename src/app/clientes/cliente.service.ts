import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { Cliente } from './cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';

import { Router } from '@angular/router'; 

@Injectable()
export class ClienteService {
  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
	  console.log('ClienteService: tap 1');
      (response.content as Cliente[]).forEach(cliente => {
	    console.log(cliente.nome); 
	   });
	}),
	  map((response: any) => {
	  (response.content as Cliente[]).map(cliente => {
	    let datePipe = new DatePipe('en-US');
		cliente.createAt = datePipe.transform(cliente.createAt, 'dd/MM/yyyy')//formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
		return cliente;
	   });
	   return response;
	 }),
	  tap(response => {
	  console.log('ClienteService: tap 2');
      (response.content as Cliente[]).forEach(cliente => {
	    console.log(cliente.nome); 
	   });
	})
   );
 }

  criarCliente(cliente: Cliente) : Observable<any> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
	  map( (response: any) => response.cliente as Cliente),
	  catchError(e => {
	    
		if(e.Status==400) {
		   return throwError(e);
		}
		
	    console.error(e.error.mensagem);
		swal('Error ao cria o cliente', e.error.mensagem, 'error');
		return throwError(e);
	  })
	);
  }
  
  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
	  catchError(e => {
	    this.router.navigate(['/clientes']);
	    console.error(e.error.mensagem);
	    swal('Error ao editar', e.error.mensagem, 'error');
		return throwError(e);
	  })
	);
  }
  
  atualizarCliente(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
	  catchError(e => {
	    
	   	if(e.Status==400) {
		  return throwError(e);
		}
	  
	    console.error(e.error.mensagem);
		swal('Error ao mudar o cliente', e.error.mensagem, 'error');
		return throwError(e);
	  })
	);
  }

  deletarCliente(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
	catchError(e => {
	    console.error(e.error.mensagem);
		swal('Error ao deletar o cliente', e.error.mensagem, 'error');
		return throwError(e);
	  })
  }
}
