import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

   chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
   }
  clientes: Cliente[]=[];
  tecnicos: Tecnico[]=[];

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status:     FormControl = new FormControl(null, [Validators.required]);
  titulo:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  tecnico:    FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private service        : ChamadoService,
    private clienteService : ClienteService,
    private tecnicoService : TecnicoService,
    private tost           : ToastrService,
    private router         :Router
    ) { }

  ngOnInit(): void {
    this.findAllCliente();
    this.findAllTecnicos();     
  }
  create():void{
     this.service.create(this.chamado).subscribe(resposta=>{
     this.tost.success('Chamando Criado com sucesso','Novo chamado');
     this.router.navigate(['chamados']);  
     },ex=>{
        this.tost.error(ex.error.error);
     } 
   )
  } 

  findAllCliente():void{    
    this.clienteService.findAll().subscribe(resposta=>{
    this.clientes=resposta;    
    })
  }
  findAllTecnicos():void{
    this.tecnicoService.findAll().subscribe(resposta=>{
    this.tecnicos=resposta;
    })
  } 
  validaCampos(): boolean {
 
    return this.prioridade.valid &&
       this.status.valid &&
       this.titulo.valid &&
       this.observacoes.valid && 
       this.tecnico.valid && 
       this.cliente.valid     
  }
}