const fs= require('fs');
const path =require('path');

const p =path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);
module.exports = class Cart {
    // using static method bcuz we don't need to create new cart every single time
    static addProduct(id, productPrice){
        // Fetch the previous cart 
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
   
        //Analyze the cart => Find exiting product
        const exitingProductIndex =cart.products.findindex( prod => prod.id ===id);
        const exitingProduct = cart.products[exitingProductIndex]
        let updatedProduct;
        if (exitingProduct) {
            updatedProduct = { ...exitingProduct};
            updatedProduct.qty = updatedProduct.qty +1
            cart.products = [...cart.products];
            cart.products[exitingProductIndex] = updatedProduct;
        }else{
            updatedProduct ={id : id, qty: 1};
            cart.products = [...cart.products, updatedProduct]
        }
            cart.totalPrice = cart.totalPrice + productPrice;
            fs.writeFile(p, JSON.stringify(cart),err =>{
                console.log(err);
            });
        });
        // Add new product/ increase quantity
    }

}