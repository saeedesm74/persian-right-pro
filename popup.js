const toggleEnabled = document.getElementById("toggleEnabled");
const copyBtn = document.getElementById("copyBtn");
const copyText = document.getElementById("copyText");
const cardNumber = document.getElementById("cardNumber");

// بارگذاری تنظیمات
chrome.storage.sync.get(["enabled"], (res) => {
  toggleEnabled.checked = res.enabled !== false;
});

// ذخیره تغییرات
toggleEnabled.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggleEnabled.checked });
});

// کپی شماره کارت
copyBtn.addEventListener("click", () => {
  const num = cardNumber.textContent.replace(/\s/g, "");
  navigator.clipboard.writeText(num).then(() => {
    copyText.textContent = "کپی شد ✓";
    setTimeout(() => { copyText.textContent = "کپی شماره کارت"; }, 1500);
  });
});
