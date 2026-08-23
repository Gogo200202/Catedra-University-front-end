import { Box } from "@mui/material";
import { HeroSlider } from "../components/home/HeroSlider.tsx";
import { SystemsLinks } from "../components/home/SystemsLinks.tsx";
import { ProgrammesSection } from "../components/home/ProgrammesSection.tsx";
import { WelcomeSection } from "../components/home/WelcomeSection.tsx";

export function HomePage() {
  return (
    <Box component="main">
      <HeroSlider />
      <SystemsLinks />
      <ProgrammesSection />
      <WelcomeSection />
    </Box>
  );
}
