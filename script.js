//formulario contato
emailjs.init("SUA_PUBLIC_KEY");


const formulario = document.getElementById("form-contato");


formulario.addEventListener("submit", function (event) {

    event.preventDefault();


    emailjs.sendForm(
        "SEU_SERVICE_ID",
        "SEU_TEMPLATE_ID",
        this
    )
        .then(() => {

            alert("Mensagem enviada com sucesso!");

            formulario.reset();

        })
        .catch((erro) => {

            alert("Erro ao enviar mensagem");

            console.log(erro);
        });
});

//slider
const track = document.querySelector(".carousel-track");

const next = document.querySelector(".btn-next");

const prev = document.querySelector(".btn-prev");

const videos = document.querySelectorAll(".portfolio-video");

let sliderAtivo = true;


// pega o tamanho real do slide
function tamanhoSlide() {
    return document.querySelector(".carousel-track").clientWidth;
}


// botão próximo
next.addEventListener("click", () => {

    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 5) {

        track.scrollLeft = 0;

    } else {

        track.scrollLeft += tamanhoSlide();

    }

    iniciarAutoSlide();

});


// botão anterior
prev.addEventListener("click", () => {

    if (track.scrollLeft <= 0) {

        track.scrollLeft = track.scrollWidth - track.clientWidth;

    } else {

        track.scrollLeft -= tamanhoSlide();

    }

    iniciarAutoSlide();

});



// quando clicar em vídeo
videos.forEach(video => {

    video.addEventListener("play", () => {

        sliderAtivo = false;


        videos.forEach(outroVideo => {

            if (outroVideo !== video) {

                outroVideo.pause();

            }

        });

    });



    video.addEventListener("ended", () => {

        sliderAtivo = true;

    });

});



// passa sozinho

let tempoSlider;


function iniciarAutoSlide() {

    clearInterval(tempoSlider);


    tempoSlider = setInterval(() => {


        if (sliderAtivo) {


            track.scrollLeft += tamanhoSlide();



            if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {

                track.scrollLeft = 0;

            }

        }


    }, 8000);

}


iniciarAutoSlide();
