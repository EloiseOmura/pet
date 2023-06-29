import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class localService {
  colecaolocal: any[] = [];
  key = 'local';
  public result: any = {};
  public url = 'https://dog.ceo/api/breeds/image/random';
  constructor(private http: HttpClient) {}

  async salvarCadastro(
    nome: string,
    raca: string,
    idade: string,
    imagem: string
  ) {
    const dados = {
      nomes: nome,
      racas: raca,
      idades: idade,
      imagens: await this.gerar(),
    };

    const values = localStorage.getItem(this.key);

    if (!values) {
      this.colecaolocal.push(dados);
      localStorage.setItem(this.key, JSON.stringify(this.colecaolocal));
    } else {
      const colecao: any[] = this.listar()!;
      colecao.push(dados);
      localStorage.setItem(this.key, JSON.stringify(colecao));
    }
  }
  gerar() {

    return new Promise<string>(async (resolve, reject) => {
      try{
        const resp = await this.consultaApi().toPromise();
        this.result = resp;
        resolve(this.result.message);
      } catch (error) {
        reject(error);
      }
      });
    }

  consultaApi() {
    return this.http.get(this.url);
  }

  listar() {
    const values = localStorage.getItem(this.key);

    if (!values) return;

    const colecao: any[] = JSON.parse(values);
    return colecao;
  }

 
  deletar(params: any) {
    const values = this.listar();
    const result = values?.filter((local) => local.nomes !== params);
  
    localStorage.setItem(this.key, JSON.stringify(result));
  }

 
}
