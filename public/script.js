const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const translations = {
  ko: {
    tagline: "미니멀 · 뉴로모픽 · 개인 홈페이지",
    heroTitle: "안녕하세요, 전장우입니다.",
    heroSubtitle: "포트폴리오와 갤러리, 서비스 소개를 정리할 공간입니다.",
    heroPrimary: "문의하기",
    heroSecondary: "포트폴리오 보기",
    metaFocusLabel: "포커스",
    metaFocusValue: "브랜드/제품 경험 설계",
    metaLocationLabel: "기반",
    metaLocationValue: "Seoul · Remote",
    metaStatusLabel: "상태",
    metaStatusValue: "프로젝트 상담 가능",
    tabPortfolio: "내 포트폴리오",
    tabGallery: "내 갤러리",
    tabProducts: "제품",
    tabServices: "서비스",
    portfolioCard1Title: "대표 프로젝트",
    portfolioCard1Desc: "프로젝트 요약 및 성과 지표를 여기에 배치하세요.",
    portfolioCard2Title: "케이스 스터디",
    portfolioCard2Desc: "문제 정의, 접근 방식, 결과를 간결하게 소개하세요.",
    galleryCard1Title: "이미지 컬렉션",
    galleryCard1Desc: "작업물 이미지 또는 촬영 사진을 추가할 섹션입니다.",
    galleryCard2Title: "비하인드 씬",
    galleryCard2Desc: "프로세스, 스케치, 영감을 담는 공간으로 활용하세요.",
    productsCard1Title: "제품 라인업",
    productsCard1Desc: "제품의 핵심 가치와 특징을 짧게 소개하세요.",
    productsCard2Title: "출시 예정",
    productsCard2Desc: "다가오는 업데이트나 신제품 정보를 배치하세요.",
    servicesCard1Title: "제공 서비스",
    servicesCard1Desc: "컨설팅, 디자인, 개발 등 제공 가능한 서비스를 정리하세요.",
    servicesCard2Title: "협업 방식",
    servicesCard2Desc: "프로젝트 진행 흐름이나 일정 예시를 추가하세요.",
    placeholder: "준비 중",
    contactTitle: "연락",
    contactDesc: "프로젝트 문의나 협업 제안은 이메일로 보내 주세요.",
    contactButton: "이메일 보내기",
    contactNote: "도메인만 변경하면 바로 사용 가능합니다.",
    backToTop: "맨 위로",
    themeLight: "밝게",
    themeDark: "어둡게",
  },
  en: {
    tagline: "Minimal · Neuromorphic · Personal Hub",
    heroTitle: "Hello, I'm Jangwoo Jeon.",
    heroSubtitle: "A space to organize portfolio, gallery, and service highlights.",
    heroPrimary: "Contact",
    heroSecondary: "View portfolio",
    metaFocusLabel: "Focus",
    metaFocusValue: "Brand & product experience",
    metaLocationLabel: "Based",
    metaLocationValue: "Seoul · Remote",
    metaStatusLabel: "Status",
    metaStatusValue: "Open for projects",
    tabPortfolio: "My portfolio",
    tabGallery: "My gallery",
    tabProducts: "Products",
    tabServices: "Services",
    portfolioCard1Title: "Featured project",
    portfolioCard1Desc: "Place a short summary and impact metrics here.",
    portfolioCard2Title: "Case studies",
    portfolioCard2Desc: "Highlight the problem, approach, and outcome.",
    galleryCard1Title: "Image collection",
    galleryCard1Desc: "Add project visuals or photography here.",
    galleryCard2Title: "Behind the scenes",
    galleryCard2Desc: "Share process shots, sketches, and inspiration.",
    productsCard1Title: "Product lineup",
    productsCard1Desc: "Describe the core value and features of products.",
    productsCard2Title: "Coming soon",
    productsCard2Desc: "Share upcoming updates or new releases.",
    servicesCard1Title: "Services",
    servicesCard1Desc: "Outline consulting, design, or development services.",
    servicesCard2Title: "How we collaborate",
    servicesCard2Desc: "Explain workflow steps or timeline examples.",
    placeholder: "Placeholder",
    contactTitle: "Contact",
    contactDesc: "Send project inquiries or collaboration ideas by email.",
    contactButton: "Send email",
    contactNote: "Update the domain and it is ready to use.",
    backToTop: "Back to top",
    themeLight: "Light",
    themeDark: "Dark",
  },
};

const langButtons = document.querySelectorAll("[data-lang]");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.getElementById("themeLabel");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");

let currentLang = localStorage.getItem("lang") || "ko";
let currentTheme = localStorage.getItem("theme");

if (!currentTheme) {
  currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateTranslations(){
  const dict = translations[currentLang] || translations.ko;
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  if (themeLabel) {
    themeLabel.textContent = currentTheme === "dark" ? dict.themeDark : dict.themeLight;
  }
}

function setLanguage(lang){
  currentLang = lang;
  localStorage.setItem("lang", lang);
  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
  updateTranslations();
}

function setTheme(theme){
  currentTheme = theme;
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "🌙" : "☀️";
  }
  updateTranslations();
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

function setActiveTab(tabId){
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tabId);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

setTheme(currentTheme);
setLanguage(currentLang);
setActiveTab(tabButtons[0]?.dataset.tab || "portfolio");
