import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  public getTypeClient() {
    return this.http.get('https://localhost:5001/api/ClientType');
  }

  public getClient() {
    return this.http.get('https://localhost:5001/api/Client');
  }

  public getClientById(id: number) {
    return this.http.get('https://localhost:5001/api/Client/' + id);
  }

  public getCompanyById(id: number) {
    return this.http.get('https://localhost:5001/api/Company/' + id);
  }

  public insertClient(client: any) {
    return this.http.post('https://localhost:5001/api/Client', client);
  }

  public updateClient(client: any) {
    return this.http.put('https://localhost:5001/api/Client', client);
  }
}
