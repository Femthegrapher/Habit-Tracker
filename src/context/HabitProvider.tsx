import { type ReactNode } from "react";
import { isSameDay } from "date-fns";
import { HabitContext } from "./useHabits";
import { useLocalSorage } from "../hooks/useLocalStorage";

export type Habit = {
    id: string
    name: string
    completedDates: Date[]
}



type HabitProviderProps = {
    children: ReactNode
}


export function HabitProvider({ children }: HabitProviderProps) {
    const [habits, setHabits] = useLocalSorage<Habit[]>("Habits", [])

    function addHabit(name: string) {
        setHabits(curr => [...curr, { id: crypto.randomUUID(), name, completedDates: [] }])
    }

    function deleteHabit(id: string) {
        setHabits(curr => curr.filter(h => h.id !== id))
    }

    function toggleHabit(id: string, date: Date) {
        setHabits(curr => curr.map(h => {
            if (h.id !== id) return h

            const alreadyDone = h.completedDates.some(d => isSameDay(d, date))
            const completedDates = alreadyDone
                ? h.completedDates.filter(d => !isSameDay(d, date))
                : [...h.completedDates, date]

            return { ...h, completedDates }
        }))
    }

    return <HabitContext.Provider value={{ habits, addHabit, deleteHabit, toggleHabit }}>{children}</HabitContext.Provider>
}

