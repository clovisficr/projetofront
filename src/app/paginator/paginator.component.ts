import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginador: any;
  
  paginas: number[];
  
  inicio: number;
  final: number;
  
  constructor() { }

  ngOnInit() {
   this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    let paginadorAtualizado = changes['paginador'];
	
	if (paginadorAtualizado.previousValue) {
	  this.initPaginator();
	}
  }
  
  private initPaginator(): void {
    this.inicio = Math.min( Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
	this.final = Math.max( Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);
	
    if(this.paginador.totalPages > 5){
	  this.paginas = new Array(this.final - this.inicio + 1).fill(0).map((_valor, indice) => indice + this.inicio);
	} else {
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
	}
  }
}
