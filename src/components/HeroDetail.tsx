import {type ChangeEvent, useEffect, useRef, useState} from "react";
import type {Hero} from "../types/hero.ts";
import {useParams} from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroDetail() {
    const [hero, setHero] = useState<Hero | null>(null)
    const params = useParams()
    const fetched = useRef(false)

    useEffect(() => {
        if (!fetched.current) {
            fetch(`${apiUrl}/heroes/${params.id}`)
                .then(data => data.json())
                .then(data => setHero(data));
        }
        fetched.current = true;
    }, [params.id]);

    if (!hero) return null
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHero({...hero, name: event.target.value});
    }

    return (
        <>
            <h2 className="text-2xl">Details</h2>
            <div>
                <span className="font-bold">ID:</span> {hero.id}
            </div>
            <div className="space-x-2">
                <span className="font-bold">Name:</span>
                <span className="uppercase">{hero.name}</span>
            </div>
            <div className="flex flex-col border-t mt-3 gap-2">
                <label>Hero Name</label>
                <input
                    placeholder="name"
                    type="text"
                    className="w-1/4 p-2 border border-gray-300 rounded-lg"
                    value={hero.name}
                    onChange={handleNameChange}
                />
            </div>
        </>
    );
}
