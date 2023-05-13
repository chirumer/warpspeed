function wait_for(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true,
      });
  });
}

const quiz_container = document.createElement('div');
quiz_container.setAttribute('id', 'quiz_container');
quiz_container.style.opacity = 1.0;
quiz_container.innerHTML = `
<div class="starter hide">
  <button>Start</button>
</div>
<div class="container hide">
<!-- <span onclick="document.getElementById('quiz_container').style.display='none'" class="close">&times;</span> -->
<header>
  <p>Quiz</p>
  <div class="timer"></div>
</header>
<div class="question-box"></div>
<footer>
  <button id="next-btn">Next</button>
  <button id="finish-btn" class="hide">Finish</button>
</footer>
</div>
<div class="result-box hide">
<div class="num-div"> You have got <p id="got-num"></p> out of <p id="total-num"></p>
</div>
<div class="button-box">
  <button id="result_btn" onclick="">See Reullt</button>
  <button id="replay_btn" onclick=""> Close </button>
</div>
</div>
`;
document.body.appendChild(quiz_container);

function start_btn(btn) {
  btn.addEventListener('click', () => {
    // console.log(startBox);
    // startBox.classList.remove("hide");
    document.getElementById('popup_container').remove();
    startQuiz();
  })
}

function result_btn(btn) {
  btn.addEventListener('click', () => {
    resultShow();
  })
}

function replay_btn(btn) {
  btn.addEventListener('click', () => {
    replay();
  })
}

wait_for('#acceptBtn').then(start_btn);
wait_for('#result_btn').then(result_btn);
wait_for('#replay_btn').then(replay_btn);

let question = [
  {
    num: 1,
    title: "What is 5+5 ?",
    option: ["0", "10", "1", "25"],
    ans: "b"
  },
  {
    num: 2,
    title: "What is 5-5 ?",
    option: ["10", "1", "25", "0"],
    ans: "d"
  },
  {
    num: 3,
    title: "What is 5*5 ?",
    option: ["25", "0", "10", "1"],
    ans: "a"
  },
  {
    num: 4,
    title: "What is 5/5 ?",
    option: ["1", "0", "10", "25"],
    ans: "a"
  },
  {
    num: 5,
    title: "What is 6+6 ?",
    option: ["1", "12", "10", "25"],
    ans: "b"
  },
  {
    num: 6,
    title: "What is 6-6 ?",
    option: ["0", "1", "3", "2"],
    ans: "a"
  }
];

let abc = ["a", "b", "c", "d"];
let sum = 0;
let interval;
let opt;
let startBox = document.querySelector(".starter");
let container = document.querySelector(".container");
let queBox = document.querySelector(".question-box");
let nextBtn = document.getElementById("next-btn");
let finishBtn = document.getElementById("finish-btn");
let timerDiv = document.querySelector(".timer");
let resultBox = document.querySelector(".result-box");
let index = 0;
const eachTime = 15;
let timeLimit = question.length * eachTime;
const fixedTime = timeLimit;
// start quiz
function startQuiz() {
  startBox.classList.add("hide");
  container.classList.remove("hide");
  interval = setInterval(timer, 1000);
}

for (i = 0; i < question.length; i++) {
  queBox.innerHTML +=
    `<div class='section' id='${question[i].num}'>` +
    `<p class='title'>${question[i].title}</p>` +
    `</div>`;
  let section = queBox.querySelectorAll(".section");
  for (k = 0; k < 4; k++) {
    section[
      i
    ].innerHTML += `<div id='${abc[k]}'>(${abc[k]}) ${question[i].option[k]}</div>`;
  }
}
section = queBox.querySelectorAll(".section");
section.forEach((section1) => {
  opt = section1.querySelectorAll("div");
  let input = document.createElement("input");
  input.hidden = true;
  input.readOnly = true;
  section1.appendChild(input);
  opt.forEach((opt1) => {
    opt1.onclick = (e) => {
      section1.querySelectorAll("div").forEach((optR) => {
        optR.classList.remove("selected");
      });
      opt1.classList.add("selected");
      input.value = e.target.id;
    };
  });
});

function increament() {
  index++;
  if (index < question.length) {
    queBox.style.transform = `translateX(${-section[0].offsetWidth * index}px)`;
  }
  if (index == question.length - 1) {
    nextBtn.classList.add("hide");
    finishBtn.classList.remove("hide");
  }
}
nextBtn.onclick = () => {
  increament();
};

finishBtn.onclick = () => {
  clearInterval(interval);
  index = 0;
  container.classList.add("hide");
  resultBox.classList.remove("hide");
  for (j = 0; j < section.length; j++) {
    if (section[j].querySelector("input").value == question[j].ans) {
      sum++;
      section[j].querySelector(".selected").innerHTML +=
        "<i class='fa fa-check ricon'></i>";
    } else if (section[j].querySelector(".selected")) {
      section[j].querySelector(".selected").classList.add("wrong");
      section[j].querySelector(".selected").innerHTML +=
        "<i class='fa fa-times ricon'></i>";
    }
  }
  resultBox.querySelector("#got-num").innerHTML = sum;
  resultBox.querySelector("#total-num").innerHTML = question.length;
};
function replay() {
  sum = 0;
  index = 0;
  timeLimit = fixedTime;
  clearInterval(interval);
  interval = setInterval(timer, 1000);

  // container.classList.remove("hide");
  resultBox.classList.add("hide");
  nextBtn.classList.remove("hide");
  finishBtn.classList.add("hide");
  queBox.style.transform = `translateX(0px)`;
  queBox.style.pointerEvents = "initial";
  queBox.querySelectorAll("div").forEach((opt2) => {
    opt2.classList.remove("selected", "correct", "wrong");
  });
  queBox.querySelectorAll(".ricon").forEach((ricon) => {
    ricon.remove();
  });
  queBox.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
}
function resultShow() {
  index = 0;
  sum = 0;
  container.classList.remove("hide");
  resultBox.classList.add("hide");
  nextBtn.classList.remove("hide");
  finishBtn.classList.remove("hide");
  queBox.style.transform = `translateX(0px)`;
  for (m = 0; m < question.length; m++) {
    section[m].querySelector(`#${question[m].ans}`).classList.add("correct");
  }
  queBox.style.pointerEvents = "none";
}
// timer start
let min = (timeLimit / 60).toString().split(".")[0];
let sec = timeLimit % 60;
if (min < 10) min = "0" + min;
if (sec < 10) sec = "0" + sec;
timerDiv.innerHTML = min + " : " + sec;
function timer() {
  timeLimit--;
  min = (timeLimit / 60).toString().split(".")[0];
  sec = timeLimit % 60;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  if (timeLimit == 0) {
    clearInterval(interval);
    nextBtn.classList.add("hide");
    finishBtn.classList.remove("hide");
    queBox.style.pointerEvents = "none";
  }
  timerDiv.innerHTML = min + " : " + sec;
}
//timer end
document.onkeydown = (e) => {
  e.preventDefault();
  if (e.keyCode == 13 && index + 1 < question.length) {
    increament();
  }
};
window.onresize = () => {
  queBox.style.transform = `translateX(${-section[0].offsetWidth * index}px)`;
};
window.oncontextmenu = (e) => {
  e.preventDefault();
};