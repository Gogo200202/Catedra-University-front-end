import { useState } from "react";
import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { CalendarMonth, Download, PictureAsPdf } from "@mui/icons-material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { programmes } from "../data/programmes.ts";
import type { ProgrammeLevel } from "../data/programmes.ts";
import type { TranslationKey } from "../i18n/translations.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

const levelTabLabel: Record<ProgrammeLevel, TranslationKey> = {
  bachelor: "education.bachelor",
  master: "education.master",
  phd: "education.doctoral",
};

export function EducationPage() {
  const { t, lang } = useLanguage();
  const [level, setLevel] = useState<ProgrammeLevel>("bachelor");

  return (
    <Box>
      <PageHero titleKey="pages.educationTitle" subtitleKey="pages.educationSubtitle" />
      <Container sx={{ py: 5 }}>
        <Tabs
          value={level}
          onChange={(_, value) => setLevel(value)}
          sx={{ mb: 4, borderBottom: 1, borderColor: "divider" }}
        >
          {(Object.keys(levelTabLabel) as ProgrammeLevel[]).map((key) => (
            <Tab key={key} value={key} label={t(levelTabLabel[key])} />
          ))}
        </Tabs>

        <Box
          key={level}
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", md: level === "bachelor" ? "1fr 1fr" : "repeat(2, 1fr)" },
          }}
        >
          {programmes
            .filter((programme) => programme.level === level)
            .map((programme) => (
              <Paper
                key={programme.id}
                elevation={2}
                sx={{
                  p: 0,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background:
                      level === "bachelor"
                        ? "linear-gradient(135deg, #0d3b66, #2d7fc1)"
                        : level === "master"
                          ? "linear-gradient(135deg, #283593, #5c6bc0)"
                          : "linear-gradient(135deg, #00695c, #26a69a)",
                  }}
                >
                  <Typography variant="h6" component="h2" sx={{ color: "common.white", fontWeight: 700 }}>
                    {programme.abbreviation}
                  </Typography>
                  <Chip label={`${programme.semesters} ${t("education.semestersLabel")}`} size="small" sx={{ color: "common.white", border: "1px solid rgba(255,255,255,0.7)" }} variant="outlined" />
                </Box>
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
                    {programme.name[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {programme.description[lang]}
                  </Typography>
                </Box>
              </Paper>
            ))}
        </Box>

        <Paper elevation={1} sx={{ mt: 5, p: 3, borderLeft: 4, borderColor: "secondary.main" }}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <CalendarMonth sx={{ color: "secondary.main" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>
                {t("education.curriculaTitle")}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {t("education.curriculaText")}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip icon={<PictureAsPdf />} label={`PDF — ${t("education.curricula")}`} variant="outlined" clickable />
              <Chip icon={<Download />} label={t("education.schedules")} variant="outlined" clickable />
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
