import { Component, OnInit, Injector } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  private builder: FormBuilder = this.injector.get(FormBuilder);

  public clientForm: FormGroup;

  public response: any;

  buttonName: any;
  actionTag: any;
  verifyId: any;

  edit: boolean;

  clientType: Array<any> = [];

  client = {
    id: 0,
    nameClient: '',
    emailClient: '',
    phoneClient: '',
    rucClient: '',
    idClientType: '',
  };

  constructor(
    private _clientService: ClientService,
    private router: Router,
    protected injector: Injector,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getTypeClient();
  }

  public buildForm() {
    this.response = this.route.snapshot.params;
    let clientName = '';
    let clientEmail = '';
    let phoneClient = '';
    let rucClient = '';
    let clientType = null;
    this.buttonName = 'Agregar';
    this.actionTag = 'Agregar';

    if (this.response.id != undefined) {
      clientName = this.response.nameClient;
      clientEmail = this.response.emailClient;
      phoneClient = this.response.phoneClient;
      rucClient = this.response.rucClient;
      clientType = this.response.idClientType;
      this.buttonName = 'Editar';
      this.actionTag = 'Editar';
    }

    this.clientForm = this.builder.group({
      clientName: new FormControl(clientName, Validators.required),
      clientEmail: new FormControl(clientEmail, Validators.required),
      phoneClient: new FormControl(phoneClient, Validators.required),
      rucClient: new FormControl(rucClient, Validators.required),
      clientType: new FormControl(clientType, Validators.required),
    });
  }

  sendData() {
    this.verifyId = Number(this.response.id);
    this.client.nameClient = this.clientForm.value.clientName;
    this.client.emailClient = this.clientForm.value.clientEmail;
    this.client.phoneClient = this.clientForm.value.phoneClient;
    this.client.rucClient = this.clientForm.value.rucClient;
    this.client.idClientType = this.clientForm.value.clientType;

    if (isNaN(this.verifyId)) {
      try {
        this._clientService.insertClient(this.client).subscribe((data: any) => {
          this.router.navigate(['client']);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.client.id = Number(this.response.id);
        this._clientService.updateClient(this.client).subscribe((data: any) => {
          this.router.navigate(['client']);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getTypeClient() {
    try {
      this._clientService.getTypeClient().subscribe((data: any) => {
        this.clientType = data;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
