// Import the necessary dependencies
const productsList = require("./products.json").products;


const getProducts = () => {
    return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
    let product = productsList.find(p => p.id === productId);
    if (!product) {
        done('Requested product doesn\'t exist..!');
        return null;
    }
    done(null, JSON.stringify(product));
    return JSON.stringify(product);
}

const saveProduct = (newProduct, done) => {
    let entry = productsList.find(p => p.id === newProduct.id);
    if (entry) {
        done('Product already exists..!');
        return null;
    }
    productsList.push(newProduct);
    done(null, JSON.stringify(productsList));
    return JSON.stringify(productsList);
}

const updateProduct = (productId, updateData, done) => {
    let index = productsList.findIndex(p => p.id === productId);
    if (index === -1) {
        done('Requested product doesn\'t exist..!');
        return null;
    }


    productsList.splice(index, 1, updateData);
    done(null, JSON.stringify(productsList));
    return JSON.stringify(productsList)
}

const deleteProduct = (productId, done) => {
    let index = productsList.findIndex(p => p.id === productId);
    if (index === -1) {
        done('Requested product doesn\'t exist..!');
        return null;
    }

    productsList.splice(index, 1);
    done(null, JSON.stringify(productsList));
    return JSON.stringify(productsList);
}


module.exports = {
    getProducts,
    getProductsById,
    saveProduct,
    updateProduct,
    deleteProduct
}