//Haal de pokemonID op uit de url en sla deze op in de pokemonID variabele
const urlParams = new URLSearchParams(window.location.search);
let pokemonID = urlParams.get('pokemonID');
const container = document.querySelector('.addToContainer');

const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        .then(response => response.json())
        .then(data => {
            //Sla alle data op in pokemon variable
            const pokemon = data;

            // Haa alle info van de pokemon op
            const pokemonName = pokemon.name;
            const pokemonImage = pokemon.sprites.front_default;
            const pokemonID = pokemon.id;
            const abilities = pokemon.abilities;
            const cries = pokemon.cries;
            const types = pokemon.types;
            const stats = pokemon.stats;

            //Haal het id op en format het voor de externe image
            const external_pokemonid = formatPokemonID(pokemonID);

            //Maak een lege variabele aan om in de loop de info in te stoppen
            let pokemonCries = "";
            let pokemonType = "";
            let pokemonAbilities = "";
            let pokemontypeBackground = [];
            let baseStats = '';



            //Loop door de types heen en sla de naam op in de pokemonType variabele en sla de achtergrond kleur op in de pokemontypeBackground variabele
            types.forEach((type) => {
                pokemonType += type.type.name;
                if (types.indexOf(type) !== pokemon.types.length - 1) {
                    pokemonType += ", ";
                }

                switch (type.type.name) {
                    case "fire":
                        pokemontypeBackground.push("#EE8130");
                        break;
                    case "water":
                        pokemontypeBackground.push("#6390F0");
                        break;
                    case "grass":
                        pokemontypeBackground.push("#7AC74C");
                        break;
                    case "electric":
                        pokemontypeBackground.push("#F7D02C");
                        break;
                    case "psychic":
                        pokemontypeBackground.push("#F95587");
                        break;
                    case "ice":
                        pokemontypeBackground.push("#96D9D6");
                        break;
                    case "dragon":
                        pokemontypeBackground.push("#6F35FC");
                        break;
                    case "dark":
                        pokemontypeBackground.push("#705746");
                        break;
                    case "fairy":
                        pokemontypeBackground.push("#D685AD");
                        break;
                    case "normal":
                        pokemontypeBackground.push("#A8A77A");
                        break;
                    case "fighting":
                        pokemontypeBackground.push("#C22E28");
                        break;
                    case "flying":
                        pokemontypeBackground.push("#A98FF3");
                        break;
                    case "poison":
                        pokemontypeBackground.push("#A33EA1");
                        break;
                    case "ground":
                        pokemontypeBackground.push("#E2BF65");
                        break;
                    case "rock":
                        pokemontypeBackground.push("#B6A136");
                        break;
                    case "bug":
                        pokemontypeBackground.push("#A6B91A");
                        break;
                    case "ghost":
                        pokemontypeBackground.push("#735797");
                        break;
                    case "steel":
                        pokemontypeBackground.push("#B7B7CE");
                        break;
                    default:
                        break;
                }
            });

            //Loop door de abilities heen en sla de naam op in de pokemonAbilities variabele
            abilities.forEach((ability) => {
                pokemonAbilities += ability.ability.name;
                if (abilities.indexOf(ability) !== abilities.length - 1) {
                    pokemonAbilities += ", ";
                }
            });

            //Loop door de stats heen en maak een div aan met de stats en geef ze een kleur op basis van de base_stat
            stats.forEach(stat => {
                let statClass = '';
                if (stat.base_stat <= 40 || stat.base_stat <= 50) {
                    statClass = "bg-red-500";
                } else if (stat.base_stat > 50 && stat.base_stat <= 64) {
                    statClass = "bg-yellow-500";
                } else if (stat.base_stat >= 65 && stat.base_stat <= 99) {
                    statClass = "bg-green-500";
                } else if (stat.base_stat >= 100) {
                    statClass = "bg-fuchsia-900";
                }
                baseStats += `<span class="${statClass} block md:flex my-2 rounded-xl p-3">${stat.stat.name}: ${stat.base_stat}</span> `;
            });

            //Loop door de cries heen en maak een audio element aan met de source van de cry
            Object.keys(cries).forEach((key) => {
                pokemonCries += `<audio controls>
                <source src="${cries[key]}" type="audio/wav">
            </audio>`;
            });

            //Maak een div aan en vul deze met de data van de pokemon
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="pokemon-card border bg-gradient-to-r border-blue-700 bg-[${pokemontypeBackground}] from-[${pokemontypeBackground[0]}] to-[${pokemontypeBackground[1]}] text-white rounded-lg shadow-lg overflow-hidden">
                <div class="block md:flex items-center">
                    <div class="px-4 md:flex items-center">
                        <h2 class="font-bold text-xl uppercase">${pokemonID}. ${pokemonName}</h2>
                        <img class="w-52 highlighted-spot rounded-2xl p-4" src="${pokemonImage}" alt="${pokemonName}">
                            <div class="flex gap-3 px-4">
                                <img class="w-32 border-2 rounded-2xl border-blue-700" id="api_image" src="${pokemonImage}" alt="${pokemonName}">
                                <img class="w-32 border rounded-2xl border-black" id="external_image" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${external_pokemonid}.png" alt="">
                            </div>
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


            //Maak de vorige button onklikbaar als we op de eerste pagina zitten
            if (Number(pokemonID) === 1) {
                prevButton.disabled = true;
                prevButton.classList.add('opacity-50');
            } else {
                prevButton.disabled = false;
                prevButton.classList.remove('opacity-50');
            }

            //Voeg de div toe aan de container
            container.appendChild(div);

            //Voeg een eventlistener toe aan de images om de highlighted-spot te veranderen tussen de api en de externe image en verander de border van de images zodat je ziet welke image je hebt geselecteerd
            document.getElementById('external_image').addEventListener('click', function () {
                document.querySelector('#api_image').removeAttribute('class');
                document.querySelector('#api_image').setAttribute('class', 'w-32 border rounded-2xl border-black');

                document.querySelector('#external_image').removeAttribute('class');
                document.querySelector('#external_image').setAttribute('class', 'w-32 border-2 rounded-2xl border-blue-700');
                document.querySelector('.highlighted-spot').src = this.src;
            });

            document.getElementById('api_image').addEventListener('click', function () {
                document.querySelector('#external_image').removeAttribute('class');
                document.querySelector('#external_image').setAttribute('class', 'w-32 border rounded-2xl border-black');

                document.querySelector('#api_image').removeAttribute('class');
                document.querySelector('#api_image').setAttribute('class', 'w-32 border-2 rounded-2xl border-blue-700');
                document.querySelector('.highlighted-spot').src = this.src;
            });
        });
}

//Button voor de volgende pokemon maak eerst de pagina leeg daarna verhoog de pokemonID en fetch de pokemon opnieuw en update de url
nextButton.addEventListener('click', () => {
    container.innerHTML = '';
    pokemonID++;
    window.location.href = `pokemon.html?pokemonID=${pokemonID}`;
    fetchPokemon();
});

//Button voor de vorige pokemon maak eerst de pagina leeg daarna verlaag de pokemonID en fetch de pokemon opnieuw en update de url
prevButton.addEventListener('click', () => {
    container.innerHTML = '';
    pokemonID--;
    window.location.href = `pokemon.html?pokemonID=${pokemonID}`;
    fetchPokemon();
});

//Functie om de pokemonID te formatten zodat we de juiste image kunnen ophalen van de externe source
function formatPokemonID(external_pokemonid) {
    if (external_pokemonid < 10) {
        return '00' + external_pokemonid;
    }
    else if (external_pokemonid < 100) {
        return '0' + external_pokemonid;
    }
    else {
        return external_pokemonid;
    }
}

//Fetch de pokemon
fetchPokemon();