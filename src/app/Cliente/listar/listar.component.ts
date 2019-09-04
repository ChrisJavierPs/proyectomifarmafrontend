import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ServiceService} from '../../Service/service.service'
import { Cliente } from '../../Modelo/Cliente';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {


  clientes: Cliente[];
  promedio_edad:number;
  desviacion_estandar:number;
  constructor(private service:ServiceService, private router:Router) { }

  ngOnInit() {
    this.service.getClientes()
    .subscribe(data=>{
      this.clientes = data;
      this.promedio_edad = 0;
      let total:number;
      total = 0;
      this.clientes.forEach(element => {
        total += element.edad;
      });
      this.promedio_edad = total/this.clientes.length;
      let sumatoria:number;
      sumatoria = 0;
      this.clientes.forEach(element => {
        sumatoria += ((element.edad - this.promedio_edad)*(element.edad - this.promedio_edad));
      });
      this.desviacion_estandar=Math.pow(sumatoria/this.clientes.length,1/2);
    });

    
  }





  obtener_promedio() {
  this.clientes.forEach(element => {
    this.promedio_edad += element.edad;
  });
  console.log("Edad promedio: "+ this.promedio_edad);
  }

  

}
