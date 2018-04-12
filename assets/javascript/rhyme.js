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

var mxmURL = '';
var words = [];
var savedSearch = '';

$('#nav-submit').click(function(event) {
    event.preventDefault();
    var search = $('#nav-search').val();
    savedSearch = search;
    $('#word-searched').text(search);
    $('#dropdownMenuButton').text('Rhymes');

    getWords(search, 'rhymes');
  
});

$('#rhymes').click(function(event) {
    event.preventDefault();
    getWords(savedSearch, 'rhymes');
    $('#dropdownMenuButton').text('Rhymes');
});

$('#definitions').click(function(event) {
    event.preventDefault();
    getWords(savedSearch, 'definitions');
    $('#dropdownMenuButton').text('Definitions');
});

$('#synonyms').click(function(event) {
    event.preventDefault();
    getWords(savedSearch, 'synonyms');
    $('#dropdownMenuButton').text('Synonyms');
});
/*
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
    $('.words-results').empty();
    arr.slice((page-1)*10, (page*10)-1).forEach(function(element) {
      $('.words-results').append(`<p>${element}</p>`);
    });
    $('.words-results').append(paginationHTML(arr, page));
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
*/
function getWords(word, type) {
    
    var wordsURL = `https://www.wordsapi.com/mashape/words/${word}/${type}?when=2018-04-12T20:09:54.142Z&encrypted=8cfdb282e722979beb9307bdef58beb0aeb5290931fb95b8`;

    $.ajax({
        url: wordsURL,
        method: "GET"
    }).then(function(response) {
       console.log(response);
       words = [];
        if (type==='rhymes') {
          if (typeof response.rhymes.all === 'undefined') {
            $('.words-results').empty()
            $('.words-results').append('No rhymes found.');
          } else {
            response.rhymes.all.forEach(function(element) {
              words.push(element);
            });
            displayWords(words, type);   
          }
        } 
        else {
          if (response[type].length === 0) {
            $('.words-results').empty()
            $('.words-results').append(`No ${type} found.`);
          } 
          else {
            if(type==='definitions') {
              response[type].forEach(function(element) {
                words.push(element.definition);
              });
            }
            else {
              response[type].forEach(function(element) {
                words.push(element);
              });

            }
            
            displayWords(words, type);   
          }
          
        }
        //console.log('words : ' + words);
       }); 
}

function displayWords(arr, type='rhyme') {
    $('.words-results').empty();
    var newDiv;
    if (type==='definitions') {
        newDiv = $('<ol>');
        arr.forEach(function(word) {
          newDiv.append(`<li>${word}</li>`);
        });
    } 
    else {
        newDiv = $('<p>');
        var count = 0;
        arr.forEach(function(word) {
            if (count===(arr.length-1)) {
              newDiv.append(`${word}.`);
            }
            else {
               newDiv.append(`${word}, `);
            }
            count++;
           
        });
    }
    $('.words-results').append(newDiv);

}




