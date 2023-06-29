import { Component } from '@angular/core';
import { localService } from '../services/local.service';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dados: any = {};

  cadastro = {
    nome: '',
    raca: '',
    idade: '',
  };
  LabelBotao: string = 'Cadastrar'; // Inicializando a variável LabelBotao com o valor 'Cadastrar'

  constructor(
    public mensagem: ToastController,
    public nav: NavController,
    private local: localService,
   
  ) {}

  ionViewDidEnter() {
    this.limpaDados();
  }

  public nome: string = '';
  
  public imagem = '';
  
  imagemBackground = 'assets/fundo3.jpg'; // Caminho para a imagem no meu computador

 /* async gerandoStorage(){
    const dados = (

    )
  }*/
 

  cadastrar() {
    if (
      this.cadastro.nome == '' ||
      this.cadastro.raca == '' ||
      this.cadastro.idade == '' 
    ){
      this.exibeToast('Preenche os campos necessários', 'danger');
    } else {
      //! ACESSAR UMA FUNÇÃO QUE VAI SALVAR TUDO
      this.salvamento();
      //this.nav.navigateForward('conclusao', {});
      const extras: NavigationExtras = {
        state: {
          dados: this.cadastro,
          imagem: this.imagem,
        },
      
      };
      
      this.nav.navigateForward('conclusao', extras); 
    }
  }

  salvamento() {
    this.local.salvarCadastro(
      this.cadastro.nome,
      this.cadastro.raca,
      this.cadastro.idade,
      ""
    );
  }

  limpaDados() {
    this.LabelBotao = 'Cadastrar';

    this.cadastro.nome = '';
    this.cadastro.raca = '';
    this.cadastro.idade = '';
  }

  async exibeToast(msg: string, cor: string) {
    const toast = await this.mensagem.create({
      message: msg,
      duration: 2000, //2 segundos
      position: 'top',
      animated: true,
      color: cor,
    });

    toast.present();
  }
}
