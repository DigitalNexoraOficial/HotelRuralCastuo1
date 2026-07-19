const supabase = supabase.createClient('TU_SUPABASE_URL', 'TU_SUPABASE_ANON_KEY');

// Mostrar secciones
function showSection(id) {
    document.getElementById('public').classList.toggle('hidden', id === 'admin');
    document.getElementById('admin').classList.toggle('hidden', id !== 'admin');
    if (id === 'admin') loadClients();
}

// CRUD: Crear
document.getElementById('clientForm').onsubmit = async (e) => {
    e.preventDefault();
    await supabase.from('clientes').insert([{ 
        nombre: document.getElementById('nombre').value, 
        habitacion: document.getElementById('habitacion').value 
    }]);
    loadClients();
};

// CRUD: Leer
async function loadClients() {
    const { data } = await supabase.from('clientes').select('*');
    const tbody = document.querySelector('#clientTable tbody');
    tbody.innerHTML = data.map(c => `<tr>
        <td>${c.nombre}</td><td>${c.habitacion}</td>
        <td><button onclick="deleteClient(${c.id})">Eliminar</button></td>
    </tr>`).join('');
}

// CRUD: Eliminar
async function deleteClient(id) {
    await supabase.from('clientes').delete().eq('id', id);
    loadClients();
}

// Inicializar
loadClients();
