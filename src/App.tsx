import { CssBaseline } from "@mui/material";
import { TopBar } from "./components/layout/TopBar.tsx";
import { Header } from "./components/layout/Header.tsx";
import { NavBar } from "./components/layout/NavBar.tsx";
import { Footer } from "./components/layout/Footer.tsx";
import { HomePage } from "./pages/HomePage.tsx";

export default function App() {
  return (
    <>
      <CssBaseline />
      <TopBar />
      <Header />
      <NavBar />
      <HomePage />
      <Footer />
    </>
  );
}
