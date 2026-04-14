//Formulario---------------------------------------------------------
let formulario = null;
let nombreCompletoInput = null;
let telefonoInput = null;
let correoElectronico = null;
let mensajeInput = null;
let submitButton = null;

const regexIsEmpty = /^\s*$/; 
const regexIsEmail = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

document.addEventListener("DOMContentLoaded", () => {
    formulario = document.getElementById("contactForm");
    nombreCompletoInput = document.getElementById("txtNombre");
    telefonoInput = document.getElementById("txtTelefono");
    correoElectronico = document.getElementById("txtCorreo");
    mensajeInput = document.getElementById("txtMensaje");
    submitButton = document.getElementById("btnSubmit");

    submitButton.addEventListener("click", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        let objErrores = {};
        let formularioValido = true;
        
        document.querySelectorAll('.error-text').forEach(n => n.remove());
        document.querySelectorAll('.error').forEach(n => n.classList.remove('error'));

        if (!validarEspacioVacio(nombreCompletoInput.value)) {
            objErrores['txtNombreDiv'] = {
                "error": "Nombre Completo no puede estar vacío.",
                "input": nombreCompletoInput
            }
            formularioValido = false;
        }

        if (!validarEspacioVacio(telefonoInput.value)) {
            objErrores['txtTelefonoDiv'] = {
                "error": "Numero de teléfono no puede estar vacío.",
                "input": telefonoInput
            }
            formularioValido = false;
        }

        if (!validarCorreoElectronico(correoElectronico.value)) {
            objErrores['txtCorreoDiv'] = {
                "error": "Correo electrónico no está en el formato correcto.",
                "input": correoElectronico
            }
            formularioValido = false;
        }

        if (!validarEspacioVacio(mensajeInput.value)) {
            objErrores['txtMensajeDiv'] = {
                "error": "Mensaje no puede estar vacío.",
                "input": mensajeInput
            }
            formularioValido = false;
        }

        if (formularioValido) {
            formulario.submit();
        } else {
            Object.entries(objErrores).forEach(err => {
                let [key, obj] = err;
                obj.input.classList.add('error');
                let container = document.getElementById(key);
                let errorSpan = document.createElement("DIV");
                errorSpan.innerText = obj.error;
                errorSpan.classList.add('error-text');
                container.appendChild(errorSpan);
            });
        }
    });
});

function validarEspacioVacio(valor) {
   return !regexIsEmpty.test(valor);
}
function validarCorreoElectronico(valor) {
    return regexIsEmail.test(valor);
}

//Carrusel--------------------------------------------------------
document.addEventListener("DOMContentLoaded", ()=>{
    let miCarusel = new Carousel("caruselPrincipal");
    miCarusel.init();
});

class Carousel {
    constructor(carouselId, tickTimeInSeconds = 5){
        this.carouselHolder = document.getElementById(carouselId);
        this.track = this.carouselHolder.querySelector(".track");
        this.slides = [...this.track.querySelectorAll(".slide")];
        this.minLimit = 0;
        this.maxLimit = this.slides.length - 1;
        this.currentIndex = 0;
        this.tickTime = tickTimeInSeconds * 1000;
        this.tickerId = null;
        this.direction = 1;
    }

    init() {
        this.GenerateNavigationUI();
        this.tick();
    }

    tick(){
        this.tickerId = setTimeout(
            ()=>{
                this.moveNext();
                this.tick();
            },
            this.tickTime
        );
    }

    moveNext(){
        let tmpNewIndex = this.currentIndex + this.direction;
        if (tmpNewIndex > this.maxLimit) {
            tmpNewIndex = this.maxLimit - 1;
            this.direction = -1;
        }
        if (tmpNewIndex < this.minLimit) {
            tmpNewIndex = this.minLimit + 1;
            this.direction = 1;
        }
        this.moveTo(tmpNewIndex);
    }

    moveTo(newIndex) {
        this.currentIndex = newIndex;
        this.track.style.left = `${-100 * this.currentIndex}vw`;
    }

    GenerateNavigationUI() {
        let btnLeft = document.createElement("BUTTON");
        let btnRight = document.createElement("BUTTON");

        btnLeft.classList.add("carousel-btn");
        btnLeft.classList.add("btnleft");

        btnRight.classList.add("carousel-btn");
        btnRight.classList.add("btnright");

        btnLeft.textContent = "<";
        btnRight.textContent = ">";

        btnRight.addEventListener("click", (e)=>{
            e.preventDefault();
            e.stopPropagation();
            clearTimeout(this.tickerId);
            this.direction = 1;
            this.moveNext();
            this.tick();
        });

        btnLeft.addEventListener("click", (e)=>{
            e.preventDefault();
            e.stopPropagation();
            clearTimeout(this.tickerId);
            this.direction = -1;
            this.moveNext();
            this.tick();
        });

        this.carouselHolder.appendChild(btnLeft);
        this.carouselHolder.appendChild(btnRight);
    }
}