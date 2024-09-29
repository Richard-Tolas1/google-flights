// AirportSuggestions.tsx
import React from "react";
import { Airport } from "../../schema/airport";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

interface AirportSuggestionsProps {
  suggestions: Airport[];
  onSelect: (airport: Airport) => void;
}

const AirportSuggestions: React.FC<AirportSuggestionsProps> = ({
  suggestions,
  onSelect,
}) => {
  return (
    <div className="absolute top-full dark:bg-[#36373a] bg-white left-0 w-full bg-transparent z-50 shadow-md max-h-64 overflow-y-auto">
      {suggestions.map((airport, index) => (
        <div
          key={index}
          onClick={() => onSelect(airport)}
          className="cursor-pointer p-2 hover:bg-[#65686b] flex items-center gap-3">
          <LocationOnOutlinedIcon sx={{ color: "#dbdee1" }} />
          <div>{airport.navigation.localizedName}</div>
        </div>
      ))}
    </div>
  );
};

export default AirportSuggestions;