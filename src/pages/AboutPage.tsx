import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Person as PersonIcon, Verified } from "@mui/icons-material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { accreditationItems, historyMilestones } from "../data/department.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

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

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" component="h3" sx={{ color: "primary.main", fontWeight: 700 }}>
              {t("about.historyTitle")}
            </Typography>
            <List disablePadding>
              {historyMilestones.map((milestone) => (
                <ListItem
                  key={milestone.year}
                  disableGutters
                  sx={{ alignItems: "flex-start", gap: 2, py: 1 }}
                >
                  <Chip
                    label={milestone.year}
                    size="small"
                    sx={{
                      bgcolor: "primary.main",
                      color: "common.white",
                      fontWeight: 700,
                      minWidth: 72,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {milestone.text[lang]}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Stack>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              borderTop: 4,
              borderColor: "secondary.main",
              borderRadius: 2,
            }}
          >
            <Avatar sx={{ width: 110, height: 110, mx: "auto", mb: 2, bgcolor: "primary.light" }}>
              <PersonIcon sx={{ fontSize: 64 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
              {t("welcome.headName")}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "secondary.main" }}>
              {t("welcome.headRole")}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
              {t("welcome.headQuote")}
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ mt: 7 }}>
          <Typography
            variant="h5"
            component="h3"
            sx={{ color: "primary.main", fontWeight: 700, mb: 3 }}
          >
            {t("about.accreditationTitle")}
          </Typography>
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
