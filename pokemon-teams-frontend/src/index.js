const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

   

// add event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(e) {
    // put functions in here to create cards and add trainers
    getTrainerInfo()
})

// fetch trainer info
function getTrainerInfo(){
    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(res => {
        console.log(res)
        createCard(res)
    })
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

function createCard(res){
    let parent = document.querySelector('main')
    res.forEach(trainer => {
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
            createPokemon(pokemon, teamList)    
        })
})
}

function createPokemon(pokemon, teamList){
    let li = document.createElement('li')
    let btn = document.createElement('btn')
    let parent = document.querySelector('main')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    btn.className = 'release'
    btn.innerText = 'Release'
    btn.innerHTML = 'Release'
    btn.data.id = pokemon.id
    // debugger;
    // btn.data.pokemon.id = pokemonData.id
    teamList.appendChild(li)
    li.appendChild(btn)
}