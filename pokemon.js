const urlParams = new URLSearchParams(window.location.search);
const pokemonID = urlParams.get('pokemonID');
const container = document.querySelector('.addToContainer');

function fetchPokemon()
{
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    .then(response => response.json())
    .then(data => {
        const pokemon = data;
        console.log(pokemon);

        const pokemonName = pokemon.name;
        const pokemonImage = pokemon.sprites.front_default;
        const pokemonID = pokemon.id;
        const type = pokemon.types;
        const abilities = pokemon.abilities;
        const baseStats = pokemon.stats;

        const div = document.createElement('div');
        div.className = 'w-36';
        div.innerHTML = `
        <div class="flex justify-center">
            <div class="">
                <img src="${pokemonImage}" alt="${pokemonName}" />
            </div>
            <div>
                <h1 class="text-center py-2">${pokemonID}. ${pokemonName}</h1>
            </div>
        </div>
        `; 
        container.appendChild(div);
    });
}

fetchPokemon();