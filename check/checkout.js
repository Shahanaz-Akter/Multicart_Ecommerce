


// Get the modal
let modal = document.getElementById("checkoutModal");

// Get the button that opens the modal
let btn = document.getElementById("checkoutOpenBtn");


// When the user clicks on the button, open the modal
btn.onclick = function () {
  console.log(modal.style);
  modal.style.display = "";
};

let checkoutNone = () => {
  modal.style.display = "none";
};

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it

// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// javaScript for dropdown menu
// for dropdown option
let dropdowns = document.querySelectorAll(".checkoutDropdown");

dropdowns.forEach((dropdown) => {
  let select = dropdown.querySelector(".select");
  let caret = dropdown.querySelector(".caret");
  let menu = dropdown.querySelector(".menu");
  let options = dropdown.querySelectorAll(".menu li");
  let selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      if (selected.innerText == option.innerText) {
        if (selected.innerText == "State/Province") {
          document.getElementById("textColoSet").style.color = "#9b9c9d";
        } else {
          document.getElementById("textColoSet").style.color = "black";
        }
      }
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");

      options.forEach((option) => {
        option.classList.remove("active");
      });

      option.classList.add("active");
    });
  });
});

// for country code  option
// for country code  option
let codeDropdowns = document.querySelectorAll(".phoneDropdown");

codeDropdowns.forEach((dropdown) => {
  let select = dropdown.querySelector(".countrySelect");
  let caret = dropdown.querySelector(".countryCaret");
  let menu = dropdown.querySelector(".countryMenu");
  let options = dropdown.querySelectorAll(".countryMenu li");
  let selected = dropdown.querySelector(".countrySelected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.toggle("menu-open");

      options.forEach((option) => {
        option.classList.remove("active");
      });

      option.classList.add("active");
    });
  });
});

// scroll bar

var $doc = $("#createScroll");
var $win = $(window);
var itemstoshow = 5;

$(".infinite")
  .filter(function (index) {
    return $(this).offset().top > $win.height();
  })
  .hide();

$(window).scroll(function () {
  if ($doc.height() - $win.height() - $(this).scrollTop() == 0) {
    $(".infinite:hidden:lt(" + itemstoshow + ")").show();
  }
});

// mediaQuery and responsive
let ovearflows = document.querySelectorAll(".addCardText p");

const mediaQuery1300 = window.matchMedia("(max-width: 1300px)");

ovearflows.forEach((ovearflow) => {
  if (ovearflow.innerHTML.length > 90) {
    ovearflow.textContent = ovearflow.textContent.slice(0, 90) + " .";
  }

  if (mediaQuery1300.matches) {
    console.log("match");
    if (ovearflow.innerHTML.length > 71) {
      ovearflow.textContent = ovearflow.textContent.slice(0, 71) + " .";
    }
  }
});

const mediaQuery750 = window.matchMedia("(max-width: 750px)");

if (mediaQuery750.matches) {
  let phoneModal = document.getElementById("phoneModal");
  let phone_2nd = document.getElementById("phone_2nd");
  let phone_1st = document.getElementById("phone_1st");
  phoneModal.insertBefore(phone_1st, phone_2nd);
}
