import { useState, type ChangeEvent } from 'react'
import './App.css'
import type { Hero } from './types/hero'
import { HEROES } from './data/mock-heroes'
import HeroDetail from './components/HeroDetail';

function App() {
  const [heroes, setHeroes] = useState<Hero[]>(HEROES);
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);

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
