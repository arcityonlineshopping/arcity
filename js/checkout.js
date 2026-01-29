const CART_KEY = "arcity_cart_v1";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function formatMoney(n) {
  return "R" + Number(n).toLocaleString("en-ZA");
}

function renderOrder() {
  const cart = getCart();
  const summaryEl = document.getElementById("order-summary");
  const totalEl = document.getElementById("order-total");

  if (!summaryEl || !totalEl) return;

  if (cart.length === 0) {
    summaryEl.innerHTML = `<p>Your cart is empty. Go add shoes first.</p>`;
    totalEl.textContent = "";
    return;
  }

  let total = 0;

  summaryEl.innerHTML = cart.map((item) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    return `
      <div style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid #eee;">
        <img src="${item.img}" alt="${item.name}" style="width:64px;height:64px;object-fit:cover;border-radius:12px;border:1px solid #eee;">
        <div style="flex:1;">
          <div style="font-weight:900;">${item.name}</div>
          <div style="color:#555;font-size:13px;">Size: ${item.size || "N/A"} • Qty: ${item.qty}</div>
          <div style="color:#555;font-size:13px;">Image: <span style="font-weight:700;">${item.img}</span></div>
        </div>
        <div style="font-weight:900;">${formatMoney(subtotal)}</div>
      </div>
    `;
  }).join("");

  totalEl.textContent = `Total: ${formatMoney(total)}`;

  // Build text version for email
  const orderLines = cart.map((item, idx) => {
    return [
      `Item ${idx + 1}: ${item.name}`,
      `  Size: ${item.size || "N/A"}`,
      `  Qty: ${item.qty}`,
      `  Price each: ${formatMoney(item.price)}`,
      `  Subtotal: ${formatMoney(item.price * item.qty)}`,
      `  Image: ${item.img}`,
    ].join("\n");
  });

  const orderText =
    `ARCITY ORDER\n\n` +
    orderLines.join("\n\n") +
    `\n\nTOTAL: ${formatMoney(total)}\n`;

  // Put into hidden fields for Formspree submission
  const orderTextInput = document.getElementById("order_text");
  const orderJsonInput = document.getElementById("order_json");

  if (orderTextInput) orderTextInput.value = orderText;
  if (orderJsonInput) orderJsonInput.value = JSON.stringify({ items: cart, total }, null, 2);
}

renderOrder();
