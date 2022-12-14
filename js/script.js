const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonAnt = document.querySelector('.btn-ante')
const buttonProx = document.querySelector('.btn-prox')

let searchPokemon = 1;

const fetchpokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); /**função pra pegar os dados da API*/

    if (apiResponse.status == 200) {
        const data = await apiResponse.json();
        return data;
        console.log(apiResponse)
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Buscando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchpokemon(pokemon);

    if (data){

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id; 
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][`front_default`];
    /* usando colchetes no lugar do ponto pois o ponto deu erro!! // por ser imagem usar o SRC */
    searchPokemon = data.id
    } else {
        pokemonName.innerHTML = 'Error 404 >:(';
        pokemonNumber.innerHTML = "";
        pokemonImage.src = "./images/blabo.gif" 
    }
}

form.addEventListener('submit', (event) =>{

    event.preventDefault();
    renderPokemon(input.value.toLowerCase()) /*aqui é dado o pokemon*/
    input.value = ""

})
buttonAnt.addEventListener('click', () =>{
    if (searchPokemon>1) {

        searchPokemon-=1;
        renderPokemon(searchPokemon)
    }
    
})
buttonProx.addEventListener('click', () =>{
        
   searchPokemon+=1;
   renderPokemon(searchPokemon)

})



renderPokemon(searchPokemon)