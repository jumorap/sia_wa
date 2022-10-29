import { Typography } from "@mui/material";

  
  /**
   * Generate a subtitle card
   * @returns {JSX.Element}
   * @param props
   */
   export const SubtitleCard = (props) => {
    return (
      <Typography variant="h6" sx={{ fontWeight: "bold", padding: "5px" }}>
        {props.subtitle}
      </Typography>
    );
  };