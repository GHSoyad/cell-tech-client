import { IProduct } from "./productTypes";
import { IUser } from "./userTypes";

export interface ISaleInfo {
    _id: string,
    productId: string,
    buyerName: string,
    quantitySold: number,
    dateSold: string,
    sellPrice: number,
    totalAmount: number,
    sellerId: number,
    product: IProduct,
    seller: IUser,
}