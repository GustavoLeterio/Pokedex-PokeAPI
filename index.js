const pokemonName = document.getElementById("pokemonName");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonType = document.getElementById("pokemonType");
const pokemonScreenNumber = document.getElementById("pokemonScreenNumber");
const pokemonScreenName = document.getElementById("pokemonScreenName");
const pokemonSprite = document.getElementById("pokemonSprite");
const pokemonAmbient = document.getElementById("pokemonAmbient");

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

const pokedexForm = document.getElementById("pokedexForm");
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

  pokemonScreenName.innerHTML = data.name;
  pokemonScreenNumber.innerHTML = data.id;
  pokemonName.innerHTML = data.name;
  pokemonHeight.innerHTML = `${data.height / 10} m`;
  pokemonWeight.innerHTML = `${data.weight / 10} kg`;

  const types = data.types.map((type) => {
    return type.type.name;
  });
  pokemonType.innerHTML = `${types}`;

  setAmbient(types[0]);
  setSprite(data);
};

const setAmbient = (mainType) => {
  if (mainType == "999")
    pokemonAmbient.src = "/assets/ambients/missigno-ambient.webp";
  if (mainType == "fire") pokemonAmbient.src = "/assets/ambients/red.webp";
  if (
    mainType == "bug" ||
    mainType == "grass" ||
    mainType == "normal" ||
    mainType == "poison"
  )
    pokemonAmbient.src = "/assets/ambients/green.webp";
  if (mainType == "dark" || mainType == "ghost")
    pokemonAmbient.src = "/assets/ambients/dark.webp";
  if (mainType == "ice" || mainType == "water")
    pokemonAmbient.src = "/assets/ambients/blue.webp";
  if (
    mainType == "fighting" ||
    mainType == "ground" ||
    mainType == "rock" ||
    mainType == "steel"
  )
    pokemonAmbient.src = "/assets/ambients/yellow.webp";
  if (
    mainType == "dragon" ||
    mainType == "fairy" ||
    mainType == "flying" ||
    mainType == "psychic"
  )
    pokemonAmbient.src = "/assets/ambients/purple.webp";
  if (mainType == "electric")
    pokemonAmbient.src = "/assets/ambients/darkblue.webp";
};

const setSprite = (data) => {
  if (data.id == "???") {
    pokemonSprite.src = "/assets/missigno-sprite.webp";
    pokemonSprite.style.opacity = `1`;
    pokemonSprite.style.width = `${18}%`;
    return;
  }

  //Bug correction, API doesn't contain the correct url when researching with the number
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

  if (primarySrc) {
    pokemonSprite.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    pokemonSprite.style.opacity = 1;
  } else if (secondarySrc) {
    pokemonSprite.src =
      data["sprites"]["versions"]["generation-v"]["black-white"][
        "front_default"
      ];
    pokemonSprite.style.opacity = 1;
  } else {
    pokemonAmbient.src = "/assets/ambients/image-unknown.webp";
    pokemonSprite.style.opacity = 0;
  }
};

const spriteSize = (data) => {
  let sizeVariable;
  if (data.height / 10 >= 3) {
    sizeVariable = 20;
    pokemonSprite.style.width = `${sizeVariable}%`;
  }

  if (data.height / 10 >= 1.7 && data.height / 10 < 3) {
    sizeVariable = 15;
    if (data.id >= 650) sizeVariable += 3;
    pokemonSprite.style.width = `${sizeVariable}%`;
  }

  if (data.height / 10 >= 1 && data.height / 10 < 1.7) {
    sizeVariable = 12;
    if (data.id >= 650) sizeVariable += 3;
    pokemonSprite.style.width = `${sizeVariable}%`;
  }

  if (data.height / 10 < 1) {
    sizeVariable = 10;
    if (data.id >= 650) sizeVariable += 3;
    pokemonSprite.style.width = `${sizeVariable}%`;
  }

  if (data.id >= 650) pokemonSprite.style.top = "57%";
};

pokedexForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderInformation(input.value.toLowerCase() || "0");
  input.value = "";
});

nextButton.addEventListener("click", (e) => {
  renderInformation(index + 1);
});

previousButton.addEventListener("click", (e) => {
  index == 0 ? (index = 906) : "";
  renderInformation(index - 1);
});
