import {useEffect, useRef, useState} from "react";
import type {Hero} from "../types/hero.ts";
import {Link} from "react-router-dom";

export default function Dashboard() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const fetched = useRef(false)

    useEffect(() => {
        if (!fetched.current) {
            fetch('http://localhost:3000/heroes?_limit=4')
                .then(res => res.json())
                .then(data => setHeroes(data))

            fetched.current = true;
        }
    }, [heroes])

    return (
        <div className='flex flex-col gap-3'>
            <h2 className='text-2xl'>Top Heroes</h2>
            {heroes.map((hero: Hero) => (
                <Link to={}></Link>
            ))}
        </div>
    )
}
