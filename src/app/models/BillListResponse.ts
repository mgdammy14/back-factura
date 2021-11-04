export class BillListResponse {
  public id: number;
  public billNumber: string;
  public idCompany: number;
  public nameCompany: string;
  public emailCompany: string;
  public phoneCompany: string;
  public rucCompany: string;
  public idClient: number;
  public nameClient: string;
  public emailClient: string;
  public phoneClient: number;
  public rucClient: string;
  public idClientType: number;
  public clientTypeName: string;
  public dateOfIssue: Date;
  public subTotal: number;
  public igv: number;
  public total: number;

  constructor(data?: any) {
    this.id = data.id;
    this.billNumber = data.billNumber;
    this.idCompany = data.idCompany;
    this.nameCompany = data.nameCompany;
    this.emailCompany = data.emailCompany;
    this.phoneCompany = data.phoneCompany;
    this.rucCompany = data.rucCompany;
    this.idClient = data.idClient;
    this.nameClient = data.nameClient;
    this.emailClient = data.emailClient;
    this.phoneClient = data.phoneClient;
    this.rucClient = data.rucClient;
    this.idClientType = data.idClientType;
    this.clientTypeName = data.clientTypeName;
    this.dateOfIssue = data.dateOfIssue;
    this.subTotal = data.subTotal;
    this.igv = data.igv;
    this.total = data.total;
  }
}
