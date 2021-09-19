const tween = KUTE.fromTo(
    '#blob-1',
    { path: '#blob-1' },
    { path: '#blob-2' },
    { repeat: 999, duration: 3000, yoyo: true })

tween.start()


$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a#toAboutMe").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});