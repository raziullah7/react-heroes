import {type ChangeEvent, useState} from "react";
import type {Hero} from "../types/hero.ts";
import {HEROES} from "../data/mock-heroes.ts";

export default function Dashboard() {
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
    return (
        <div>Dashboard</div>
    )
}