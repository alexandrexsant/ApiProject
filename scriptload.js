// Função para buscar as informações do clima para uma cidade em um país específico
async function fetchWeather(cityName, countryName) {
    const apiKey = '723ad0e8726a378f363bc0b093464f44';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)},${encodeURI(countryName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Erro ao buscar informações do clima para ${cityName}, ${countryName}: ${error.message}`);
    }
}

// Função para exibir as informações do clima na página HTML
function showInfo(json) {
    // Código para mostrar as informações do clima na página HTML
}

// Carregar automaticamente as informações do clima para um país ao carregar a página
(async () => {
    const cityName = 'Brasília'; // Altere para a cidade desejada
    const countryName = 'Brazil'; // Altere para o país desejado
    try {
        const weatherData = await fetchWeather(cityName, countryName);
        showInfo(weatherData);
    } catch (error) {
        console.error(error.message);
    }
})();
