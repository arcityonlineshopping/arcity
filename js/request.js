// Show "Other color" input only when selected
const otherChk = document.getElementById("otherColorChk");
const otherWrap = document.getElementById("otherColorWrap");

if (otherChk && otherWrap) {
  otherChk.addEventListener("change", () => {
    otherWrap.style.display = otherChk.checked ? "block" : "none";
  });
}

// Build a nice summary for the email
const form = document.getElementById("requestForm");
if (form) {
  form.addEventListener("submit", () => {
    const fd = new FormData(form);

    // Collect checkbox values
    const colors = [];
    form.querySelectorAll('input[name="colors"]:checked').forEach(cb => colors.push(cb.value));

    const summary = [
      `ARCITY ITEM REQUEST`,
      `Name: ${fd.get("name") || ""}`,
      `Phone: ${fd.get("phone") || ""}`,
      `Email: ${fd.get("email") || ""}`,
      `Brand: ${fd.get("brand") || ""}`,
      `Model: ${fd.get("shoe_model") || ""}`,
      `Size: ${fd.get("size") || ""}`,
      `Budget: ${fd.get("budget") || ""}`,
      `Colors: ${colors.join(", ") || "None selected"}`,
      `Other Color: ${fd.get("other_color") || ""}`,
      `Reference Link: ${fd.get("reference_link") || ""}`,
      `Notes: ${fd.get("notes") || ""}`
    ].join("\n");

    const sumInput = document.getElementById("request_summary");
    if (sumInput) sumInput.value = summary;
  });
}
