function configurarFormularioBienvenida() {
    const form = document.getElementById("form-bienvenida");
    const input = document.getElementById("nombre-usuario");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = input.value.trim();
        if (!nombre) {
            return;
        } 

        localStorage.setItem("nombre-usuario", nombre);
        window.location.href = "/productos";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    configurarFormularioBienvenida();
});