import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { BillService } from '../../../services/bill.service';
import { BillRequestFull } from 'src/app/models/BillRequestFull';
import { BillRequest } from 'src/app/models/BillRequest';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.css'],
})
export class EditBillComponent implements OnInit {
  private builder: FormBuilder = this.injector.get(FormBuilder);
  public billForm: FormGroup;
  ngModelClientName: any;
  ngModelRucName: any;
  ngModelCompanyName: any;
  ngModelRucCompany: any;
  ngModelSubTotal: any;
  ngModelIGV: any;
  ngModelTotal: any;
  ngModeldateOfIssue: any;
  response: any;
  clientList: Array<any> = [];

  public billFull = new BillRequestFull();
  itemQuantity: Array<any> = [];
  constructor(
    private _clientService: ClientService,
    private _billService: BillService,
    protected injector: Injector,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getClientList();
    this.fillForm();
  }

  public buildForm() {
    this.response = this.route.snapshot.params;
    console.log(this.response);
    this.billForm = this.builder.group({
      idClient: new FormControl(this.response.idClient),
      clientName: new FormControl(''),
      rucClient: new FormControl(''),
      dateOfIssue: new FormControl(''),
      companyName: new FormControl(''),
      rucCompany: new FormControl(''),
      SubTotal: new FormControl(''),
      IGV: new FormControl(''),
      Total: new FormControl(''),
    });
  }

  public fillForm() {
    this.response = this.route.snapshot.params;
    this.ngModelClientName = this.response.nameClient;
    this.ngModelRucName = this.response.rucClient;
    this.ngModelCompanyName = this.response.nameCompany;
    this.ngModelRucCompany = this.response.rucCompany;
    this.ngModeldateOfIssue = this.response.dateOfIssue;
    this.ngModelSubTotal = this.response.subTotal;
    this.ngModelIGV = this.response.igv;
    this.ngModelTotal = this.response.total;
    this.getBillDetailById(this.response.id);
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

  addItem() {
    this.itemQuantity.push({
      id: this.itemQuantity.length + 1,
      productName: '',
      quantity: null,
      productDescription: '',
      unitPrice: null,
      totalCost: null,
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

  async getBillDetailById(idBill: any) {
    try {
      this._billService.getBillDetaail(idBill).subscribe((data: any) => {
        this.itemQuantity = data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendData() {
    this.billFull.bill = new BillRequest();
    this.billFull.bill.billNumber = this.response.billNumber;
    this.billFull.bill.id = Number(this.response.id);
    this.billFull.bill.idCompany = 1;
    this.billFull.bill.idClient = Number(this.billForm.value.idClient);
    this.billFull.bill.dateOfIssue = this.billForm.value.dateOfIssue;
    this.billFull.bill.subTotal = Number(this.billForm.value.SubTotal);
    this.billFull.bill.igv = Number(this.billForm.value.IGV);
    this.billFull.bill.total = Number(this.billForm.value.Total);
    this.billFull.billDetailList = this.itemQuantity;
    try {
      this._billService.updateBill(this.billFull).subscribe((data: any) => {
        this.router.navigate(['bill']);
      });
    } catch (error) {
      console.log(error);
    }

    console.log(this.billFull);
  }
}
