/* O método global fetch() inicia o processo de busca de um recurso da rede,
retornando uma promessa que é cumprida assim que a resposta estiver disponível.
Porém, no caso abaixo, se não colocarmos o await, a função já vai passar para as próximas linhas
sem esperar o cumprimento da promessa. Ao colocarmos o await, isso garante que a função vai 
esperar a promessa se realizar para depois passar para suas próximas linhas.
Porém, o await só é válido para funções assíncronas. Portanto, temos que colocar um
'assync' antes do parâmetro, para definir essa função como assíncrona.
Além disso, precisamos extrair os dados da API em json.*/

const prev = document.querySelector(".prev");
const playpause = document.querySelector(".playpause");
const next = document.querySelector(".next");
const audio = document.querySelector("audio");
const title = document.querySelector(".title");

const songsList = [
    {
        path: "./songs/PalletTown.mp3",
        name: "Pallet Town",
    },
    {
        path: "./songs/CeruleanCity.mp3",
        name: "Cerulean City",
    },
    {
        path: "./songs/VermillionCity.mp3",
        name: "Vermillion City",
    },
    {
        path: "./songs/TheStAnne.mp3",
        name: "The St. Anne",
    },
    {
        path: "./songs/PokemonCenter.mp3",
        name: "Pokémon Center",
    },
    {
        path: "./songs/CeladonCity.mp3",
        name: "Celadon City",
    },
    {
        path: "./songs/PokemonGym.mp3",
        name: "Pokémon Gym",
    },
];

let songs = false;

const playSong = () => {
    songs = true;
    audio.play();
    playpause.classList.add("active");
};

const pauseSong = () => {
    songs = false;
    audio.pause();
    playpause.classList.remove("active");
};

playpause.addEventListener("click", () => {
    songs ? pauseSong() : playSong();
});

const loadSongs = (songsList) => {
    title.textContent = songsList.name;
    audio.src = songsList.path;
};

let i = 1;
loadSongs(songsList[i]);

console.log(songsList[i]);

const prevSong = () => {
    i--;
    if (i < 0) {
        i = songsList.length - 1;
    }
    loadSongs(songsList[i]);
    playSong();
};

prev.addEventListener("click", prevSong);

const nextSong = () => {
    i++;
    if (i > songsList.length - 1) {
        i = 0;
    }
    loadSongs(songsList[i]);
    playSong();
};

next.addEventListener("click", nextSong);

const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(
    ".pokemon-number"
);
const pokemonImage = document.querySelector(".pokemon-img");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const form = document.querySelector(".form");
const input = document.querySelector(".input-search");

let actualID = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        actualID = data.id;
        pokemonImage.src =
            data["sprites"]["versions"]["generation-v"][
                "black-white"
            ]["animated"]["front_default"];
        input.value =
            data.name.charAt(0).toUpperCase() +
            data.name.slice(1);
        return actualID;
    } else {
        pokemonImage.style.display = "none";
        pokemonName.innerHTML = "Not found :(";
        pokemonNumber.innerHTML = "";
    }
    input.value = "";
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnNext.addEventListener("click", () => {
    if (actualID < 649) {
        actualID++;
        renderPokemon(actualID);
        console.log(actualID);
        input.value = actualID;
    }
});

btnPrev.addEventListener("click", () => {
    if (actualID !== 1) {
        actualID--;
        renderPokemon(actualID);
        input.value = actualID;
    }
});

renderPokemon(actualID);
