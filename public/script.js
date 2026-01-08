window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    // Si tuvieras una barra en el HTML con id "myBar", esto la movería:
    // document.getElementById("myBar").style.width = scrolled + "%";
    console.log("Progreso de lectura: " + Math.round(scrolled) + "%");
};

const observerOptions = {
    threshold: 0.1 // Se activa cuando el 10% del elemento es visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Cuando entra en pantalla: se vuelve opaco y sube
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        } else {
            // Cuando sale de pantalla: se vuelve invisible y baja
            // Esto permite que el efecto se repita al volver a pasar
            entry.target.style.opacity = "0";
            entry.target.style.transform = "translateY(30px)";
        }
    });
}, observerOptions);

// Aplicar a todos los bloques de contenido
document.querySelectorAll('.content').forEach((section) => {
    // Estado inicial y transición
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
});

// Seleccionamos todos tus bloques de contenido
document.querySelectorAll('.content').forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
});
