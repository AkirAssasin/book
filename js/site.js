
/*--------------------------------------------------------------------------------------
---------------------------------- S H E E T S E E -------------------------------------
--------------------------------------------------------------------------------------*/

function drawToolBox(data) {
  var tools = ich.tools({
    'rows': data
  })
  $('#tools').html(tools)
}

$(document).on('keyup', '#toolSearch', function(e) {
  var text = $(e.target).val().trim().toLowerCase()

  if (text === '') return clearSearch(e)
  
  filterTools(text)
})

$(document).on('keyup', '#priceCalc', function(e) {
  var text = $(e.target).val().trim().toLowerCase()

  if (text === '') {} else {
      calculatePrice(e.target);
  }
})

function calculatePrice(e) {
    var userValue = parseInt($(e).val(),10);
    if ($(e).val() === '') {
        userValue = 0;
    } else {
        userValue = parseInt($(e).val(),10);
    }
    $('.price-tag').each(function(){
        var price = 8;
        var diff = (parseInt($(this).data('pageNum'),10)) - userValue;
        if (userValue >= 80 && diff <= 300 && diff >= -150) {
            price += Math.round((diff/300) * 8);
            $(this).text("RM" + price);
        } else {
            $(this).text("");
        }
    }); 
}

$(document).on( 'click', '.tool-box-tool', function(e) {
    var div = $(this).parent().parent().parent();
  var rowNumber = div.attr("id")
  if (div.hasClass('selected-tool')) {
    $('.tool-box-bottom' + '.' + rowNumber).css('display', 'none')
    div.removeClass('selected-tool')
  }
  else {
    $('.tool-box-bottom' + '.' + rowNumber).css('display', 'inherit')
    div.addClass('selected-tool')
  }
})

$(document).on( 'click', '.help-button', function(e) {
    $('.help-container').each(function(){
        var div = $(this);
        if (div.hasClass('hidden')) {
            div.removeClass('hidden')
        } else {
            div.addClass('hidden')
        }
    })
})

function clearSearch(e) {
  console.log('clear')
  $('#toolSearch').val('')
  filterTools('')
  drawToolBox(gData)
}

function filterTools(text) {
  $('.tool-box-tool').each(function() {
  var tool = $(this).html().toLowerCase()
  var box = $(this).parent().parent().parent();
  if ((tool.match(text) || text == '') && !box[0].classList.contains('hidden')) {box.show()} else {box.hide()}
  })
}

$(document).ready(function(){
  
});
