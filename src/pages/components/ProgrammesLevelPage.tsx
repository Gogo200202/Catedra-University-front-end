import { useEffect, useMemo, useState } from "react";
import { Box, Chip, CircularProgress, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { fetchEducation } from "../../api/educationApi.ts";
import type { EducationDocument } from "../../api/educationApi.ts";
import type { ProgrammeLevel } from "../../data/programmes.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface ProgrammesPageProps {
  level: ProgrammeLevel;
  titleKey: "education.bachelor" | "education.master" | "education.doctoral";
  subtitleKey: "pages.bachelorSubtitle" | "pages.masterSubtitle" | "pages.doctoralSubtitle";
}

const backendLevelKey: Record<ProgrammeLevel, "Bachelor" | "Master" | "Doctorate"> = {
  bachelor: "Bachelor",
  master: "Master",
  phd: "Doctorate",
};

const routeLevel: Record<ProgrammeLevel, "bachelor" | "master" | "doctoral"> = {
  bachelor: "bachelor",
  master: "master",
  phd: "doctoral",
};

export function ProgrammesLevelPage({ level, titleKey, subtitleKey }: ProgrammesPageProps) {
  const { t } = useLanguage();
  const [education, setEducation] = useState<EducationDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchEducation()
      .then((response) => {
        if (!cancelled) setEducation(response);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const degreeEntries = useMemo(
    () => Object.entries(education?.[backendLevelKey[level]]?.degree ?? {}),
    [education, level],
  );

  return (
    <Box>
      <PageHero titleKey={titleKey} subtitleKey={subtitleKey} />
      <Container sx={{ py: 5 }}>
        {loading ? (
          <Stack sx={{ py: 8, alignItems: "center" }}><CircularProgress color="primary" /></Stack>
        ) : failed ? (
          <Typography sx={{ py: 6, color: "error.main", textAlign: "center" }}>{t("education.loadError")}</Typography>
        ) : degreeEntries.length === 0 ? (
          <Typography sx={{ py: 6, color: "text.secondary", textAlign: "center" }}>{t("education.noData")}</Typography>
        ) : (
          <Grid container spacing={3}>
            {degreeEntries.map(([degreeName, semesters]) => {
              const semesterEntries = Object.entries(semesters ?? {});
              const classCount = semesterEntries.reduce((total, [, semester]) => total + (semester.classes?.length ?? 0), 0);
              return (
                <Grid key={degreeName} size={{ xs: 12, md: 6 }}>
                  <Paper
                    component={Link}
                    to={`/education/${routeLevel[level]}/${encodeURIComponent(degreeName)}`}
                    elevation={1}
                    sx={{
                      display: "block",
                      height: "100%",
                      p: 3,
                      color: "inherit",
                      textDecoration: "none",
                      borderTop: 4,
                      borderColor: "primary.main",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": { transform: "translateY(-3px)", boxShadow: 6 },
                    }}
                  >
                    <Stack spacing={1.5}>
                      <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 700 }}>{degreeName}</Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
                        <Chip size="small" variant="outlined" label={`${semesterEntries.length} ${t("education.semestersLabel")}`} />
                        <Chip size="small" variant="outlined" label={`${classCount} ${t("education.classesLabel")}`} />
                      </Stack>
                      <Typography variant="body2" sx={{ color: "secondary.main", fontWeight: 700 }}>
                        {t("common.readMore")}
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
