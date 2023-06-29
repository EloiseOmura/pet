import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private cadastros: any[] = [];

  constructor() {}

  listar(): any[] {
    return this.cadastros;
  }

  getSavedData(): Observable<any[]> {
    // implementar a lógica para obter os dados salvos
    // Pode ser uma chamada a um armazenamento local, como o localStorage ou o Ionic Storage, por exemplo.
    // Retorne um Observable com o tipo de dados esperado, nesse caso, any[].

    const savedData = localStorage.getItem('savedData'); // Obtém os dados salvos do localStorage
    
    if (savedData) {
      const parsedData = JSON.parse(savedData); // Converte a string para um objeto JSON
      return of(parsedData); // Retorna um Observable com os dados salvos
    } else {
      return of([]); // Retorna um Observable vazio caso não haja dados salvos
    }
  }
}
