import {useEffect, useRef, useState} from "react";
import type {Hero} from "../types/hero.ts";
import {Link} from "react-router-dom";
import {useMessages} from "../context/MessageContext.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Dashboard() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const {addMessage} = useMessages()

    const fetched = useRef(false)

    useEffect(() => {
        if (!fetched.current) {
            fetch(`${apiUrl}/heroes?_limit=4`)
                .then(res => res.json())
                .then(data => {
                    setHeroes(data)
                    addMessage("Top heroes loaded")
                })

            fetched.current = true;
        }
    }, [addMessage])

    return (
        <div className='flex flex-col gap-3'>
            <h2 className='text-2xl'>Top Heroes</h2>
            <div className='flex gap-3'>
                {heroes.map((hero: Hero) => (
                    <Link
                        key={hero.id}
                        to={`/heroes/${hero.id}`}
                        className='bg-slate-700 rounded-lg text-white p-2 cursor-pointer'
                    >
                        {hero.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
