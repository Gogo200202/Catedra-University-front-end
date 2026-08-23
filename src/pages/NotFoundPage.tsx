import { Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import { useLanguage } from "../i18n/useLanguage.ts";

export function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <Container sx={{ py: 12 }}>
      <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            color: "primary.main",
            fontSize: { xs: "5rem", md: "7rem" },
            lineHeight: 1,
          }}
        >
          404
        </Typography>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "primary.main" }}>
          {t("notFound.title")}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 460 }}>
          {t("notFound.subtitle")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ mt: 2 }}
          size="large"
        >
          {t("common.backHome")}
        </Button>
      </Stack>
    </Container>
  );
}
