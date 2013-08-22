$(document).ready(function(){

  // Date archive

  var y = $('#date-archive').data('year');
  var m = $('#date-archive').data('month');
  var d = $('#date-archive').data('day');

  var year = $('.year[data-value*="' + y + '"]');
  year.addClass('on');
  var months = $('.months[data-year*="' + y + '"]');
  months.show();
  
  if (m) {
    months.addClass('active');
    var month = $('.month[data-value*="' + m + '"]');
    month.addClass('on');
    var days = $('.days[data-month*="' + m + '"]');
    days.show();
    if (d) {
      days.addClass('active');
      var day = $('.day[data-value*="' + d + '"]');
      day.addClass('on');
    }
  }

  $('.years, .months, .days').hover(
    function() {
      $(this).find('li').show();
    },
    function() {
      $(this).find('li').not('.on, .select').hide();
      if ($(this).hasClass('active')) {
        $(this).find('.select').hide();
      }
    }
  );

  // Wheel tabs

  var wheels = $('.wheel');
  var wheel_tabs = $('#wheel-tabs ul a');
  var wheel_link = $('#wheel-link');
  wheel_tabs.first().addClass('on');

  wheel_tabs.click( function() {
    var index = $(this).parent().index();
    var url = $(this).attr('href');
    var name = $(this).text();
    wheels.hide();
    wheels.eq(index).show();
    wheel_tabs.removeClass();
    $(this).addClass('on');
    wheel_link.attr('href', url);
    wheel_link.find('span').text(name);
    return false;
  });

  // Review tabs

  var reviews = $('.reviews-grid .review');
  var reviews_tabs = $('#reviews-tabs ul a');
  var reviews_link = $('#reviews-link');
  reviews_tabs.first().addClass('on');

  reviews_tabs.click( function() {
    var index = $(this).parent().index();
    var url = $(this).attr('href');
    var name = $(this).text();
    if (name == 'All') {
      name = 'Reviews';
    }
    reviews_tabs.removeClass();
    $(this).addClass('on');
    UpdateReviews($(this).parent().data('id'));
    reviews_link.attr('href', url);
    reviews_link.find('span').text(name);
    return false;
  });

  // Popular

  var bars = $('.popular li em');
  var totals = new Array();
  var total_highest = parseInt(bars.first().data('total'));

  $.each(bars, function() {
    var total = $(this).data('total');
    var relative_width = (250 * total) / total_highest;
    $(this).stop().animate({
      width: relative_width
    });
    // $(this).css('width', relative_width);
  });

  // Pinterest

  var pinterest = $('.pinterest');
  var pins = $('.pinterest .post');

  function Grid(space) {
    pins.css('position','absolute');
    var columns = 3;
    var column = (space / columns);
    var gutter = 0;
    var pins_count = pins.size();

    var grid = new Array(columns);
    $.each(grid, function(j) {
      grid[j] = 0;
    });
    
    $.each(pins, function() {
      var lowest = Math.min.apply(null, grid);
      var lowest_index = grid.indexOf(lowest);
      var height = $(this).outerHeight();
      grid[lowest_index] += height;
      var x = ( lowest_index * column );
      var y = lowest;
      if (lowest_index == 0) {
        $(this).css('border-left', 'none');
        $(this).css('padding-left', 0);
        x = 20;
      } else if (lowest_index == 2) {
        $(this).css('padding-right', 0);
      }
      $(this).css('left', x);
      $(this).css('top', y);
    });
    
    var biggest = Math.max.apply(null, grid);
    pinterest.css('height', biggest + 'px');
  }
  
  function Reset() {
    pins.css('padding-left', 0);
    pins.css('position', 'static');
  }
  
  function Display(size) {
    if (size > 980) {
      pins.css('padding-left', 60);
      Grid(940);
    } else if (size > 860) {
      pins.css('padding-left', 0);
      Grid(820);
    } else {
      Reset();
    }
  }
  
  Grid(1020);

  // Ajax

  function UpdateReviews(id) {
    $('.loading').show();
    $.ajax({
      url: 'http://localhost/forest/wp-admin/admin-ajax.php',
      data: {
        'action': 'madeleine_ajax',
        'fn': 'madeleine_tabs',
        'id': id
      },
      dataType: 'html',
      success:function(data) {
        $('.loading').hide();
        $('#reviews-result').html(data);
      },
      error: function(errorThrown){
        alert('Oops! An error occured.');
        console.log(errorThrown);
      }
    });
  }

});    