import { Select, styled } from "@mui/material";

const MyCustomSelect = styled(Select)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "transparent", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent", // Border color when focused
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "inherit", // Text color when focused
      },
    },
    "& .MuiSelect-select": {
      background: "white", // Background color
      border: "none",
      outline: "none",
      boxShadow: "none",
    },
    "& .MuiMenuItem-root": {
      background: "white", // Background color for menu items
      "&:hover": {
        background: "lightgray", // Optional: change on hover if needed
      },
    },
    "& .MuiPaper-root": {
      backgroundColor: "white", // Background color for the dropdown menu
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      // '& .MuiSelect-select': {
      //   padding: 0, // Optional: adjust padding as needed
      // },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
  });

  const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      background: "white",
    },
  },
};

export default function CustomSelect(props) {
  return <MyCustomSelect MenuProps={MenuProps} {...props} />;
}