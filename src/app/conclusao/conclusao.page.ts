import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { localService } from '../services/local.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-conclusao',
  templateUrl: 'conclusao.page.html',
  styleUrls: ['conclusao.page.scss'],
})
export class ConclusaoPage implements OnInit {
  cadastro = {
    nome: '',
    raca: '',
    idade: '',
    imagem: '',
  };
  public cadastros: any = {};
  public dados: any;
  public imagem: string = ''; // Added an initializer to 'imagem'
  public dadosList: any[] = []; // Added an initializer to 'dadosList'
  imagemBackground = 'assets/conclusao.jpg'; // Caminho para a imagem no meu computador

  constructor(
    private activatedRoute: ActivatedRoute,
    public alerta: AlertController,
    private nav: NavController,
    public local: localService,
    public servicos: localService
  ) {}

  ngOnInit() {
    this.carregaDados();
  }

  ionViewDidEnter() {
    this.carregaDados();
  }

  carregaDados() {
    if (this.servicos.listar) { // Removed the function call parentheses
      this.cadastros = this.servicos.listar();
      console.log(this.cadastros);
      if (this.cadastros.length == 0) {
        this.voltar();
      }
    }
  }

  deletar(nomes:string){
    this.servicos.deletar(nomes)
    this.carregaDados();
  }

  voltar() {
   this.nav.navigateForward('/')
  }
}
