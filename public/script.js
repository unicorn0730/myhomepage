const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const copyBtn = document.getElementById("copyBtn");
const message = document.getElementById("message");
const hint = document.getElementById("hint");

function setHint(text){
  if (!hint) return;
  hint.textContent = text;
  window.setTimeout(() => { hint.textContent = ""; }, 1800);
}

if (copyBtn && message) {
  copyBtn.addEventListener("click", async () => {
    const text = (message.value || "").trim();
    if (!text) return setHint("복사할 내용이 없습니다.");
    try{
      await navigator.clipboard.writeText(text);
      setHint("메시지를 클립보드에 복사했습니다.");
    }catch{
      setHint("복사에 실패했습니다. 수동으로 복사해 주세요.");
    }
  });
}
