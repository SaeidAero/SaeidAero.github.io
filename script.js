
"use strict";

// عکس‌های خودت که در پوشه images قرار دارند
const photos = [
  "./images/20261024_214033.jpg",
  "./images/20261024_214039.jpg",
  "./images/20261024_214043.jpg",
  "./images/20261024_214046.jpg",
  "./images/20261024_214051.jpg"
];

// متن هر مرحله از حرکت سینمایی
const scenes = [
  {
    label: "مرحله اول",
    title: "همه‌چیز از<br><span>یک جزئیات</span> شروع می‌شود.",
    description: "اولین نگاه، شروع یک تجربه تازه است."
  },
  {
    label: "مرحله دوم",
    title: "قدم‌به‌قدم،<br><span>نزدیک‌تر</span> شو.",
    description: "هر تصویر، بخشی از داستان توست."
  },
  {
    label: "مرحله سوم",
    title: "زیبایی در<br><span>جزئیات</span> پنهان است.",
    description: "کمی بیشتر بمان و بیشتر کشف کن."
  },
  {
    label: "مرحله چهارم",
    title: "لحظه‌ای برای<br><span>تجربه کردن</span>.",
    description: "داستان تو در حال کامل شدن است."
  },
  {
    label: "مرحله پنجم",
    title: "حالا نوبت<br><span>انتخاب توست.</span>",
    description: "محصول مورد علاقه‌ات را پیدا کن."
  }
];

const imageLayers = Array.from(
  document.querySelectorAll(".journey-image")
);

const sceneLabel = document.getElementById("scene-label");
const sceneTitle = document.getElementById("scene-title");
const sceneDescription = document.getElementById("scene-description");
const sceneNumber = document.getElementById("scene-number");
const progressFill = document.getElementById("progress-fill");

const journey = document.querySelector(".journey");

let currentScene = -1;
let scrollScheduled = false;

// حرکت تصاویر بر اساس میزان اسکرول
function updateJourney() {
  if (!journey || imageLayers.length === 0) return;

  const rect = journey.getBoundingClientRect();
  const scrollableDistance = journey.offsetHeight - window.innerHeight;

  if (scrollableDistance <= 0) return;

  const distanceScrolled = Math.min(
    scrollableDistance,
    Math.max(0, -rect.top)
  );

  const progress = distanceScrolled / scrollableDistance;
  const position = progress * (photos.length - 1);
  const activeIndex = Math.min(
    photos.length - 1,
    Math.floor(position)
  );

  imageLayers.forEach((layer, index) => {
    const distance = Math.abs(position - index);

    // هر تصویر نزدیک به مرحله خودش ظاهر می‌شود
    const opacity = Math.max(0, 1 - distance);

    // بزرگ‌نمایی نرم تصاویر
    const scale = 1.12 - (Math.min(distance, 1) * 0.055);

    layer.style.opacity = opacity.toFixed(3);
    layer.style.transform = `scale(${scale.toFixed(3)})`;
  });

  if (activeIndex !== currentScene) {
    currentScene = activeIndex;

    const scene = scenes[activeIndex];

    sceneLabel.textContent = scene.label;
    sceneTitle.innerHTML = scene.title;
    sceneDescription.textContent = scene.description;
    sceneNumber.textContent = String(activeIndex + 1).padStart(2, "0");
  }

  progressFill.style.width = `${progress * 100}%`;
}

function requestJourneyUpdate() {
  if (scrollScheduled) return;

  scrollScheduled = true;

  requestAnimationFrame(() => {
    updateJourney();
    scrollScheduled = false;
  });
}

window.addEventListener("scroll", requestJourneyUpdate, {
  passive: true
});

window.addEventListener("resize", requestJourneyUpdate);

// محصولات نمایشی سایت
// قیمت‌ها نمونه هستند؛ قبل از استفاده واقعی تغییرشان بده.
const products = [
  {
    id: 1,
    name: "انتخاب شماره یک",
    description: "یک انتخاب ویژه برای شروع تجربه تو.",
    price: 12,
    image: photos[0]
  },
  {
    id: 2,
    name: "انتخاب شماره دو",
    description: "ترکیبی از کیفیت و جزئیات متفاوت.",
    price: 15,
    image: photos[1]
  },
  {
    id: 3,
    name: "انتخاب شماره سه",
    description: "برای لحظه‌هایی که خاص بودن مهم است.",
    price: 18,
    image: photos[2]
  },
  {
    id: 4,
    name: "انتخاب شماره چهار",
    description: "یک پیشنهاد متفاوت برای تو.",
    price: 14,
    image: photos[3]
  },
  {
    id: 5,
    name: "انتخاب شماره پنج",
    description: "آخرین انتخاب این مجموعه.",
    price: 20,
    image: photos[4]
  }
];

const productGrid = document.getElementById("product-grid");
const productModal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const modalAdd = document.getElementById("modal-add");

const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById("cart-count");

let selectedProductId = null;
const cart = new Map();

function formatPrice(value) {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان";
}

function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">${formatPrice(product.price)}</span>
          <div class="product-actions">
            <button
              class="small-button"
              type="button"
              data-view="${product.id}"
            >جزئیات</button>
            <button
              class="small-button"
              type="button"
              data-add="${product.id}"
            >+ افزودن</button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function openProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  selectedProductId = product.id;
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalPrice.textContent = formatPrice(product.price);

  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProduct() {
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const current = cart.get(productId);

  if (current) {
    current.quantity += 1;
  } else {
    cart.set(productId, {
      ...product,
      quantity: 1
    });
  }

  renderCart();
}

function changeQuantity(productId, change) {
  const item = cart.get(productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart.delete(productId);
  }

  renderCart();
}

function renderCart() {
  const items = Array.from(cart.values());

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCountElement.textContent = new Intl.NumberFormat("fa-IR")
    .format(totalQuantity);

  cartTotalElement.textContent = formatPrice(totalPrice);

  if (items.length === 0) {
    cartItemsElement.innerHTML =
      '<p class="empty-cart">سبد خریدت هنوز خالیه.</p>';
    return;
  }

  cartItemsElement.innerHTML = items.map(item => `
    <div class="cart-row">
      <div>
        <h3>${item.name}</h3>
        <p>${formatPrice(item.price * item.quantity)}</p>
      </div>
      <div class="cart-quantity">
        <button type="button" data-minus="${item.id}" aria-label="کم کردن">−</button>
        <span>${new Intl.NumberFormat("fa-IR").format(item.quantity)}</span>
        <button type="button" data-plus="${item.id}" aria-label="زیاد کردن">+</button>
      </div>
    </div>
  `).join("");
}

function openCart() {
  cartPanel.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.classList.add("cart-open");
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.classList.remove("cart-open");
}

// رویدادهای کارت‌های محصول
productGrid.addEventListener("click", event => {
  const viewButton = event.target.closest("[data-view]");
  const addButton = event.target.closest("[data-add]");

  if (viewButton) {
    openProduct(Number(viewButton.dataset.view));
  }

  if (addButton) {
    addToCart(Number(addButton.dataset.add));
  }
});

// افزودن محصول از پنجره جزئیات
modalAdd.addEventListener("click", () => {
  if (selectedProductId !== null) {
    addToCart(selectedProductId);
    closeProduct();
    openCart();
  }
});

// بستن پنجره جزئیات
productModal.addEventListener("click", event => {
  if (event.target.closest("[data-close-modal]")) {
    closeProduct();
  }
});

// باز و بسته کردن سبد خرید
document.querySelector(".cart-link").addEventListener("click", event => {
  event.preventDefault();
  openCart();
});

document.getElementById("cart-close").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// تغییر تعداد محصولات در سبد
cartItemsElement.addEventListener("click", event => {
  const minus = event.target.closest("[data-minus]");
  const plus = event.target.closest("[data-plus]");

  if (minus) {
    changeQuantity(Number(minus.dataset.minus), -1);
  }

  if (plus) {
    changeQuantity(Number(plus.dataset.plus), 1);
  }
});

// این نسخه پرداخت واقعی ندارد
document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.size === 0) {
    alert("اول یک محصول به سبد خرید اضافه کن.");
    return;
  }

  alert("سبد خرید آماده است؛ برای پرداخت واقعی باید سیستم سفارش متصل شود.");
});

// کلید Escape برای بستن پنجره‌ها
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProduct();
    closeCart();
  }
});

// شروع سایت
renderProducts();
renderCart();
updateJourney();
