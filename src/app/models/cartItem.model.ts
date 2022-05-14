import { Product } from "./products.model";

export interface CartItem {
    readonly id? : number,
    product : Product,
    quantity : number

}