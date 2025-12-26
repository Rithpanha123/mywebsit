let words = document.querySelectorAll(".word");

words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.appendChild(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;

words[currentWordIndex].style.opacity = "1";

let changeWord = () => {
  let currentWord = words[currentWordIndex];
  let nextWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;

  let nextWord = words[nextWordIndex];
  nextWord.style.opacity = "1";

  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });

  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });

  currentWordIndex = nextWordIndex;
};

setInterval(changeWord, 4000);

/*count left--------------------------------------------------------------*/
document.querySelectorAll(".count").forEach((counter) => {
  let start = 0;
  const target = +counter.dataset.target;
  const speed = 20;

  const updateCount = () => {
    if (start <= target) {
      counter.innerText = start + "%";
      start++;
      setTimeout(updateCount, speed);
    }
  };

  updateCount();
});
/*count number----------------------------*/
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  let start = 0;
  const target = +counter.dataset.target;
  const speed = 20; // smaller = faster

  const update = () => {
    start++;
    counter.innerText = start + "%";
    if (start < target) {
      setTimeout(update, speed);
    }
  };

  update();
});
/*link smoot-----------------------------*/
document.querySelectorAll("a.smooth-scroll").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const offset = 80; // បើមាន fixed header
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: "smooth",
    });
  });
});
