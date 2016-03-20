
var globals_not = {};
$(window).load(function(){
  // Auto-show/hide bottom-nav and header
  var bottom_nav = document.querySelector(".bottom-nav");
  var headroom = new Headroom(bottom_nav);
  headroom.init();

  //Initialize headers
  countHeaders();
});

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function findQPosition(member, array) {
  var q_position = -1;

  for(var i = array.length; i >= 0 ; i--) {
    if(member > array[i-1]) {
      return q_position  = i;
    }
  }
  return q_position;
}


function countHeaders() {
    var $headers = $('.js-header'),
        $window = $(window),
        $document = $(document),
        sticked = [],
        window_height = $window.height(),
        scroll_top = $window.scrollTop(),
        document_height = $document.height(),
        dwh = document_height - window_height,
        extra = (scroll_top > dwh) ? dwh - scroll_top : 0;

    var header_scroll_pos = [];
    for(var i = 0; i< $headers.length; i++) {
      element_top = $($headers[i]).parent().offset().top,
      header_scroll_pos.push(element_top - extra);
    }
    globals_not['header_scroll_pos'] = header_scroll_pos;
    globals_not['headers'] = $headers;
}
var fixHeader = debounce(function() {
    var current_scroll = $(window).scrollTop(),
        q_pos = findQPosition(current_scroll, globals_not.header_scroll_pos);
    if(q_pos !== -1) {
        var org_name = $(globals_not.headers[q_pos-1]).find('.org-name').text(),
            org_year = $(globals_not.headers[q_pos-1]).find('.org-year').text();
        $('.floating-header .org-name').text(org_name);
        $('.floating-header .org-year').text(org_year);
        $('.floating-header').addClass('appear');
    } else {
      $('.floating-header').removeClass('appear');
    }
}, 250);

$(window).on('scroll', fixHeader);
