// Import the necessary dependencies
const productsList = require("./products.json").products;


const getProducts = () => {
    return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
    let product = productsList.find(p => p.id === productId);
    if (!product)
        return done('Requested product doesn\'t exist..!');
    return done(null, JSON.stringify(product));
}

const saveProduct = (newProduct, done) => {
    let entry = productsList.find(p => p.id === newProduct.id);
    if (!entry)
        return done('Product already exists..!');
    productsList.push(newProduct);
    return done(null, JSON.stringify(productsList));
}

const updateProduct = (productId, updateData, done) => {
    let index = productsList.findIndex(p => p.id === productId);
    if (index === -1)
        done('Requested product doesn\'t exist..!');

    let newObj = {...productsList[index], updateData};
    let updatedProductList = productsList.splice(index, 1, newObj);
    done(null, JSON.stringify(updatedProductList));
}

const deleteProduct = (productId, done) => {
    let index = productsList.findIndex(p => p.id === productId);
    if (index === -1)
        done('Requested product doesn\'t exist..!');

    done(null, JSON.stringify(productsList.splice(index, 1)));
}


module.exports = {
    getProducts,
    getProductsById,
    saveProduct,
    updateProduct,
    deleteProduct
}