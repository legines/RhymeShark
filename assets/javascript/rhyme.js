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

var wordsURL = '';
var mxmURL = '';
var words = [];

$('#nav-submit').click(function(event) {
    event.preventDefault();
    wordsURL = `https://www.wordsapi.com/mashape/words/${$('#nav-search').val()}/rhymes?when=2018-04-06T01:03:34.523Z&encrypted=8cfdb282e722979bea9707bfee58bebaaeb3290935fd94b8`;


    $.ajax({
        url: wordsURL,
        method: "GET"
    }).then(function(response) {
       console.log(response);
       words = [];
       if (typeof response.rhymes.all === 'undefined') {
           $('.words').append('No rhymes found.');
       }
       else {
          response.rhymes.all.forEach(function(element) {
             words.push(element);
          });
          displayTen(words, 1);
          //console.log('words : ' + words);
          

       } 
    }); 
  
});

$('body').on('click', '#previous', function(event) {
    event.preventDefault();
    var page = $('#page-number').attr('data-page');
    if ((+page)>1) {
        displayTen(words, (+page)-1);
        $('#page-number').text(`${(+page)-1}/${Math.ceil(words.length/10)}`);
        $('#page-number').attr('data-page',`${(+page)-1}`);
    }

});

$('body').on('click', '#next', function(event) {
    event.preventDefault();
    var page = $('#page-number').attr('data-page');
    if ((+page)<Math.ceil(words.length/10)) {
        displayTen(words, (+page)+1);
        $('#page-number').text(`${(+page)+1}/${Math.ceil(words.length/10)}`);
        $('#page-number').attr('data-page',`${(+page)+1}`);
    }

});

function displayTen(arr, page) {
    //console.log('display ten arr ' + arr);
    $('.words').empty();
    arr.slice((page-1)*10, (page*10)-1).forEach(function(element) {
      $('.words').append(`<p>${element}</p>`);
    });
    $('.words').append(paginationHTML(arr, page));
}

function paginationHTML(arr, page) {
  var pages = Math.ceil(arr.length/10);
  //console.log('pages ' + pages);
  //console.log('length ' + arr.length);
  var html = `
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <button class="page-link" href="#" aria-label="Previous" id="previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </button>
    </li>
    <li class="page-item"><a class="page-link" id="page-number" href="#" data-page="1">${page}/${pages}</a></li>
    <li class="page-item">
      <button class="page-link" href="#" aria-label="Next" id="next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </button>
    </li>
  </ul>
</nav>
`
return html;

}



