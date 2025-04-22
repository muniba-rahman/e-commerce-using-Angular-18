export class ProductSchema {
    productId: Number;
    productName: String;
    shortName: String;
    category: String;
    sku: any;
    price: Number;
    thumbnailImageUrl: String;
    deliveryTimeSpan: String;

    constructor(){
        this.productId = 0;
        this.productName = "";
        this.shortName = "";
        this.category = "";
        this.sku = "";
        this.price = 0;
        this.thumbnailImageUrl = "";
        this.deliveryTimeSpan = "";
    }
}