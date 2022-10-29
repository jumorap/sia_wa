import { Divider, Typography } from "@mui/material";

/**
 * Generate a title card with an icon
 * @param IconTitle Icon to show in the title
 * @param title Title to show in the card
 * @returns {JSX.Element}
 */
 export const TitleCard = (IconTitle, title) => {
    return (
      <div>
        <Typography variant="h5" sx={{ fontWeight: "bold", padding: "10px" }}>
          <IconTitle style={{ fontSize: "20px", color: "var(--softGray)" }} />
          &nbsp; {title}
        </Typography>
        <Divider />
      </div>
    );
  };