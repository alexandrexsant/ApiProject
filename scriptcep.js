document.querySelector('#cep_search').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que o formulário seja mantido padrão
    consultaCep(); // Chama a função consultaCep()
});

function consultaCep() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url) // Faz a requisição HTTP GET para a URL da API ViaCEP
    .then(response => response.json()) // Converte a resposta para JSON
        .then(data => {
            if (data.erro) {
                document.getElementById('cep_return').innerText = 'CEP não encontrado.';
            } else {
                const { logradouro, bairro, localidade, uf } = data; // Extrai as informações relevantes do objeto JSON
                document.getElementById('cep_return').innerText = `Endereço:
                Logradouro: ${logradouro}
                Bairro: ${bairro}
                Localidade: ${localidade}
                UF: ${uf}`; // Exibe as informações na página
            }
        })
        .catch(error => {
            document.getElementById('cep_return').innerText = 'Erro na consulta. Verifique sua conexão.';
        });
}

