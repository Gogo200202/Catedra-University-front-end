import { useEffect, useMemo, useState } from "react";
import { Box, Chip, CircularProgress, Container, Divider, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { fetchEducation } from "../../api/educationApi.ts";
import type { EducationDocument, EducationStudy } from "../../api/educationApi.ts";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { useLanguage } from "../../i18n/useLanguage.ts";

const levelConfig = {
  bachelor: { backendKey: "Bachelor", titleKey: "education.bachelor", listPath: "/education/bachelor" },
  master: { backendKey: "Master", titleKey: "education.master", listPath: "/education/master" },
  doctoral: { backendKey: "Doctorate", titleKey: "education.doctoral", listPath: "/education/doctoral" },
} as const;

function decodeDegreeName(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function semesterOrder(name: string): number {
  const match = name.match(/\d+/);
  return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
}

function semesterTitle(name: string, label: string): string {
  const match = name.match(/semester\s*(\d+)/i);
  if (match) return `${label} ${match[1]}`;
  return name.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (letter) => letter.toLocaleUpperCase());
}

export function EducationDegreeDetailPage() {
  const { t } = useLanguage();
  const { level, id } = useParams();
  const [education, setEducation] = useState<EducationDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const degreeName = decodeDegreeName(id);
  const config = level ? levelConfig[level as keyof typeof levelConfig] : undefined;

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

  const study = useMemo<EducationStudy | undefined>(() => {
    if (!education || !config || !degreeName) return undefined;
    return education[config.backendKey]?.degree?.[degreeName];
  }, [config, degreeName, education]);

  if (loading) {
    return <Stack sx={{ py: 10, alignItems: "center" }}><CircularProgress color="primary" /></Stack>;
  }

  if (failed) {
    return <Container sx={{ py: 6 }}><Typography sx={{ color: "error.main", textAlign: "center" }}>{t("education.loadError")}</Typography></Container>;
  }

  if (!config || !study) {
    return <Container sx={{ py: 6 }}><Typography sx={{ color: "text.secondary", textAlign: "center" }}>{t("education.notFound")}</Typography></Container>;
  }

  const semesters = Object.entries(study).sort(([left], [right]) => semesterOrder(left) - semesterOrder(right));
  const courseCount = semesters.reduce((total, [, semester]) => total + (semester.classes?.length ?? 0), 0);

  return (
    <Box>
      <PageHero titleKey={config.titleKey} subtitleKey="pages.educationSubtitle" />
      <Container sx={{ py: 5, maxWidth: 980 }}>
        <Paper elevation={1} sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ color: "primary.main", fontWeight: 700 }}>
                {degreeName}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap", rowGap: 1 }}>
                <Chip size="small" variant="outlined" label={`${semesters.length} ${t("education.semestersLabel")}`} />
                <Chip size="small" variant="outlined" label={`${courseCount} ${t("education.classesLabel")}`} />
              </Stack>
            </Box>

            <Divider />

            <Stack spacing={2}>
              {semesters.map(([semesterName, semester]) => (
                <Paper key={semesterName} variant="outlined" sx={{ p: 2.5 }}>
                  <Typography variant="h6" component="h2" sx={{ color: "secondary.main", fontWeight: 700 }}>
                    {semesterTitle(semesterName, t("curricula.semesterLabel"))}
                  </Typography>
                  <List disablePadding sx={{ mt: 1 }}>
                    {(semester.classes ?? []).map((course, index) => (
                      <ListItem key={`${index}-${course}`} disableGutters sx={{ py: 0.5 }}>
                        <Typography variant="body1" sx={{ color: "text.secondary" }}>{course}</Typography>
                      </ListItem>
                    ))}
                    {(!semester.classes || semester.classes.length === 0) && (
                      <ListItem disableGutters><Typography variant="body2" sx={{ color: "text.disabled" }}>—</Typography></ListItem>
                    )}
                  </List>
                </Paper>
              ))}
            </Stack>

            <Box component={Link} to={config.listPath} sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: "secondary.main", fontWeight: 700, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              <ArrowBack fontSize="small" />
              {t("education.backToProgrammes")}
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
