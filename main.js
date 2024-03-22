const apiURL = "https://opentdb.com/api.php?amount=10"
const btnIniciar = document.querySelector(".btn-iniciar");
const btnReset = document.querySelector(".btn-reset");
const btnValidar = document.querySelector('.btn-validar');
const selector_trivia_category = document.getElementById("trivia_category");
const selector_trivia_difficulty = document.getElementById("trivia_difficulty");
const selector_trivia_type = document.getElementById("trivia_type");
const contenedor_preguntas = document.getElementById("container_quiz");
const label_puntos = document.getElementById("puntos")
const divResultado = document.getElementById('resultado');

let puntos = 0;

//get quiz trivia

 
function obtenerPreguntasTrivia(endpoint) {
    fetch(endpoint)
        .then(response => {
            console.log()
            // Verificar si la respuesta de la red fue exitosa
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Convertir la respuesta a formato JSON
            return response.json();
        })
        .then(data => {

            //Procesar json
            console.log('Data fetched successfully:', data);

            data.results.forEach((elemento, index) => {
                const preguntaDiv = document.createElement("div");
                preguntaDiv.classList.add("row");
                preguntaDiv.classList.add("mb-4");

                const respuestas = [elemento.correct_answer, ...elemento.incorrect_answers];

                //Respuestas aleatorias
                respuestas.sort();

                //Pregunta y respuesta
                let respuestasHTML = respuestas.map(respuesta => {
                   
                    if (elemento.correct_answer === respuesta) {
                        return `<li class="list-group-item respuesta-correcta">${respuesta}</li>`;

                    }
                    else {
                        return `<li class="list-group-item">${respuesta}</li>`;

                    }
                }).join('');

                console.log(respuestasHTML);


                preguntaDiv.innerHTML = `
                <div class="col">
                    <p><span class="question">Question #${index + 1}:</span> ${elemento.question}</p>
                    <ul class="list-group">
                        ${respuestasHTML}
                    </ul>
                </div>
            `;

            contenedor_preguntas.appendChild(preguntaDiv);
        });
    })
    .catch(error => {
        alert('Error fetching data: ' + error.message);
    });
}

//star quiz

btnIniciar.addEventListener('click', function () {
    console.log('Iniciar Trivia');
    console.log(selector_trivia_category.value);
    let endpoint = apiURL;

    if (selector_trivia_category.value != "any") {
        endpoint += `&category=${selector_trivia_category.value}`
        
    }

    if (selector_trivia_difficulty.value != "any") {
        endpoint += `&difficulty=${trivia_difficulty.value}`
    }

    if (selector_trivia_type.value != "any") {
        endpoint += `&type=${trivia_type.value}`
    }
    console.log("endpoint: ", endpoint);
    obtenerPreguntasTrivia(endpoint)

    divResultado.style.display = 'block';
});

    //reset event

    btnReset.addEventListener('click', function () {
        console.log('Resetear Trivia');
        contenedor_preguntas.innerHTML = "";
        divResultado.style.display = 'none';
        label_puntos.textContent = "";
    
    });

    //validar btn event
   
    btnValidar.addEventListener('click', function () {
        console.log('Validar Trivia');

        const respuestas = document.querySelectorAll('.list-group-item');

        let contadorRespuestasActivas = 0;

        respuestas.forEach(respuesta => {
            if (respuesta.classList.contains('active')) {
                // Incrementar el contador
                contadorRespuestasActivas++;
            }
        });

        //verificacion de las respuestas

        if (contadorRespuestasActivas === 10) {
           
            respuestas.forEach(respuesta => {
                if (respuesta.classList.contains('active')) {
                    if (respuesta.classList.contains('respuesta-correcta')) {
                       
                        puntos += 100;
                        respuesta.style.background = 'green';
                    } else {
                        
                        respuesta.style.background = 'red';
                    }
                }
            });


              // show scores 
        console.log('Puntos acumulados:', puntos);
        label_puntos.textContent = `${puntos}/1000`;
    } else {
       
        
        var toastLiveExample = document.getElementById('liveToast');
        document.getElementById('texto_alerta').textContent ="Debes seleccionar una respuesta para cada pregunta antes de validar";
        var toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
    }
});


//usuario activo

container_quiz.addEventListener('click', function (evento) {

    if (evento.target.classList.contains('list-group-item')) {

        
        console.log(evento.target);
        const todosLosItems = evento.target.parentNode.querySelectorAll('.list-group-item');

        todosLosItems.forEach(item => item.classList.remove('active'));

       
        evento.target.classList.add('active');
    }
});

//dom load

document.addEventListener("DOMContentLoaded", function () {

    // Ocultar el div de resultado
    divResultado.style.display = 'none';

})










    






      







