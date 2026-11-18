import { Box, Button, Chip, Container, Grid, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { Email, OpenInNew, Phone } from "@mui/icons-material";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { systemServices } from "../../data/systems.ts";
import type { Lang } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

const stats = [
  { value: "75", labelKey: "epublish.statIssues" },
  { value: "576", labelKey: "epublish.statEditions" },
  { value: "964", labelKey: "epublish.statUsers" },
] as const;

const editions: Record<Lang, string>[] = [
  {
    en: "Izvestia na TU – Gabrovo, Vol. 75 (2026)",
    bg: "Известия на ТУ – Габрово, том 75 (2026)",
  },
  {
    en: "Textbook: Microcontroller Programming",
    bg: "Учебник: Програмиране на микроконтролери",
  },
  {
    en: "Study guide: Computer Systems and Technologies",
    bg: "Учебно помагало: Компютърни системи и технологии",
  },
  {
    en: "Monograph: Industrial Automation Systems",
    bg: "Монография: Индустриални системи за автоматизация",
  },
  {
    en: "UNITECH 2025 conference proceedings",
    bg: "Доклади от конференция ЮНИТЕХ 2025",
  },
];

export function EPublishingPage() {
  const { t, lang } = useLanguage();
  const service = systemServices.epublishing;

  return (
    <Box>
      <PageHero titleKey="systems.epublishing" subtitleKey="pages.epublishingSubtitle" />
      <Container sx={{ py: 6 }}>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 820 }}>
          {service.intro[lang]}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          {stats.map(({ value, labelKey }) => (
            <Grid key={labelKey} size={{ xs: 12, sm: 4 }}>
              <Paper elevation={1} sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: "primary.main" }}>
                  {value}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {t(labelKey)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" component="h2" sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}>
            {t("epublish.editionsTitle")}
          </Typography>
          <List disablePadding>
            {editions.map((title) => (
              <ListItem
                key={title.en}
                disableGutters
                sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Chip label="PDF" size="small" sx={{ bgcolor: "primary.main", color: "common.white", fontWeight: 700 }} />
                  <Typography variant="body1">{title[lang]}</Typography>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" component="h2" sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}>
            {t("epublish.contactTitle")}
          </Typography>
          <Stack spacing={1} sx={{ color: "text.secondary" }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Phone fontSize="small" />
              <Typography variant="body2">+359 66 827 224 · +359 879 0033 98</Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Email fontSize="small" />
              <Typography variant="body2">dvasilev@tugab.bg</Typography>
            </Stack>
          </Stack>
        </Box>

        <Button
          variant="contained"
          color="secondary"
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
