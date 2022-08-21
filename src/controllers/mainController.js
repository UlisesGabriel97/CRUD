const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productosVisitados = products.filter(element =>{
			return element.category == "visited"
		})
		let productosInSale = products.filter (element => {
			return element.category == "in-sale"
		})
		return res.render("index",
		{
			productosVisitados,
			productosInSale,
			toThousand
		});
	},
	search: (req, res) => {
		return res.render("result")
	},
};

module.exports = controller;
