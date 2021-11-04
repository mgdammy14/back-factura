import { BillRequest } from '../models/BillRequest';
import { BillDetailRequest } from '../models/BillDetailRequest';

export class BillRequestFull {
  public bill: BillRequest;
  public billDetailList: BillDetailRequest[];

  constructor(data?: any) {
    this.bill = data?.bill;
    this.billDetailList = data?.billDetailList;
  }
}
