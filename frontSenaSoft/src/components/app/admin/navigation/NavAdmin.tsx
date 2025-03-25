import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { Assessment, BikeScooter } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface navProps {
  initialValue: string;
}

const NavAd: React.FC<navProps> = ({ initialValue }) => {
  const goTo = useNavigate();
  const [value, setValue] = React.useState(initialValue);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: 500 }}
      value={value}
      onChange={handleChange}
      style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}
    >
      <BottomNavigationAction
        onClick={() => {
          goTo("/indexAdmin");
        }}
        label="Monitoreo bikes"
        value="Bikes"
        icon={<DirectionsBikeIcon />}
      />
      <BottomNavigationAction
        onClick={() => {
          goTo("/admin/ciclopaseos");
        }}
        label="Ciclopaseos"
        value="ciclopaseos"
        icon={<BikeScooter />}
      />
      <BottomNavigationAction
        onClick={()=>{
          goTo("/admin/reportes");
        }}
        label="Reportes"
        value="reportes"
        icon={<Assessment />}
      />
    </BottomNavigation>
  );
};

export default NavAd;
