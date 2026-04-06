let audio = document.getElementById("main-audio")
let button = document.getElementById("play-pause")
let playing = false;
let trackName = document.querySelector(".track-name")
let artistName = document.querySelector(".track-artist")
let dateRelease = document.querySelector(".release-date")
let trackIndex = 0;
const availableSongs = [
  {artist: "The Smiths", track: "This Charming Man", date: "1983", file: "ThisCharmingMan.mp3"},
  {artist: "Nirvana", track: "About a Girl", date: "1989", file: "AboutAGirl.mp3"},
  {artist: "Mac Demarco", track: "No Other Heart", date: "2015", file: "NoOtherHeart.mp3"},
  {artist: "Good Kid", track: "Cicada", date: "2026", file: "cicada.mp3"},
  {artist: "overnight", track: "mirrors demo", date: "2025", file: "mirrordemo.mp3"},
  {artist: "Kurt Cobain", track: "Do Re Mi", date: "1994", file: "DoReMi.mp3"},
  {artist: "Hyakkei", track: "まほうのじゅうたん", date: "2009", file: "japaneseSong.mp3"},
  {artist: "Good Kid", track: "Coffee", date: "2026", file: "coffee.mp3"},
  {artist: "Good Kid", track: "Rift", date: "2026", file: "rift.mp3"},
  {artist: "Kurt Cobain", track: "Montage of Kurt", date: "1988", file: "goofykurtsong.mp3"}
]

function loadTrack(index) {
  let song = availableSongs[index];
  audio.src = song.file
  
  trackName.textContent = song.track
  artistName.textContent = song.artist
  dateRelease.textContent = song.date || "Unkown"
}
function playPauseTrack() {
  if (!playing) playTrack();
  else pauseTrack()
}

function playTrack() {
  loadTrack(trackIndex);
  playing = true;
  button.textContent = "❚❚";
  audio.play()
}

function pauseTrack() {
  playing = false;
  audio.pause();
  button.textContent = "▶︎";
}

function setVolume() {
  let slider = document.querySelector(".volume_slider");
  audio.volume = slider.value / 100;
}

function nextTrack() {
  trackIndex++;
  
  if (trackIndex >= availableSongs.length) {
    trackIndex = 0;
  }
  
  loadTrack(trackIndex);
  playTrack();
}

function previousTrack() {
  trackIndex--;
  
  if (trackIndex < 0) {
    trackIndex = availableSongs.length - 1;
  }

  loadTrack(trackIndex);
  playTrack();
}

function seekTo() {
  let slider = document.querySelector(".seek_slider");
  let seekTime = audio.duration * (slider.value / 100);
  audio.currentTime = seekTime;
}

audio.addEventListener("timeupdate", () => {
  let slider = document.querySelector(".seek_slider");
  let value = (audio.currentTime / audio.duration) * 100;
  slider.value = value || 0;
});

loadTrack(trackIndex);
