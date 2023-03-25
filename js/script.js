//variables
let workSelect = document.getElementById('work');
let breakSelect = document.getElementById('break');
let restSelect = document.getElementById('rest');

let minutosView = document.getElementById('minutos');
let segundosView = document.getElementById('segundos');

let startBtn = document.getElementById('start');
let pauseBtn = document.getElementById('pause');
let resetBtn = document.getElementById('reset');

//1- work, 2- break, 3- rest
var pulsado;

//almacena la cuenta atrás
var intervalo;

//tiempos de pomodoro
const workMinutos= 25;
const breakMinutos= "05";
const restMinutos= 20;
const segundos= "00";

let ciclo = 1;

let audioFin = new Audio('audio/finalizado.mp3');
let audio10seg = new Audio('audio/10seg.mp3');

//carga por defecto work
window.onload = () => {
    workMode();
}

//event listener
workSelect.addEventListener("click", workMode);
breakSelect.addEventListener("click", breakMode);
restSelect.addEventListener("click", restMode);

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);

//comportamiento según el modo seleccionado
function workMode(){
    workSelect.classList.add('activo');
    breakSelect.classList.remove('activo');
    restSelect.classList.remove('activo');
    minutosView.innerHTML= workMinutos;
    segundosView.innerHTML= segundos;
    pulsado = 1;
    reset();
}

function breakMode(){
    workSelect.classList.remove('activo');
    breakSelect.classList.add('activo');
    restSelect.classList.remove('activo');
    minutosView.innerHTML= breakMinutos;
    segundosView.innerHTML= segundos;
    pulsado = 2;
    reset();
}

function restMode(){
    workSelect.classList.remove('activo');
    breakSelect.classList.remove('activo');
    restSelect.classList.add('activo');
    minutosView.innerHTML= restMinutos;
    segundosView.innerHTML= segundos;
    pulsado = 3;
    reset();
}

//botones de control
function start(){
    pauseBtn.style.display = "block";
    startBtn.style.display = "none";
    intervalo = setInterval(timer, 1000);
}

function pause(){
    pauseBtn.style.display = "none";
    startBtn.style.display = "block";
    clearInterval(intervalo);
    document.title = "Pomodoro";
}

function reset(){
    pause();
    if (pulsado == 1){
        minutosView.innerHTML= workMinutos;
        segundosView.innerHTML = segundos;
    }
    else if (pulsado == 2){
        minutosView.innerHTML= breakMinutos;
        segundosView.innerHTML= segundos;
    }
    else{
        minutosView.innerHTML= restMinutos;
        segundosView.innerHTML= segundos;
    }
}

//al apretar el espacio empieza o se detiene la cuenta atrás
document.addEventListener('keydown', (event)=> {    
    if (event.code == 'Space'){
        if (pauseBtn.style.display != 'block'){
            start();
        }
        else{
            pause();
        }
    }
});

//control del tiempo
function timer(){
    if(segundosView.innerHTML != 0){
        segundosView.innerHTML = adaptar(segundosView.innerHTML - 1);
        document.title = minutosView.innerHTML+":"+segundosView.innerHTML;
        if(segundosView.innerHTML == 10 && minutosView.innerHTML == 0){
            audio10seg.play();
        }
    }
    else if (minutosView.innerHTML != 0 && segundosView.innerHTML == 0){
        minutosView.innerHTML = adaptar(minutosView.innerHTML - 1);
        segundosView.innerHTML = 59;
        document.title = minutosView.innerHTML+":"+segundosView.innerHTML;
    }
    else{
        audioFin.play();
        cambio();
    }
}

//en caso de ser menor a 10, agrega un 0 adelante
function adaptar(num){
    return (num < 10) ? "0" + num : num;
}

//al finalizar el tiempo, cambia a la siguiente etapa
function cambio(){
    if (pulsado == 1){
        ciclo++;
        if (ciclo == 8){
            restMode();
        }
        else{
            breakMode();
        }
    }
    else if (pulsado == 2){
        ciclo++;
        workMode();
    }
    else{
        ciclo = 1;
        workMode();
    }
}