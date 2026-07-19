const supabase = supabase.createClient('TU_URL', 'TU_KEY');

// Lógica de Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (!error) window.location.href = 'admin.html';
        else alert('Error de acceso');
    };
}

// Protección de rutas (en admin.html)
if (window.location.pathname.includes('admin.html')) {
    supabase.auth.getSession().then(({ data }) => {
        if (!data.session) window.location.href = 'login.html';
        else loadClients(); // Tu función de carga de tabla anterior
    });
}

async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
}
