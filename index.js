const pokemonSprite = document.getElementById("pokemonSprite");
const pokemonAmbient = document.getElementById("pokemonAmbient");

const pokemonScreenId = document.getElementById("pokemonScreenId");
const pokemonScreenName = document.getElementById("pokemonScreenName");

const pokemonName = document.getElementById("pokemonName");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonType = document.getElementById("pokemonType");

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

const pokedexForm = document.getElementById("pokedexForm");
const searchButton = document.getElementById("search");
const input = document.getElementById("args");

var index = 0;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status != 200) {
    index = 0;
    return {
      name: "Missigno.",
      id: "???",
      height: "???",
      weight: "???",
      types: [{ type: { name: "999" } }, { type: { name: "Normal" } }],
    };
  }

  const data = await APIResponse.json();

  return data;
};

const renderInformation = async (pokemon) => {
  const data = await fetchPokemon(pokemon);

  data.id == "???" ? (index = 0) : (index = data.id);

  spawnPokemon(data);
};

const spawnPokemon = (data) => {
  setFrameInfo(data);
  setCompleteInfo(data);
  setType(data);
  setSprite(data);
};

const setFrameInfo = (data) => {
  pokemonScreenName.innerHTML = data.name;
  pokemonScreenId.innerHTML = data.id;
};

const setCompleteInfo = (data) => {
  pokemonName.innerHTML = data.name;
  pokemonHeight.innerHTML = `${data.height / 10} m`;
  pokemonWeight.innerHTML = `${data.weight / 10} kg`;
};

const setType = (data) => {
  const types = data.types.map((type) => {
    return type.type.name;
  });
  pokemonType.innerHTML = `${types}`;

  setAmbient(types[0], data);
};

const setAmbient = (mainType, data) => {
  if (data.id >= 899) {
    pokemonAmbient.src = "/assets/ambients/image-unknown.webp";
    return;
  }

  if (mainType == 999) {
    pokemonAmbient.src = "/assets/ambients/missigno-ambient.webp";
    return;
  }

  if (mainType == "fire") {
    pokemonAmbient.src = "/assets/ambients/red.webp";
    return;
  }

  if (
    mainType == "bug" ||
    mainType == "grass" ||
    mainType == "normal" ||
    mainType == "poison"
  ) {
    pokemonAmbient.src = "/assets/ambients/green.webp";
    return;
  }

  if (mainType == "dark" || mainType == "ghost") {
    pokemonAmbient.src = "/assets/ambients/dark.webp";
    return;
  }

  if (mainType == "ice" || mainType == "water") {
    pokemonAmbient.src = "/assets/ambients/blue.webp";
    return;
  }

  if (
    mainType == "fighting" ||
    mainType == "ground" ||
    mainType == "rock" ||
    mainType == "steel"
  ) {
    pokemonAmbient.src = "/assets/ambients/yellow.webp";
    return;
  }

  if (
    mainType == "dragon" ||
    mainType == "fairy" ||
    mainType == "flying" ||
    mainType == "psychic"
  ) {
    pokemonAmbient.src = "/assets/ambients/purple.webp";
    return;
  }

  if (mainType == "electric") {
    pokemonAmbient.src = "/assets/ambients/darkblue.webp";
    return;
  }
};

const setSprite = (data) => {
  //Missigno Sprite
  if (data.id == "???") {
    pokemonSprite.src = "/assets/missigno-sprite.webp";
    pokemonSprite.style.opacity = `1`;
    pokemonSprite.style.width = `${18}%`;
    return;
  }

  //Bug correction, API doesn't contain the correct url when researching with the number 376 - METAGROSS
  if (data.id == 376) {
    pokemonSprite.src =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/376.gif";
    pokemonSprite.style.opacity = `1`;
    spriteSize(data);
    return;
  }

  spriteSize(data);

  const primarySrc =
    data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
      "front_default"
    ];
  const secondarySrc =
    data["sprites"]["versions"]["generation-v"]["black-white"]["front_default"];

  if (data.id >= 899) {
    pokemonSprite.style.opacity = 0;
    return;
  }

  pokemonSprite.style.opacity = 1;
  pokemonSprite.src = primarySrc || secondarySrc;
};

const spriteSize = (data) => {
  let sizeVariable = 0;
  if (data.id >= 650) {
    sizeVariable += 3;
    pokemonSprite.style.top = "57%";
  }

  if (data.height / 10 >= 3) {
    sizeVariable += 20;
    pokemonSprite.style.width = `${sizeVariable}%`;
  }

  if (data.height / 10 >= 1.7 && data.height / 10 < 3) {
    sizeVariable += 15;
    pokemonSprite.style.width = `${sizeVariable}%`;
  }

  if (data.height / 10 >= 1 && data.height / 10 < 1.7) {
    sizeVariable += 12;
    pokemonSprite.style.width = `${sizeVariable}%`;
  }

  if (data.height / 10 < 1) {
    sizeVariable += 10;
    pokemonSprite.style.width = `${sizeVariable}%`;
  }
};

pokedexForm.addEventListener("submit", (e) => {
  e.preventDefault();

  searchButton.classList.add("clicked");
  setTimeout(() => {
    searchButton.classList.remove("clicked");
  }, 100);

  renderInformation(input.value.toLowerCase() || "0");
  input.value = "";
});

previousButton.addEventListener("click", () => {
  previousButton.classList.add("clicked");
  setTimeout(() => {
    previousButton.classList.remove("clicked");
  }, 100);

  index = index || 906;
  renderInformation(index - 1);
});

nextButton.addEventListener("click", () => {
  nextButton.classList.add("clicked");
  setTimeout(() => {
    nextButton.classList.remove("clicked");
  }, 100);

  renderInformation(index + 1);
});
