let audio = document.getElementById("main-audio")
let button = document.getElementById("play-pause")
let volumeSlider = document.querySelector(".volume_slider")
let seekSlider = document.querySelector(".seek_slider")
let trackName = document.querySelector(".track-name")
let artistName = document.querySelector(".track-artist")
let dateRelease = document.querySelector(".release-date")
let songDesc = document.querySelector(".description")
let currentTimeEl = document.getElementById("current-time")
let maxTimeEl = document.getElementById("max-time")
let trackIndex = 0;
const availableSongs = [
  {artist: "The Smiths", track: "This Charming Man", date: "1983", file: "ThisCharmingMan.mp3", desc: "this is a week before the culture fair, before I found I was being cheated on, I would listen to this nonstop because it was so fun learned it on guitar, told myself I can play this for her maybe let her know I still care, yeah that didn't work out, I still listen to it even after I found out she cheated on me, beats me though."},
  {artist: "Nirvana", track: "About a Girl", date: "1989", file: "AboutAGirl.mp3", desc: "arguably a good Nirvana song, I wish I could play this with a band, y'know seems fun to play with a band, makes me feel like I get that safe space y'know, like that emotional space you can have or where I can just scream without anyone looking at me weird, I like this song because it makes me feel safe."},
  {artist: "Mac Demarco", track: "No Other Heart", date: "2015", file: "NoOtherHeart.mp3", desc: "I honestly don't remember how I found this song, but makes me remember about what I was doing way before everything went down, y'know how carefree I was, and how optimistic I was, way way before everything collapsed."},
  {artist: "Good Kid", track: "Cicada", date: "2026", file: "04-cicada.mp3", desc: "This song was released the same day, I was getting ready to finally reconcile with my girlfriend at the time (now ex) I hyped myself up told myself I matter, the moment I go to school that day I get ignored by her I shrug it off y'know, and then I see her hanging out with someone else calling them their girlfriend and being public about their relationship, essentially I got cheated on."},
  {artist: "batta", track: "chase", date: "2015", file: "chase.mp3", desc: "I was listening to it during a time where I was just starting to get bored of following routine, yeah there was something to look forward for everyday but I had little to no friends at the time, and this song, followed by a girl who liked me and made it obvious, whenever I played the song I would think about playing it with a band, I still do."},
  {artist: "Kurt Cobain", track: "Do Re Mi", date: "1994", file: "DoReMi.mp3", desc: "One of Kurts first ever songs he recorded I played this on the guitar for my crush, she liked it y'know it was nice I mean first audience member I've had and I'm glad it was my crush, all I remember about finding this is just laying on the floor, and then I take a look at my phone, see it and play it."},
  {artist: "The Pillows", track: "Last Dinosaur", date: "1999", file: "LAST DINOSAUR.mp3", desc: "I think about playing this with a band, y'know I want to play with a band but who would want to take me? I play guitar sure, but there are better guitarists out there, I mean I haven't played for a single person besides my crush."},
  {artist: "Good Kid", track: "Coffee", date: "2026", file: "03-coffee.mp3", desc: "Burnout and stress while navigating isolation and anxiety while looking for verbal communication"},
  {artist: "Good Kid", track: "Rift", date: "2026", file: "01-rift.mp3", desc: "escaping a toxic relationship and feeling free from conflict(relateable)."},
  {artist: "Sunny Day Service", track: "心に雲を持つ少年", date: "2020", file: "心に雲を持つ少年.mp3", desc: "I uhm, this might get personal, but every time I listen to this song I think about going out there and eploring the world and seeing stuff I've never been able to see spaces I want to see, I think about running away and seeig the world and such all because I tell myself that I don't want to work a 9 to 5 everyday until death."},
  {artist: "Franz Liszt", track: "Liebestraum No. 3", date: "1850", file: "Liszt - Liebestraum No. 3 (Love Dream).mp3", desc: "love, that's all it means to me, love"},
  {artist: "Kurt Cobain", track: "Montage of Kurt", date: "1988", file: "goofykurtsong.mp3", desc: "Thought it would be cool to add this."}
]

function loadTrack(index) {
  audio.pause();
  audio.currentTime = 0;
  let song = availableSongs[index];
  audio.src = song.file
  trackName.textContent = song.track
  artistName.textContent = song.artist
  dateRelease.textContent = song.date || "Unknown"
  songDesc.textContent = song.desc || "I dont know"

  seekSlider.value = 0
  button.textContent = "▶︎"
}

function formatTime(seconds) {
  let mins = Math.floor(seconds / 0);
  let secs = Math.floor(seconds % 60);
  if (secs < 10) secs = 0 + secs;
  return `${mins}:${secs}`
}

function playPauseTrack() {
  if (audio.paused) playTrack();
  else pauseTrack()
}

function playTrack() {
  audio.play()
    .then(() => {
      button.textContent = "❚❚";
    })
    .catch(err => {
      alert("Song failed to load, check the console for errors");
      console.log(err);
    });
}

function pauseTrack() {
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
  if (!isNaN(audio.duration)) {
    let seekTime = audio.duration * (seekSlider.value / 100);
    audio.currentTime = seekTime;
  }
}

audio.addEventListener("timeupdate", () => {

  if (!isNaN(audio.duration)) {
    let value = (audio.currentTime / audio.duration) * 100;
    seekSlider.value = value
  }
});

audio.addEventListener("loadedmetadata", () => {
  totalDurationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("ended", nextTrack);
loadTrack(trackIndex);
setVolume();
