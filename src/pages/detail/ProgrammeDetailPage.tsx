import type { ReactNode } from "react";
import { Box, Chip, Container, List, ListItem, ListItemIcon, Paper, Stack, Typography } from "@mui/material";
import { ArrowBack, CheckCircle, School, Schedule } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { programmes } from "../../data/programmes.ts";
import type { ProgrammeLevel } from "../../data/programmes.ts";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

const levelLabelKey: Record<ProgrammeLevel, TranslationKey> = {
  bachelor: "education.bachelor",
  master: "education.master",
  phd: "education.doctoral",
};

const levelPath: Record<ProgrammeLevel, string> = {
  bachelor: "bachelor",
  master: "master",
  phd: "doctoral",
};

const gradients: Record<ProgrammeLevel, string> = {
  bachelor: "linear-gradient(135deg, #0d3b66, #2d7fc1)",
  master: "linear-gradient(135deg, #283593, #5c6bc0)",
  phd: "linear-gradient(135deg, #00695c, #26a69a)",
};

export function ProgrammeDetailPage() {
  const { t, lang } = useLanguage();
  const { level, id } = useParams();

  const programme = programmes.find(
    (p) =>
      p.id === id &&
      levelPath[p.level] === level,
  );

  if (!programme || !level) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" sx={{ color: "primary.main", fontWeight: 700 }}>
          {t("education.notFound")}
        </Typography>
        <Link to="/education" style={{ color: "#ef6c00", fontWeight: 600 }}>
          {t("education.backToProgrammes")}
        </Link>
      </Container>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          background: gradients[programme.level],
          py: { xs: 5, md: 6 },
        }}
      >
        <Container>
          <Stack spacing={1.5}>
            <Chip
              label={t(levelLabelKey[programme.level])}
              size="small"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "rgba(255,255,255,0.2)",
                color: "common.white",
                fontWeight: 700,
              }}
            />
            <Typography variant="h4" component="h1" sx={{ color: "common.white", fontWeight: 700 }}>
              {programme.name[lang]} ({programme.abbreviation})
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 6, maxWidth: 900 }}>
        <GridStack>
          <InfoRow icon={<School fontSize="small" />} label={t("education.degreeLabel")}>
            {programme.degree[lang]}
          </InfoRow>
          <InfoRow icon={<Schedule fontSize="small" />} label={`${t("education.formLabel")} · ${programme.semesters} ${t("education.semestersLabel")}`}>
            {programme.form[lang]}
          </InfoRow>
        </GridStack>

        <Section title={t("education.overviewTitle")}>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {programme.description[lang]}
          </Typography>
        </Section>

        <Section title={t("education.highlightsTitle")}>
          <List disablePadding>
            {programme.highlights.map((item) => (
              <ListItem key={item.en} disableGutters sx={{ py: 0.75, alignItems: "flex-start" }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <CheckCircle sx={{ color: "secondary.main", fontSize: 20 }} />
                </ListItemIcon>
                <Typography variant="body1">{item[lang]}</Typography>
              </ListItem>
            ))}
          </List>
        </Section>

        <Section title={t("education.careersTitle")}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "action.hover", borderLeft: 4, borderColor: "secondary.main" }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {programme.careers[lang]}
            </Typography>
          </Paper>
        </Section>

        <Typography variant="caption" sx={{ display: "block", mt: 4, color: "text.disabled" }}>
          {programme.faculty[lang]}
        </Typography>

        <Link
          to={`/education/${levelPath[programme.level]}`}
          style={{ color: "#ef6c00", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginTop: 24 }}
        >
          <ArrowBack fontSize="small" />
          {t("education.backToProgrammes")}
        </Link>
      </Container>
    </Box>
  );
}

function GridStack({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        mb: 4,
      }}
    >
      {children}
    </Box>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <Paper elevation={1} sx={{ p: 2.5 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 0.5 }}>
        {icon}
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase" }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ fontWeight: 600, color: "primary.main" }}>
        {children}
      </Typography>
    </Paper>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
