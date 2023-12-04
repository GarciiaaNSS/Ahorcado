String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
} //Convertir mayusculas en minusculas para que el java lo reconozca.

var palabras = ["supra", "gtr", "turbo", "llanta", "suspension", "frenos", "intercooler", "bujia", "correas", "escape", "volante", "aleron", "airbag", "luces", "maletero", "motor", "luna"]; //Array depalabras, con todo el listado de palabras que se pueden adivinar.

var palabra = palabras[Math.floor(Math.random() * palabras.length)]; //elegir palabra aleatoria
let BarraBaja = palabra.replace(/./g, "_ "); //remplazar las letras por barrabaja
let fallos = 0; //establecer el numero de fallos a 0
let intentos = 4; //intentos maximos 4


var input = document.getElementById("letras");
input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("hallar").click();
    }
}); //Al presionar la tecla enter ejecuta la mismafunción hallar que el boton comprobar


document.querySelector('#problema').innerHTML = BarraBaja;
document.querySelector('#hallar').addEventListener('click', () => {
    var letra = document.querySelector('#letras').value;
    letra = letra.toLowerCase();
    let haFallado = true;

    //Se sustituye la barrabaja por la letra aceptada

    for (const i in palabra) {
        if (letra == palabra[i]) {
            BarraBaja = BarraBaja.replaceAt(i * 2, letra);

            haFallado = false;
        }
    }



    if (haFallado) {
        fallos++; //sumar un fallo
        intentos--; //restar un intento
        document.getElementById("intentos").innerHTML = intentos;
        document.querySelector('#ahorcado').style.backgroundPosition = -(264 * fallos) + 'px 0';
        if (fallos == 4) { //una vez llegado al numero maximo de fallos muestra lo siguiente
            document.getElementById("perdicion").innerHTML = ('HAS PERDIDO!!'); //mostrar mensaje al perder
            document.getElementById("perdedor").innerHTML = ('La palabra era: ' + palabra + '.'); //mostrar la palabra que era al perder
            clearInterval(id); //parar cuenta atras
        }
    } else {
        if (BarraBaja.indexOf('_') < 0) {
            document.getElementById("ganador").innerHTML = ('HAS GANADO!!'); //mensaje de ganar
            clearInterval(id); //parar cuenta atras
            document.getElementById('contador').innerHTML = ('Te han sobrado: ' + counter + ' segundos.'); //tiempo que ha sobrado
        }
    }


    document.querySelector('#problema').innerHTML = BarraBaja;
    document.querySelector('#letras').value = '';

});


//c¡Cuenta atras una vez iniciado el juego
var counter = 121; //121 segundos para que el numero que muestre se a una cuenta atras desde 120
var id = setInterval(function () {
    if (counter == 0) { //mostarar mensajes de perder al llegar el contador a cero
        document.getElementById("perdicion").innerHTML = ('HAS PERDIDO!!');
        document.getElementById("perdedor").innerHTML = ('La palabra era: ' + palabra + '.');
        clearInterval(id);
        document.getElementById('contador').innerHTML = ('Te has quedado sin tiempo');

    } else {
        counter = counter - 1;
        document.getElementById('contador').innerHTML = ('Te quedan: ' + counter + ' segundos.');
    }
}, 1000); //mostrar el cambio de cuenta atras cada mil milisegundos, es decir un segundo.
