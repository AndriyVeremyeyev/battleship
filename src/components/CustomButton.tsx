import React from "react";
import { Button, useTheme } from "@material-ui/core";

interface CustomButtonProps {
  onClick: any;
  children: string;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { onClick, children } = props;
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      style={{ color: "white", backgroundColor: theme.palette.primary.dark }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
