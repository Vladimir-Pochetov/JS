'use strict';

const basketCountEl = document.querySelector(".cartIconWrap span");
const basketTotalEl = document.querySelector(".basketTotalValue");
const basketEl = document.querySelector(".basket");
const basketTotal = document.querySelector(".basketTotal");
 
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
	const basketTotEls = basketEl
	.querySelector(`.basketRow[data-productId= "${id}"]`);
	if(!basketTotEls) {
		productBasket(id);
		return;
	}

	basketTotEls.querySelector(".productCount").textContent = basket[id].count;
	basketTotEls.querySelector(".productTotalRow")
	.textContent = basket[id].count * basket[id].price;
}


function productBasket(productId) {
  const productRow = `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotal.insertAdjacentHTML("beforebegin", productRow);
}
