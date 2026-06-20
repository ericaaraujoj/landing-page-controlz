const formulario = document.getElementById("form-contato");
const telefone = document.getElementById("telefone");

telefone.addEventListener("input", () => {

    telefone.value = telefone.value.replace(/\D/g, "");

});

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    telefone.value = telefone.value.replace(/\D/g, "");

    if (telefone.value.length !== 11) {

        alert("Digite um telefone válido com DDD");

        return;

    }

    const dados = {

        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        mensagem: document.getElementById("mensagem").value

    };

    let resposta;

    try {

        resposta = await fetch("/api/enviar-email", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)

        });

    } catch (error) {

        alert("Erro ao enviar mensagem");

        console.log(error);

        return;
    }


    if (resposta.ok) {

        alert("Mensagem enviada com sucesso!");

        formulario.reset();

    } else {

        alert("Erro ao enviar mensagem");

    }

});

//slider
const track = document.querySelector(".carousel-track");
const next = document.querySelector(".btn-next");
const prev = document.querySelector(".btn-prev");
const videos = document.querySelectorAll(".portfolio-video");
let sliderAtivo = true;

// pega o tamanho real do slide
function tamanhoSlide() {
    return document.querySelector(".slide").getBoundingClientRect().width;
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

// fechar menu hamburguer
const menuLinks = document.querySelectorAll(".menu a");
const menuToggle = document.getElementById("menu-toggle");

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.checked = false;
    });
});
