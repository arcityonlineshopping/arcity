const CART_KEY = "arcity_cart_v1";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(item) {
  const cart = getCart();

  // Same product + same image + same size => increase qty
  const existing = cart.find(
    (x) => x.id === item.id && x.img === item.img && x.size === item.size
  );

  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });

  saveCart(cart);
  alert(`${item.name} (Size ${item.size}) added ✅`);
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;

  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  el.textContent = totalQty > 0 ? `(${totalQty})` : "";
}

document.addEventListener("click", (e) => {
  const img = e.target.closest(".product-images img");
  if (!img) return;

  const wrap = img.closest(".product-images");
  const card = img.closest(".product-card");
  if (!wrap || !card) return;

  const sizeSelect = card.querySelector(".size-select");
  const chosenSize = sizeSelect ? sizeSelect.value : "";

  if (!chosenSize) {
    alert("Please select a size first 👟");
    return;
  }

  const id = wrap.dataset.id;
  const name = wrap.dataset.name;
  const price = Number(wrap.dataset.price);
  const imgPath = img.dataset.img || img.getAttribute("src");

  addToCart({
    id,
    name,
    price,
    img: imgPath,
    size: chosenSize
  });
});

updateCartCount();
