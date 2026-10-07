import { useState, type FormEvent } from "react";
import * as HabitProviderModule from "../context/HabitProvider";
import { Button } from "./Button";

export function HabitForm() {
    const [name, setName] = useState("")
    const habitContext = HabitProviderModule as any;
    const { addHabit } = habitContext.useHabits?.() ?? habitContext.useHabitContext?.() ?? { addHabit: () => {} };

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const trimmedName = name.trim()
        if (trimmedName === "") return

        addHabit(trimmedName)
        setName("")
    }

    return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
         value={name}
         onChange={(e) => setName(e.target.value)}
         className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500" placeholder="New habit...."/>
        <Button
            disabled={name.trim() === ""} 
            className="rounded-lg px-4 py-2 font-medium">Add Habit</Button>
    </form>
  )
}