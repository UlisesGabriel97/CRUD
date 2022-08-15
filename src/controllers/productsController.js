const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products",{
			productos:products
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let producto = products.find(element => {
			return element.id == req.params.id
		})
		return res.render("detail",{
			producto
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")	
	},
	
	// Create -  Method to store
	store: (req, res) => {
		res.send("Se creó el producto con exito")
	},

	// Update - Form to edit
	edit: (req, res) => {
		let producto = products.find(element => {
			return element.id == req.params.id
		})
		let categorias = ["in-sale","visited"]
		return res.render("product-edit-form",{
			producto,
			categorias
		})
	},
	// Update - Method to update
	update: (req, res) => {
		res.send("Se actualizo el producto con exito")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		res.send("Se eliminó el productó con exito")
	}
};

module.exports = controller;