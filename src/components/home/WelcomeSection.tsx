import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { HeadOfDeptCard } from "../shared/HeadOfDeptCard.tsx";
import { useLanguage } from "../../i18n/useLanguage.ts";

export function WelcomeSection() {
  const { t } = useLanguage();

  return (
    <Box sx={{ bgcolor: "background.paper", py: 7 }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gap: 5,
            alignItems: "center",
            gridTemplateColumns: { xs: "1fr", md: "1.6fr 1fr" },
          }}
        >
          <Stack spacing={2} useFlexGap>
            <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700 }}>
              {t("welcome.overline")}
            </Typography>
            <Typography variant="h4" component="h2" sx={{ color: "primary.main", fontWeight: 700 }}>
              {t("welcome.title")}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {t("welcome.p1")}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {t("welcome.p2")}
            </Typography>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<ArrowForward />}
                component="a"
                href="/about"
                sx={{ mt: 1 }}
              >
                {t("welcome.readMore")}
              </Button>
            </Box>
          </Stack>

          <HeadOfDeptCard />
        </Box>
      </Container>
    </Box>
  );
}
