"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = require("./model/cart.model");
const category_model_1 = require("./model/category.model");
const product_model_1 = require("./model/product.model");
const category = new category_model_1.Category("Tecnologia");
const product = new product_model_1.Product("PC", 500, "kkamkdoamsdk", category, 0.2);
const cart = new cart_model_1.Cart();
cart.addItem(product, 2);
cart.addItem(product, 1);
console.log(cart.listProduct);
//# sourceMappingURL=index.js.map