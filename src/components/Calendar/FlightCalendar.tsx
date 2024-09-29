import { useState } from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Calendar from "react-calendar";
import "../../calendar.css";
import Input from "../InputFields/Input";

interface FlightCalendarProps {
  fromDate: Date;
  toDate: Date;
  onDateChange: (dates: [Date, Date]) => void;
}

function FlightCalendar({
  fromDate,
  toDate,
  onDateChange,
}: FlightCalendarProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [editingFromDate, setEditingFromDate] = useState(true)

  const currentDate = new Date();

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  const formattedFromDate = formatDate(fromDate);
  const formattedToDate = formatDate(toDate);

  const handleInputClick = (isFromDate: boolean) => {
    setEditingFromDate(isFromDate);
    setShowCalendar(true);
  };

  const handleCalendarChange = (value: Date) => {
    if (editingFromDate) {
      onDateChange([value, toDate]);
    } else {
      onDateChange([fromDate, value]);
    }
    setShowCalendar(false);
  };

  const handlePreviousFromDate = () => {
    const prevFromDate = new Date(fromDate);
    prevFromDate.setDate(prevFromDate.getDate() - 1);
    onDateChange([prevFromDate, toDate]);
  };

  const handleNextFromDate = () => {
    const nextFromDate = new Date(fromDate);
    nextFromDate.setDate(nextFromDate.getDate() + 1);
    onDateChange([nextFromDate, toDate]);
  };

  const handlePreviousToDate = () => {
    const prevToDate = new Date(toDate);
    prevToDate.setDate(prevToDate.getDate() - 1);
    onDateChange([fromDate, prevToDate]);
  };

  const handleNextToDate = () => {
    const nextToDate = new Date(toDate);
    nextToDate.setDate(nextToDate.getDate() + 1);
    onDateChange([fromDate, nextToDate]);
  };

  return (
    <div className="relative border-2 border-[#6e7276] px-4 rounded-[4px]">
      <div className="flex items-center gap-5">
        <div className="flex">
          <div className="flex items-center gap-2 my-4">
            <div>
              <DateRangeIcon sx={{ color: "#6e7276" }} />
            </div>
            <div>
              <Input
                type="text"
                value={formattedFromDate}
                name="fromDate"
                id="fromDate"
                className="bg-transparent max-w-28 cursor-pointer focus:ring-0 outline-none border-none p-0"
                onClick={() => handleInputClick(true)} // Edit fromDate
              />
            </div>
          </div>
          <div className="flex">
            <button
              type="button"
              className="hover:bg-[#bdc1c6] hover:bg-opacity-10"
              onClick={handlePreviousFromDate} // Go to previous day for fromDate
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className="hover:bg-[#bdc1c6] hover:bg-opacity-10"
              onClick={handleNextFromDate} // Go to next day for fromDate
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
        <div className="text-[#6e7276] rotate-90">
          <HorizontalRuleIcon />
        </div>
        <div className="flex">
          <div className="flex items-center gap-2 my-4">
            <div>
              <Input
                type="text"
                value={formattedToDate}
                name="toDate"
                id="toDate"
                className="bg-transparent max-w-28 cursor-pointer border-none p-0"
                onClick={() => handleInputClick(false)} // Edit toDate
              />
            </div>
          </div>
          <div className="flex">
            <button
              type="button"
              className="hover:bg-[#bdc1c6] hover:bg-opacity-10"
              onClick={handlePreviousToDate}>
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className="hover:bg-[#bdc1c6] hover:bg-opacity-10"
              onClick={handleNextToDate}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
      {showCalendar && (
        <div>
          <Calendar
            className="absolute top-[90%] left-0 z-50 dark:bg-[#36373a] bg-white"
            onChange={handleCalendarChange}
            value={editingFromDate ? fromDate : toDate}
            minDate={currentDate}
          />
        </div>
      )}
    </div>
  );
}

export default FlightCalendar;
