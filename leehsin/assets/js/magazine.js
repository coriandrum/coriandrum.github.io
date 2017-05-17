/*
 * Magazine sample
 */

function addPage(page, book) {
  var id, pages = book.turn('pages');
  // Create a new element for this page
  var element = $('<div />', {});
  // Add the page to the flipbook
  if (book.turn('addPage', element, page)) {
    // Add the initial HTML
    // It will contain a loader indicator and a gradient
    element.html('<div class="gradient"></div><div class="loader"></div>');
    // Load the page
    loadPage(page, element);
  }
}

function loadPage(page, pageElement) {
  // Create an image element
  var img = $('<img />');
  img.mousedown(function(e) {
    e.preventDefault();
  });
  img.load(function() {
    // Set the size
    $(this).css({ width: '100%', height: '100%' });
    // Add the image to the page after loaded
    $(this).appendTo(pageElement);
    // Remove the loader indicator
    pageElement.find('.loader').remove();
  });
  loadRegions(page , pageElement);
  page = padLeft(page-1, 3);
  // Load the page
  img.attr('src', 'assets/pages/normal/' + page + '.jpg');
}

// Zoom in / Zoom out

function zoomTo(event) {
  setTimeout(function() {
    if ($('.magazine-viewport').data().regionClicked) {
      $('.magazine-viewport').data().regionClicked = false;
    } else {
      if ($('.magazine-viewport').zoom('value') == 1) {
        $('.magazine-viewport').zoom('zoomIn', event);
      } else {
        $('.magazine-viewport').zoom('zoomOut');
      }
    }
  }, 1);
}

var regionDataNormal = [
  //mainTitle
  { "x": 24, "y": 25, "width": 335, "height": 16, "class":"to-page", "data": { "page": 4 } },
  { "x": 24, "y": 78, "width": 335, "height": 16, "class":"to-page", "data": { "page": 6 } },
  { "x": 24, "y":452, "width": 335, "height": 16, "class":"to-page", "data": { "page": 20 } },
  { "x": 24, "y":610, "width": 335, "height": 16, "class":"to-page", "data": { "page": 25 } },
  { "x": 24, "y":650, "width": 335, "height": 16, "class":"to-page", "data": { "page": 27 } },
  //subTitle
  { "x": 44, "y": 99, "width": 290, "height": 13, "class":"to-page", "data": { "page": 6 } },
  { "x": 44, "y":117, "width": 290, "height": 13, "class":"to-page", "data": { "page": 7 } },
  { "x": 44, "y":149, "width": 290, "height": 13, "class":"to-page", "data": { "page": 9 } },
  { "x": 44, "y":166, "width": 290, "height": 13, "class":"to-page", "data": { "page": 9 } },
  { "x": 44, "y":183, "width": 290, "height": 13, "class":"to-page", "data": { "page": 12 } },
  { "x": 44, "y":283, "width": 290, "height": 13, "class":"to-page", "data": { "page": 13 } },
  { "x": 44, "y":384, "width": 290, "height": 13, "class":"to-page", "data": { "page": 16 } },
  { "x": 44, "y":400, "width": 290, "height": 13, "class":"to-page", "data": { "page": 16 } },
  { "x": 44, "y":417, "width": 290, "height": 13, "class":"to-page", "data": { "page": 18 } },
  { "x": 44, "y":434, "width": 290, "height": 13, "class":"to-page", "data": { "page": 19 } },
  
  { "x": 44, "y":474, "width": 290, "height": 13, "class":"to-page", "data": { "page": 20 } },
  { "x": 44, "y":491, "width": 290, "height": 13, "class":"to-page", "data": { "page": 20 } },
  { "x": 44, "y":507, "width": 290, "height": 13, "class":"to-page", "data": { "page": 21 } },
  { "x": 44, "y":523, "width": 290, "height": 13, "class":"to-page", "data": { "page": 21 } },
  { "x": 44, "y":541, "width": 290, "height": 13, "class":"to-page", "data": { "page": 22 } },
  { "x": 44, "y":573, "width": 290, "height": 13, "class":"to-page", "data": { "page": 24 } },
  { "x": 44, "y":590, "width": 290, "height": 13, "class":"to-page", "data": { "page": 24 } },
  
  { "x": 44, "y":630, "width": 290, "height": 13, "class":"to-page", "data": { "page": 25 } },
  //smlTitle
  { "x": 44, "y":200, "width": 290, "height": 13, "class":"to-page", "data": { "page": 11 } },
  { "x": 44, "y":217, "width": 290, "height": 13, "class":"to-page", "data": { "page": 11 } },
  { "x": 44, "y":233, "width": 290, "height": 13, "class":"to-page", "data": { "page": 11 } },
  { "x": 44, "y":250, "width": 290, "height": 13, "class":"to-page", "data": { "page": 11 } },
  { "x": 44, "y":267, "width": 290, "height": 13, "class":"to-page", "data": { "page": 12 } },
  { "x": 44, "y":300, "width": 290, "height": 13, "class":"to-page", "data": { "page": 13 } },
  { "x": 44, "y":317, "width": 290, "height": 13, "class":"to-page", "data": { "page": 13 } },
  { "x": 44, "y":333, "width": 290, "height": 13, "class":"to-page", "data": { "page": 14 } },
  { "x": 44, "y":350, "width": 290, "height": 13, "class":"to-page", "data": { "page": 14 } },
  { "x": 44, "y":367, "width": 290, "height": 13, "class":"to-page", "data": { "page": 15 } }


]

// Load regions

function loadRegions(page, element) {
    var cat = 3;
    if(page == cat) {
      if($('.magazine').turn('display')==='double'){
        var data = regionDataNormal;
      } else {
        var regionDataMobile = regionDataNormal;
        for (var i = 0; i < regionDataMobile.length; i++) {
          var item = regionDataNormal[i];
          item.x = item.x / 2;
          item.width = item.width / 2;
        }
        var data = regionDataMobile;
      }
    $.each(data, function(key, region) {
      addRegion(region, element);
    });
  }
}

// Add region

function addRegion(region, pageElement) {
  var reg = $('<div />', { 'class': 'region  ' + region['class'] }),
    options = $('.magazine').turn('options'),
    pageWidth = options.width / 2,
    pageHeight = options.height;
  reg.css({
    top: Math.round(region.y / pageHeight * 100) + '%',
    left: Math.round(region.x / pageWidth * 100) + '%',
    width: Math.round(region.width / pageWidth * 100) + '%',
    height: Math.round(region.height / pageHeight * 100) + '%'
  }).attr('region-data', $.param(region.data || ''));
  reg.appendTo(pageElement);
}

// Process click on a region
function regionClick(event) {
  var region = $(event.target);
  if (region.hasClass('region')) {
    $('.magazine-viewport').data().regionClicked = true;
    setTimeout(function() {
      $('.magazine-viewport').data().regionClicked = false;
    }, 100);
    var regionType = $.trim(region.attr('class').replace('region', ''));
    return processRegion(region, regionType);
  }
}

// Process the data of every region

function processRegion(region, regionType) {
  data = decodeParams(region.attr('region-data'));
  switch (regionType) {
    case 'link':
      window.open(data.url);
      break;
    case 'zoom':
      var regionOffset = region.offset(),
        viewportOffset = $('.magazine-viewport').offset(),
        pos = {
          x: regionOffset.left - viewportOffset.left,
          y: regionOffset.top - viewportOffset.top
        };
      $('.magazine-viewport').zoom('zoomIn', pos);
      break;
    case 'to-page':
      $('.magazine').turn('page', data.page);
      break;
  }
}

// Load large page

function loadLargePage(page, pageElement) {
  var img = $('<img />');
  img.load(function() {
    var prevImg = pageElement.find('img');
    $(this).css({ width: '100%', height: '100%' });
    $(this).appendTo(pageElement);
    prevImg.remove();
  });
  page = padLeft(page-1, 3);
  // Loadnew page
  img.attr('src', 'assets/pages/large/' + page + '.jpg');
}

// Load small page
function loadSmallPage(page, pageElement) {
  var img = pageElement.find('img');
  img.css({ width: '100%', height: '100%' });
  img.unbind('load');
  page = padLeft(page-1, 3);
  // Loadnew page
  img.attr('src', 'assets/pages/normal/' + page + '.jpg');
}

// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {
  return navigator.userAgent.indexOf('Chrome') != -1;
}

function disableControls(page) {
  if (page == 1)
    $('.previous-button').hide();
  else
    $('.previous-button').show();

  if (page == $('.magazine').turn('pages'))
    $('.next-button').hide();
  else
    $('.next-button').show();
}

// Set the width and height for the viewport

function resizeViewport() {
  var width = $(window).width(),
    height = $(window).height(),
    options = $('.magazine').turn('options');
  $('.magazine').removeClass('animated');
  $('.magazine-viewport').css({
    width: width,
    height: height
  }).
  zoom('resize');

  if ($('.magazine').turn('zoom') == 1) {
    var bound = calculateBound({
      width: options.width,
      height: options.height,
      boundWidth: Math.min(options.width, width),
      boundHeight: Math.min(options.height, height)
    });
    if (bound.width % 2 !== 0)
      bound.width -= 1;
    if (bound.width != $('.magazine').width() || bound.height != $('.magazine').height()) {
      $('.magazine').turn('size', bound.width, bound.height);
      if ($('.magazine').turn('page') == 1)
        $('.magazine').turn('peel', 'br');
      $('.next-button').css({ height: bound.height, backgroundPosition: '-38px ' + (bound.height / 2 - 32 / 2) + 'px' });
      $('.previous-button').css({ height: bound.height, backgroundPosition: '-4px ' + (bound.height / 2 - 32 / 2) + 'px' });
    }
    $('.magazine').css({ top: -bound.height / 2, left: -bound.width / 2 });
  }

  var magazineOffset = $('.magazine').offset(),
    boundH = height - magazineOffset.top - $('.magazine').height(),
    marginTop = (boundH - $('.thumbnails > div').height()) / 2;

  if (marginTop < 0) {
    $('.thumbnails').css({ height: 1 });
  } else {
    $('.thumbnails').css({ height: boundH });
    $('.thumbnails > div').css({ marginTop: marginTop });
  }

  if (magazineOffset.top < $('.made').height())
    $('.made').hide();
  else
    $('.made').show();

  $('.magazine').addClass('animated');

}


// Number of views in a flipbook

function numberOfViews(book) {
  return book.turn('pages') / 2 + 1;
}

// Current view in a flipbook

function getViewNumber(book, page) {
  return parseInt((page || book.turn('page')) / 2 + 1, 10);
}

function moveBar(yes) {
  if (Modernizr && Modernizr.csstransforms) {
    $('#slider .ui-slider-handle').css({ zIndex: yes ? -1 : 10000 });
  }
}

function setPreview(view) {
  var previewWidth = 172,
    previewHeight = 121.4,
    previewSrc = 'assets/pages/preview.jpg',
    preview = $(_thumbPreview.children(':first')),
    numPages = (view == 1 || view == $('#slider').slider('option', 'max')) ? 1 : 2,
    width = (numPages == 1) ? previewWidth / 2 : previewWidth;

  _thumbPreview.
  addClass('no-transition').
  css({
    width: width + 15,
    height: previewHeight + 15,
    top: -previewHeight - 30,
    left: ($($('#slider').children(':first')).width() - width - 15) / 2
  });

  preview.css({
    width: width,
    height: previewHeight
  });

  if (preview.css('background-image') === '' ||
    preview.css('background-image') == 'none') {

    preview.css({ backgroundImage: 'url(' + previewSrc + ')' });

    setTimeout(function() {
      _thumbPreview.removeClass('no-transition');
    }, 0);

  }

  preview.css({
    backgroundPosition: '0px -' + ((view - 1) * previewHeight) + 'px'
  });
}

// Width of the flipbook when zoomed in

function largeMagazineWidth() {
  return 2214;
}

// decode URL Parameters

function decodeParams(data) {
  var parts = data.split('&'),
    d, obj = {};
  for (var i = 0; i < parts.length; i++) {
    d = parts[i].split('=');
    obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
  }
  return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {
  var bound = { width: d.width, height: d.height };
  if (bound.width > d.boundWidth || bound.height > d.boundHeight) {
    var rel = bound.width / bound.height;
    if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {
      bound.width = Math.round(d.boundHeight * rel);
      bound.height = d.boundHeight;
    } else {
      bound.width = d.boundWidth;
      bound.height = Math.round(d.boundWidth / rel);
    }
  }
  return bound;
}

// 補零
function padLeft(str, lenght) {
    str = '' + str;
    return str.length >= lenght ? str : new Array(lenght - str.length + 1).join("0") + str;
}
