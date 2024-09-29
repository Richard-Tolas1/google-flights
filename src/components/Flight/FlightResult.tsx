// FlightResults.tsx
import React from "react";
import { Flights } from "../../schema/flights";
import TimelineIcon from "@mui/icons-material/Timeline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SwapHorizSharpIcon from "@mui/icons-material/SwapHorizSharp";
import { Switch } from "@mui/material";
import FlightCard from "./FlightCard";

interface FlightResultsProps {
  flights: Flights | undefined;
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights }) => {
  return (
    <div className="my-10 border-y border-[#5f6367] mx-32 py-5">
      <div className="items-center flex gap-3">
        <TimelineIcon sx={{ color: "#8ab4f7" }} />
        <div className="text-sm">Track prices</div>
        <div>
          <InfoOutlinedIcon sx={{ color: "#505457" }} />
        </div>
        <div className="text-[#8ab4f7]">
          Sep 28 - 31 Oct
          <span>
            <Switch color="info" />
          </span>
        </div>
        <div className="">
          <hr className="w-[1px] bg-[#5f6367] h-10 border-transparent" />
        </div>
        <div className="#8ab4f7">
          Any Date
          <span>
            <Switch color="info" />
          </span>
        </div>
      </div>
      <div>
        <div className="text-xl font-meidum">Best departing flights</div>
        <div className="flex justify-between items-center text-xs">
          <div className="text-xs text-[#6e7276]">
            Ranked based on price and convenience
            <span className="mx-1">
              <InfoOutlinedIcon sx={{ color: "#505457" }} />
            </span>
            Prices include required taxes + fees for 1 adult. Optional charges
            and bag fees may apply. Passenger assistance info.
          </div>
          <div className="text-[#8ab4f7]">
            Sort by:
            <span>
              <SwapHorizSharpIcon className="rotate-90" />
            </span>
          </div>
        </div>
        <div className="border border-[#959ba0] rounded-[8px]">
          {flights === undefined ? (
            <div>No Flights Available</div>
          ) : (
            <FlightCard data={flights.itineraries} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
