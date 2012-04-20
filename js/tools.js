// MODAL WINDOW FUNCTION -- requires: <a class="dialog">link</a>
(function($) {
  $('a.dialog').live('click', function() {
    $(this).loadDialog();
    return false;
  });

  // Add the loadDialog() function to any jQuery element. This adds all of the
  // dialog-related HTML to the DOM, binds the close events, and adds the iframe.
  // See my comments below for an alternative to the iframe technique.
  $.fn.loadDialog = function() {
    $('body').append('<div id="modal" style="display:none;">'+
      '<div class="window" id="dialog">'+
      '<a class="close" title="Close Window">Click to close</a>'+
      '<span class="null" id="dialog-content">'+
      '<iframe id="modal-iframe" frameborder="0" scrolling="no" '+
      'src="'+this.attr('href').replace(/[^\/]+\.aspx/, 'box.aspx') + '" />'+
      '</span></div><div id="mask" />'+
    '</div>');

    $('#modal').show();
    $('#mask').css({
      'height': $(window).height(),
      'width':  $(window).width()
      }).fadeTo('slow',0.8);

    $('#dialog').css({
      'top': $(window).height()/2 - $('#dialog').height()/2,
      'left': $(window).width()/2 - $('#dialog').width()/2
    }).fadeIn(100);

    // Instead of leaving the dialog HTML in the DOM after the dialog is closed,
    // I decided to just remove the entire <div id="modal" /> entirely. This
    // removes everything inside also, and leaves the page exactly the way it
    // was before the dialog was opened.
    $('#dialog .close').add('#mask').click(function() {
      $('#modal').remove();
      return this;
    });

    // I'm still not sure if I think the iframe is really necessary, but there might
    // be some funky ektron stuff that I'm not fully understanding.  I would probably
    // do something like this instead:
    // $('#dialog-content').load(url for box.aspx), function() {
    //   ...
    //   show the modal and size it appropriately
    //   fade in animations
    // });
    // The advantage here is that you can wait for the box.aspx content before starting
    // the fade-in animations, ensuring that the modal is not displayed empty.
  }
})(jQuery);