const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', init);

function init() {
  fetchTrainers()
}

function fetchTrainers() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => renderTrainers(trainers))
}

function renderTrainers(trainers) {
  const mainContainer = document.querySelector('main');

  mainContainer.innerHTML = '';

  trainers.forEach(trainer => {
    const trainerCard = createTrainerCard(trainer)
    mainContainer.appendChild(trainerCard);
  })
}

function createTrainerCard(trainer) {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card');
  cardContainer.setAttribute('data-id', trainer.id);

  const trainerName = document.createElement('p');
  trainerName.innerText = trainer.name;

  const addPokemonButton = createAddPokemonButton(trainer);

  const pokemonList = document.createElement('ul');

  trainer.pokemons.forEach(pokemon => {
    const pokemonElement = createPokemonElement(pokemon);
    pokemonList.appendChild(pokemonElement);
  })

  cardContainer.appendChild(trainerName);
  cardContainer.appendChild(addPokemonButton);
  cardContainer.appendChild(pokemonList);

  return cardContainer;
}

function createAddPokemonButton(trainer) {
  const addPokemonButton = document.createElement('button');
  addPokemonButton.innerText = 'Add Pokemon'
  addPokemonButton.setAttribute('data-trainer-id', trainer.id);

  addPokemonButton.addEventListener('click', addPokemonToTrainer)

  return addPokemonButton;
}

function addPokemonToTrainer(e) {
  const pokemonCount = e.target.parentElement.querySelector('ul').querySelectorAll('li').length

  if (pokemonCount >= 6) {
    alert('You cannot have more than 6 pokemans BITCH!!!');
    return;
  }

  const pokemonData = { pokemon: {} };
  pokemonData.pokemon.trainer_id = e.target.getAttribute('data-trainer-id');
  const configurationObject = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(pokemonData)
  }

  fetch(POKEMONS_URL, configurationObject)
    .then(response => response.json())
    .then(pokemon => {
      addPokemonToTrainerList(pokemon);
    })
    .catch(error => alert(error));
}

function addPokemonToTrainerList(pokemon) {
  const trainerDiv = findPokemonTrainer(pokemon);
  pokemonList = trainerDiv.querySelector('ul');

  pokemonList.appendChild(createPokemonElement(pokemon));
}

function findPokemonTrainer(pokemon) {
  const mainContainer = document.querySelector('main');

  for (let child of mainContainer.children) {
    if (parseInt(child.getAttribute('data-id')) === pokemon.trainer_id) {
      return child;
    }
  }
}

function createPokemonElement(pokemon) {
  listItem = document.createElement('li');
  listItem.innerText = `${pokemon.nickname} (${pokemon.species})`;

  const releaseButton = createReleaseButton(pokemon);

  listItem.appendChild(releaseButton);
  return listItem
}

function createReleaseButton(pokemon) {
  const releaseButton = document.createElement('button');
  releaseButton.classList.add('release');
  releaseButton.setAttribute('data-pokemon-id', pokemon.id);
  releaseButton.innerText = 'Release'

  releaseButton.addEventListener('click', e => releasePokemon(e, pokemon));

  return releaseButton;
}

function releasePokemon(e, pokemon) {
  pokemonId = e.target.getAttribute('data-pokemon-id');

  fetch(`${POKEMONS_URL}/${pokemonId}`, { method: 'DELETE' })
    .then(response => removePokemonFromList(pokemon));
}

function removePokemonFromList(pokemon) {
  const trainer = findPokemonTrainer(pokemon);
  const pokemonList = trainer.querySelector('ul');

  for (let element of pokemonList.children) {
    const pokemonId = parseInt(element.querySelector('button')
      .getAttribute('data-pokemon-id'));
    if (element.nodeName === "LI" && pokemonId === pokemon.id) {
      element.remove();
      return;
    }
  }
}