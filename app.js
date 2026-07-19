const supabase = supabase.createClient('TU_URL', 'TU_KEY');

// Control del Modal
function toggleModal() {
    const modal = document.getElementById('reservaModal');
    modal.classList.toggle('hidden');
}

// Lógica de protección para admin.html
if (window.location.pathname.includes('admin.html')) {
    supabase.auth.getSession().then(({ data }) => {
        if (!data.session) window.location.href = 'login.html';
    });
}
