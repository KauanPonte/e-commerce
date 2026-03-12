"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(name, price, ing, category, discount) {
        this.name = name;
        this.price = price;
        this.ing = ing;
        this.category = category;
        this.discount = discount;
    }
    discountApplied() {
        return this.price * (1 - this.discount);
    }
}
exports.Product = Product;
//# sourceMappingURL=product.model.js.map