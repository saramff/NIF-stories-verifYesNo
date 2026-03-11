////////////////////////////////////////////////////////////////////////
//                           Creations                                //
//                                                                    //  
////////////////////////////////////////////////////////////////////////

import { createClient } from "@supabase/supabase-js";
import { stories, verificationSentences, words } from "./objects.js";


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

shuffle(stories);

const firstStory = stories[0];
const secondStory = stories[1];


/**************************************************************************************/

shuffle(verificationSentences);
let verificationLength = verificationSentences.length;

for (let i = 0; i < verificationLength / 2; i++) {
  verificationSentences[i].text = verificationSentences[i].trueVerification;
  verificationSentences[i].correctResponse = correctKey;
  verificationSentences[verificationLength - 1 - i].text = verificationSentences[verificationLength - 1 - i].falseVerfication;
  verificationSentences[verificationLength - 1 - i].correctResponse = incorrectKey;
}

shuffle(verificationSentences);


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

var age = {
  type: jsPsychSurveyText,
    preamble: 'A continuación, te preguntaremos algunos datos.',
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
    <p>Ahora vas a leer una historia.</p>
    <p>La historia se presentará en segmentos (por ejemplo, una frase cada vez).</p>
    <p>Tu tarea consiste en <strong>leer detenidamente y de forma comprensiva</strong> la información, <strong>imaginándote dentro de la situación</strong> que describe la historia.</p>
    <p><strong>Muy importante:</strong> presta mucha atención durante la lectura, porque <strong>después te haremos unas preguntas</strong> sobre el contenido del texto.</p>
    <p>Para poder responder correctamente, asegúrate de comprender bien cada fragmento antes de pasar al siguiente.</p>
    <p>Puedes tomarte el tiempo que necesites para leer cada fragmento:<br>
    <strong>Tú</strong> decidirás cuándo pasar al siguiente.</p>
    <p>Para avanzar y ver el siguiente fragmento, pulsa la <strong>barra espaciadora</strong>.</p>
    <br />
    <p><strong>Pulsa la barra espaciadora para comenzar.</strong></p>
  </div>
  `,
  choices: [' ']
};
timeline.push(instructionsSentencePresentation);


/* Instructions for sentence presentation reminder */
let instructionsSentencePresentation_reminder = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="instrucciones">
    <p>⚠️ <strong>Recuerda:</strong></p>
    <p>Es fundamental que leas el texto con <strong>mucha atención</strong>, de forma <strong>comprensiva</strong> e <strong>imaginándote dentro de la situación</strong> que describe la historia.</p>
    <p>Al finalizar la lectura, responderás preguntas sobre su contenido.</p>
    <p>Tu objetivo es <strong>comprender bien</strong> cada fragmento antes de continuar.</p>
    <br />
    <p><strong>Pulsa la barra espaciadora para comenzar la lectura.</strong></p>
  </div>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructionsSentencePresentation_reminder);


/* Create stimuli array for sentence presentation */
let sentencesPresentationStimuli = firstStory.sentences.map((sentence) => {
  return {
    stimulus: `
      <h3 class="sentence">${sentence.text}</h3>
    `,
  };
});

/* Sentences presentation trial */
let sentencesPresentation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: [' '],
  data: {
    task: "sentences presentation",
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
    <p>Ahora vas a leer un segundo texto.</p>
    <p>Al igual que antes, el texto se presentará en pantallas sucesivas.</p>
    <p>Tu tarea es la misma: <strong>lee detenidamente y de forma comprensiva</strong> cada parte del texto, <strong>imaginándote dentro de la situación</strong> que describe la historia.</p>
    <p>Es importante que prestes atención, porque al finalizar te haremos unas preguntas sobre el contenido.</p>
    <p>No hay límite de tiempo: puedes tomarte el tiempo que necesites en cada pantalla.<br>
    Para avanzar, pulsa la <strong>barra espaciadora</strong>.</p>
    <br />
    <p>Pulsa la barra espaciadora para comenzar.</p>
   </div>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructionsSentencePresentation2);

/* Instructions for sentence presentation reminder 2 */
let instructionsSentencePresentation_reminder2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="instrucciones">
    <p>⚠️ <strong>Recuerda:</strong></p>
    <p>Es fundamental que leas el texto con <strong>mucha atención</strong>, de forma <strong>comprensiva</strong> e <strong>imaginándote dentro de la situación</strong> que describe la historia.</p>
    <p>Al finalizar la lectura, responderás preguntas sobre su contenido.</p>
    <p>Tu objetivo es <strong>comprender bien</strong> cada fragmento antes de continuar.</p>
    <br />
    <p><strong>Pulsa la barra espaciadora para comenzar la lectura.</strong></p>
  </div>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructionsSentencePresentation_reminder2);

/* Create stimuli array for sentence presentation */
let sentencesPresentationStimuli2 = secondStory.sentences.map((sentence) => {
  return {
    stimulus: `
      <h3 class="sentence">${sentence.text}</h3>
    `,
  };
});

/* Sentences presentation trial */
let sentencesPresentation2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: [' '],
  data: {
    task: "sentences presentation",
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


/* Instructions for verification presentation */
let instructionsVerification = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="instrucciones">
    <p>Ahora realizarás la siguiente tarea:</p>
    <p>A continuación verás una serie de <strong>oraciones</strong> en la pantalla que se mostrarán una a una.</p>
    <p>Algunas de estas oraciones serán <strong>correctas</strong> y otras serán <strong>incorrectas</strong> en relación con la información que acabas de leer en los textos.</p>
    
    <p>Por ejemplo:</p>
    <p><em>"El gato está encima de la mesa."</em></p>
    <p>Para responder harás lo siguiente:</p>
    <p><strong>Si la oración es correcta</strong>, pulsa la tecla '${correctKey.toUpperCase()}' (SÍ).</p>
    <p><strong>Si la oración es incorrecta</strong>, pulsa la tecla '${incorrectKey.toUpperCase()}' (NO).</p>

    <p>Te recomendamos colocar los dedos sobre las teclas ${correctKey.toUpperCase()} y ${incorrectKey.toUpperCase()} durante la tarea para no olvidarlas.</p>
    <p>Pulsa la barra espaciadora para comenzar.</p>
  </div>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructionsVerification);

/* Create stimuli array for verification presentation */
let verificationStimuli = verificationSentences.map((verificationSentece) => {
  return {
    stimulus: `
      <h3 class="sentence">${verificationSentece.text}</h3>
      <div class="keys">
        <p class="${correctKey === 'a' ? 'left' : 'right'}">SÍ</p>
        <p class="${correctKey === 'a' ? 'right' : 'left'}">NO</p>
      </div>
    `,
    correct_response: verificationSentece.correctResponse
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
  trial_duration: 720000, 
};
timeline.push(tetris);


/**************************************************************************************/


/* Instructions for words presentation */
let instructionsWordsPresentation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="instrucciones">
    <p>Ahora realizarás la siguiente tarea:</p>
    <p>A continuación verás una serie de <strong>palabras</strong> en la pantalla que se mostrarán una a una.</p>
    <p>Algunas de estas palabras han podido aparecer en los textos que leíste anteriormente y otras serán nuevas.</p>
    <p>Tu tarea consiste en indicar si cada palabra estuvo <strong>PRESENTE</strong> o <strong>NO PRESENTE</strong> en cualquiera de los dos textos.</p>

    <p>Para responder harás lo siguiente:</p>
    <p><strong>Si has visto<strong> antes el objeto, pulsa la tecla '${correctKey.toUpperCase()}' (presente).</p>
    <p><strong>Si no has visto<strong> antes el objeto, pulsa la tecla '${incorrectKey.toUpperCase()}' (no presente).</p>
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
        <p class="${correctKey === 'a' ? 'left' : 'right'}">PRESENTE</p>
        <p class="${correctKey === 'a' ? 'right' : 'left'}">NO PRESENTE</p>
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

const TABLE_NAME = "StoriesNIFMainObjectVerification";

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