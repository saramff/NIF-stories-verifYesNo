////////////////////////////////////////////////////////////////////////
//                           Creations                                //
//                                                                    //  
////////////////////////////////////////////////////////////////////////

import { createClient } from "@supabase/supabase-js";
import { stories, words } from "./objects.js";


/**************************************************************************************/

const randomNumber = Math.random();

let correctKey;
let incorrectKey;

if (randomNumber < 0.5) {
  correctKey = "a";
  incorrectKey = "l";
} else {
  correctKey = "l";
  incorrectKey = "a";
}


/**************************************************************************************/

// Create suffle function - suffles array index randomly
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


/**************************************************************************************/

// Function to randomize positive/negative sentences in experimental sentences (50% each)
function randomizeExperimentalSentences(story) {
  const experimentalArray = story.filter((story) => !story.base);
  const experimentalLength = experimentalArray.length;
  const randomPosNegArray = [];

  for (let i = 0; i < experimentalLength / 2; i++) {
    randomPosNegArray[i] = "positive";
    randomPosNegArray[experimentalLength - 1 - i] = "negative";
  }

  shuffle(randomPosNegArray);

  experimentalArray.forEach(
    (experimentalObject, index) => {
      experimentalObject.text = experimentalObject.options[randomPosNegArray[index]];
      experimentalObject.type = randomPosNegArray[index];
    }
  );
}

shuffle(stories);
randomizeExperimentalSentences(stories[0].sentences);
randomizeExperimentalSentences(stories[1].sentences);

const firstStory = stories[0];
const secondStory = stories[1];


/**************************************************************************************/

// Create verification questions array

let createQuestionsArray = (mainStory) => {
  let filteredExperimental = mainStory.sentences.filter((sentence) => !sentence.base);

  return filteredExperimental.map((story) => {
    let questionIs;
    let correctResponse;

    if (story.type === "positive") {
      questionIs = true;
      correctResponse = correctKey;
    } else {
      questionIs = false;
      correctResponse = incorrectKey
    }

    return {
      question: story.question,
      questionIs,
      correctResponse
    }
  })
}

let questions1 = createQuestionsArray(firstStory);
let questions2 = createQuestionsArray(secondStory);

let verificationQuestions = [...questions1, ...questions2];

shuffle(verificationQuestions);


/**************************************************************************************/

words.forEach((word) => {
  if (word.old) word.correctResponse = correctKey;
  else word.correctResponse = incorrectKey;  
})

shuffle(words);


/**************************************************************************************/

/* Initialize jsPsych */
let jsPsych = initJsPsych();

// ======================================================
// Quitar automáticamente el asterisco (*) de required
// en jsPsych survey (v8)
// ======================================================

function removeRequiredAsterisks() {

  // 1) Si el * es un span/sup o elemento independiente
  document
    .querySelectorAll(
      ".jspsych-survey-multi-choice-question span, " +
      ".jspsych-survey-text-question span, " +
      ".jspsych-survey-multi-choice-question sup, " +
      ".jspsych-survey-text-question sup, " +
      ".jspsych-survey-multi-choice-question .required, " +
      ".jspsych-survey-text-question .required"
    )
    .forEach(el => {
      if (el.textContent.trim() === "*") el.remove();
    });

  // 2) Si el * está pegado al texto del prompt
  document
    .querySelectorAll(
      ".jspsych-survey-multi-choice-question, .jspsych-survey-text-question"
    )
    .forEach(q => {
      q.querySelectorAll("p, legend, label, div").forEach(node => {
        node.childNodes.forEach(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            child.textContent = child.textContent.replace(/\*\s*$/, "");
          }
        });
      });
    });
}

// Ejecutar una vez
removeRequiredAsterisks();

// Observar cambios de pantalla (jsPsych renderiza dinámicamente)
const observer = new MutationObserver(() => removeRequiredAsterisks());
observer.observe(document.body, { childList: true, subtree: true });

/* Create timeline */
let timeline = [];

////////////////////////////////////////////////////////////////////////
//                           Consent                                  //
//                                                                    //  
////////////////////////////////////////////////////////////////////////

let check_consent = (elem) => {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("Muchas gracias por tu interés en nuestro experimento. Si estás listo para participar, por favor, danos tu consentimiento.");
    return false;
  }
  return false;
};

let html_block_consent = {
  type: jsPsychExternalHtml,
  url: "consentA2.html",
  cont_btn: "start_experiment",
  check_fn: check_consent
};
timeline.push(html_block_consent);

////////////////////////////////////////////////////////////////////////
//                           Demographic  variables                   //
////////////////////////////////////////////////////////////////////////

/* fullscreen */
timeline.push({
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: '<p>Por favor, haz clic para cambiar al modo de pantalla completa.</p>',
  button_label:'Continuar',
  on_finish: function(data){
    var help_fullscreen = data.success;
    jsPsych.data.addProperties({fullscreen: help_fullscreen});
  }
});

var participantName = {
  type: jsPsychSurveyText,
  preamble: 'A continuación, le preguntaremos algunos datos.',
  name: 'participantName',
    button_label:'Continuar',
    questions: [{prompt:'<div>¿Cuál es tu nombre y apellidos?<\div>', rows: 1, columns: 2, required: 'true'}],
  data: {
    type:"demo",
    participantName: participantName,
  },
  on_finish: function(data){
    var help_participantName = data.response.Q0;
    jsPsych.data.addProperties({participantName: help_participantName});
  },
  on_load: function() {
    document.querySelector('.jspsych-btn').style.marginTop = '20px'; // Adjust margin as needed
  }
};

timeline.push(participantName);

var age = {
  type: jsPsychSurveyText,
    name: 'age',
    button_label:'Continuar',
    questions: [{prompt:'<div>¿Cuántos años tienes?<\div>', rows: 1, columns: 2, required: 'true'}],
  data: {
    type:"demo",
    age: age,
  },
  on_finish: function(data){
    var help_age = data.response.Q0;
    jsPsych.data.addProperties({age: help_age});
  },
  on_load: function() {
    document.querySelector('.jspsych-btn').style.marginTop = '20px'; // Adjust margin as needed
  }
};

timeline.push(age);

var demo2 = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt:'Por favor, selecciona el género con el que te identificas.',
      name: 'gender',
      options: ["masculino", "femenino", "otro", "prefiero no decirlo"],
      required: true,
      horizontal: true
    },
     {
      prompt:'Por favor, selecciona tu lengua materna.',
      name: 'language',
      options: ["español", "otro"],
      required: true,
      horizontal: true
    },
  ],
  button_label:'Continuar',
  on_finish: function(data) {
    var help_gender = data.response.gender;
    var help_language = data.response.language;
    jsPsych.data.addProperties({gender: help_gender, language: help_language});
  }
};
timeline.push(demo2);


/************************************************************************************************ */

/* Fixation trial */
let fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS", // Prevent key press
  trial_duration: 500, // Fixation duration
  data: {
    task: "fixation",
  },
};

/* Welcome message trial */
let welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div class="instrucciones">
  <p>Bienvenido al experimento.</p>
  <p>Pulsa la barra espaciadora para comenzar.</p>
</div>`,
  choices: [' '],
};
timeline.push(welcome);


/**************************************************************************************/

/* Instructions for sentence presentation */
let instructionsSentencePresentation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="instrucciones">
    <p>Ahora vas a leer una historia, dividida en párrafos y frases sueltas.</p>
    <p>Tu tarea consiste en leer detenidamente y de forma comprensiva, imaginándote dentro de la situación que se está describiendo.</p>
    <p>No necesitas realizar ninguna acción más allá de leer y comprender.</p>
    <p>Los fragmentos irán apareciendo y desapareciendo automáticamente, con una duración que varía en función de la longitud del texto mostrado.</p>
    <p>Posteriormente te preguntaremos por la historia. Eso quiere decir que es importante que comprendas bien e integres sus diferentes elementos.</p>
    <br />
    <p><strong>Pulsa la barra espaciadora para comenzar.</strong></p>
  </div>
  `,
  choices: [' ']
};
timeline.push(instructionsSentencePresentation);


/* Create stimuli array for sentence presentation */
let sentencesPresentationStimuli = firstStory.sentences.map((sentence) => {
  return {
    stimulus: `
      <h3 class="sentence">${sentence.text}</h3>
    `,
    type: sentence.type,
    keyword1: sentence.keyword1,
    keyword2: sentence.keyword2,
    isIntroductory: sentence.introductory,
    classification: sentence.base ? "base" : "experimental",
  };
});

/* Sentences presentation trial */
let sentencesPresentation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: "NO_KEYS",

  trial_duration: function(){
    const isIntroductory = jsPsych.evaluateTimelineVariable("isIntroductory");
    return isIntroductory ? 25000 : 5000;
  },

  data: {
    task: "sentences presentation",
    type: jsPsych.timelineVariable("type"),
    keyword1: jsPsych.timelineVariable("keyword1"),
    keyword2: jsPsych.timelineVariable("keyword2"),
    classification: jsPsych.timelineVariable("classification"),
  },
};

/* Test procedure: fixation + sentences presentation */
let sentencesPresentationProcedure = {
  timeline: [sentencesPresentation],
  timeline_variables: sentencesPresentationStimuli,
};
timeline.push(sentencesPresentationProcedure);

/*End of story instructions */
let endOfStory1 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="instrucciones">
    <p>— Fin del texto —</p>
    <br />
    <p><strong>Pulsa la barra espaciadora para continuar.</strong></p>
  </div>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(endOfStory1);

/**************************************************************************************/

/* Instructions for sentence presentation */
let instructionsSentencePresentation2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="instrucciones">
    <p>Ahora vas a leer otra historia.</p>
    <p>Al igual que antes, el texto se presentará en pantallas sucesivas.</p>
    <p>Tu tarea es la misma: lee detenidamente y de forma comprensiva, imaginándote dentro de la situación que se describe.</p>
    <p>De nuevo, no necesitarás realizar ninguna acción para avanzar.</p>
    <p>También te preguntaremos más adelante por esta historia, así que asegúrate de comprender e integrar sus elementos.</p>
    <br />
    <p>Pulsa la barra espaciadora para comenzar.</p>
   </div>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructionsSentencePresentation2);

/* Create stimuli array for sentence presentation */
let sentencesPresentationStimuli2 = secondStory.sentences.map((sentence) => {
  return {
    stimulus: `
      <h3 class="sentence">${sentence.text}</h3>
    `,
    type: sentence.type,
    keyword1: sentence.keyword1,
    keyword2: sentence.keyword2,
    isIntroductory: sentence.introductory,
    classification: sentence.base ? "base" : "experimental",
  };
});

/* Sentences presentation trial */
let sentencesPresentation2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: "NO_KEYS",

  trial_duration: function(){
    const isIntroductory = jsPsych.evaluateTimelineVariable("isIntroductory");
    return isIntroductory ? 12000 : 6000;
  },

  data: {
    task: "sentences presentation",
    type: jsPsych.timelineVariable("type"),
    keyword1: jsPsych.timelineVariable("keyword1"),
    keyword2: jsPsych.timelineVariable("keyword2"),
    classification: jsPsych.timelineVariable("classification"),
  },
};

/* Test procedure: fixation + sentences presentation */
let sentencesPresentationProcedure2 = {
  timeline: [sentencesPresentation2],
  timeline_variables: sentencesPresentationStimuli2,
};
timeline.push(sentencesPresentationProcedure2);

/* End of story 2 */
let endOfStory2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="instrucciones">
    <p>— Fin del texto —</p>
    <br />
    <p><strong>Pulsa la barra espaciadora para continuar.</strong></p>
  </div>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(endOfStory2);


/**************************************************************************************/

/* Instructions for verification presentation */
let instructionsVerification = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="instrucciones">
    <p>Ahora es el momento de responder a preguntas sobre las historias previas.</p>
    <p>Verás una serie de oraciones en la pantalla, mostradas de una en una.</p>
    <p>Tendrás que indicar si la información que aparece en la oración es verdadera o falsa según las historias que acabas de leer.</p>
    <p>Por ejemplo, imagina que en la historia leíste:</p>
    <p><em>"La niña no tiene gafas."</em></p>

    <p>Si ahora aparece la oración:</p>
    <p><em>"¿La niña tiene gafas?"</em></p>

    <p>La respuesta correcta sería NO, porque en la historia se decía que la niña no tenía gafas.</p>
    <p>En cambio, si en la historia hubieras leído “La niña tiene gafas”, tu respuesta debería ser SÍ.</p>

    <p>Para responder harás lo siguiente:</p>
    <p><strong>Si la oración es correcta</strong>, pulsa la tecla '${correctKey.toUpperCase()}' (SÍ).</p>
    <p><strong>Si la oración es incorrecta</strong>, pulsa la tecla '${incorrectKey.toUpperCase()}' (NO).</p>

    <p>Te recomendamos colocar los dedos sobre las teclas ${correctKey.toUpperCase()} y ${incorrectKey.toUpperCase()} durante la tarea para no olvidarlas.</p>

    <p><strong>Responde lo más rápido y preciso posible.</strong></p>

    <p>Pulsa la barra espaciadora para comenzar.</p>
  </div>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructionsVerification);

/* Create stimuli array for verification presentation */
let verificationStimuli = verificationQuestions.map((question) => {
  return {
    stimulus: `
      <h3 class="sentence">${question.question}</h3>
      <div class="keys">
        <p class="${correctKey === 'a' ? 'left' : 'right'}">SÍ</p>
        <p class="${correctKey === 'a' ? 'right' : 'left'}">NO</p>
      </div>
    `,
    correct_response: question.correctResponse,
    question_is: question.questionIs
  };
});

/* verification presentation trial */
let testVerification = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ['a', 'l'],
  data: {
    task: "response verification test",
    correct_response: jsPsych.timelineVariable("correct_response"),
    question_is: jsPsych.timelineVariable("question_is")
  },
  on_finish: function (data) {
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
    data.correct_response_meaning = correctKey === data.correct_response ? "SÍ" : "NO";
  },
};

/* Test procedure: fixation + verification presentation */
let testVerificationProcedure = {
  timeline: [fixation, testVerification],
  timeline_variables: verificationStimuli,
  randomize_order: true, // Randomize objects name order
};
timeline.push(testVerificationProcedure);


/**************************************************************************************/

/* Instructions for Tetris */
let instructionstetris = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="instrucciones">
    <p>Ahora jugarás al Tetris durante 12 minutos.</p>
    <p>En Tetris, hay piezas de diferentes formas que caen desde la parte superior de la pantalla.</p>
    <p>Tu objetivo es moverlas y girarlas para que encajen y formen líneas horizontales completas.</p>
    <p>Cuando una línea se completa, desaparece. Si las piezas se acumulan hasta llegar a la parte superior, pierdes.</p>
    <p>Controles:</p>
    <p><strong>Flecha izquierda:</strong> Mueve la pieza a la izquierda</p>
    <p><strong>Flecha derecha:</strong> Mueve la pieza a la derecha</p>
    <p><strong>Flecha arriba:</strong> Gira la pieza</p>
    <p><strong>Flecha abajo:</strong> Acelera la caída</p>
    <p>Cuando aparezca la pantalla del juego, haz clic en <strong>"Play"</strong> para iniciar.</p>
    <p>Si pierdes, selecciona <strong>"Try again"</strong> para reiniciar. Jugarás de esta manera hasta que se agote el tiempo.</p>
    <br />
    <p><strong>Pulsa la barra espaciadora para comenzar.</strong></p>
  </div>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructionstetris);

/* Tetris */
let tetris = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div class="tetris-visible"></div>
  `,
  post_trial_gap: 500,
  choices: "NO_KEYS", // Prevent key press
  trial_duration: 100, 
};
timeline.push(tetris);


/**************************************************************************************/


/* Instructions for words presentation */
let instructionsWordsPresentation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="instrucciones">
    <p>Ahora realizarás una última tarea:</p>
    <p>Verás una serie de palabras en la pantalla que se mostrarán una a una.</p>
    <p>Algunas de estas palabras han podido aparecer en los textos que leíste anteriormente y otras serán nuevas.</p>
    <p>Tu tarea consiste en indicar para cada palabra:.</p>
    <p>VISTA, si fue una palabra leída en las fases previas.</p>
    <p>NUEVA, si la palabra no apareció en ninguna de las previas.</p>

    <p>Para responder harás lo siguiente:</p>
    <p><strong>Si has visto<strong> antes el objeto, pulsa la tecla '${correctKey.toUpperCase()}' (VISTA).</p>
    <p><strong>Si no has visto<strong> antes el objeto, pulsa la tecla '${incorrectKey.toUpperCase()}' (NUEVA).</p>
    <p>Te recomendamos colocar los dedos sobre las teclas ${correctKey.toUpperCase()} y ${incorrectKey.toUpperCase()} durante la tarea para no olvidarlas.</p>
    <p>Pulsa la barra espaciadora para comenzar.</p>
  </div>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructionsWordsPresentation);

/* Create stimuli array for words presentation */
let wordsStimuli = words.map((word) => {
  return {
    stimulus: `
      <h3 class="sentence">${word.word}</h3>
      <div class="keys">
        <p class="${correctKey === 'a' ? 'left' : 'right'}">VISTA</p>
        <p class="${correctKey === 'a' ? 'right' : 'left'}">NUEVA</p>
      </div>
    `,
    correct_response: word.correctResponse
  };
});

/* words presentation trial */
let testWords = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ['a', 'l'],
  data: {
    task: "response words test",
    correct_response: jsPsych.timelineVariable("correct_response"),
  },
  on_finish: function (data) {
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
    data.correct_response_meaning = correctKey === data.correct_response ? "PRESENTE" : "NO PRESENTE";
  },
};

/* Test procedure: fixation + words presentation */
let testWordsProcedure = {
  timeline: [fixation, testWords],
  timeline_variables: wordsStimuli,
  randomize_order: true, // Randomize objects name order
};
timeline.push(testWordsProcedure);


// /**************************************************************************************/


const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

const TABLE_NAME = "StoriesNIFVerifYesNo";

async function saveData(data) {
  console.log(data);
  const { error } = await supabase.from(TABLE_NAME).insert({ data });

  return { error };
}

const saveDataBlock = {
  type: jsPsychCallFunction,
  func: function() {
    saveData(jsPsych.data.get())
  },
  timing_post_trial: 200
}

timeline.push(saveDataBlock);



// /**************************************************************************************/


/* Goodbye message trial */
let goodbye = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div class="instrucciones">
      <p>Muchas gracias por haber realizado el experimento.</p>
      <p>Pulsa la barra espaciadora para salir.</p>
    </div>
  `,
  choices: [' '],
};
timeline.push(goodbye);


// /**************************************************************************************/



/* Run the experiment */
jsPsych.run(timeline);

// Uncomment to see the results on the console (for debugging)
console.log(jsPsych.data.get());