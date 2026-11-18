import { Box } from "@mui/material";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { ProgrammeLevelSection } from "../../components/education/ProgrammeLevelSection.tsx";
import type { ProgrammeLevel } from "../../data/programmes.ts";

interface ProgrammesPageProps {
  level: ProgrammeLevel;
  titleKey: "education.bachelor" | "education.master" | "education.doctoral";
  subtitleKey:
    | "pages.bachelorSubtitle"
    | "pages.masterSubtitle"
    | "pages.doctoralSubtitle";
}

export function ProgrammesLevelPage({
  level,
  titleKey,
  subtitleKey,
}: ProgrammesPageProps) {
  return (
    <Box>
      <PageHero titleKey={titleKey} subtitleKey={subtitleKey} />
      <Box sx={{ py: 5, px: { xs: 2, sm: 3 }, maxWidth: 1100, mx: "auto" }}>
        <ProgrammeLevelSection level={level} />
      </Box>
    </Box>
  );
}
