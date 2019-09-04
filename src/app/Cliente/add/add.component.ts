import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Cliente } from 'src/app/Modelo/Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [DatePipe]
})

export class AddComponent implements OnInit {
  FormCliente: FormGroup;
  fecha_probable_muerte:String;
  constructor(private router:Router, private service:ServiceService,private fb: FormBuilder,private datePipe: DatePipe) { 
    let mes =  0;
    let dia = 0;
    let anno = 0;
    let mes_2 =0;
    let dia_2 = 0;
    let dia_probable_muerte = 0;
    let mes_probable_muerte = 0;
    mes = new Date().getMonth()+1;
    dia = new Date().getDay();
    anno = new Date().getFullYear();
    mes_2 = 12 - mes;
    dia_2 = 30 - dia;
    mes_probable_muerte  =  Math.floor((Math.random() * mes_2) + mes);
    dia_probable_muerte =  Math.floor((Math.random() * dia) + dia_2);
    this.fecha_probable_muerte = this.datePipe.transform(new Date(anno,mes_probable_muerte+1,dia_probable_muerte), 'yyyy-MM-dd').toString();
    console.log("La fecha actual es: "+ this.fecha_probable_muerte);
  
  
  }
  
  ngOnInit() {
    this.FormCliente =  this.fb.group({
      'nombre': ['',Validators.required],
      'apellido': ['',Validators.required],
      'edad': ['',Validators.required],
      'fecha_nacimiento': ['',Validators.required]
    })
   
  }

  Guardar(form:any){
      let cliente = new Cliente();
       cliente.nombre  = this.FormCliente.value.nombre;
       cliente.apellido = this.FormCliente.value.apellido;
       cliente.edad = this.FormCliente.value.edad;
       cliente.fecha_nacimiento =  this.datePipe.transform(this.FormCliente.value.fecha_nacimiento, 'yyyy-MM-dd').toString();
       cliente.fecha_posible_muerte = this.fecha_probable_muerte;
       console.log(cliente);
       this.service.crearClientes(cliente)
       .subscribe(data=>{
         alert("Se creado con exito el cliente!!!");
         this.router.navigate(["listar"])
       });


  }

  
}
