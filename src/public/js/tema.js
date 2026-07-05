// ===== Tema oscuro/claro =====
function configurarTema() {
    const btn = document.getElementById('btn-tema');
    const temaGuardado = localStorage.getItem('tema') || 'light';

    if (temaGuardado === 'dark') {
        document.body.classList.add('dark-mode');
        btn.textContent = '☀️';
    }

    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const esOscuro = document.body.classList.contains('dark-mode');
        btn.textContent = esOscuro ? '☀️' : '🌑';
        localStorage.setItem('tema', esOscuro ? 'dark' : 'light');
    });
}

document.addEventListener("DOMContentLoaded", () => {
    configurarTema();
});