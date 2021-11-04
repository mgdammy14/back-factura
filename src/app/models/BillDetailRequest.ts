export class BillDetailRequest {
  public productName: string;
  public quantity: number;
  public productDescription: string;
  public unitPrice: number;
  public totalCost: number;

  constructor(data?: any) {
    this.productName = data.productName;
    this.quantity = data.quantity;
    this.productDescription = data.productDescription;
    this.unitPrice = data.unitPrice;
    this.totalCost = data.totalCost;
  }
}
