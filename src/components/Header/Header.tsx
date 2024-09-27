import React, { useEffect, useState } from "react";
import AirplaneIcon from "../../assets/AirplaneIcon";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useTheme } from "../../context/ThemeContext";
import Googlelogo_light from "../../assets/Googlelogo_light";
import Googlelogo_clr from "../../assets/Googlelogo_clr";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import useDarkMode from "../../context/SystemMatchMedia";

interface Props {
  children: React.ReactNode;
}

interface GoogleProfile {
  picture: string;
  name: string;
}

function Header({ children }: Props) {
  const { theme } = useTheme();
  const isSystemDarkMode = useDarkMode();
  const [profile, setProfile] = useState<GoogleProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("googleProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleLoginSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential); // Decode the JWT token
      const userProfile = {
        picture: decoded.picture, // Set the user's profile picture
        name: decoded.name, // Optionally, set the user's name
      };
      setProfile(userProfile);
      localStorage.setItem("googleProfile", JSON.stringify(userProfile)); // Store user profile in local storage
    } else {
      console.error("Credential is undefined");
    }
  };

  const getGoogleLogo = () => {
    const isDarkMode =
      theme === "dark" || (theme === "system" && isSystemDarkMode);
    return isDarkMode ? <Googlelogo_light /> : <Googlelogo_clr />;
  };

  return (
    <div className="w-full">
      <div className="flex px-6 py-3 justify-between items-center border-b border-[#5f6367]">
        <div className="flex gap-4 items-center">
          <div className="cursor-pointer mb-[2px]">
            <MenuOutlinedIcon width={24} />
          </div>
          <div className="mt-1">
            <a href="https://www.google.com/">
              <div>{getGoogleLogo()}</div>
            </a>
          </div>
          <div className="text-[#8AB4F7] hidden bg-[#394456] border border-transparent rounded-[20px] px-3 py-[6px] lg:flex md:flex items-center gap-2 ml-4">
            <AirplaneIcon />
            <div>Flights</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <ThemeSwitcher />
          </div>
          {profile ? (
            <div className="flex items-center gap-2">
              <img
                src={profile.picture}
                alt={profile.name}
                className="w-10 h-10 rounded-full"
              />
            </div>
          ) : (
            <GoogleLogin
              theme="outline"
              type="icon"
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              auto_select
              useOneTap
            />
          )}
        </div>
      </div>
      <div className="mx-auto flex justify-center items-center">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Header;
