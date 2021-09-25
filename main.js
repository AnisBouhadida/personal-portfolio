// add blob animation
const tween = KUTE.fromTo(
  '#blob-1',
  { path: '#blob-1' },
  { path: '#blob-2' },
  { repeat: 999, duration: 3000, yoyo: true })

tween.start()


// Add smooth scrolling
$(document).ready(function () {
  $("a#toAboutMe").on('click', function (event) {

    if (this.hash !== "") {

      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        window.location.hash = hash;
      });
    }
  });
});