import { Box, Button, Chip, Container, Divider, Grid, List, ListItem, ListItemIcon, Paper, Stack, Typography } from "@mui/material";
import { CheckCircle, Email, OpenInNew, Phone, Schedule } from "@mui/icons-material";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { systemServices } from "../../data/systems.ts";
import type { Lang } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

const activities: Record<Lang, string>[] = [
  {
    en: "Organising company presentations and seminars at the university",
    bg: "Организиране на фирмени представяния и семинари в университета",
  },
  {
    en: "Supporting the selection of students for internships and job positions",
    bg: "Подпомагане процеса на подбор на студенти за стажантски позиции и работни места",
  },
  {
    en: "Preparing students for internship and job applications",
    bg: "Подготовка на студентите за кандидатстване за стаж и работа",
  },
  {
    en: "Link between business, academia and students",
    bg: "Връзка между бизнеса, академичните среди и студентите",
  },
];

interface JobOffer {
  company: string;
  title: Record<Lang, string>;
  location: Record<Lang, string>;
}

const offers: JobOffer[] = [
  {
    company: "SAP Labs Bulgaria",
    title: { en: "Software Engineering Internship", bg: "Стаж в софтуерно инженерство" },
    location: { en: "Sofia", bg: "София" },
  },
  {
    company: "Либра Софтуер ЕООД",
    title: { en: "Java Developer", bg: "Java разработчик" },
    location: { en: "Gabrovo", bg: "Габрово" },
  },
  {
    company: "Integrated Micro-Electronics (IMI)",
    title: { en: "Test Engineer", bg: "Тест инженер" },
    location: { en: "Gabrovo", bg: "Габрово" },
  },
  {
    company: "Язаки България ЕООД",
    title: { en: "Graduate Trainee Engineers", bg: "Обучаеми младши инженери" },
    location: { en: "Sevlievo", bg: "Севлиево" },
  },
];

export function CareerCentrePage() {
  const { t, lang } = useLanguage();
  const service = systemServices.career;

  return (
    <Box>
      <PageHero titleKey="systems.career" subtitleKey="pages.careerSubtitle" />
      <Container sx={{ py: 6 }}>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 820 }}>
          {service.intro[lang]}
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" component="h2" sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}>
              {t("career.activitiesTitle")}
            </Typography>
            <List disablePadding>
              {activities.map((activity) => (
                <ListItem key={activity.en} disableGutters sx={{ py: 0.75, alignItems: "flex-start" }}>
                  <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                    <CheckCircle sx={{ color: "secondary.main", fontSize: 20 }} />
                  </ListItemIcon>
                  <Typography variant="body1">{activity[lang]}</Typography>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" component="h2" sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}>
              {t("career.contactTitle")}
            </Typography>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Stack spacing={1.5} sx={{ color: "text.secondary" }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Phone fontSize="small" />
                  <Typography variant="body2">+359 66 827 278</Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Email fontSize="small" />
                  <Typography variant="body2">career-centre@tugab.bg</Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Schedule fontSize="small" />
                  <Typography variant="body2">
                    {lang === "en" ? "Mon–Fri, 8:00–17:00" : "Пон–Пет, 8:00–17:00"}
                  </Typography>
                </Stack>
                <Divider />
                <Typography variant="body2">
                  {lang === "en"
                    ? "Director: Prof. Dr. Eng. Nikolay Madzharov · Technical organiser: Petya Panayotova"
                    : "Директор: проф. д-р инж. Николай Маджаров · Технически организатор: Петя Панайотова"}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" component="h2" sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}>
            {t("career.offersTitle")}
          </Typography>
          <Grid container spacing={2}>
            {offers.map(({ company, title, location }) => (
              <Grid key={company} size={{ xs: 12, sm: 6 }}>
                <Paper elevation={1} sx={{ p: 2.5, height: "100%", borderLeft: 4, borderColor: "secondary.main" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "secondary.main" }}>
                    {company}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                    {title[lang]}
                  </Typography>
                  <Chip label={location[lang]} size="small" variant="outlined" sx={{ mt: 1 }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
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
