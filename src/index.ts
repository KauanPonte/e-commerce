import { copyFileSync } from "node:fs";
import { Cart } from "./model/cart.model";
import { Category } from "./model/category.model";
import { Product } from "./model/product.model";
import { User } from "./model/user.model";

const user = new User("Kauan", 260301, "kauan@gmail.com", "Customer")
const category = new Category("Tecnologia", 9090);
const product = new Product("PC", 500, "kkamkdoamsdk", category, 0.2);
const cart = new Cart();
cart.addItem(product,2)
cart.addItem(product,1)
console.log(user.userName)
console.log(cart.listProduct)
console.log("Quantidade total de itens: ", cart.getTotalItem())
console.log("Valor total da compra: ",cart.getTotalPrice())
