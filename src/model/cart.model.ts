import { Product } from "./product.model";

interface listProduct {
  product: Product;
  quantity: number;
}
export class Cart {
    constructor(public listProduct: listProduct[] = []) {

    }

    addItem(product: Product, quantity: number){
        const existItem = this.listProduct.some(item => item.product.name === product.name) 
        if(existItem === true){
            this.listProduct = this.listProduct.map((item)=>{
                if(item.product.name === product.name){
                    return{
                        product,
                        quantity:item.quantity + quantity
                    }
                }
                return item
            })
        }else{
            this.listProduct.push({product, quantity })
        }
    }

    getTotalItem(): number {
        return this.listProduct.reduce((total,item)=> {
             return total + item.quantity
        },0);
        
    }

    getTotalPrice(): number {
        return this.listProduct.reduce((total, item)=> {
            return total + item.quantity * item.product.price
        },0)
    }


}
