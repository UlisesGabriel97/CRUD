const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//const productsHistory = require("../data/productsHistory.json")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let guardarJson = (dato) => fs.writeFileSync(path.join(__dirname,"../data/productsDataBase.json"),JSON.stringify(dato,null,4),'utf-8')
let guardarHistorial = (dato) => fs.writeFileSync(path.join(__dirname,"../data/productsHistory.json"),JSON.stringify(dato,null,4),'utf-8')

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products",{
			productos:products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let producto = products.find(element => {
			return element.id == req.params.id
		})
		return res.render("detail",{
			producto,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")	
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let {name,price,discount,category,description,image} = req.body
		let nuevoProducto = {
			id: products[products.length -1].id +1,
			name:name,
			price:+price,
			discount:+discount,
			category,
			description,
			image: image===undefined ? "default-image.png" : image
		}
		products.push(nuevoProducto)
		guardarJson(products)
		return res.redirect(`/products/detail/${nuevoProducto.id}`)

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
		let id = +req.params.id
		let {name,price,discount,category,description,image} = req.body
		products.forEach(producto => {
			if (producto.id === id) {
				producto.name = name
				producto.price = +price
				producto.discount = +discount,
				producto.category = category,
				producto.description = description
			  //producto.image = FALTA TRABAJAR LA IMAGEN
			}
		});
		guardarJson(products)
		return res.redirect(`/products/detail/${id}`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = +req.params.id		
		let productosActualizados = products.filter(producto => producto.id !== id)
		guardarJson(productosActualizados)

		return res.redirect(`/products`)
	}
};

module.exports = controller;