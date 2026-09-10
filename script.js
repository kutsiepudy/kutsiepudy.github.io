const doomLink = "https://ustymukhman.github.io/WebDOOM/public/"

console.log("STOP PEAKING!")

const detectDevice = () => {

  const isMobileScreen = window.matchMedia("(max-width: 1180px)").matches;
  const isTouchScreen = window.matchMedia("(pointer: coarse)").matches || ('ontouchstart' in window);

  if (isMobileScreen && isTouchScreen) {
    return "Are you on Mobile?"
  }
  return "Are you on PC?"
}

console.log(detectDevice());
console.log(doomLink)
console.log("well you found the DOOM game")


const cursor = document.getElementById("PumpkinPieCookie");
const cursorAsset = document.getElementById("cursorAsset");
const idle = "cursor/pumpkinPieCookieIdle.png";
const hover = "cursor/pumpkinPieCookieLaugh.gif";
const click = "cursor/explosion.gif"

let isHoveringLink = false;

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  if (!isHoveringLink && !document.querySelector(".cursor-container.is-clicking")) {
    cursorAsset.src = idle;
  }
});

document.addEventListener('mousedown', () => {
  cursor.classList.add('is-clicking');
  cursorAsset.src = click;
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('is-clicking');
  cursorAsset.src = isHoveringLink ? hover : idle;
});

const links = document.querySelectorAll('.tile');

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    isHoveringLink = true;
    cursorAsset.src = hover;
  });

  link.addEventListener('mouseleave', () => {
    isHoveringLink = false;
    cursorAsset.src = idle;
  });
});
