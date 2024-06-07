// Adiciona um evento para a busca do clima
document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    // Pega o nome da cidade digitada pelo usuário
    const cityName = document.querySelector('#city_name').value;
    if (!cityName) { // Verifica se o campo esta vazio
        document.querySelector("#weather").classList.remove('show');
        // Remove a classe 'show' da div do clima para ocultá-la
        showAlert('É preciso digitar uma cidade.');        
        // Mostra uma msg para o usuário digitar uma cidade
        return; // Sai da função
    }

    const apiKey = '723ad0e8726a378f363bc0b093464f44'; // Chave da API OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    // URL da API para buscar as informações do clima da cidade
    try {
        // Realiza uma requisição para a API OpenWeatherMap
        const results = await fetch(apiUrl);
        // Converte a resposta da requisição para JSON
        const json = await results.json();

        if (json.cod === 200) { // Verifica se a resposta da API indica sucesso
            // Mostra as informações do clima na página
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            });
        } else {
            document.querySelector("#weather").classList.remove('show');
            // Mostra um alerta de que a cidade não foi encontrada
            showAlert('Não foi encontrado.');
        }
    } catch (error) { // Captura erros durante a requisição para a API
        console.error("Erro ao procurar dados do clima:", error); // Exibe o erro no console
    }
});

// Função para exibir as informações do clima na página
function showInfo(json) {
    showAlert(''); // Remove qualquer alerta anterior

    // Adiciona a classe 'show' à div do clima para exibi-la
    document.querySelector("#weather").classList.add('show');

    // Atualiza os elementos HTML com as informações do clima atual
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} km/h`;
}

// Função para exibir alerta
function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg; // Atualiza o conteúdo de alerta
}
