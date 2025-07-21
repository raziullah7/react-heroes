import {useState, type ChangeEvent, useEffect, useRef} from 'react'
import './App.css'
import type { Hero } from './types/hero'
import HeroDetail from './components/HeroDetail';

function App() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
  // introducing useRef to stop it from fetching twice due to strict mode
  const fetched = useRef(false)

  useEffect(() => {
    // if not fetched, then fetch
    if (!fetched.current) {
      fetch('http://localhost:3000/heroes')
          .then(res => res.json())
          .then(data => setHeroes(data))

      fetched.current = true;
    }
  }, [heroes])

  const selectedHero = heroes.find(hero => hero.id === selectedHeroId)

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedName = event.target.value;
    setHeroes(prevHeroes => prevHeroes.map(hero => {
      if (hero.id === selectedHeroId) {
        return {...hero, name: updatedName}
      }
      return hero;
    }))
  }

  const handleSelectHero = (id: number) => {
    setSelectedHeroId(id);
  }

  return (
    <div className='container mt-5 mx-auto'>
      <h2 className='text-2xl'>My heroes</h2>
      <ul className='flex flex-col gap-2 my-3'>
        {heroes.map(hero => (
          <li 
            key={hero.id} 
            className='flex cursor-pointer' 
            onClick={() => handleSelectHero(hero.id)}
          >
            <span className='bg-slate-700 rounded-l text-white p-2'>{hero.id}</span>
            <span className='bg-slate-300 p-2 rounded-r w-1/4'>{hero.name}</span>
          </li>
          ))}
      </ul>

      {selectedHero && <HeroDetail hero={selectedHero} onChangeName={handleNameChange} />}
    </div>
  )
}

export default App
