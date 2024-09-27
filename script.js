const elementos = document.querySelectorAll('.elemento');
const selecionadosDiv = document.querySelector('#resultado');
const misturarBtn = document.querySelector('#misturar');
let selecionados = [];

elementos.forEach(elemento => {
    elemento.addEventListener('click', () => {
        if (selecionados.length < 2) {
            elemento.classList.toggle('selected');
            const nome = elemento.getAttribute('data-nome');
            const id = elemento.getAttribute('data-id'); 

            if (selecionados.some(item => item.id === id)) {
                selecionados = selecionados.filter(item => item.id !== id);
            } else {
                selecionados.push({ id, nome });
            }
        }
    });
});

misturarBtn.addEventListener('click', async () => {
    if (selecionados.length === 2) {
        const [id1, id2] = [selecionados[0].id, selecionados[1].id].sort();
        const result = await getCombination(id1, id2);
        selecionadosDiv.innerHTML = result.length ? result[0] : 'Nenhuma combinação encontrada.';
    } else {
        alert('Por favor, selecione exatamente dois elementos.');
    }
});

async function getCombination(element1, element2) {
    const formData = new FormData();
    formData.append("element1", element1);
    formData.append("element2", element2);

    const response = await fetch("./backend/src/combination.php", {
        method: "POST",
        body: formData,
    });
    
    const data = await response.json();
    return data;
}
