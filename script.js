const products = {
  burger: { name: "برگر مخصوص", price: 8 },
  pizza: { name: "پیتزا مخصوص", price: 12 },
  fries: { name: "سیب‌زمینی", price: 4 }
};

const cart = {};

const money = number => number.toLocaleString("fa-IR");

document.querySelectorAll(".add-button").forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.product;
    const input = document.getElementById("qty-" + id);
    const quantity = Number(input.value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      alert("لطفاً تعداد را بین ۱ تا ۹۹ وارد کن.");
      return;
    }

    cart[id] = (cart[id] || 0) + quantity;
    renderCart();

    alert("غذا به سبد خرید اضافه شد!");
  });
});

function renderCart() {
  const container = document.getElementById("cart-items");
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    return sum + products[id].price * qty;
  }, 0);

  document.getElementById("cart-count").textContent = money(count);
  document.getElementById("cart-total").textContent = money(total);

  container.innerHTML = "";

  if (count === 0) {
    container.innerHTML = "<p>هنوز غذایی انتخاب نکرده‌ای.</p>";
    return;
  }

  Object.entries(cart).forEach(([id, qty]) => {
    if (qty <= 0) return;

    const product = products[id];
    const row = document.createElement("div");
    row.className = "cart-row";

    const name = document.createElement("span");
    name.textContent = `${product.name} — ${money(product.price)} یورو`;

    const controls = document.createElement("div");

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.setAttribute("aria-label", "کم کردن تعداد");
    minus.onclick = () => {
      cart[id]--;
      if (cart[id] <= 0) delete cart[id];
      renderCart();
    };

    const quantity = document.createElement("span");
    quantity.textContent = ` ${money(qty)} عدد `;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.setAttribute("aria-label", "زیاد کردن تعداد");
    plus.onclick = () => {
      if (cart[id] < 99) cart[id]++;
      renderCart();
    };

    const remove = document.createElement("button");
    remove.textContent = "حذف";
    remove.className = "remove-button";
    remove.onclick = () => {
      delete cart[id];
      renderCart();
    };

    controls.append(minus, quantity, plus, remove);
    row.append(name, controls);
    container.appendChild(row);
  });
}

document.getElementById("cart-button").addEventListener("click", () => {
  document.getElementById("cart-section").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("clear-cart").addEventListener("click", () => {
  Object.keys(cart).forEach(id => delete cart[id]);
  renderCart();
});

renderCart();
