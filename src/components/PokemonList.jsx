/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Importamos as dependências necessárias
import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

// Agora, vamos criar o componente PokemonList
// Este componente irá buscar dados da PokeAPI e exibir uma lista de PokemonCards
export default function PokemonList() {
  // Usamos o Hook useState para criar um estado para armazenar a lista de pokemons
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Adicionamos o estado para controle de carregamento
  const [page, setPage] = useState(1); // Adicionamos o estado para controle de carregamento
  
  const fetchPokemon = async (pokemonName) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    let response;
    let data;
    let error;

    try {
      response = await fetch(URL);
      data = await response.json();
      error = false;
    } catch {
      data = null;
      error = true;
    }

    return { response, data, error };
  };


  const fetchPokemonList  = async (next) => {
    let value = next * 9
    const URL = `https://pokeapi.co/api/v2/pokemon?offset=${value}&limit=9`;

    const response = await fetch(URL);
    const data = await response.json();

    //const promises = data.results.map((pokemon) => pokemon);
    const promises = data.results.map(
    async (pokemon) => (await fetchPokemon(pokemon.name)).data
    );

    const pokemonList = Promise.all(promises);
    
    return pokemonList
  };

  const nextPage = async () => {
      setIsLoading(true);
      setPokemons(await fetchPokemonList(page + 1));
      setPage(page + 1)
      setIsLoading(false);
  };

  const previousPage = async () => {
      if (page == 0) {
        alert('Você já está na primeira página!');
      }
      else {
        setIsLoading(true);
        setPokemons(await fetchPokemonList(page - 1));
        setPage(page - 1)
        setIsLoading(false);
      }
  };

  useEffect(() => {
    (async () => {
      setPokemons(await fetchPokemonList(0));
      setIsLoading(false); // Os dados foram carregados, então definimos isLoading como false
    })();
  }, []);

  // Renderizamos um PokemonCard para cada pokemon na lista
  return (
    <>
      {isLoading && <div>Carregando...</div>}
      {!isLoading && pokemons.map((pokemon) => (<PokemonCard key={pokemon.name} pokemon={pokemon} /> )) }
      <div className='btnOperation'>
        <button onClick={() => previousPage()}>Anterior</button><button onClick={() => nextPage()}>Próxima</button>
      </div>
    </>
  );

}