import { Box, Container, List, ListItem, ListItemIcon, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { HeadOfDeptCard } from "../components/shared/HeadOfDeptCard.tsx";
import type { TranslationKey } from "../i18n/translations.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

const responsibilities: TranslationKey[] = [
  "headOfDept.resp1",
  "headOfDept.resp2",
  "headOfDept.resp3",
  "headOfDept.resp4",
];

export function HeadOfDepartmentPage() {
  const { t } = useLanguage();

  return (
    <Box>
      <PageHero titleKey="aboutUs.headOfDept" subtitleKey="pages.headOfDeptSubtitle" />
      <Container sx={{ py: 6 }}>
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
              <Typography
                variant="h5"
                component="h2"
                sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}
              >
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
      </Container>
    </Box>
  );
}
