import { useEffect } from "react";
import Flights_nc_4 from "../../assets/Flights_nc_4";
import Flights_nc_dark_theme_4 from "../../assets/Flights_nc_dark_theme_4";
import useDarkMode from "../../context/SystemMatchMedia";
import { useTheme } from "../../context/ThemeContext";
import FlightInfo from "./FlightInfo";
import axiosClient from "../../context/AppContext";

function Flight() {
  const { theme} = useTheme();
  const sendRequest = axiosClient();
  const isSystemDarkMode = useDarkMode();
  const isDarkMode =
    theme === "dark" || (theme === "system" && isSystemDarkMode);
  // useEffect(() => {
  //   sendRequest
  //     .get("v1/getLocale")
  //     .then((response) => {
  //       setDogs(response.data.message);
  //       console.log(dogs);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching dog images:", error);
  //     });
  // }, []);
  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        <div>
          <div className="w-full relative text-center">
            {isDarkMode ? <Flights_nc_dark_theme_4 /> : <Flights_nc_4 />}
            <div className="text-center items-center flex-col flex justify-center">
              <div className="text-[55px] absolute bottom-[5px]">Flights</div>
            </div>
          </div>
          <div className="mt-8 mb-20">
            <FlightInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flight;
