doomLink = "https://ustymukhman.github.io/WebDOOM/public/"

console.log("STOP PEAKING!")

const detectDevice = () {

  const isMobileScreen = window.watchMedia("(max-width: 1024px)").matches;
  const isTouchScreen = window.watchMedia("(pointer: coarse)").matches || ('ontouchstart' in window);

  if (isMobileScreen && isTouchScreen) {
    return "Are you on Mobile?"
  }
  return "Are you on PC?"
}

console.log(detectDevice());

console.log("well you found the DOOM game")
