
const products = {
  burger: { name: "برگر مخصوص", price: 8, input: "qty-burger" },
  pizza: { name: "پیتزا مخصوص", price: 12, input: "qty-pizza" },
  fries: { name: "سیب‌زمینی سرخ‌کرده", price: 4, input: "qty-fries" }
};

const cart = {};
const money = number => number.toLocaleString("fa-IR");

const cartButton = document.getElementById("cart-button");
const cartSection = document.getElementById("cart-section");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const summaryCount = document.getElementById("summary-count");
const cartSummary = document.getElementById("cart-summary");
const toast = document.getElementById("toast");

let toastTimer;

function showMessage(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function getTotalQuantity() {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

function getTotalPrice() {
  return Object.entries(cart).reduce((sum, [id, quantity]) => {
    return sum + products[id].price * quantity;
  }, 0);
}

function openCart() {
  cartSection.hidden = false;
  renderCart();

  cartSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function closeCart() {
  cartSection.hidden = true;
  document.getElementById("menu").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

document.querySelectorAll(".add-button").forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.product;
    const input = document.getElementById(products[id].input);
    const quantity = Number(input.value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      showMessage("تعداد باید عددی بین ۱ تا ۹۹ باشد.");
      input.focus();
      return;
    }

    const newQuantity = (cart[id] || 0) + quantity;

    if (newQuantity > 99) {
      showMessage("حداکثر تعداد هر غذا ۹۹ عدد است.");
      return;
    }

    cart[id] = newQuantity;

    renderCart();
    showMessage(`${products[id].name} به سبد خرید اضافه شد.`);
  });
});

function renderCart() {
  const totalQuantity = getTotalQuantity();
  const totalPrice = getTotalPrice();

  cartCount.textContent = money(totalQuantity);
  cartTotal.textContent = money(totalPrice);
  summaryCount.textContent = money(totalQuantity);

  cartItems.replaceChildren();

  if (totalQuantity === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-cart";

    const emoji = document.createElement("span");
    emoji.textContent = "🛒";

    const message = document.createElement("p");
    message.textContent = "سبد خریدت خالی است. از منو یک غذا انتخاب کن!";

    empty.append(emoji, message);
    cartItems.appendChild(empty);
    cartSummary.hidden = true;
    return;
  }

  cartSummary.hidden = false;

  Object.entries(cart).forEach(([id, quantity]) => {
    if (quantity <= 0) return;

    const product = products[id];
    const row = document.createElement("div");
    row.className = "cart-row";

    const details = document.createElement("div");

    const name = document.createElement("div");
    name.className = "cart-product-name";
    name.textContent = product.name;

    const unitPrice = document.createElement("div");
    unitPrice.className = "cart-product-price";
    unitPrice.textContent = `قیمت هر عدد: ${money(product.price)} یورو`;

    const controls = document.createElement("div");
    controls.className = "cart-controls";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", "کم کردن تعداد");

    minus.addEventListener("click", () => {
      cart[id]--;

      if (cart[id] <= 0) {
        delete cart[id];
      }

      renderCart();
    });

    const qty = document.createElement("span");
    qty.textContent = `${money(quantity)} عدد`;

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", "زیاد کردن تعداد");

    plus.addEventListener("click", () => {
      if (cart[id] >= 99) {
        showMessage("حداکثر تعداد این غذا ۹۹ عدد است.");
        return;
      }

      cart[id]++;
      renderCart();
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-button";
    remove.textContent = "حذف";

    remove.addEventListener("click", () => {
      delete cart[id];
      renderCart();
      showMessage("غذا از سبد خرید حذف شد.");
    });

    controls.append(minus, qty, plus, remove);
    details.append(name, unitPrice, controls);

    const lineTotal = document.createElement("div");
    lineTotal.className = "cart-row-total";
    lineTotal.textContent =
      `${money(product.price * quantity)} €`;

    row.append(details, lineTotal);
    cartItems.appendChild(row);
  });
}

cartButton.addEventListener("click", () => {
  if (cartSection.hidden) {
    openCart();
  } else {
    closeCart();
  }
});

document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("back-to-menu").addEventListener("click", closeCart);

document.getElementById("clear-cart").addEventListener("click", () => {
  Object.keys(cart).forEach(id => delete cart[id]);
  renderCart();
  showMessage("سبد خرید خالی شد.");
});

document.getElementById("checkout-button").addEventListener("click", () => {
  if (getTotalQuantity() === 0) {
    showMessage("سبد خریدت خالی است.");
    return;
  }

  alert(
    "این بخش هنوز به درگاه پرداخت وصل نشده است.\n" +
    "مبلغ سفارش: " + money(getTotalPrice()) + " یورو\n\n" +
    "فعلاً هیچ پرداختی انجام نمی‌شود."
  );
});

renderCart();
