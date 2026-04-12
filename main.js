let audio = document.getElementById("main-audio")
let button = document.getElementById("play-pause")
let playing = false;
let volumeSlider = document.querySelector(".volume_slider")
let seekSlider = document.querySelector(".seek_slider")
let trackName = document.querySelector(".track-name")
let artistName = document.querySelector(".track-artist")
let dateRelease = document.querySelector(".release-date")
let songDesc = document.querySelector(".description")
let trackIndex = 0;
const availableSongs = [
  {artist: "The Smiths", track: "This Charming Man", date: "1983", file: "ThisCharmingMan.mp3", desc: "An upbeat song about two different people from different working classes."},
  {artist: "Nirvana", track: "About a Girl", date: "1989", file: "AboutAGirl.mp3", desc: "A soft but hearty song."},
  {artist: "Mac Demarco", track: "No Other Heart", date: "2015", file: "NoOtherHeart.mp3", desc: "depression and heartbreak."},
  {artist: "Good Kid", track: "Cicada", date: "2026", file: "04-cicada.mp3", desc: "A song about a crush, ironically this was released the day I got cheated on."},
  {artist: "batta", track: "chase", date: "2015", file: "chase.mp3", desc: "I don't know japanese."},
  {artist: "Kurt Cobain", track: "Do Re Mi", date: "1994", file: "DoReMi.mp3", desc: "One of Kurts first ever songs he recorded."},
  {artist: "The Pillows", track: "Last Dinosaur", date: "1999", file: "LAST DINOSAUR.mp3", desc: "I dont speak japanese"},
  {artist: "Good Kid", track: "Coffee", date: "2026", file: "03-coffee.mp3", desc: "Burnout and stress while navigating isolation and anxiety while looking for verbal communication"},
  {artist: "Good Kid", track: "Rift", date: "2026", file: "01-rift.mp3", desc: "escaping a toxic relationship and feeling free from conflict(relateable)."},
  {artist: "Sunny Day Service", track: "心に雲を持つ少年", date: "2020", file: "心に雲を持つ少年.mp3", desc: "I dont speak Japanese"},
  {artist: "Franz Liszt", track: "Liebestraum No. 3", date: "1850", file: "Liszt - Liebestraum No. 3 (Love Dream).mp3", desc: "love"},
  {artist: "Kurt Cobain", track: "Montage of Kurt", date: "1988", file: "goofykurtsong.mp3", desc: "dont ask"}
]

function loadTrack(index) {
  let song = availableSongs[index];
  audio.src = song.file
  
  trackName.textContent = song.track
  artistName.textContent = song.artist
  dateRelease.textContent = song.date || "Unknown"
  songDesc.textContent = song.desc || "I dont know"

  seekSlider.value = 0
  playing = false
  button.textContent = "▶︎"
}
function playPauseTrack() {
  if (!playing) playTrack();
  else pauseTrack()
}

function playTrack() {
  playing = true;
  button.textContent = "❚❚";
  audio.play().catch(err => {
    alert("Failed to load song check console for error")
    console.log(err)
  });
}

function pauseTrack() {
  playing = false;
  audio.pause();
  button.textContent = "▶︎";
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

function setVolume() {
  audio.volume = volumeSlider.value / 100;
}

function seekTo() {
  let seekTime = audio.duration * (seekSlider.value / 100);
  audio.currentTime = seekTime;
}

audio.addEventListener("timeupdate", () => {

  if (!isNaN(audio.duration)) {
    let value = (audio.currentTime / audio.duration) * 100;
    seekSlider.value = value
  }
});

audio.addEventListener("ended", nextTrack);
loadTrack(trackIndex);
