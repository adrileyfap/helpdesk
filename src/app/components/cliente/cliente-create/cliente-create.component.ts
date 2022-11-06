import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})

export class ClienteCreateComponent implements OnInit {
     cliente: Cliente = {
       id:'',
      nome:'',
       cpf:'',
      email:'',
      senha:'',
      perfis:[],
      dataCriacao:''

  }
  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =        new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  constructor(
      private service:ClienteService,
      private tost : ToastrService,
      private router : Router
     ) 
  { }

  ngOnInit(): void {
  }
      create():void{
         this.service.create(this.cliente).subscribe(resposta =>{ 
         this.tost.success('cliente Cadastrado com sucesso!','cadastro'),
         this.router.navigate(['clientes'])}, 
         ex=>{         
            if(ex.error.errors){
              ex.error.errors.array.forEach(element => {
                this.tost.error(element.message);                
              });
            }else{
              this.tost.error(ex.error.message)
            }          

         } )
      }
      addPerfil(perfil:any):void{
       
        if(this.cliente.perfis.includes(perfil)){
          this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil),1);
        }else{
          this.cliente.perfis.push(perfil);
        }
      }
      validarCampos():boolean{
        return this.nome.valid &&
               this.cpf.valid  &&
               this.email.valid &&
               this.senha.valid  
           
         
          }

}