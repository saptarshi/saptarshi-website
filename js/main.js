var globals_not = {};
// Auto-show/hide bottom-nav and header
var bottom_nav = document.querySelector(".bottom-nav");
var headroom = new Headroom(bottom_nav);
headroom.init();

//Initialize headers
countHeaders();
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

  for(var i = array.length; i > 0 ; i--) {
    if(member > array[i-1]) {
      return q_position  = i;
    }
  }
  return q_position;
}


function countHeaders() {
    var headers = $('.js-header');
    var header_scroll_pos = [];
    for(var i = 0; i< headers.length; i++) {
      header_scroll_pos.push($(headers[i]).offset().top - 22);
    }
    globals_not['header_scroll_pos'] = header_scroll_pos;
    globals_not['headers'] = headers;
}
var fixHeader = debounce(function() {
    var current_scroll = $(window).scrollTop(),
        q_pos = findQPosition(current_scroll, globals_not.header_scroll_pos);
    if(q_pos !== -1) {
        console.log('Q position:' + q_pos);
        var org_name = $(globals_not.headers[q_pos-1]).find('.org-name').text(),
            org_year = $(globals_not.headers[q_pos-1]).find('.org-year').text();
        $('.floating-header .org-name').text(org_name);
        $('.floating-header .org-year').text(org_year);
        $('.floating-header').addClass('appear');
    } else {
      $('.floating-header').removeClass('appear');
    }
}, 100);

$(window).on('scroll', fixHeader);
