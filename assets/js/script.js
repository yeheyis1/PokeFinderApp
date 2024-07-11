document.getElementById('search-button').addEventListener('click', () => {
    const pokemonName = document.getElementById('pokemon-search').value;
    localStorage.setItem('lastSearchedPokemon', pokemonName);
    searchPokemon(pokemonName);
  });
  
  async function searchPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (response.ok) {
      const data = await response.json();
      displayPokemon(data);
    } else {
      console.error('Pokémon not found');
      document.getElementById('pokemon-result').innerHTML = '<p>Pokémon not found. Please try again.</p>';
    }
  }
  
  function displayPokemon(pokemon) {
    document.getElementById('pokemon-result').innerHTML = `
      <p><strong>Name:</strong> ${pokemon.name}</p>
      <p><strong>Height:</strong> ${pokemon.height}</p>
      <p><strong>Weight:</strong> ${pokemon.weight}</p>
      <button class="button is-info" onclick="showModal('${pokemon.name}')">More Info</button>
    `;
  }
  
  function showModal(pokemonName) {
    const modal = document.getElementById('pokemon-modal');
    modal.classList.add('is-active');
    document.getElementById('modal-content').innerText = `More info about ${pokemonName}`;
  }
  
  document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('pokemon-modal').classList.remove('is-active');
  });
  