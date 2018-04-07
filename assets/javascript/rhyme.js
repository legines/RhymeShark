$('.search-filter').on('keyup', function() {
    var matches = [];
    var input = $.trim($('.search-filter').val());
    var val = '^(?=.*\\b' + input.split(/\s+/).join('\\b)(?=.*\\b') + ').*$'; // using individual word matching filter from http://stackoverflow.com/a/9127872/1544886
    var filter = RegExp(val, 'i');
  
    if (input.length === 0) { // show all if filter is empty
  
      $('.collapse').removeClass('show').addClass('collapsed'); // hide collapsable items fast.
      $('.hide').removeClass('hide'); // remove any hidden elements from previous searches
    } else {
      $('.collapse').addClass('show'); // show all collapsed items
  
      $('ul.sidebar-nav a:not(".home")').filter(function() { // skip home <li> so it shows permanently
          $this = $(this);
  
          // test for a match to search string
          text = $this.text().replace(/\s+/g, ' ');
          var isMatch = filter.test(text);
  
                  // store match so we can unhide parents of this item 
          if (isMatch) matches.push($this);
  
          return !isMatch;
      }).parent().addClass('hide'); // this hides any <li> that doesn't match search terms. Hiding <a> results in large gaps in the output
  
      $.each(matches, function() { // unhide parents of our matches
          this.parentsUntil(".sidebar-nav", ".hide").removeClass('hide');
      });
    }
  });

var queryURL = '';

$('#submit').click(function(event) {
    event.preventDefault();
    queryURL = `https://www.wordsapi.com/mashape/words/${$('#search').val()}/rhymes?when=2018-04-06T01:03:34.523Z&encrypted=8cfdb282e722979bea9707bfee58bebaaeb3290935fd94b8`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $('#results').append(`<p>${response}</p>`);   
  });
    
});



