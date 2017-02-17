/*
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);
*/

/*--------------------------------------------------------------------------------------
---------------------------------- S H E E T S E E -------------------------------------
--------------------------------------------------------------------------------------*/

function drawToolBox(data) {
  var tools = ich.tools({
    'rows': data
  })
  $('#tools').html(tools)
}

/*
$(document).on( 'click', '#showAvailable', toggleAvailable)

$(document).on( 'click', '.clear', function(e) {
  clearSearch(e)
  $('#showAvailable').removeClass('button-pressed')
    .html('Show Available')
})
*/

$(document).on('keyup', '#toolSearch', function(e) {
  var text = $(e.target).val().trim().toLowerCase()

  if (text === '') return clearSearch(e)
  /*
  if ($('.button-pressed').length === 1) {
    console.log('Hide unavailable')
    $('.tool-box').filter('.not-available').hide()
  }
  */
  filterTools(text)
})

$(document).on('keyup', '#priceCalc', function(e) {
  var text = $(e.target).val().trim().toLowerCase()

  if (text === '') {
      document.getElementById("priceDisplay").textContent = "trade-in pages";
  } else {
      calculatePrice(e.target);
  }
})

function calculatePrice(e) {
    if ($(e).val() === '') {
        document.getElementById("priceDisplay").textContent = "trade-in pages";
    } else {
        var userValue = parseInt($(e).val(),10);
        console.log(userValue);
        var totalValue = 0;
        var price = 5;
        var hasSelection = false;
        $('.selected-tool').each(function(){
            hasSelection = true;
            totalValue += parseInt($(this).data('pageNum'),10);
        });
        if (hasSelection) {
            if (totalValue > userValue) {
                price += Math.floor(Math.floor((totalValue - userValue)/40) * 2);
                console.log(totalValue);
                document.getElementById("priceDisplay").textContent = "RM" + price;
            } else {
                document.getElementById("priceDisplay").textContent = "select more books";
            }
        } else {
            document.getElementById("priceDisplay").textContent = "select books";
        }
    }
        
}


$(document).on( 'click', '.tool-box-tool', function(e) {
  var rowNumber = $(this).closest("div").attr("id")
  if ($(this).closest('div').hasClass('selected-tool')) {
    $('.tool-box-bottom' + '.' + rowNumber).css('display', 'none')
    $(this).closest('div').removeClass('selected-tool')
  }
  else {
    $('.tool-box-bottom' + '.' + rowNumber).css('display', 'inherit')
    $(this).closest('div').addClass('selected-tool')
  }
    
    calculatePrice($('#priceCalc'));
})
/*
function toggleAvailable() {
  if ($('.button-pressed').length === 0) {
    console.log('off')
    $('#showAvailable').addClass('button-pressed')
      .html('Show All')
    $('.not-available').hide()
  } else {
    console.log('on')
    $('#showAvailable')
      .html('Show Available').removeClass('button-pressed')
    if ($('#toolSearch').val() != '') {
      console.log("search not empty")
      return filterTools($('#toolSearch').val())
    }
    $('.not-available').show()
  }
}
*/
function clearSearch(e) {
  console.log('clear')
  $('#toolSearch').val('')
  filterTools('')
  drawToolBox(gData)
}

function filterTools(text) {
  $('.tool-box-tool').each(function() {
  var tool = $(this).html().toLowerCase()
  if (tool.match(text) || text == '') {
    $(this).parent().show()
  } else $(this).parent().hide()
  })
}

$(document).ready(function(){
  
});
