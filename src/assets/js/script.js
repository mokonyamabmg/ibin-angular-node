
$(document).ready(function(){
  footerAlign();
  // header
// $("#menu-button").click(function(){
//   $(this).toggleClass("active");
//   $("#line-1").toggleClass("active");
//   $("#line-2").toggleClass("active");
//   $("#line-3").toggleClass("active");
//   $("#menu").slideToggle("slow");
// });


// function toggleIcon(e) {
//   $(e.target)
//       .prev('.panel-heading')
//       .find(".more-less")
//       .toggleClass('glyphicon-plus glyphicon-minus');
// }
// $('.panel-group').on('hidden.bs.collapse', toggleIcon);
// $('.panel-group').on('shown.bs.collapse', toggleIcon);


});


$(function() {
  var href = window.location.href;
  $('p a').each(function(e,i) {
    if (href.indexOf($(this).attr('href')) >= 0) {
      $(this).addClass('mule');
    }
  });

  $('li a').each(function(e,i) {
    if (href.indexOf($(this).attr('href')) >= 0) {
      $(this).addClass('auth');
    }
  });
});


function footerAlign() {
  $('footer').css('height', 'auto');
  var footerHeight = $('footer').outerHeight();
  $('body').css('padding-bottom', footerHeight);
  $('footer').css('height', footerHeight);
}

