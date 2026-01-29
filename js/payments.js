const sendBtn = document.getElementById("sendProofBtn");

if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    const name = document.getElementById("payerName").value.trim();
    const phoneInput = document.getElementById("payerPhone").value.trim();
    const msg = document.getElementById("payerMsg").value.trim();

    if (!name || !phoneInput) {
      alert("Please enter your name and phone number.");
      return;
    }

    const reference = `${name} ${phoneInput}`;

    const lines = [
      "Hi Arcity 👟",
      "I have made payment for my order.",
      "",
      `Payment Reference: ${reference}`,
      ""
    ];

    if (msg) lines.push(`Message: ${msg}`);

    lines.push("", "I will attach the proof of payment below.");

    const text = encodeURIComponent(lines.join("\n"));

    // SA number in international format
    const whatsappNumber = "27818411130";
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(url, "_blank");
  });
}
