const API_KEY = 'YOUR_API_KEY'; // Substitua por sua chave da API OpenWeatherMap

// Função que busca a previsão do tempo
async function buscarPrevisao() {
    const cidade = document.getElementById('inputCidade').value.trim();

    if (!cidade) {
        alert("Por favor, digite o nome da cidade.");
        return;
    }

    try {
        // Fazendo a requisição para a API OpenWeatherMap
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`);
        
        if (!resposta.ok) {
            throw new Error('Cidade não encontrada');
        }

        const dados = await resposta.json();

        // Atualiza os dados na tela
        const cidadeElement = document.getElementById('cidade');
        const tempElement = document.getElementById('temp');
        const descricaoElement = document.getElementById('descricao');
        const iconeElement = document.getElementById('icone');
        const umidadeElement = document.getElementById('umidade');

        cidadeElement.textContent = dados.name;
        tempElement.textContent = `${Math.round(dados.main.temp)}º C`;
        descricaoElement.textContent = dados.weather[0].description.charAt(0).toUpperCase() + dados.weather[0].description.slice(1);
        iconeElement.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
        umidadeElement.textContent = `Umidade: ${dados.main.humidity}%`;

    } catch (error) {
        alert(error.message);
    }
}
