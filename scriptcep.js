document.querySelector('#cep_search').addEventListener('submit', (event) => {
    event.preventDefault();
    consultaCep();
});

function consultaCep() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById('cep_return').innerText = 'CEP não encontrado.';
            } else {
                const { logradouro, bairro, localidade, uf } = data;
                document.getElementById('cep_return').innerText = `Endereço:
                Logradouro: ${logradouro}
                Bairro: ${bairro}
                Localidade: ${localidade}
                UF: ${uf}`;
            }
        })
        .catch(error => {
            document.getElementById('cep_return').innerText = 'Erro na consulta. Verifique sua conexão.';
        });
}

