import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { CheckCircle, OpenInNew } from "@mui/icons-material";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { systemServices } from "../../data/systems.ts";
import type { SystemId } from "../../data/systems.ts";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface SystemServicePageProps {
  serviceId: SystemId;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
}

export function SystemServicePage({
  serviceId,
  titleKey,
  subtitleKey,
}: SystemServicePageProps) {
  const { t, lang } = useLanguage();
  const service = systemServices[serviceId];

  return (
    <Box>
      <PageHero titleKey={titleKey} subtitleKey={subtitleKey} />
      <Container sx={{ py: 6 }}>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 820 }}>
          {service.intro[lang]}
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          sx={{ color: "primary.main", fontWeight: 700, mt: 5, mb: 3 }}
        >
          {t("systems.featuresTitle")}
        </Typography>

        <Grid container spacing={3}>
          {service.features.map((feature) => (
            <Grid key={feature.text.en} size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  borderTop: 4,
                  borderColor: "secondary.main",
                }}
              >
                <CheckCircle sx={{ color: "secondary.main", mt: 0.25 }} />
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {feature.text[lang]}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

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
