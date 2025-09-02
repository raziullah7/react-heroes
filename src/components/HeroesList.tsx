import {useEffect, useRef, useState} from "react";
import type {Hero} from "../types/hero.ts";
import {Link} from "react-router-dom";
import {useMessages} from "../context/MessageContext.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroesList() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    // introducing useRef to stop it from fetching twice due to strict mode
    const fetched = useRef(false)
    const {addMessage} = useMessages()

    useEffect(() => {
        // if not fetched, then fetch
        if (!fetched.current) {
            fetch(`${apiUrl}/heroes`)
                .then(res => res.json())
                .then(data => {
                    setHeroes(data)
                    addMessage("All heroes loaded")
                })

            fetched.current = true;
        }
    }, [addMessage, heroes])

    return (
        <>
            <h2 className='text-2xl'>My heroes</h2>
            <ul className='flex flex-col gap-2 my-3'>
                {heroes.map(hero => (
                    <Link to={`/heroes/${hero.id}`}
                          key={hero.id}
                          className='flex cursor-pointer'
                    >
                        <span className='bg-slate-700 rounded-l text-white p-2'>{hero.id}</span>
                        <span className='bg-slate-300 p-2 rounded-r w-full'>{hero.name}</span>
                    </Link>
                ))}
            </ul>
        </>
    )
}
