const urlParams = new URLSearchParams(window.location.search);
let pokemonID = urlParams.get('pokemonID');
const container = document.querySelector('.addToContainer');

const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

function fetchPokemon()
{
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    .then(response => response.json())
    .then(data => {
        const pokemon = data;

        const pokemonName = pokemon.name;
        const pokemonImage = pokemon.sprites.front_default;
        const pokemonID = pokemon.id;
        const types = pokemon.types;
        const abilities = pokemon.abilities;
        const cries = pokemon.cries;

        let pokemonCries = "";
        let pokemonType = "";
        let pokemonAbilities = "";

        types.forEach((type) => {
            pokemonType += type.type.name;
            if (types.indexOf(type) !== types.length - 1) {
                pokemonType += ", ";
            }
        });

        abilities.forEach((ability) => {
            pokemonAbilities += ability.ability.name;
            if (abilities.indexOf(ability) !== abilities.length - 1) {
                pokemonAbilities += ", ";
            }
        });

        const baseStats = pokemon.stats.map(stat => {
            let statClass = '';
            if(stat.base_stat <= 40 || stat.base_stat <= 50){
                statClass = "bg-red-500";
            } else if(stat.base_stat > 50 && stat.base_stat <= 64){
                statClass = "bg-yellow-500";
            } else if(stat.base_stat >= 65){
                statClass = "bg-green-500";
            }
            return `<span class="${statClass} block md:flex my-2 rounded-xl p-3">${stat.stat.name}: ${stat.base_stat}</span>`;
        }).join(' ');

        Object.keys(cries).forEach((key) => {
            pokemonCries += `<audio controls>
                <source src="${cries[key]}" type="audio/wav">
            </audio>`;
        });

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="pokemon-card border border-blue-700 bg-blue-400 text-white rounded-lg shadow-lg overflow-hidden">
            <div class="block md:flex items-center">
                <div class="px-4 md:flex items-center">
                    <h2 class="font-bold text-xl uppercase">${pokemonID}. ${pokemonName}</h2>
                    <img class="w-52" src="${pokemonImage}" alt="${pokemonName}">
                </div>
                <div class="px-4 space-y-4">
                    <h3 class="font-bold text-lg">Type</h3>
                    <p class="text-sm mt-1">${pokemonType}</p>
                    <h3 class="font-bold text-lg">Abilities</h3>
                    <p class="text-sm">${pokemonAbilities}</p>
                    <h3 class="font-bold text-lg">Cries</h3>
                    <p class="text-sm space-y-2">${pokemonCries}</p>
                </div>
                <div class="px-4">
                    <h3 class="font-bold text-lg">Base Stats</h3>
                    <p>${baseStats}</p>
                </div>
            </div>
        </div>
        `; 

        if(Number(pokemonID) === 1){
            prevButton.disabled = true;
            prevButton.classList.add('opacity-50');
        } else {
            prevButton.disabled = false;
            prevButton.classList.remove('opacity-50');
        }

        container.appendChild(div);
    });
}

nextButton.addEventListener('click', () => {
    container.innerHTML = '';
    pokemonID++;
    fetchPokemon();
});

prevButton.addEventListener('click', () => {
    container.innerHTML = '';
    pokemonID--;
    fetchPokemon();
});

fetchPokemon();