import { Box, Chip, Container, Grid, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { ArrowForward, Verified } from "@mui/icons-material";
import { Link } from "react-router";
import { PageHero } from "../components/layout/PageHero.tsx";
import { HeadOfDeptCard } from "../components/shared/HeadOfDeptCard.tsx";
import { accreditationItems, historyMilestones } from "../data/department.ts";
import type { TranslationKey } from "../i18n/translations.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

const subPageLinks: { labelKey: TranslationKey; path: string }[] = [
  { labelKey: "aboutUs.headOfDept", path: "/about/head-of-department" },
  { labelKey: "aboutUs.accreditation", path: "/about/accreditation" },
  { labelKey: "aboutUs.history", path: "/about/history" },
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

        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", md: "1.7fr 1fr" },
            alignItems: "start",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {t("about.universityText")}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {t("welcome.p1")}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {t("welcome.p2")}
            </Typography>

            <Stack spacing={1.25} sx={{ mt: 2 }}>
              {subPageLinks.map(({ labelKey, path }) => (
                <Paper
                  key={path}
                  elevation={0}
                  component={Link}
                  to={path}
                  sx={{
                    p: 2,
                    px: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    border: "1px solid",
                    borderColor: "divider",
                    color: "primary.main",
                    fontWeight: 600,
                    transition: "border-color 0.2s ease, background-color 0.2s ease",
                    "&:hover": {
                      borderColor: "secondary.main",
                      backgroundColor: "action.hover",
                      "& .arrow": { transform: "translateX(4px)" },
                    },
                  }}
                >
                  {t(labelKey)}
                  <ArrowForward className="arrow" fontSize="small" />
                </Paper>
              ))}
            </Stack>
          </Stack>

          <HeadOfDeptCard />
        </Box>

        <Box sx={{ mt: 7 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 3, flexWrap: "wrap", gap: 1 }}>
            <Typography variant="h5" component="h3" sx={{ color: "primary.main", fontWeight: 700 }}>
              {t("about.historyTitle")}
            </Typography>
            <Link to="/about/history" style={{ fontSize: 14, color: "#ef6c00", fontWeight: 600, textDecoration: "none" }}>
              {t("common.readMore")} →
            </Link>
          </Stack>
          <List disablePadding>
            {historyMilestones.slice(0, 3).map((milestone) => (
              <ListItem key={milestone.year} disableGutters sx={{ alignItems: "flex-start", gap: 2, py: 1 }}>
                <Chip
                  label={milestone.year}
                  size="small"
                  sx={{ bgcolor: "primary.main", color: "common.white", fontWeight: 700, minWidth: 72 }}
                />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {milestone.text[lang]}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 3, flexWrap: "wrap", gap: 1 }}>
            <Typography variant="h5" component="h3" sx={{ color: "primary.main", fontWeight: 700 }}>
              {t("about.accreditationTitle")}
            </Typography>
            <Link to="/about/accreditation" style={{ fontSize: 14, color: "#ef6c00", fontWeight: 600, textDecoration: "none" }}>
              {t("common.readMore")} →
            </Link>
          </Stack>
          <Grid container spacing={2}>
            {accreditationItems.map((item) => (
              <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper
                  elevation={1}
                  sx={{ p: 2.5, height: "100%", borderLeft: 4, borderColor: "secondary.main" }}
                >
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
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
