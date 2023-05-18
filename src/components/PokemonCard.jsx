/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Importamos as dependências necessárias
import React, { useEffect, useState } from 'react';

// Primeiro, vamos criar o componente PokemonCard
// Este componente recebe um pokemon como prop e exibe o nome e a imagem do pokemon
export default function PokemonCard({ pokemon }) {

  const capitalizeFirstLowercaseRest = str => {
    return (
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
  };
  
  return (

    <div className='divSon'>
      <h2>{capitalizeFirstLowercaseRest(pokemon.name)}</h2>
      {<img src={pokemon.sprites.front_default} alt={pokemon.name} /> }
      <div className = 'orgTypes'>
        {pokemon.types.map((item) => (<h3>{capitalizeFirstLowercaseRest(item.type.name)}</h3>))}
      </div>
    </div>
  );
}
  


