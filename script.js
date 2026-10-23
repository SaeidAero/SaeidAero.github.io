
const products = {
  burger: { name: "برگر", price: 8 },
  pizza: { name: "پیتزا", price: 12 },
  fries: { name: "سیب‌زمینی", price: 4 }
};

const cart = {};

const $ = (id) => document.getElementById(id);

const menuSection = $("menu-section");
const cartSection = $("cart-section");
const cartItems = $("cart-items");
const message = $("message");

const formatNumber = (number) =>
  new Intl.NumberFormat("fa-IR").format(number);

const formatPrice = (price) =>
  `${formatNumber(price)} یورو`;

function showMessage(text) {
  message.textContent = text;
}

function updateCart() {
  const entries = Object.entries(cart)
    .filter(([id, quantity]) => products[id] && quantity > 0);

  const totalCount = entries.reduce(
    (sum, [, quantity]) => sum + quantity, 0
  );

  const totalPrice = entries.reduce(
    (sum, [id, quantity]) =>
      sum + products[id].price * quantity, 0
  );

  $("cart-count").textContent = formatNumber(totalCount);
  $("total-count").textContent = formatNumber(totalCount);
  $("total-price").textContent = formatPrice(totalPrice);

  cartItems.replaceChildren();

  if (entries.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "سبد خرید شما خالی است.";
    cartItems.appendChild(empty);
    return;
  }

  entries.forEach(([id, quantity]) => {
    const product = products[id];
    const item = document.createElement("div");
    item.className = "cart-item";

    const details = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = product.name;

    const info = document.createElement("p");
    info.textContent =
      `${formatPrice(product.price)} × ${formatNumber(quantity)} = ${formatPrice(product.price * quantity)}`;

    details.append(name, info);

    const controls = document.createElement("div");

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", `کم کردن ${product.name}`);
    minus.addEventListener("click", () => changeQuantity(id, -1));

    const quantityText = document.createElement("strong");
    quantityText.textContent = formatNumber(quantity);

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", `زیاد کردن ${product.name}`);
    plus.addEventListener("click", () => changeQuantity(id, 1));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-button";
    remove.textContent = "حذف";
    remove.addEventListener("click", () => {
      delete cart[id];
      updateCart();
      showMessage(`${product.name} حذف شد.`);
    });

    controls.append(minus, quantityText, plus, remove);
    item.append(details, controls);
    cartItems.appendChild(item);
  });
}

function changeQuantity(id, amount) {
  if (!cart[id]) return;

  cart[id] += amount;

  if (cart[id] <= 0) {
    delete cart[id];
  }

  updateCart();
  showMessage("سبد خرید به‌روز شد.");
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.id;
    const input = $(`qty-${id}`);
    const quantity = Number(input.value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      showMessage("لطفاً تعداد بین ۱ تا ۹۹ وارد کن.");
      input.focus();
      return;
    }

    cart[id] = (cart[id] || 0) + quantity;
    updateCart();
    showMessage(`${products[id].name} به سبد خرید اضافه شد.`);
  });
});

$("cart-button").addEventListener("click", () => {
  menuSection.hidden = true;
  cartSection.hidden = false;
  updateCart();
  showMessage("");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$("back-button").addEventListener("click", () => {
  cartSection.hidden = true;
  menuSection.hidden = false;
  showMessage("");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$("clear-button").addEventListener("click", () => {
  Object.keys(cart).forEach((id) => delete cart[id]);
  updateCart();
  showMessage("سبد خرید خالی شد.");
});

$("checkout-button").addEventListener("click", () => {
  const total = Object.entries(cart).reduce(
    (sum, [id, quantity]) =>
      sum + products[id].price * quantity, 0
  );

  if (total === 0) {
    showMessage("سبد خرید خالی است؛ اول غذا انتخاب کن.");
    return;
  }

  showMessage(
    `سفارش شما آماده است. مبلغ قابل پرداخت: ${formatPrice(total)}. پرداخت آنلاین هنوز فعال نیست.`
  );
});

updateCart();
