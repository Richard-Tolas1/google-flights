// FlightSearchForm.tsx
import React from "react";
import Input from "../InputFields/Input";
import SelectLabels from "../Select/Select";
import SwapHorizSharpIcon from "@mui/icons-material/SwapHorizSharp";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FlightCalendar from "../Calendar/FlightCalendar";
import { Airport } from "../../schema/airport";
import SearchIcon from "@mui/icons-material/Search";

interface FlightSearchFormProps {
  origin: string;
  destination: string;
  onOriginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDestinationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSwapLocations: () => void;
  originSuggestions: Airport[];
  destinationSuggestions: Airport[];
  onSelectOrigin: (airport: Airport) => void;
  onSelectDestination: (airport: Airport) => void;
  selectedItinerary: string;
  onItineraryChange: (value: string) => void;
  selectedFlightType: string;
  onFlightTypeChange: (value: string) => void;
  departureDate: Date;
  returnDate: Date;
  onDateChange: (dates: [Date, Date]) => void;
  flightTrips: { label: string; value: string }[];
  flightType: { label: string; value: string }[];
  isOriginSelected: boolean;
  isDestinationSelected: boolean;
  handleSearch: () => void;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  onSwapLocations,
  originSuggestions,
  destinationSuggestions,
  onSelectOrigin,
  onSelectDestination,
  selectedItinerary,
  onItineraryChange,
  selectedFlightType,
  onFlightTypeChange,
  departureDate,
  returnDate,
  onDateChange,
  flightTrips,
  flightType,
  isOriginSelected,
  isDestinationSelected,
  handleSearch,
}) => {
  return (
    <div className="w-full flex-col items-center justify-center">
      <div className="md:dark:bg-[#37373a] md:bg-white md:shadow-lg md:mx-32 lg:mx-32 mx-5 rounded-[8px] px-4 pt-3 pb-8">
        <div className="md:flex lg:flex md:flex-row lg:flex-row gap-5">
          <SelectLabels
            options={flightTrips}
            selectValue={selectedItinerary}
            onChange={onItineraryChange}
          />
          <SelectLabels
            options={flightType}
            selectValue={selectedFlightType}
            onChange={onFlightTypeChange}
          />
        </div>
        <div className="md:flex lg:flex gap-5 items-center">
          <div className="w-full relative">
            <div className="flex items-center">
              <Input
                type="text"
                value={origin}
                placeHolder="Where from?"
                onChange={onOriginChange}
                icon={
                  <FiberManualRecordOutlinedIcon sx={{ color: "#6e7276" }} />
                }
                className="w-full"
              />
              <div
                className="border-x-2 border-y-0 border-[#6e7276] rounded-r-full rounded-l-full z-50 -ml-4 bg-[#37373a] p-1 cursor-pointer hover:rotate-180"
                onClick={onSwapLocations}>
                <SwapHorizSharpIcon />
              </div>
              <Input
                type="text"
                value={destination}
                placeHolder="Where to?"
                onChange={onDestinationChange}
                icon={<LocationOnOutlinedIcon sx={{ color: "#6e7276" }} />}
                className="-ml-4 px-5 w-full"
              />
            </div>
            {/* Airport suggestions for origin */}
            {!isOriginSelected && originSuggestions.length > 0 && (
              <div className="absolute top-full dark:bg-[#36373a] bg-white left-0 w-full bg-transparent z-50 shadow-md max-h-64 overflow-y-auto">
                {originSuggestions.map((airport, index) => (
                  <div
                    key={index}
                    onClick={() => onSelectOrigin(airport)}
                    className="cursor-pointer p-2 hover:bg-[#65686b] flex items-center gap-3">
                    <LocationOnOutlinedIcon sx={{ color: "#dbdee1" }} />
                    <div>{airport.navigation.localizedName}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Airport suggestions for destination */}
            {!isDestinationSelected && destinationSuggestions.length > 0 && (
              <div className="absolute top-full dark:bg-[#36373a] bg-white left-0 w-full bg-transparent z-50 shadow-md max-h-64 overflow-y-auto">
                {destinationSuggestions.map((airport, index) => (
                  <div
                    key={index}
                    onClick={() => onSelectDestination(airport)}
                    className="cursor-pointer p-2 hover:bg-[#65686b]">
                    {airport.navigation.localizedName}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="md:w-full md:mt-0 mt-5">
            <FlightCalendar
              fromDate={departureDate}
              toDate={returnDate}
              onDateChange={onDateChange}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center -mt-5">
        <button
          onClick={handleSearch}
          className="rounded-3xl p-2 bg-[#8ab4f7] justify-center flex gap-1 items-center">
          <SearchIcon sx={{ color: "black" }} />
          <div className="dark:text-darkMode text-white">Search</div>
        </button>
      </div>
    </div>
  );
};

export default FlightSearchForm;
