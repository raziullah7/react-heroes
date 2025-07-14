import type { ChangeEvent } from "react";
import type { Hero } from "../types/hero";

type Props = {
  hero: Hero,
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function HeroDetail({hero, onChangeName}: Props) {
  if (hero === null) return null;
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
          onChange={onChangeName}
        />
      </div>
    </>
  );
}
