import {type ChangeEvent, useEffect, useRef, useState} from "react";
import type {Hero} from "../types/hero.ts";
import {useParams} from "react-router-dom";
import {useMessages} from "../context/MessageContext.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroDetail() {
    const [hero, setHero] = useState<Hero | null>(null)
    const {id: heroId} = useParams()
    const fetched = useRef(false)
    const {addMessage} = useMessages()

    useEffect(() => {
        if (!fetched.current) {
            fetch(`${apiUrl}/heroes/${heroId}`)
                .then(data => data.json())
                .then(data => {
                    setHero(data)
                    addMessage(`Hero ${data.name} loaded`)
                });
        }
        fetched.current = true;
    }, [addMessage, heroId]);

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
