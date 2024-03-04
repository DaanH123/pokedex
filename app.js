const container = document.querySelector('.addToContainer');
let pageLimit = 20;
let pageOffset = 0;

const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

nextButton.addEventListener('click', () => {
    container.innerHTML = '';
    pageOffset += pageLimit;
});

prevButton.addEventListener('click', () => {
    container.innerHTML = '';
    pageOffset -= pageLimit;
});

function fetchPokemons()
{
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageLimit}&offset=${pageOffset}`)
    .then(response => response.json())
    .then(data => {
        const pokemon = data.results;
        pokemon.forEach(pokemon => {
            const pokemonName = pokemon.name;
            const pokemonUrl = pokemon.url;

            const pokemonID = pokemonUrl.split('/')[6];
            const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;

            const div = document.createElement('div');
            div.className = 'w-36';
            div.innerHTML = `
            <div class="card shadow flex justify-center w-36 rounded-2xl">
                <form action="pokemon.html?pokemonID=${pokemonID}" method="POST">
                    <img src="${pokemonImage}" alt="${pokemonName}" />
                    <h1 class="text-center py-2">${pokemonID}. ${pokemonName}</h1>
                </form>
            </div>
            `;

            container.appendChild(div);
        });
    });
}

nextButton.addEventListener('click', () => {
    container.innerHTML = '';
    pageOffset += pageLimit;
    fetchPokemons();
});

prevButton.addEventListener('click', () => {
    container.innerHTML = '';
    pageOffset -= pageLimit;
    fetchPokemons();
});

fetchPokemons();