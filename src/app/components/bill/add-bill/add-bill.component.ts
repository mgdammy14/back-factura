import { Component, Injector, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { BillRequestFull } from 'src/app/models/BillRequestFull';
import { BillComponent } from '../bill.component';
import { BillRequest } from 'src/app/models/BillRequest';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css'],
})
export class AddBillComponent implements OnInit {
  private builder: FormBuilder = this.injector.get(FormBuilder);

  idClient: any;
  actionTag: any;
  subTotalRes: number = 0;
  subtotaaal: number = 0;
  IGV: number = 0;
  Total: number = 0;
  public billForm: FormGroup;
  itemForm: FormGroup;
  clientList: Array<any> = [];
  itemQuantity: Array<any> = [
    {
      id: 0,
      productName: '',
      quantity: null,
      productDescription: '',
      unitPrice: null,
      totalCost: null,
    },
  ];
  buttonName: any;
  client: any;
  clientName: string;
  companyList: any;
  totalCost: any;
  ngModelClientName: any;
  ngModelRucName: any;
  ngModelCompanyName: any;
  ngModelRucCompany: any;
  ngModelSubTotal: any;
  ngModelIGV: any;
  ngModelTotal: any;

  public billFull = new BillRequestFull();

  constructor(
    private _clientService: ClientService,
    private _billService: BillService,
    protected injector: Injector,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getClientList();
    this.selectCompany();
  }

  addItem() {
    this.itemQuantity.push({
      id: this.itemQuantity.length,
      productName: '',
      quantity: null,
      productDescription: '',
      unitPrice: null,
      totalCost: null,
    });
  }

  public buildForm() {
    let idClient = '';
    let dateOfIssue = '';
    let clientName = '';
    let rucClient = '';
    let companyName = '';
    let rucCompany = '';
    let productName = '';
    let quantity = '';
    let productDescription = '';
    let unitPrice = '';
    let totalCost = '';

    this.billForm = this.builder.group({
      dateOfIssue: new FormControl(dateOfIssue, Validators.required),
      idClient: new FormControl(idClient),
      clientName: new FormControl(clientName, Validators.required),
      rucClient: new FormControl(rucClient, Validators.required),
      companyName: new FormControl(companyName, Validators.required),
      rucCompany: new FormControl(rucCompany, Validators.required),
      productName: new FormControl(productName, Validators.required),
      quantity: new FormControl(quantity, Validators.required),
      productDescription: new FormControl(
        productDescription,
        Validators.required
      ),
      unitPrice: new FormControl(unitPrice, Validators.required),
      totalCost: new FormControl(totalCost, Validators.required),
      SubTotal: new FormControl(totalCost, Validators.required),
      IGV: new FormControl(totalCost, Validators.required),
      Total: new FormControl(totalCost, Validators.required),
    });
  }

  sendData() {
    this.billFull.bill = new BillRequest();
    this.billFull.bill.idCompany = 1;
    this.billFull.bill.idClient = this.billForm.value.idClient;
    this.billFull.bill.dateOfIssue = this.billForm.value.dateOfIssue;
    this.billFull.bill.subTotal = this.billForm.value.SubTotal;
    this.billFull.bill.igv = this.billForm.value.IGV;
    this.billFull.bill.total = this.billForm.value.Total;

    this.billFull.billDetailList = this.itemQuantity;

    try {
      this._billService.insertBill(this.billFull).subscribe((data: any) => {
        this.router.navigate(['bill']);
      });
    } catch (error) {
      console.log(error);
    }
    console.log(this.billFull);
  }

  selectClient(data: any) {
    try {
      this._clientService.getClientById(data.value).subscribe((data: any) => {
        this.ngModelClientName = data.nameClient;
        this.ngModelRucName = data.rucClient;
      });
    } catch (error) {
      console.log(error);
    }
  }

  selectCompany() {
    try {
      this._clientService.getCompanyById(1).subscribe((data: any) => {
        this.ngModelCompanyName = data.nameCompany;
        this.ngModelRucCompany = data.rucCompany;
      });
    } catch (error) {
      console.log(error);
    }
  }

  onChangeInput(data: any, item: any, calc: any = null) {
    this.itemQuantity.map((i) => {
      if (i.id == item.id) {
        let newValue = data.value;
        if (calc) {
          let val = data.value;
          let field = i[calc];
          let totalCost = val * field;
          i.totalCost = totalCost;
        } else {
          i[data.id] = newValue;
        }
      }
      let subTotal: number = 0;
      let igv: number = 0;
      let total: number = 0;
      this.itemQuantity.map((i) => {
        subTotal = i.totalCost + subTotal;
        igv = subTotal * 0.18;
        total = subTotal + igv;
        this.ngModelSubTotal = subTotal;
        this.ngModelIGV = igv;
        this.ngModelTotal = total;
      });

      console.log(subTotal);
      return i;
    });
  }

  deleteItem(item: any) {
    let subTotal: number = 0;
    let igv: number = 0;
    let total: number = 0;
    this.itemQuantity.map((i) => {
      subTotal = i.totalCost + subTotal;
      igv = subTotal * 0.18;
      total = subTotal + igv;
      this.ngModelSubTotal = subTotal;
      this.ngModelIGV = igv;
      this.ngModelTotal = total;
    });
    this.itemQuantity = [...this.itemQuantity.filter((i) => i.id != item.id)];
    console.log(item);
  }

  async getClientList() {
    try {
      this._clientService.getClient().subscribe((data: any) => {
        this.clientList = data;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
