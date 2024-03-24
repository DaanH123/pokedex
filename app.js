const container = document.querySelector('.addToContainer');
const pagination = document.querySelector('.pagination');
const paginationP = document.createElement('p');

//Variables voor de pagination
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
        //Sla alle data op in pokemon variable
        const pokemon = data.results;
        
        pokemon.forEach(pokemon => {

            // Haa alle info van de pokemon op
            const pokemonName = pokemon.name;
            const pokemonUrl = pokemon.url;

            const pokemonID = pokemonUrl.split('/')[6];
            const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;

            //Maak een div aan en vul deze met de info van de pokemon
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

            //Voeg een eventlistener toe aan de div zodat je naar de pokemon pagina gaat als je erop klikt
            div.addEventListener('click', () => {
                window.location.href = `pokemon.html?pokemonID=${pokemonID}`;
            });

            //Voeg de div toe aan de container
            container.appendChild(div);
        });
    });

    //Maak de vorige button onklikbaar als we op de eerste pagina zitten
    if(pageOffset === 0){
        prevButton.disabled = true;
        prevButton.classList.add('opacity-50');
    } else {
        prevButton.disabled = false;
        prevButton.classList.remove('opacity-50');
    }
}

//Functie om de pagination te updaten
function updatePagination()
{
    paginationP.innerHTML = `Page: ${currentPage}`;
    paginationP.className = 'text-center py-4';
    pagination.appendChild(paginationP);
}

//Button voor de volgende pokemon maak eerst de pagina leeg daarna verhoog de offset en de currentpage en fetch de pokemon opnieuw
nextButton.addEventListener('click', () => {
    container.innerHTML = '';
    pageOffset += pageLimit;
    currentPage += 1;
    updatePagination();
    fetchPokemons();
});

//Button voor de vorige pokemon maak eerst de pagina leeg daarna verlaag de offset en de currentpage en fetch de pokemon opnieuw
prevButton.addEventListener('click', () => {
    container.innerHTML = '';
    pageOffset -= pageLimit;
    currentPage -= 1;
    updatePagination();
    fetchPokemons();
});

//Fetch de pokemons en update de pagination
updatePagination();
fetchPokemons();