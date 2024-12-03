// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// navbar fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const toTop = document.querySelector("#toTop");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// hidden hamburger when click anything
window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

// Dark Mode Toggle
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

darkToggle.addEventListener("click", function () {
  // darkToggle.checked ? html.classList.add('dark') : html.classList.remove('dark');
  if (darkToggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

// Change button toggle sesuai dengan mode
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}

// Modal Portfolio
// Get all the img elements in the grid
var images = document.querySelectorAll(".grid img");

// Loop through each img element
images.forEach(function (img) {
  // Add a click event listener to each img element
  img.addEventListener("click", function () {
    showModal(img.src);
  });
});

// Get the modal by id
var modal = document.getElementById("modal");

// Get the modal image tag
var modalImg = document.getElementById("modal-img");

// This function is called when a small image is clicked
function showModal(src) {
  modal.classList.remove("hidden");
  modalImg.src = src;
}

// This function is called when the close button is clicked
function closeModal() {
  modal.classList.add("hidden");
}

// contact form to google sheets
// https://github.com/jamiewilson/form-to-google-sheets?tab=readme-ov-file
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzEgDbFEMrN0iZ6hQExRxehPIDCeqUxJhdUxDosF072toRCb_U3xHdM5JGf9yyXVvt1/exec";
const form = document.forms["submit-to-google-sheet"];
const alertSuccess = document.querySelector(".my-alert");
const btnSend = document.querySelector(".btn-send");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btnSend.setAttribute("disabled", "");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      alertSuccess.classList.toggle("hidden");
      // disabled button send
      btnSend.removeAttribute("disabled");
      // reset input form
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});
