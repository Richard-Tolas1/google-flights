import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SelectLabels from "../Select/Select";
import { useState } from "react";
import Input from "../InputFields/Input";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import SwapHorizSharpIcon from "@mui/icons-material/SwapHorizSharp";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import SearchIcon from "@mui/icons-material/Search";
import "../../DatePicker.css";
import FlightCalendar from "../Calendar/FlightCalendar";

function FlightInfo() {
  const flightItineraries = [
    { label: "Round Trip", value: "10" },
    { label: "One Way", value: "20" },
    { label: "Multi-city", value: "30" },
  ];

  const flightType = [
    { label: "Economy", value: "10" },
    { label: "Premium economy", value: "20" },
    { label: "Business", value: "30" },
    { label: "First", value: "11" },
  ];

  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const [selectedItinerary, setSelectedItinerary] = useState<string>(
    flightItineraries[0].value
  );

  const handleChangeItinerary = (value: string) => {
    setSelectedItinerary(value);
  };

  const [selectFlightType, setSelectedFlightType] = useState<string>(
    flightType[0].value // Fixed to use flightType
  );

  const handleChangeFlightType = (value: string) => {
    setSelectedFlightType(value);
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div>
      <div className="dark:bg-[#37373a] bg-white shadow-lg md:mx-32 lg:mx-32 mx-5 rounded-[8px] px-4 pt-3 pb-8">
        <div className="flex flex-row gap-5">
          <SelectLabels
            options={flightItineraries}
            selectValue={selectedItinerary}
            onChange={handleChangeItinerary}
            icon={<SwapHorizIcon />}
          />
          <SelectLabels
            options={flightType}
            selectValue={selectFlightType}
            onChange={handleChangeFlightType} // Fixed function name
          />
        </div>
        <div className="flex gap-5 items-center">
          <div className="w-full">
            <div className="flex items-center">
              <Input
                type="text"
                value={from}
                placeHolder={from === "" ? "Where from?" : from}
                onChange={(e) => setFrom(e.target.value)} // Fix here
                icon={
                  <FiberManualRecordOutlinedIcon sx={{ color: "#6e7276" }} />
                }
                className="w-full"
              />
              <div
                className="border-x-2 border-y-0 border-[#6e7276] rounded-r-full rounded-l-full z-50 -ml-4 bg-[#37373a] p-1 cursor-pointer transform transition-transform duration-500 hover:rotate-180"
                onClick={swapLocations}>
                <SwapHorizSharpIcon />
              </div>
              <Input
                type="text"
                value={to}
                placeHolder={to === "" ? "Where to?" : to}
                onChange={(e) => setTo(e.target.value)} // Fix here
                icon={<LocationOnOutlinedIcon sx={{ color: "#6e7276" }} />}
                className="-ml-4 px-5 w-full"
              />
            </div>
          </div>
          <div className="w-full">
            <FlightCalendar />
          </div>
        </div>
      </div>
      <div className="items-center flex justify-center">
        <button className="rounded-3xl -mt-5 p-2 bg-[#8ab4f7] flex gap-1 items-center">
          <SearchIcon sx={{ color: "black" }} />
          <div className="dark:text-darkMode text-white">Search</div>
        </button>
      </div>
    </div>
  );
}

export default FlightInfo;
