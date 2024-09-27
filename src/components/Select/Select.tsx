import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/material";
import useDarkMode from "../../context/SystemMatchMedia";
import { useTheme } from "../../context/ThemeContext";

interface SelectLabelsProps {
  options: { label: string; value: string }[];
  selectValue: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

export default function SelectLabels({
  options,
  selectValue,
  onChange,
  icon,
}: SelectLabelsProps) {
  const [isFocused, setIsFocused] = React.useState(false); // State to track focus

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  const handleFocus = () => {
    setIsFocused(true); // Set focus state to true
  };

  const handleBlur = () => {
    setIsFocused(false); // Set focus state to false
  };

  const { theme } = useTheme();
  const isSystemDarkMode = useDarkMode();
  const isDarkMode =
    theme === "dark" || (theme === "system" && isSystemDarkMode);

  return (
    <FormControl
      margin={"none"}
      sx={{
        minWidth: 120,
        position: "relative",
      }}>
      <Box display="flex" alignItems="center" >
        {icon && <Box>{icon}</Box>}
        <Select
          value={selectValue}
          onChange={handleChange}
          displayEmpty
          onFocus={handleFocus} // Add focus handler
          onBlur={handleBlur} // Add blur handler
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
              color: isDarkMode ? "#aeb2b5" : "#000",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
              color: isDarkMode ? "#aeb2b5" : "#000",
            },
            "& .MuiSelect-select": {
              color: isDarkMode ? "#aeb2b5" : "#000", // Change the selected text color based on the mode
            },
            fontSize: 12
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                width: "100%",
                maxWidth: 175,
                bgcolor: isDarkMode ? "#333" : "#aeb2b5",
                color: isDarkMode ? "#aeb2b5" : "#000",
                fontSize: 12
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }}
          >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                color: isDarkMode ? "#aeb2b5" : "#000",
                "&:hover": {
                  bgcolor: isDarkMode ? "#444" : "#f0f0f0",
                },
              }}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </FormControl>
  );
}
