import fetch from 'node-fetch';
const BASEURL = "https://www.googleapis.com/youtube/v3/search";
const APIKEY = "AIzaSyB_PoCxkerOe-HDsYivEOaJDKd8m7UQd6Q";
const CHANEL_ID ="UC8EqXcjnkYNbhiX-A-hh8gw";
const parametrosDeSolicitud = new URLSearchParams({
    part: "snippet",
    channelId: CHANEL_ID,
    maxResults: 10,
    key: APIKEY
});

async function getYTVideos(){
    const url = `${BASEURL}?${parametrosDeSolicitud.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
}

async function fetchYTAPI(){ 
    try{
       const videos = await getYTVideos();
       return videos;
    }
    catch(error){
        throw new Error("Error call: ");
        return null;
    }
}



async function displayVideos(){
    const videosToShow = await fetchYTAPI();
    const videoWrapper = document.getElementById('myYTList');
    if(videosToShow){
        videosToShow.forEach(video => {
            const itemVideo = document.createElement('div').classList("inner-vid");
            itemVideo.innerHTML = `
                <div class="heading-vid">
                    <img src="${video.snippet.thumbnails['high']}" alt="video-thumbnail"/> 
                    <h3>${video.snippet.title}</h3>
                </div>
            `;
        });
    }
}
