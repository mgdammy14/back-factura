import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Client } from 'src/app/models/Client';
import { Router } from '@angular/router';
import { ClientService } from '../../../app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  response: Client[] = [];

  data: any;

  nameButton: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  async getClients() {
    try {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
      };
      this._clientService.getClient().subscribe((data: any) => {
        this.response = data;
        this.dtTrigger.next();
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  addClient() {
    this.router.navigate(['add-client']);
  }

  editClient(data: any) {
    this.router.navigate(['add-client', data]);
  }
}
