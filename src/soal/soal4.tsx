import { useState, useEffect, useRef } from 'react';

const BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemon = async (offset, limit) => {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return data.results;
};

const Soal4 = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const theRef = useRef(null);
  const limit = 20;

  const loadMorePokemon = async () => {
    setIsLoading(true);
    const newPokemon = await fetchPokemon(offset, limit);

    setPokemonList((prev) => [...prev, ...newPokemon]);
    setOffset((prev) => prev + limit);

    if (newPokemon.length < limit) {
      setHasMore(false);
    }
    setIsLoading(false);
  };

  const handleScroll = () => {
    if (
      theRef.current &&
      window.innerHeight + window.scrollY >= theRef.current.offsetTop &&
      !isLoading &&
      hasMore
    ) {
      loadMorePokemon();
    }
  };

  useEffect(() => {
    loadMorePokemon();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          flexGrow: 1,
          color: 'white',
          fontSize: '1.5em',
          textAlign: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <h1 style={{ fontWeight: 'bolder' }}>Pokémon Infinite Scroll</h1>
        <div>
          {pokemonList.map((pokemon, index) => (
            <div key={index} style={{ padding: '1rem' }}>
              {pokemon.name}
            </div>
          ))}
          {isLoading && <p>Loading...</p>}
        </div>
        <div ref={theRef} />
      </div>
      <iframe
        src="/soal4.mp4"
        style={{
          height: '100vh',
          border: '1px solid white',
        }}
      ></iframe>
    </div>
  );
};

export default Soal4;
