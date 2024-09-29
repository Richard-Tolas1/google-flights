import { useState } from "react";
import axiosClient from "../../context/AppContext";
import { Airport } from "../../schema/airport";
import _ from "lodash";
import { Flights } from "../../schema/flights";
import FlightSearchForm from "./FlightSearchForm";
import FlightResults from "./FlightResult";
import Spinner from "../../assets/Spinner";

function FlightInfo() {
  const flightTrips = [
    { label: "Round Trip", value: "return" },
    { label: "One Way", value: "no_return" },
    { label: "Multi-city", value: "multi" },
  ];

  const flightType = [
    { label: "Economy", value: "economy" },
    { label: "Premium economy", value: "premium_economy" },
    { label: "Business", value: "business" },
    { label: "First", value: "first" },
  ];

  const [loading, setLoading] = useState<boolean>();

  const [origin, setOrigin] = useState<string>("");

  const [destination, setDestination] = useState<string>("");

  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const [originSuggestions, setOriginSuggestions] = useState<Airport[]>([]);

  const [flights, setFlights] = useState<Flights>();

  const [destinationSuggestions, setDestinationSuggestions] = useState<
    Airport[]
  >([]);

  const sendRequest = axiosClient();

  const [originAirport, setOriginAirport] = useState<Airport>();

  const [destinationAirport, setDestinationAirport] = useState<Airport>();

  const [selectedItinerary, setSelectedItinerary] = useState<string>(
    flightTrips[0].value
  );

  const [selectedFlightType, setSelectedFlightType] = useState<string>(
    flightType[0].value
  );

  const [isOriginSelected, setIsOriginSelected] = useState(false);

  const [isDestinationSelected, setIsDestinationSelected] = useState(false);

  const [departureDate, setDepartureDate] = useState<Date>(new Date());

  const [returnDate, setReturnDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() + 10))
  );

  // To format Date
  const formatDateToYMD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // To fetch airport suggestions
  const fetchAirportSuggestions = async (
    input: string,
    setSuggestions: (suggestions: Airport[]) => void
  ) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await sendRequest.get("/v1/flights/searchAirport", {
        params: { query: input.substring(0, 3).toLowerCase() },
      });
      setSuggestions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching airport suggestions:", error);
    }
  };

  // To handle Origin suggestion fetch request
  const debouncedFetchOriginSuggestions = _.debounce(
    (input: string) => fetchAirportSuggestions(input, setOriginSuggestions),
    300
  );

  // To handle Origin suggestion fetch request
  const debouncedFetchDestinationSuggestions = _.debounce(
    (input: string) =>
      fetchAirportSuggestions(input, setDestinationSuggestions),
    300
  );

  // Function to handle Origin Change
  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrigin(e.target.value);
    debouncedFetchOriginSuggestions(e.target.value);
    setIsOriginSelected(false);
  };

  // Function to handle Destination Change
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
    debouncedFetchDestinationSuggestions(e.target.value);
    setIsDestinationSelected(false);
  };

  // Function to handle airport selection
  const handleSelectAirport = (
    airport: Airport,
    setAirport: (airport: Airport) => void,
    setField: (value: string) => void,
    clearSuggestions: () => void,
    setIsSelected: (selected: boolean) => void
  ) => {
    setField(airport.navigation.localizedName || "");
    setAirport(airport);
    clearSuggestions();
    setIsSelected(true);
  };

  // Function to fetch flights
  const searchFlights = async () => {
    if (!originAirport || !destinationAirport) {
      console.error("Origin or Destination airport not set.");
      return;
    }

    try {
      setLoading(true);
      const params: any = {
        originSkyId: originAirport?.skyId,
        destinationSkyId: destinationAirport?.skyId,
        originEntityId: originAirport?.entityId,
        destinationEntityId: destinationAirport?.entityId,
        date: formatDateToYMD(departureDate),
        cabinClass: selectedFlightType.toLowerCase(),
        adults: "1",
        sortBy: "best",
        currency: "GBP",
        market: "en-US",
        countryCode: "US",
      };

      if (selectedItinerary === "return") {
        params.returnDate = formatDateToYMD(returnDate);
      }

      if (Object.values(params).every((item) => item !== undefined)) {
        const response = await sendRequest.get(
          "v2/flights/searchFlightsWebComplete",
          { params }
        );
        if (response.data.message == "success") {
          setFlights(response.data.data);
          setLoading(false);
        } else {
          console.error("Expected an array but received:", response.data.data);
        }
      }
    } catch (error) {
      console.error("Error searching for flights:", error);
    }
  };

  // Function to handle flight search
  const handleSearch = async () => {
    setHasSearched(true);
    await searchFlights();
  };

  // Function to handle location swap
  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div>
      <FlightSearchForm
        origin={origin}
        destination={destination}
        onOriginChange={handleOriginChange}
        onDestinationChange={handleDestinationChange}
        onSwapLocations={swapLocations}
        originSuggestions={originSuggestions}
        destinationSuggestions={destinationSuggestions}
        handleSearch={handleSearch}
        onSelectOrigin={(airport) =>
          handleSelectAirport(
            airport,
            setOriginAirport,
            setOrigin,
            () => setOriginSuggestions([]),
            setIsOriginSelected
          )
        }
        onSelectDestination={(airport) =>
          handleSelectAirport(
            airport,
            setDestinationAirport,
            setDestination,
            () => setDestinationSuggestions([]),
            setIsDestinationSelected
          )
        }
        selectedItinerary={selectedItinerary}
        onItineraryChange={setSelectedItinerary}
        selectedFlightType={selectedFlightType}
        onFlightTypeChange={setSelectedFlightType}
        departureDate={departureDate}
        returnDate={returnDate}
        onDateChange={([start, end]) => {
          setDepartureDate(start);
          setReturnDate(end);
        }}
        flightTrips={flightTrips}
        flightType={flightType}
        isOriginSelected={isOriginSelected}
        isDestinationSelected={isDestinationSelected}
      />

      {hasSearched &&
        (loading ? (
          <div className="flex justify-center mt-10">
            <Spinner width="w-10" height="h-10" />
          </div>
        ) : (
          <FlightResults flights={flights} />
        ))}
    </div>
  );
}

export default FlightInfo;
