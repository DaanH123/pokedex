const container = document.querySelector('.addToContainer');
const pagination = document.querySelector('.pagination');
const paginationP = document.createElement('p');

let pageLimit = 20;
let pageOffset = 0;
let currentPage = 1;

const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

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
            <div class="card shadow flex justify-center w-36 rounded-2xl hover:cursor-pointer hover:scale-110">
                <form action="pokemon.html?pokemonID=${pokemonID}" method="POST">
                    <img src="${pokemonImage}" alt="${pokemonName}" />
                    <h1 class="text-center py-2">${pokemonID}. ${pokemonName}</h1>
                </form>
            </div>
            `;

            div.addEventListener('click', () => {
                window.location.href = `pokemon.html?pokemonID=${pokemonID}`;
            });

            container.appendChild(div);
        });
    });

    if(pageOffset === 0){
        prevButton.disabled = true;
        prevButton.classList.add('opacity-50');
    } else {
        prevButton.disabled = false;
        prevButton.classList.remove('opacity-50');
    }
}

function updatePagination()
{
    paginationP.innerHTML = `Page: ${currentPage}`;
    paginationP.className = 'text-center py-4';
    pagination.appendChild(paginationP);
}

nextButton.addEventListener('click', () => {
    container.innerHTML = '';
    pageOffset += pageLimit;
    currentPage += 1;
    updatePagination();
    fetchPokemons();
});

prevButton.addEventListener('click', () => {
    container.innerHTML = '';
    pageOffset -= pageLimit;
    currentPage -= 1;
    updatePagination();
    fetchPokemons();
});

updatePagination();
fetchPokemons();