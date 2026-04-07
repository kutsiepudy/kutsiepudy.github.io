let audio = document.getElementById("main-audio")
let button = document.getElementById("play-pause")
let playing = false;
let trackName = document.querySelector(".track-name")
let artistName = document.querySelector(".track-artist")
let dateRelease = document.querySelector(".release-date")
let songDesc = document.querySelector(".description")
let trackIndex = 0;
const availableSongs = [
  {artist: "The Smiths", track: "This Charming Man", date: "1983", file: "ThisCharmingMan.mp3", desc: "An upbeat song about two different people from different working classes and the diversity of them."},
  {artist: "Nirvana", track: "About a Girl", date: "1989", file: "AboutAGirl.mp3", desc: "A soft but hearty song."},
  {artist: "Mac Demarco", track: "No Other Heart", date: "2015", file: "NoOtherHeart.mp3", desc: "depression and heartbreak."},
  {artist: "Good Kid", track: "Cicada", date: "2026", file: "04-cicada.mp3", desc: "A song about a crush, ironically this was released the day I got cheated on."},
  {artist: "overnight", track: "mirrors demo", date: "2025", file: "mirrordemo.mp3", desc: "A song about self hate, and constant noise in your head."},
  {artist: "Kurt Cobain", track: "Do Re Mi", date: "1994", file: "DoReMi.mp3", desc: "One of Kurts first ever songs he recorded."},
  {artist: "The Pillows", track: "Last Dinosaur", date: "1999", file: "LAST DINOSAUR.mp3", desc: "I dont speak japanese"},
  {artist: "Good Kid", track: "Coffee", date: "2026", file: "03-coffee.mp3", desc: "Burnout and stress while navigating isolation and anxiety while looking for verbal communication"},
  {artist: "Good Kid", track: "Rift", date: "2026", file: "01-rift.mp3", desc: "escaping a toxic relationship and feeling free from conflict(relateable)."},
  {artist: "Kurt Cobain", track: "Montage of Kurt", date: "1988", file: "goofykurtsong.mp3", desc: "dont ask"}
]

function loadTrack(index) {
  let song = availableSongs[index];
  audio.src = song.file
  
  trackName.textContent = song.track
  artistName.textContent = song.artist
  dateRelease.textContent = song.date || "Unkown"
  songDesc.textContent = song.desc || "I dont know"
}
function playPauseTrack() {
  if (!playing) playTrack();
  else pauseTrack()
}

function playTrack() {
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
  pauseTrack();
}

function previousTrack() {
  trackIndex--;
  
  if (trackIndex < 0) {
    trackIndex = availableSongs.length - 1;
  }

  loadTrack(trackIndex);
  pauseTrack();
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

