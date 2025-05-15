let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
    });

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 3000); // Troca de imagem a cada 3 segundos
}

document.addEventListener('DOMContentLoaded', () => {
    showSlides();
});
