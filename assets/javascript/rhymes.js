
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





