import { useState } from "react";
import { HabitForm } from "./components/HabitForm";
import { HabitList } from "./components/HabitList";
import { Header } from "./components/Header";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { HabitProvider } from "./context/HabitProvider";

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0);

  const visibleDates = getVisibleDates(weekOffset);

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <HabitProvider>
        <Header
          visibleDates={visibleDates}
          onNext={() => setWeekOffset((o) => o + 1)}
          onPrev={() => setWeekOffset((o) => o - 1)}
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>
    </div>
  );
}

function getVisibleDates(weekOffset: number) {
  const week = addWeeks(new Date(), weekOffset);

  return eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });
}

