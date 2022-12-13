const textSpec = document.querySelector(".text");
const acertos = document.querySelector(".acertos");
const erros = document.querySelector(".erros");
const Tempo = document.querySelector(".tempo");
const media = document.querySelector(".media");

const table = {
  acertos: 0,
  erros: 0,
  text: "Lorem",
  timer: 0,
};

setInterval(() => {
  table.timer++;
  Tempo.innerText = "Tempo: " + table.timer;
}, 100);

genText();
let i = 0;

function keyPressed(event) {
  if (textSpec.innerText[i]) {
    if (!["Shift"].includes(event.key)) {
      if (textSpec.innerText[i] === event.key) {
        textSpec.getElementsByTagName("span")[i].classList.add("ativo");
        i++;
        table.acertos++;
      } else {
        table.erros++;
      }

      acertos.innerText = "Acertos: " + table.acertos;
      erros.innerText = "Erros: " + table.erros;
    }
  } else {
    genText();
  }
}

async function genText() {
  let text = await (
    await fetch("https://baconipsum.com/api/?type=all-meat&paras=1")
  ).json();
  text = text[0];
  textSpec.innerText = "";
  for (let i = 0; i < text.length; i++) {
    let span = document.createElement("span");
    span.innerText = text[i];
    textSpec.appendChild(span);
  }

  table.acertos = 0;
  table.erros = 0;
  acertos.innerText = "Acertos: " + table.acertos;
  erros.innerText = "Erros: " + table.erros;
}

addEventListener("keydown", keyPressed);
