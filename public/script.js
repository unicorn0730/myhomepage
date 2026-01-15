const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const contactToggle = document.getElementById("contactToggle");
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const copyBtn = document.getElementById("copyBtn");
const message = document.getElementById("message");
const hint = document.getElementById("hint");

function setHint(text){
  if (!hint) return;
  hint.textContent = text;
  window.setTimeout(() => { hint.textContent = ""; }, 1800);
}

function toggleContactForm() {
  if (!contactForm || !contactToggle) return;
  const isHidden = contactForm.classList.toggle("is-hidden");
  contactToggle.setAttribute("aria-expanded", String(!isHidden));
  contactToggle.textContent = isHidden ? "Contact" : "폼 닫기";
  if (!isHidden) {
    (nameInput || message || contactForm).focus();
  }
}

if (contactToggle) {
  contactToggle.addEventListener("click", toggleContactForm);
}

if (copyBtn && message) {
  copyBtn.addEventListener("click", async () => {
    const text = (message.value || "").trim();
    if (!text) return setHint("복사할 내용이 없습니다.");
    const nameValue = (nameInput?.value || "").trim();
    const emailValue = (emailInput?.value || "").trim();
    const lines = [
      nameValue ? `이름: ${nameValue}` : null,
      emailValue ? `답장 이메일: ${emailValue}` : null,
      `메시지:\n${text}`,
    ].filter(Boolean);
    try{
      await navigator.clipboard.writeText(lines.join("\n"));
      setHint("메시지를 클립보드에 복사했습니다.");
    }catch{
      setHint("복사에 실패했습니다. 수동으로 복사해 주세요.");
    }
  });
}
