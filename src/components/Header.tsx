import { formatDate, isToday } from "date-fns";
import { useHabits } from "../context/useHabits";
import { Button } from "./Button";

type HeaderProps = {
  visibleDates: Date[];
  onPrev: () => void;
  onNext: () => void;
};

export function Header({ visibleDates, onPrev, onNext }: HeaderProps) {
  const { habits } = useHabits();

  const doneToday = habits.filter((habit) => {
    const completions = ((habit as { completions?: Date[] })?.completions ?? []) as Date[];
    return completions.some((completion) => isToday(completion));
  }).length;

  const dateRange = `${formatDate(visibleDates[0], "MMM d")} - ${formatDate(
    visibleDates[visibleDates.length - 1],
    "MMM d"
  )}`;

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-zinc-400 text-sm">
          {doneToday} / {habits.length} done today
        </span>
      </div>

      <div className="flex flex-col gap-1 items-end">
        <span className="text-zinc-400 text-sm">{dateRange}</span>
        <div className="flex items-center gap-3">
          <Button onClick={onPrev}>Prev</Button>
          <Button onClick={onNext} disabled={visibleDates.some((date) => isToday(date))}>
            Next
          </Button>
        </div>
      </div>
    </header>
  );
}