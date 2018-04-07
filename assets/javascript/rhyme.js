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