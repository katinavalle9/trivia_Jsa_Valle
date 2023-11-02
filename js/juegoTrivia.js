const preguntas = document.getElementById("preguntas");
const enviarRespuestas = document.getElementById("enviarRespuestas");
const form = document.getElementById("myForm");
const nuevaTrivia = document.getElementById("nuevaTrivia");
const resultadoSumatoria = document.getElementById("resultadoSumatoria");
const play = document.getElementById("play");
const completeTrivia = document.getElementById("completeTrivia");
const triviaUrl = "https://opentdb.com/api.php?amount=10&difficulty=medium";

// fetch(triviaUrl)
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error(`Ocurrió un error : ${response.status}`);
//     }
//   })
//   .then((trivia) => {
//     questions(trivia);
//   })
//   .catch((error) => {
//     console.log(`Ocurrio un error: ${error.message}`);
//   });

// function questions(trivia) {
//   const preguntasArray = trivia.results;
//   preguntasArray.forEach((answer, indexquestion) => {
//     const preguntaElement = document.createElement("div");
//     const respuestas = [answer.correct_answer, ...answer.incorrect_answers];
//     respuestas.sort(() => Math.random() - 0.5);
//     const preguntaTexto = document.createElement("p");
//     preguntaTexto.textContent = `${indexquestion + 1}. ${answer.question}`;
//     preguntas.appendChild(preguntaElement);
//     preguntaElement.appendChild(preguntaTexto);
//     respuestas.forEach((respuesta, index) => {
//       const radioInput = document.createElement("input");
//       radioInput.classList.add("form-check-input");
//       radioInput.type = "radio";
//       radioInput.name = `question - ${indexquestion}`;
//       if (respuesta === answer.correct_answer) {
//         radioInput.value = true;
//       } else {
//         radioInput.value = false;
//       }
//       const label = document.createElement("label");
//       label.htmlFor = `answer ${index}`;
//       label.innerText = respuesta;
//       preguntas.appendChild(radioInput);
//       preguntas.appendChild(label);
//     });
//   });
// }

// enviarRespuestas.addEventListener("click", function resultados() {
//   const formData = new FormData(form);
//   const respuestas = {};

//   for (const pair of formData.entries()) {
//     const groupName = pair[0];
//     const selectedValue = pair[1];
//     respuestas[groupName] = selectedValue;
//   }

//   console.log(respuestas);

//   let sumatoria = 0;

//   for (const key in respuestas) {
//     if (respuestas[key] === "true") {
//       sumatoria += 100;
//     }
//   }

//   console.log("Sumatoria:", sumatoria);
//   resultadoSumatoria.style.display="block";
//   resultadoSumatoria.textContent = sumatoria;

//   limpiarRespuestas();
// });

// function limpiarRespuestas() {
//   const radioInputs = document.querySelectorAll('input[type="radio"]');
//   radioInputs.forEach((radio) => {
//     radio.checked = false;
//   });
// }

// nuevaTrivia.addEventListener("click", function () {
//   location.reload();
// });

play.addEventListener("click", () => {
  completeTrivia.style.display = "block";
  play.style.display = "none";
});


async function fetchTrivia() {
  try {
    const response = await fetch(triviaUrl);
    if (!response.ok) {
      throw new Error(`Ocurrió un error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(`Ocurrió un error: ${error.message}`);
    throw error;
  }
}

async function displayQuestions(trivia) {
  const preguntasArray = trivia.results;
  for (
    let indexquestion = 0;
    indexquestion < preguntasArray.length;
    indexquestion++
  ) {
    const answer = preguntasArray[indexquestion];
    const preguntaElement = document.createElement("div");
    const respuestas = [answer.correct_answer, ...answer.incorrect_answers];
    respuestas.sort(() => Math.random() - 0.5);
    const preguntaTexto = document.createElement("p");
    preguntaTexto.textContent = `${indexquestion + 1}. ${answer.question}`;
    preguntaTexto.classList.add("question-style");
    preguntas.appendChild(preguntaElement);
    preguntaElement.appendChild(preguntaTexto);
    for (let index = 0; index < respuestas.length; index++) {
      const respuesta = respuestas[index];
      const radioInput = document.createElement("input");
      radioInput.classList.add("form-check-input", "mb-3","mx-2");
      radioInput.type = "radio";
      radioInput.name = `question - ${indexquestion}`;
      if (respuesta === answer.correct_answer) {
        radioInput.value = true;
      } else {
        radioInput.value = false;
      }
      const label = document.createElement("label");
      label.htmlFor = `answer ${index}`;
      label.innerText = respuesta;
      preguntas.appendChild(radioInput);
      preguntas.appendChild(label);
    }
  }
}

async function calculateResults() {
  const formData = new FormData(form);
  const respuestas = {};

  for (const pair of formData.entries()) {
    const groupName = pair[0];
    const selectedValue = pair[1];
    respuestas[groupName] = selectedValue;
  }

  console.log(respuestas);

  let sumatoria = 0;

  for (const key in respuestas) {
    if (respuestas[key] === "true") {
      sumatoria += 100;
    }
  }

  console.log("Sumatoria:", sumatoria);
  resultadoSumatoria.style.display = "block";
  resultadoSumatoria.textContent = sumatoria;
}

function clearAnswers() {
  const radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach((radio) => {
    radio.checked = false;
  });
}

function reloadTrivia() {
  location.reload();
}

async function main() {
  try {
    const trivia = await fetchTrivia();
    await displayQuestions(trivia);
    enviarRespuestas.addEventListener("click", async () => {
      await calculateResults();
      clearAnswers();
    });
    nuevaTrivia.addEventListener("click", () => {
      reloadTrivia();
    });
  } catch (error) {
    console.log(`Ocurrió un error: ${error.message}`);
  }
}

main();
