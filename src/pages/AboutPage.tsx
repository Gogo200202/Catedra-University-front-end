import { Box, Chip, Container, Grid, List, ListItem, ListItemIcon, Paper, Stack, Typography } from "@mui/material";
import { CheckCircle, Verified } from "@mui/icons-material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { HeadOfDeptCard } from "../components/shared/HeadOfDeptCard.tsx";
import { accreditationItems, historyMilestones } from "../data/department.ts";
import type { TranslationKey } from "../i18n/translations.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

const responsibilities: TranslationKey[] = [
  "headOfDept.resp1",
  "headOfDept.resp2",
  "headOfDept.resp3",
  "headOfDept.resp4",
];

export function AboutPage() {
  const { t, lang } = useLanguage();

  return (
    <Box>
      <PageHero titleKey="pages.aboutTitle" subtitleKey="pages.aboutSubtitle" />
      <Container sx={{ py: 6 }}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700 }}>
            {t("about.overline")}
          </Typography>
          <Typography variant="h4" component="h2" sx={{ color: "primary.main", fontWeight: 700 }}>
            {t("welcome.title")}
          </Typography>
        </Stack>

        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 820 }}>
          {t("about.universityText")}
        </Typography>
        <Stack spacing={2} sx={{ mt: 2, maxWidth: 820 }}>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {t("welcome.p1")}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {t("welcome.p2")}
          </Typography>
        </Stack>

        <Box sx={{ mt: 7 }}>
          <Typography variant="h5" component="h3" sx={{ color: "primary.main", fontWeight: 700, mb: 3 }}>
            {t("aboutUs.headOfDept")}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 4,
              gridTemplateColumns: { xs: "1fr", md: "1.7fr 1fr" },
              alignItems: "start",
            }}
          >
            <Stack spacing={3}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                {t("headOfDept.bio1")}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                {t("headOfDept.bio2")}
              </Typography>

              <Box>
                <Typography variant="subtitle1" sx={{ color: "primary.main", fontWeight: 700, mb: 1 }}>
                  {t("headOfDept.responsibilitiesTitle")}
                </Typography>
                <List disablePadding>
                  {responsibilities.map((key) => (
                    <ListItem key={key} disableGutters sx={{ py: 0.75, alignItems: "flex-start" }}>
                      <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                        <CheckCircle sx={{ color: "secondary.main", fontSize: 20 }} />
                      </ListItemIcon>
                      <Typography variant="body1">{t(key)}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>

            <HeadOfDeptCard />
          </Box>
        </Box>

        <Box sx={{ mt: 7 }}>
          <Typography variant="h5" component="h3" sx={{ color: "primary.main", fontWeight: 700, mb: 3 }}>
            {t("about.historyTitle")}
          </Typography>
          <Box sx={{ maxWidth: 860, position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                left: 39,
                top: 12,
                bottom: 12,
                width: 2,
                bgcolor: "divider",
                display: { xs: "none", sm: "block" },
              }}
            />
            <List disablePadding>
              {historyMilestones.map((milestone) => (
                <ListItem key={milestone.year} disableGutters sx={{ pb: 3 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1.5, sm: 3 }}
                    sx={{ width: "100%", alignItems: "flex-start" }}
                  >
                    <Chip
                      label={milestone.year}
                      sx={{
                        bgcolor: "primary.main",
                        color: "common.white",
                        fontWeight: 700,
                        minWidth: 80,
                        position: "relative",
                        zIndex: 1,
                      }}
                    />
                    <Paper elevation={1} sx={{ p: 2.5, flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ color: "text.secondary" }}>
                        {milestone.text[lang]}
                      </Typography>
                    </Paper>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" component="h3" sx={{ color: "primary.main", fontWeight: 700, mb: 3 }}>
            {t("about.accreditationTitle")}
          </Typography>
          <Grid container spacing={3}>
            {accreditationItems.map((item) => (
              <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderTop: 4,
                    borderColor: "secondary.main",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Verified sx={{ color: "secondary.main" }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>
                      {item.title}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.description[lang]}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
