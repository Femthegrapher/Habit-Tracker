import { createContext, useContext } from "react"
import { Button } from "./Button"
import { format, isFuture, isSameDay, subDays } from "date-fns"

type Habit = {
    id: string | number
    name: string
    completions: Date[]
}

type HabitListProps = {
    visibleDates: Date[]
}

type HabitContextValue = {
    habits: Habit[]
    deleteHabit: (habitId: string | number) => void
    toggleHabit: (habitId: string | number, date: Date) => void
}

const HabitContext = createContext<HabitContextValue | null>(null)

export function HabitList({ visibleDates }: HabitListProps) {
    const habitContext = useContext(HabitContext)

    if (!habitContext) {
        return <p className="text-center text-zinc-500 py-12">No habits yet. Add One aboove to get started!</p>
    }

    const { habits } = habitContext

    if (habits.length === 0) {
        return <p className="text-center text-zinc-500 py-12">No habits yet. Add One aboove to get started!</p>
    }
    return (
        <div className="flex flex-col gap-3">
            {habits.map(habit => (<HabitItem key={habit.id} habit={habit} visibleDates={visibleDates} ></HabitItem>))}
        </div>
    )
}

type HabitItemProps = {
    habit: Habit
    visibleDates: Date[]
}

function HabitItem({ habit, visibleDates }: HabitItemProps) {
    const habitContext = useContext(HabitContext)

    if (!habitContext) {
        return null
    }

    const { deleteHabit, toggleHabit } = habitContext

    const streak = getStreak(habit.completions)

    return (
        <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="font-medium">{habit.name}</span>
                    {streak !== 0 && (
                        <span className="text-sm text-amber-400">🔥 {streak}</span>
                    )}
                </div>
                <Button onClick={() => deleteHabit(habit.id)} variant="ghost-destructive" className="text-sm">Delete</Button>
            </div>
            <div className="flex gap-1.5">
                {visibleDates.map(date => (
                    <Button 
                        className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs" 
                        key={date.toISOString()} disabled={isFuture(date)}
                        onClick={() => toggleHabit(habit.id, date)}
                        variant={habit.completions.some(d => isSameDay(date, d)) ? "primary" : "secondary"}
                        >
                        <span className="font-medium">{format(date, "EEE")}</span>
                        <span>{format(date, "d")}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}

function getStreak(completions: Date[]) {
    let streak = 0
    let date = new Date()
    
    while (completions.some(d => isSameDay(d, date))) {
        streak++
        date = subDays(date, 1)
    }
    return streak
}