const fs = require('fs');
const path = require('path');
const { clearScreenDown } = require('readline');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		idParam = req.params.id
		selectedProduct = products.find(product => product.id == idParam)
		res.render('detail', {selectedProduct})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
    store: (req, res) => {
		let newItem = {
			id: Date.now(),
			image:'default-image.png',
			... req.body
		}
		products.push(newItem)
		fs.writeFileSync(productsFilePath,JSON.stringify(products))
		res.redirect('/products');
	
	},
	// Update - Form to edit
	edit: (req, res) => {
		idParam = req.params.id
		selectedProduct = products.find(product => product.id == idParam)
		res.render('product-edit-form', {selectedProduct})
	},
	// Update - Method to update
	update: (req, res) => {
		idParam = req.params.id
		for (let i = 0; i < products.length; i++) {
			if (idParam == products[i].id){
				products[i].name = req.body.name;
				products[i].price = req.body.price;
				products[i].discount = req.body.discount;
				products[i].category = req.body.category;
				products[i].description = req.body.description;
			}		
		}
		fs.writeFileSync(productsFilePath,JSON.stringify(products))
		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		idParam = req.params.id
		products = products.filter(product => product.id !=idParam)
		fs.writeFileSync(productsFilePath,JSON.stringify(products))
		res.redirect("/products")
	}
};

module.exports = controller;