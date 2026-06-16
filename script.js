//formulario contato
emailjs.init("SUA_PUBLIC_KEY");


const formulario = document.getElementById("form-contato");


formulario.addEventListener("submit", function(event){

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
    .catch((erro)=>{

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


// botão próximo
next.addEventListener("click", ()=>{

    track.scrollLeft += 330;

});


// botão anterior
prev.addEventListener("click", ()=>{

    track.scrollLeft -= 330;

});



// quando clicar em vídeo
videos.forEach(video => {


    video.addEventListener("play", ()=>{


        // para o slider automático
        sliderAtivo = false;



        // pausa todos os outros vídeos
        videos.forEach(outroVideo => {


            if(outroVideo !== video){

                outroVideo.pause();

            }


        });


    });



    // quando terminar o vídeo
    video.addEventListener("ended", ()=>{


        sliderAtivo = true;


    });


});


// passa sozinho a cada 8 segundos

let tempoSlider;


function iniciarAutoSlide(){

    clearInterval(tempoSlider);


    tempoSlider = setInterval(()=>{


        if(sliderAtivo){


            track.scrollLeft += 330;


            if(track.scrollLeft >= track.scrollWidth - track.clientWidth){

                track.scrollLeft = 0;

            }


        }


    },8000);

}

iniciarAutoSlide();

// quando clicar nas setas reinicia o tempo

next.addEventListener("click", ()=>{

    track.scrollLeft += 330;

    iniciarAutoSlide();

});


prev.addEventListener("click", ()=>{

    track.scrollLeft -= 330;

    iniciarAutoSlide();

});