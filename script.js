
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
};
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
};
const hideNavMenu = () => {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
};
cancelBtn.onclick = hideNavMenu;
let navLinks = document.querySelectorAll(".menu li a");
navLinks.forEach((link) => {
  link.addEventListener("click", hideNavMenu);
});
// Sélection des éléments
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const themeIcons = document.querySelectorAll('.theme-icon');
  const htmlElement = document.documentElement;

  // Fonction pour initialiser le thème
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      htmlElement.setAttribute('data-theme', 'dark');
      themeIcons.forEach(icon => icon.innerHTML = '<i class="fa-solid fa-sun"></i>');
      if (themeToggleMobile) themeToggleMobile.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      htmlElement.setAttribute('data-theme', 'light');
      themeIcons.forEach(icon => icon.innerHTML = '<i class="fa-solid fa-moon"></i>');
      if (themeToggleMobile) themeToggleMobile.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  // Fonction pour basculer le thème
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      htmlElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeIcons.forEach(icon => icon.innerHTML = '<i class="fa-solid fa-moon"></i>');
      if (themeToggleMobile) themeToggleMobile.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
      htmlElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeIcons.forEach(icon => icon.innerHTML = '<i class="fa-solid fa-sun"></i>');
      if (themeToggleMobile) themeToggleMobile.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  }

  // Initialiser le thème au chargement
  document.addEventListener('DOMContentLoaded', initTheme);

  // Écouter le clic sur les boutons
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // Écouter les changements de préférence système
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      initTheme();
    }
  });