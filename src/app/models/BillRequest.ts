export class BillRequest {
  public id: any;
  public billNumber: string;
  public idCompany: number;
  public idClient: number;
  public dateOfIssue: Date;
  public subTotal: number;
  public igv: number;
  public total: number;

  constructor(data?: any) {
    this.id = 0;
    this.billNumber = '';
    this.idCompany = data?.idCompany;
    this.idClient = data?.idClient;
    this.dateOfIssue = data?.dateOfIssue;
    this.subTotal = data?.subTotal;
    this.igv = data?.igv;
    this.total = data?.total;
  }
}
