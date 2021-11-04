import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BillService } from '../../../app/services/bill.service';
import { BillListResponse } from '../../models/BillListResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  response: BillListResponse[] = [];

  constructor(private _billService: BillService, private router: Router) {}

  ngOnInit(): void {
    this.getBills();
  }

  async getBills() {
    try {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
      };
      this._billService.getBills().subscribe((data: any) => {
        this.response = data;
        this.dtTrigger.next();
      });
    } catch (error) {
      console.log(error);
    }
  }

  addBill() {
    this.router.navigate(['add-bill']);
  }

  editBill(data: any) {
    this.router.navigate(['edit-bill', data]);
  }
}
