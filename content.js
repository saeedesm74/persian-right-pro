// اعمال خودکار راست‌به‌چپ و فونت فارسی روی چت‌بات‌های هوش مصنوعی
// نکته: این اسکریپت فقط روی دامنه‌های تعریف‌شده در manifest.json (content_scripts.matches) اجرا می‌شود

let isEnabled = true;

function applyRTL() {
  if (!document.documentElement.classList.contains("prp-rtl-active")) {
    document.documentElement.classList.add("prp-rtl-active");
  }
}

function removeRTL() {
  document.documentElement.classList.remove("prp-rtl-active");
}

function init() {
  chrome.storage.sync.get(["enabled"], (res) => {
    isEnabled = res.enabled !== false;

    if (isEnabled) {
      applyRTL();
    }

    // گوش‌دادن به تغییرات تنظیمات از پاپ‌آپ
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.enabled) {
        isEnabled = changes.enabled.newValue;
        isEnabled ? applyRTL() : removeRTL();
      }
    });
  });
}

// اجرای امن پس از لود DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}