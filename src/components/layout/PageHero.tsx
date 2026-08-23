import { Box, Container, Stack, Typography } from "@mui/material";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface PageHeroProps {
  titleKey: TranslationKey;
  subtitleKey?: TranslationKey;
}

export function PageHero({ titleKey, subtitleKey }: PageHeroProps) {
  const { t } = useLanguage();

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0d3b66 0%, #1e5f9e 60%, #3f8fd2 100%)",
        py: { xs: 5, md: 7 },
      }}
    >
      <Container>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: "common.white", fontWeight: 700 }}
          >
            {t(titleKey)}
          </Typography>
          {subtitleKey && (
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)" }}>
              {t(subtitleKey)}
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
