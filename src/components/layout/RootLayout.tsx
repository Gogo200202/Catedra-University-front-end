import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Box, CircularProgress, Stack } from "@mui/material";
import { TopBar } from "./TopBar.tsx";
import { Header } from "./Header.tsx";
import { NavBar } from "./NavBar.tsx";
import { Footer } from "./Footer.tsx";
import { UserProvider } from "../../context/UserProvider.tsx";

function PageFallback() {
  return (
    <Stack sx={{ py: 12, alignItems: "center" }}>
      <CircularProgress color="primary" />
    </Stack>
  );
}

export function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <UserProvider>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <TopBar />
        <Header />
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </Box>
        <Footer />
      </Box>
    </UserProvider>
  );
}
