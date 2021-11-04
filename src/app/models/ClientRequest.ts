export class ClientRequest {
  public nameClient: string;
  public emailClient: string;
  public phoneClient: string;
  public rucClient: string;
  public idClientType: number;

  constructor(data?: any) {
    this.nameClient = data.nameClient;
    this.emailClient = data.emailClient;
    this.phoneClient = data.phoneClient;
    this.rucClient = data.rucClient;
    this.idClientType = data.idClientType;
  }
}
