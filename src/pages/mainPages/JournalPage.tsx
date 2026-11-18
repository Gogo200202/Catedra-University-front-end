import { Box, Button, Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { systemServices } from "../../data/systems.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

const volumes = [
  { vol: 72, label: "Vol 72 (2026)" },
  { vol: 71, label: "Vol 71 (11/2025)" },
  { vol: 70, label: "Vol 70 (06/2025)" },
  { vol: 69, label: "Vol 69 (11/2024)" },
  { vol: 68, label: "Vol 68 (6/2024)" },
  { vol: 67, label: "Vol 67 (12/2023)" },
  { vol: 66, label: "Vol 66 (6/2023)" },
  { vol: 65, label: "Vol 65 (12/2022)" },
  { vol: 64, label: "Vol 64 (6/2022)" },
  { vol: 63, label: "Vol 63 (11/2021)" },
  { vol: 62, label: "Vol 62 (6/2021)" },
  { vol: 61, label: "Vol 61 (12/2020)" },
  { vol: 60, label: "Vol 60 (6/2020)" },
];

export function JournalPage() {
  const { t, lang } = useLanguage();
  const service = systemServices.journal;

  return (
    <Box>
      <PageHero titleKey="systems.journal" subtitleKey="pages.journalSubtitle" />
      <Container sx={{ py: 6 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
          <Chip label="ISSN 1310-6686" variant="outlined" color="primary" />
          <Chip label="eISSN 3033-1498" variant="outlined" color="secondary" />
        </Stack>

        <Typography variant="h5" component="h2" sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}>
          {t("journal.aboutTitle")}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 820 }}>
          {service.intro[lang]}
        </Typography>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" component="h2" sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}>
            {t("journal.volumesTitle")}
          </Typography>
          <Grid container spacing={1.5}>
            {volumes.map(({ vol, label }) => (
              <Grid key={vol} size={{ xs: 6, sm: 4, md: 3 }}>
                <Paper
                  elevation={0}
                  href={`${service.url}volumes/vol-${vol}-${label.match(/\((.+)\)/)?.[1]?.replace("/", "-") ?? ""}`}
                  component="a"
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    display: "block",
                    p: 2,
                    textAlign: "center",
                    textDecoration: "none",
                    border: "1px solid",
                    borderColor: "divider",
                    fontWeight: 600,
                    color: "primary.main",
                    "&:hover": { borderColor: "secondary.main", bgcolor: "action.hover" },
                  }}
                >
                  {label}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" component="h2" sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}>
            {t("journal.authorsTitle")}
          </Typography>
          <Paper elevation={1} sx={{ p: 3, maxWidth: 820 }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {t("journal.authorsText")}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              href="https://mc04.manuscriptcentral.com/jtug"
              target="_blank"
              rel="noreferrer"
              endIcon={<OpenInNew />}
              sx={{ mt: 2.5 }}
            >
              {t("journal.submit")}
            </Button>
          </Paper>
        </Box>

        <Button
          variant="outlined"
          color="primary"
          size="large"
          href={service.url}
          target="_blank"
          rel="noreferrer"
          endIcon={<OpenInNew />}
          sx={{ mt: 5 }}
        >
          {t("systems.openPlatform")}
        </Button>
      </Container>
    </Box>
  );
}
