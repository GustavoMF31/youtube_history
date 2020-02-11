const file = "watch-history.json"

let data = null
let videoUrl = null

function randomizeVideo() {
    let randomVideo = data[Math.floor(Math.random() * data.length)]
    console.log(randomVideo)
    showVideo(randomVideo)
}

function showVideo(video) {
    let { title, titleUrl, time } = video

    setThumbnailImage(getVideoIdFromURL(titleUrl))
    setVideoTitle(removeWatched(title))
    setUrl(titleUrl)
    setDate(formatDate(time))
}

function setThumbnailImage(videoId) {
    document.getElementById("video-thumbnail").src = `https://img.youtube.com/vi/${videoId}/0.jpg`
}

function removeWatched(title) {
    return title.slice(8)
}

function setVideoTitle(title) {
    document.getElementById("video-name").innerText = title
}

function setUrl(url) {
    videoUrl = url
}

function setDate(dateString) {
    document.getElementById("watched-in").innerText = "Assistido em " + dateString
}

function getVideoIdFromURL(url) {
    var video_id = url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id
}

function formatDate(dateString){
    [year, month, day] = dateString.slice(0, 10).split("-")
    return `${day}/${month}/${year}`
}

function readJson(callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                callback(JSON.parse(allText));
            }
        }
    }
    rawFile.send(null);
}

readJson(text => {
    data = text
})