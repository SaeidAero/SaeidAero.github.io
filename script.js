
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Arial, Tahoma, sans-serif;
  color: #29251f;
  background: #fffaf4;
  line-height: 1.7;
}

button,
input {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

button {
  cursor: pointer;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid #f0e5da;
  padding: 12px 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: inherit;
  text-decoration: none;
}

.brand-icon {
  font-size: 36px;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-size: 19px;
}

.brand small {
  color: #82776c;
  font-size: 12px;
}

.cart-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #29251f;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 15px;
  font-weight: bold;
}

.cart-badge {
  background: #f6b83f;
  color: #29251f;
  border-radius: 50px;
  min-width: 25px;
  padding: 0 6px;
  text-align: center;
}

.hero {
  padding: 65px 20px;
  text-align: center;
  background: linear-gradient(135deg, #fff0d5, #ffe1b4);
}

.hero-label {
  display: inline-block;
  padding: 5px 13px;
  background: white;
  border-radius: 30px;
  color: #a64222;
  font-size: 13px;
  font-weight: bold;
}

.hero h1 {
  margin: 16px 0 8px;
  font-size: clamp(28px, 5vw, 44px);
  line-height: 1.4;
}

.hero p {
  color: #65574a;
  margin: 0 auto 22px;
}

.menu-link {
  display: inline-block;
  background: #a92d22;
  color: white;
  text-decoration: none;
  padding: 11px 24px;
  border-radius: 10px;
  font-weight: bold;
}

.menu-section {
  max-width: 1120px;
  padding: 38px 18px;
  margin: auto;
}

.menu-section > h2,
.section-description {
  text-align: center;
}

.menu-section > h2 {
  font-size: 28px;
  margin-bottom: 0;
}

.section-description {
  color: #81766b;
  margin-top: 4px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 22px;
  margin-top: 28px;
}

.product-card {
  background: #fff;
  border: 1px solid #f0e6dc;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 5px 20px #59391b0c;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px #59391b18;
}

.image-wrap {
  position: relative;
  height: 205px;
  background: #f6e7d5;
  overflow: hidden;
}

.image-wrap img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.image-fallback {
  display: none;
  place-items: center;
  width: 100%;
  height: 100%;
  font-size: 80px;
  background: linear-gradient(135deg, #ffe5bd, #f6c78c);
}

.product-info {
  padding: 17px;
}

.food-tag {
  display: inline-block;
  background: #fff0d8;
  color: #9c4a19;
  padding: 2px 9px;
  border-radius: 20px;
  font-size: 12px;
}

.product-info h3 {
  margin: 8px 0 3px;
  font-size: 19px;
}

.product-info p {
  color: #82776c;
  font-size: 13px;
  margin: 0 0 15px;
}

.product-bottom {
  display: grid;
  grid-template-columns: auto 1fr 65px;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.price {
  color: #a92d22;
  font-size: 21px;
  white-space: nowrap;
}

.quantity-label {
  font-size: 13px;
  color: #6c6258;
}

.product-bottom input {
  width: 65px;
  min-width: 0;
  padding: 8px 4px;
  text-align: center;
  border: 1px solid #e2d7cb;
  border-radius: 8px;
  background: #fffdfb;
}

.add-button,
.checkout-button {
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-weight: bold;
  transition: background 0.2s;
}

.add-button {
  background: #20834c;
  color: white;
}

.add-button:hover {
  background: #17683b;
}

.cart-section {
  max-width: 800px;
  margin: 10px auto 45px;
  padding: 22px;
  background: white;
  border: 1px solid #eee2d6;
  border-radius: 18px;
  box-shadow: 0 8px 30px #59391b10;
  scroll-margin-top: 90px;
}

.cart-section[hidden],
.cart-summary[hidden] {
  display: none !important;
}

.cart-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.cart-heading h2 {
  margin: 0;
}

.cart-heading .section-description {
  text-align: right;
  margin-bottom: 12px;
}

.icon-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #f5eee7;
}

.empty-cart {
  padding: 24px 10px;
  text-align: center;
  color: #82776c;
  background: #fffaf5;
  border-radius: 12px;
}

.empty-cart span {
  display: block;
  font-size: 42px;
  margin-bottom: 8px;
}

.cart-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #f0e7de;
}

.cart-product-name {
  font-weight: bold;
}

.cart-product-price {
  color: #8c7d70;
  font-size: 13px;
}

.cart-row-total {
  font-weight: bold;
  color: #a92d22;
  text-align: left;
  white-space: nowrap;
}

.cart-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.cart-controls button {
  min-width: 32px;
  min-height: 32px;
  border: none;
  border-radius: 7px;
  background: #f3eee8;
}

.cart-controls .remove-button {
  padding: 4px 10px;
  color: #a92d22;
}

.cart-summary {
  padding-top: 18px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 7px 0;
}

.total-line {
  border-top: 1px solid #eee2d6;
  margin-top: 8px;
  padding-top: 15px;
  font-size: 22px;
}

.total-line strong {
  color: #a92d22;
}

.checkout-button {
  margin-top: 14px;
  background: #20834c;
  color: white;
}

.checkout-button:hover {
  background: #17683b;
}

.clear-button,
.back-button {
  width: 100%;
  padding: 11px;
  margin-top: 10px;
  border-radius: 10px;
  background: white;
  border: 1px solid #e3d6c9;
}

.clear-button {
  color: #a92d22;
}

.back-button {
  color: #51463b;
}

footer {
  padding: 22px;
  background: #29251f;
  color: #eee4d8;
  text-align: center;
  font-size: 13px;
}

.toast {
  position: fixed;
  z-index: 20;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 20px);
  width: max-content;
  max-width: calc(100% - 32px);
  padding: 12px 18px;
  border-radius: 12px;
  background: #29251f;
  color: white;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
  text-align: center;
}

.toast.show {
  opacity: 1;
  transform: translate(-50%, 0);
}

@media (max-width: 480px) {
  .header {
    padding: 10px 12px;
  }

  .brand-icon {
    font-size: 29px;
  }

  .brand strong {
    font-size: 16px;
  }

  .cart-button {
    padding: 9px 10px;
    font-size: 13px;
  }

  .hero {
    padding: 48px 18px;
  }

  .products {
    grid-template-columns: 1fr;
  }

  .image-wrap {
    height: 220px;
  }

  .cart-section {
    margin: 10px 12px 35px;
    padding: 16px;
  }
}
