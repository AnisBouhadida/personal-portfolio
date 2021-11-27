// Add smooth scrolling
$(function () {
  $("#toAboutMe").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

// Form submition

// Defining the sendMail method that calls the FetchAPI to send data to back-end
const sendMail = (mail) => {
  fetch("/contact", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
};

// Adding the event listener
const form = document.getElementById("contact-form");
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  let mail = new FormData(form);

  sendMail(mail);
});

$(".tech-grid").hover(
  function () {
    $(this).addClass("shadow");
  },
  function () {
    $(this).removeClass("shadow");
  }
);
