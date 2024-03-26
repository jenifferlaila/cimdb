import useApp from "./App.hook";
import { Card, CircularProgress, ThemeProvider } from "@mui/material";

function App() {
  const { loading } = useApp();

  return (
    <ThemeProvider theme={{}}>
      <Card
        sx={{
          top: 0,
          left: 0,
          zIndex: 50,
          width: "100%",
          height: "100%",
          position: "fixed",
          alignItems: "center",
          justifyContent: "center",
          display: loading ? "flex" : "none",
        }}
      >
        <CircularProgress size={100} />
      </Card>
    </ThemeProvider>
  );
}

export default App;
