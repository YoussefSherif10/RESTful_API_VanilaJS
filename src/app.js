//Import the necessary dependencies
const http = require('http');
// Define a port at which the server will run
const PORT = process.env.PORT || 80;

const getRequestData = require('./utils');
const {getProducts, getProductsById, saveProduct, updateProduct, deleteProduct} = require("./productsService");

const server = http.createServer(async (req, res) => {
    // Get all products
    if (req.url === '/api/products' && req.method === 'GET'){
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(getProducts());
    }

    // Get a product with specified id
    else if (req.url.match(/\/api\/products\/[0-9]+/) && req.method === 'GET'){
        const id = req.url.split('/')[3];
        getProductsById(parseInt(id), (error, result) => {
            if (error){
                res.writeHead(404, {'content-type': 'application/json'});
                res.end('Requested product doesn\'t exist..!');
            }
            else {
                res.writeHead(200, {'content-type': 'application/json'});
                res.end(result);
            }
        });
    }

    // Create a new product
    else if (req.url === '/api/products' && req.method === 'POST'){
        const newProduct = await getRequestData(req);
        saveProduct(JSON.parse(newProduct), (error, result) => {
            if (error){
                res.writeHead(404, {'content-type': 'application/json'});
                res.end(error);
            }
            else {
                res.writeHead(201, {'content-type': 'application/json'});
                res.end(result);
            }
        });
    }

    // Update a specific product
    else if (req.url.match(/\/api\/products\/[0-9]+/) && req.method === 'PUT'){
        const productId = req.url.split('/')[3];
        const updatedData = await getRequestData(req);
        updateProduct(parseInt(productId), JSON.parse(updatedData), (error, result) => {
            if (error){
                res.writeHead(404, {'content-type': 'application/json'});
                res.end(error);
            }
            else {
                res.writeHead(200, {'content-type': 'application/json'});
                res.end(result);
            }
        });
    }

    // Delete a specific Product
    else if (req.url.match(/\api\/products\/[0-9]+/) && req.method === 'DELETE'){
        const productId = req.url.split('/')[3];
        deleteProduct(parseInt(productId), (error, result) => {
            if (error){
                res.writeHead(404, {'content-type': 'application/json'});
                res.end(error);
            }
            else {
                res.writeHead(200, {'content-type': 'application/json'});
                res.end('deleted');
            }
        });
    }

});

// listen for client requests
server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
})