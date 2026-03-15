"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
class Cart {
    constructor(listProduct = []) {
        this.listProduct = listProduct;
    }
    addItem(product, quantity) {
        const existItem = this.listProduct.findIndex((item) => item.product.name === product.name) > -1;
        if (existItem) {
            this.listProduct = this.listProduct.map((item) => {
                if (item.product.name === product.name) {
                    return {
                        product,
                        quantity: item.quantity + quantity
                    };
                }
                return item;
            });
        }
        this.listProduct.push({ product, quantity });
    }
}
exports.Cart = Cart;
//# sourceMappingURL=cart.model.js.map