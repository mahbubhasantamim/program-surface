//nav
var bars = document.getElementById("bars");
var X = document.getElementById("X");
var nav = document.getElementById("m-nav");

bars.addEventListener("click", () => {
  X.style.display = "block";
  bars.style.display = "none";
  nav.style.display = "block";
});
X.addEventListener("click", () => {
  X.style.display = "none";
  bars.style.display = "block";
  nav.style.display = "none";
});

//faq
var question = document.querySelectorAll("#question");
var answer = document.querySelectorAll("#answer");
var rightArrow = document.querySelectorAll("#right-arrow");
var downArrow = document.querySelectorAll("#down-arrow");

for (let i = 0; i < question.length; i++) {
  let count = 0;

  question[i].addEventListener("click", function () {
    answer[i].style.display = "block";
    rightArrow[i].style.display = "none";
    downArrow[i].style.display = "block";
    count++;
    if (count % 2 == 0) {
      answer[i].style.display = "none";
      rightArrow[i].style.display = "block";
      downArrow[i].style.display = "none";
    }
  });
}

//roadmap
var roadmapFirstItems = document.querySelectorAll(".roadmap-first-items");
var roadmapSecond = document.querySelectorAll(".roadmap-second");
for (let i = 0; i < roadmapFirstItems.length; i++) {
  roadmapFirstItems[i].addEventListener("click", () => {
    roadmapSecond[i].classList.toggle("show");
  });
}
