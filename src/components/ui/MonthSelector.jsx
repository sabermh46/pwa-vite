import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { format, parseISO } from "date-fns";

const MonthSelector = ({ availableMonths, selectedMonth, setSelectedMonth }) => {
  const currentIndex = availableMonths.indexOf(selectedMonth);

  // Handlers for changing month
  const goPrevMonth = () => {
    if (currentIndex > 0) {
      setSelectedMonth(availableMonths[currentIndex - 1]);
    }
  };

  const goNextMonth = () => {
    if (currentIndex < availableMonths.length - 1) {
      setSelectedMonth(availableMonths[currentIndex + 1]);
    }
  };

  return (
    <div className="flex justify-between px-6 items-center py-4">
      <button
        className={`p-1 bg-background rounded-full boxShadow20 ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={goPrevMonth}
        disabled={currentIndex === 0}
      >
        <IoIosArrowBack className="h-6 w-6 -translate-x-[2px]" />
      </button>

      <p className="px-6 py-1 bg-background rounded-full boxShadow20">
        {selectedMonth ? format(parseISO(`${selectedMonth}-01`), "MMMM yyyy") : "No Data"}
      </p>

      <button
        className={`p-1 bg-background rounded-full boxShadow20 ${
          currentIndex === availableMonths.length - 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={goNextMonth}
        disabled={currentIndex === availableMonths.length - 1}
      >
        <IoIosArrowForward className="h-6 w-6 translate-x-[2px]" />
      </button>
    </div>
  );
};

export default MonthSelector;
