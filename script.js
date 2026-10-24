const $ = (selector) => document.querySelector(selector);

const money = (value) => `€${value.toFixed(2)}`;

const productsData = [
  {
    id: 1,
    name: "برگر کلاسیک",
    price: 5.99,
    description: "گوشت گریل‌شده، پنیر چدار، کاهو، گوجه و سس مخصوص.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2,
    name: "سیب‌زمینی سرخ‌شده",
    price: 2.99,
    description: "سیب‌زمینی طلایی، ترد و تازه، همراه با ادویه مخصوص.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3,
    name: "نوشابه خنک",
    price: 2.50,
    description: "نوشیدنی خنک برای کامل‌شدن تجربه غذای شما.",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4,
    name: "دسر شکلاتی",
    price: 4.50,
    description: "کیک شکلاتی غنی با بافت نرم و طعمی فراموش‌نشدنی.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85"
  }
];

const cart = new Map();
let selectedProduct = null;
let quantity = 1;

const sceneFrames = [
  {
    selector: ".exterior",
    number: "01",
    eyebrow: "THE ENTRANCE",
    title: "به رستوران نزدیک شوید",
    description: "ماجراجویی خوشمزه شما از همین‌جا شروع می‌شود."
  },
  {
    selector: ".doorway",
    number: "02",
    eyebrow: "STEP INSIDE",
    title: "درها را باز کنید",
    description: "نور گرم، عطر غذا و یک فضای متفاوت."
  },
  {
    selector: ".interior",
    number: "03",
    eyebrow: "THE EXPERIENCE",
    title: "وارد دنیای طعم شوید",
    description: "جایی برای لذت‌بردن از لحظه‌ها و طعم‌های تازه."
  },
  {
    selector: ".counter",
    number: "04",
    eyebrow: "FRESHLY MADE",
    title: "انتخاب خوشمزه تو",
    description: "غذای مورد علاقه‌ات را انتخاب کن و سفارش بده."
  }
];

/* ساخت کارت‌های منو */
function renderProducts() {
  $("#products").innerHTML = productsData.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
      </div>
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">${money(product.price)}</span>
          <button
            class="add-button"
            data-product="${product.id}"
            aria-label="مشاهده ${product.name}"
          >+</button>
        </div>
      </div>
    </article>
  `).join("");
}

/* افکت حرکت دوربین */
const journey = $(".journey");
const frames = sceneFrames.map(frame => ({
  ...frame,
  element: $(frame.selector)
}));

const clamp = (value, min, max) =>
  Math.min(max, Math.max(min, value));

function smoothstep(value) {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

let ticking = false;

function updateJourney() {
  ticking = false;

  if (!journey) return;

  const rect = journey.getBoundingClientRect();
  const totalTravel = journey.offsetHeight - window.innerHeight;

  if (totalTravel <= 0) return;

  const progress = clamp(-rect.top / totalTravel, 0, 1);
  const position = progress * (frames.length - 1);

  frames.forEach((frame, index) => {
    const distance = position - index;
    const opacity = 1 - smoothstep(Math.abs(distance));

    // حرکت نرم و نزدیک‌شدن دوربین به تصویر بعدی
    const zoom = 1.04 + clamp(distance + 0.5, 0, 1) * 0.17;
    const drift = clamp(distance, -1, 1) * 2.5;

    frame.element.style.opacity = opacity.toFixed(3);
    frame.element.style.transform =
      `scale(${zoom}) translate3d(0, ${drift}%, 0)`;

    // تغییر ظریف روشنایی در طول حرکت
    frame.element.style.filter =
      `brightness(${0.78 + opacity * 0.22})`;
  });

  const activeIndex = Math.min(
    Math.floor(position + 0.5),
    frames.length - 1
  );

  const activeFrame = frames[activeIndex];

  $("#stepNumber").textContent = activeFrame.number;
  $("#sceneEyebrow").textContent = activeFrame.eyebrow;
  $("#sceneTitle").textContent = activeFrame.title;
  $("#sceneDescription").textContent = activeFrame.description;
  $("#progressBar").style.width = `${progress * 100}%`;
}

function requestJourneyUpdate() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(updateJourney);
}

window.addEventListener("scroll", requestJourneyUpdate, { passive: true });
window.addEventListener("resize", requestJourneyUpdate);
updateJourney();

/* پنجره جزئیات محصول */
function openProduct(id) {
  selectedProduct = productsData.find(product => product.id === id);
  if (!selectedProduct) return;

  quantity = 1;

  $("#modalImage").src = selectedProduct.image;
  $("#modalImage").alt = selectedProduct.name;
  $("#modalTitle").textContent = selectedProduct.name;
  $("#modalDescription").textContent = selectedProduct.description;
  $("#modalPrice").textContent = money(selectedProduct.price);
  $("#qtyValue").textContent = quantity;

  $("#productBackdrop").classList.add("open");
}

$("#products").addEventListener("click", event => {
  const button = event.target.closest("[data-product]");
  if (!button) return;

  openProduct(Number(button.dataset.product));
});

$("#qtyMinus").addEventListener("click", () => {
  quantity = Math.max(1, quantity - 1);
  $("#qtyValue").textContent = quantity;
});

$("#qtyPlus").addEventListener("click", () => {
  quantity = Math.min(99, quantity + 1);
  $("#qtyValue").textContent = quantity;
});

/* افزودن محصول به سبد */
$("#addToCart").addEventListener("click", () => {
  if (!selectedProduct) return;

  const id = selectedProduct.id;
  const existing = cart.get(id);

  cart.set(id, {
    product: selectedProduct,
    quantity: Math.min(99, (existing?.quantity || 0) + quantity)
  });

  closeModal("productBackdrop");
  renderCart();
});

/* رندر سبد خرید */
function renderCart() {
  const items = [...cart.values()];

  const count = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  $("#cartCount").textContent = count;
  $("#cartTotal").textContent = money(total);

  if (items.length === 0) {
    $("#cartItems").innerHTML =
      '<p style="color:#aaa;text-align:center;padding:25px 0">سبد خرید شما خالی است.</p>';
    return;
  }

  $("#cartItems").innerHTML = items.map(({ product, quantity }) => `
    <div class="cart-row">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3>${product.name}</h3>
        <small>${money(product.price * quantity)}</small>
        <div class="cart-qty">
          <button data-action="minus" data-id="${product.id}" aria-label="کم کردن">−</button>
          <span>${quantity}</span>
          <button data-action="plus" data-id="${product.id}" aria-label="زیاد کردن">+</button>
        </div>
      </div>
      <button class="remove-item" data-action="remove" data-id="${product.id}" aria-label="حذف محصول">×</button>
    </div>
  `).join("");
}

$("#cartItems").addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const item = cart.get(id);
  if (!item) return;

  switch (button.dataset.action) {
    case "plus":
      item.quantity = Math.min(99, item.quantity + 1);
      break;

    case "minus":
      item.quantity -= 1;
      if (item.quantity <= 0) cart.delete(id);
      break;

    case "remove":
      cart.delete(id);
      break;
  }

  renderCart();
});

/* باز و بسته‌کردن پنجره‌ها */
function closeModal(id) {
  $(`#${id}`).classList.remove("open");
}

$("#openCart").addEventListener("click", () => {
  renderCart();
  $("#cartBackdrop").classList.add("open");
});

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    closeModal(button.dataset.close);
  });
});

document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
  backdrop.addEventListener("click", event => {
    if (event.target === backdrop) {
      backdrop.classList.remove("open");
    }
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal-backdrop").forEach(modal => {
      modal.classList.remove("open");
    });
  }
});

$("#checkout").addEventListener("click", () => {
  alert("این نسخه نمایشی است. برای ثبت سفارش واقعی، باید سیستم سفارش و پرداخت متصل شود.");
});

renderProducts();
renderCart();
