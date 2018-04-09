//---------------------------MusixMatch API-------------------------------//
//This is to search without any filters
$("#nav-submit").on("click",function(event){
  event.preventDefault();

  var searchTerm = $("#nav-search").val().trim();
  //Track name and artist AJAX
  $.ajax({
    url: "https://api.musixmatch.com/ws/1.1/track.search?callback=jsonp_callback&apikey=885d92a1571fa34dbadfb6b2506cb335&q_lyrics="+searchTerm+"&format=jsonp&callback=jsonp_callback&page_size=5&f_has_lyrics=1&_=1523257368321",
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

