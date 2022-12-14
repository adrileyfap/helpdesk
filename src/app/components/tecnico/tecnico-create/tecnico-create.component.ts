import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})

export class TecnicoCreateComponent implements OnInit {
     tecnico: Tecnico = {
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
      private service:TecnicoService,
      private tost : ToastrService,
      private router : Router
     ) 
  { }

  ngOnInit(): void {
  }
      create():void{
         this.service.create(this.tecnico).subscribe(resposta =>{ 
         this.tost.success('tecnico Cadastrado com sucesso!','cadastro'),
         this.router.navigate(['tecnicos'])}, 
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
       
        if(this.tecnico.perfis.includes(perfil)){
          this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil),1);
        }else{
          this.tecnico.perfis.push(perfil);
        }
      }
      validarCampos():boolean{
        return this.nome.valid &&
               this.cpf.valid  &&
               this.email.valid &&
               this.senha.valid   
         
          }

}