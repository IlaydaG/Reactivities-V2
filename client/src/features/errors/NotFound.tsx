import { Paper, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <Paper
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 6
      }}
    >
      <SearchOffIcon fontSize="large" color="primary" sx={{ fontSize: 100 }} />

      <Typography gutterBottom variant="h3">
        Oops - we couldnt find what you are looking for
      </Typography>

      <Button
        fullWidth
        component={Link}
        to="/activities"
      >
        Etkinlikler sayfasına dön
      </Button>
    </Paper>
  );
}