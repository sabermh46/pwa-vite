import MoodCard from "../components/mood/MoodCard";
import ShowPreviousMoods from "../components/mood/ShowPreviousMoods";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSavedJournal } from "../features/journal/journalSlice";
import { useState, useMemo, useEffect } from "react";
import MonthSelector from "../components/ui/MonthSelector";
import { resetData } from "../features/db/categoryData";
import PWAInstallPrompt from "../components/pwainstall";

const EntriesPage = () => {

  const navigate = useNavigate();
  const journals = useSelector(getSavedJournal);
  const dispatch = useDispatch();
  dispatch(resetData());

  // Extract Unique Available Months
  const availableMonths = useMemo(() => {
    const monthsSet = new Set(journals.map(entry => entry.timestamp.slice(0, 7))); // Extract "YYYY-MM"
    return Array.from(monthsSet).sort(); // Sort in ascending order
  }, [journals]);

  // Current selected month (default to latest available)
  const [selectedMonth, setSelectedMonth] = useState(availableMonths[availableMonths.length - 1] || "");

  const setCurrentMood = (mood) => {
    setTimeout(() => {
      navigate(`/set-activity/${encodeURIComponent(mood)}`);
    }, 1000);
  };



  return (
    <div className="page">
      <title>Pulse Home</title>
      {/* <PWAInstallPrompt/> */}

      {/* Month Selector */}
      <MonthSelector
        availableMonths={availableMonths}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      <MoodCard setCurrentMood={setCurrentMood} />

      {/* Show Previous Moods for the selected month */}
      <ShowPreviousMoods month={selectedMonth} />
    </div>
  );
};

export default EntriesPage;
