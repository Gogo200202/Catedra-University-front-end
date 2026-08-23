import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { Verified } from "@mui/icons-material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { accreditationItems } from "../data/department.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

export function AccreditationPage() {
  const { t, lang } = useLanguage();

  return (
    <Box>
      <PageHero titleKey="aboutUs.accreditation" subtitleKey="pages.accreditationSubtitle" />
      <Container sx={{ py: 6 }}>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 820 }}>
          {t("about.universityText")}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 4 }}>
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
      </Container>
    </Box>
  );
}
