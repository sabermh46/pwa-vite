import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getSavedJournal } from "../../features/journal/journalSlice";
import { format, parseISO, eachDayOfInterval } from "date-fns";
import JournalCard from "../journal/JournalCard";

const ShowPreviousMoods = ({ month }) => {
  const journals = useSelector(getSavedJournal);

  // Get current date & month
  const today = new Date();
  const currentMonth = month || format(today, "yyyy-MM"); // Default to current month (YYYY-MM)

  // Process Journal Data
  const { groupedByDate, allDates } = useMemo(() => {
    const grouped = {};
    const entriesThisMonth = journals.filter((entry) =>
      entry.timestamp.startsWith(currentMonth)
    );

    entriesThisMonth.forEach((entry) => {
      const dateKey = format(parseISO(entry.timestamp), "yyyy-MM-dd");
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(entry);
    });

    const firstDay = entriesThisMonth.length
      ? new Date(entriesThisMonth[0].timestamp)
      : today;
    const lastDay = today; // Show up to the current date

    const allDates = eachDayOfInterval({
      start: firstDay,
      end: lastDay,
    }).map((date) => format(date, "yyyy-MM-dd"));

    return { groupedByDate: grouped, allDates };
  }, [journals, currentMonth]);

  return (
    <div className="w-[calc(100%-20px)] mx-auto page py-4">
      {/* <h2>Previous Moods ({currentMonth})</h2> */}
      <div className="mood-grid">
        {allDates.map((date, index) => {
          if (groupedByDate[date]) {
            return <JournalCard key={date} date={date} entries={groupedByDate[date]} />;
          }

          const prevDate = allDates[index - 1];
          if (prevDate && !groupedByDate[prevDate]) return null;

          let missingCount = 1;
          while (allDates[index + missingCount] && !groupedByDate[allDates[index + missingCount]]) {
            missingCount++;
          }

          return (
            <div key={date} className="text-center my-3 px-6 py-2 bg-background bg-opacity-30 rounded-full w-max mx-auto">
              {missingCount > 1 ? `${missingCount} days missing` : "No entries"}
            </div>
          );
        })}
      </div>

      <p className="pt-5 pb-2 text-center text-secondary">
        That's all for now!
      </p>
    </div>
  );
};

export default ShowPreviousMoods;

