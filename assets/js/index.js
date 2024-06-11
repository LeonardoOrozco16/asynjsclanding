//import fetch from 'node-fetch';
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
            const itemVideo = document.createElement('div');
            itemVideo.innerHTML = `
                <a class="group relative" href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails['high'].url}" alt="" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </a>
            `;
            if(video.id.kind == "youtube#video"){
                videoWrapper.appendChild(itemVideo);
            }
            
        });
    }
    
}
displayVideos();
