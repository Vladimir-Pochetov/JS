'use strict';

const basketCountEl = document.querySelector(".cartIconWrap span");
const basketTotalEl = document.querySelector(".basketTotalValue");
const basketEl = document.querySelector(".basket");
 
document.querySelector(".cartIconWrap").addEventListener("click", () => {
	basketEl.classList.toggle("hidden");
});

const basket = {};

document.querySelector(".featuredItems").addEventListener("click", event => {
	if (!event.target.closest(".addToCart")) {
		return;
	}
	const featuredItem = event.target.closest(".featuredItem");
	const id = +featuredItem.dataset.id;
	const name = featuredItem.dataset.name;
	const price = +featuredItem.dataset.price;
	addToCart(id, name, price);
});

function addToCart(id, name, price) {
	if(!(id in basket)) {
		basket[id] =  {id, name, price, count: 0};
	}
	basket[id].count++;
	basketCountEl.textContent = getTotalBasketCount().toString();
	basketTotalEl.textContent = getTotalBasketPrice().toFixed(2);
	productBasket(id);
}

function getTotalBasketCount() {
	return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
	return Object.values(basket)
	.reduce((acc, product) => acc + product.count * product.price, 0);
}

function productBasket(id) {
	
}