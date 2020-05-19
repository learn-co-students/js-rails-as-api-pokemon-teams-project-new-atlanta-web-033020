const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons/`

// add event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(e) {
    // put functions in here to create cards and add trainers
    init()
})

function init(){
    getTrainerInfo()
}
// fetch trainer info
function getTrainerInfo(){
    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(trainers => renderCard(trainers))
}

 // < div class="card" data - id="1" > <p>Prince</p>
    //     <button data-trainer-id="1">Add Pokemon</button>
    //     <ul>
    //       <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    //       <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    //       <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    //       <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    //       <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
    //     </ul>
    //   </div>

function renderCard(trainers){
    let parent = document.querySelector('main')
    trainers.forEach(trainer => {
        let card = document.createElement('div')
        let teamList = document.createElement('ul')
        card.className = 'card'
        card.id = trainer.id
        let pTag = document.createElement('p')
        pTag.innerText = trainer.name
        parent.appendChild(card)
        card.appendChild(pTag)
        card.appendChild(teamList)
        trainer.pokemons.forEach(pokemon => {
            renderPokemon(pokemon, teamList)    
        })
    })
}

function renderPokemon(pokemon, teamList){
    let parent = document.querySelector('main')
    let li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    let btn = document.createElement('button')
    btn.className = 'release'
    btn.innerText = 'Release'
    btn.addEventListener('click', () => {
        releasePoke(pokemon, parent)
    })
    teamList.appendChild(li)
    li.appendChild(btn)
}

function releasePoke(pokemon, parent){
    console.log(pokemon)
    fetch(POKEMONS_URL + pokemon.id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(pokemon => {
        if(pokemon.errors)
            pokemon.errors.forEach(error => alert(error))
        else
        parent.remove
    })
}