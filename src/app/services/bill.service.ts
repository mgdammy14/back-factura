import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  public getBills() {
    return this.http.get('https://localhost:5001/api/Bill/list');
  }

  public insertBill(billrequest: any) {
    return this.http.post('https://localhost:5001/api/Bill', billrequest);
  }

  public updateBill(billrequest: any) {
    return this.http.put('https://localhost:5001/api/Bill', billrequest);
  }

  public getBillDetaail(id: number) {
    return this.http.get('https://localhost:5001/api/BillDetail/list/' + id);
  }
}
