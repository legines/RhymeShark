//---------------------------MusixMatch API-------------------------------//
//This is to search with/without any filters
$("#nav-submit").on("click",function(event){
  event.preventDefault();

  var searchTerm = $("#nav-search").val().trim();
  var s = document.getElementById("filter");
  var pop = s.options[s.selectedIndex].value;

  var ajaxURL = ["https://api.musixmatch.com/ws/1.1/track.search?callback=jsonp_callback&apikey=885d92a1571fa34dbadfb6b2506cb335&q_lyrics="+searchTerm+"&format=jsonp&callback=jsonp_callback&page_size=5&f_has_lyrics=1&_=1523257368321",  "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_lyrics="+searchTerm+"&f_has_lyrics=1&s_track_rating=desc&quorum_factor=1&page_size=5&apikey=885d92a1571fa34dbadfb6b2506cb335", "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_lyrics="+searchTerm+"&f_has_lyrics=1&s_track_rating=asc&quorum_factor=1&page_size=5&apikey=885d92a1571fa34dbadfb6b2506cb335"];

  if (pop == 1){
    var ajaxURL = ajaxURL[1];
  }
  else if (pop == 2){
    var ajaxURL = ajaxURL[2];
  }
  else {
    var ajaxURL = ajaxURL[0];
  }

  //Track name and artist AJAX
  $.ajax({
    url: ajaxURL,
    dataType: "jsonp",
    success: function(data) {
        console.log(data); 
        var response = data.message.body;
        var trackId0 = response.track_list["0"].track.track_id;
        var trackId1 = response.track_list["1"].track.track_id;
        var trackId2 = response.track_list["2"].track.track_id;
        var trackId3 = response.track_list["3"].track.track_id;
        var trackId4 = response.track_list["4"].track.track_id;

        for (var i = 0; i < response.track_list.length; i++){
          $("#track" +[i]).html(response.track_list[i].track.artist_name + " : " + response.track_list[i].track.track_name);
        }
 
        //Lyrics AJAX. A loop to change trackID doesnt work. It iterates twice and crashes
        $.ajax({
          type: "GET",
          url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get?callback=jsonp_callback&apikey=445d6196c08dc2b7490929f18149d684&track_id="+trackId0+"&format=jsonp&callback=jsonp_callback&_=1523257240095",
          dataType: "jsonp",
          success: function(lyric) {
              console.log(lyric);
              $(".lyric0").text(JSON.stringify(lyric.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ").replace("******* This Lyrics is NOT for Commercial use ******* (1409612408028)", "")));
          }
        })

        $.ajax({
          type: "GET",
          url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get?callback=jsonp_callback&apikey=445d6196c08dc2b7490929f18149d684&track_id="+trackId1+"&format=jsonp&callback=jsonp_callback&_=1523257240095",
          dataType: "jsonp",
          success: function(lyric) {
              console.log(lyric);
              $(".lyric1").text(JSON.stringify(lyric.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ").replace("******* This Lyrics is NOT for Commercial use ******* (1409612408028)", "")));
          }
        })

        $.ajax({
          type: "GET",
          url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get?callback=jsonp_callback&apikey=445d6196c08dc2b7490929f18149d684&track_id="+trackId2+"&format=jsonp&callback=jsonp_callback&_=1523257240095",
          dataType: "jsonp",
          success: function(lyric) {
              console.log(lyric);
              $(".lyric2").text(JSON.stringify(lyric.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ").replace("******* This Lyrics is NOT for Commercial use ******* (1409612408028)", "")));
          }
        })

        $.ajax({
          type: "GET",
          url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get?callback=jsonp_callback&apikey=445d6196c08dc2b7490929f18149d684&track_id="+trackId3+"&format=jsonp&callback=jsonp_callback&_=1523257240095",
          dataType: "jsonp",
          success: function(lyric) {
              console.log(lyric);
              $(".lyric3").text(JSON.stringify(lyric.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ").replace("******* This Lyrics is NOT for Commercial use ******* (1409612408028)", "")));
          }
        })
      
        $.ajax({
          type: "GET",
          url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get?callback=jsonp_callback&apikey=445d6196c08dc2b7490929f18149d684&track_id="+trackId4+"&format=jsonp&callback=jsonp_callback&_=1523257240095",
          dataType: "jsonp",
          success: function(lyric) {
              console.log(lyric);
              $(".lyric4").text(JSON.stringify(lyric.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ").replace("******* This Lyrics is NOT for Commercial use ******* (1409612408028)", "")));
          }
        })
    }
  });
});

//---------------------------Sidebar JS-------------------------------//
$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
});

//---------------------------Egg JS-------------------------------//
if ( window.addEventListener ) {  
  var state = 0, konami = [38,38,40,40,37,39,37,39,66,65];  
  window.addEventListener("keydown", function(e) {  
    if ( e.keyCode == konami[state] ) state++;  
    else state = 0;  
    if ( state == 10 )  
      window.location = "https://www.youtube.com/watch?v=QxDh5B_KKZg";  //you can write your own code here
    }, true);  
}  


