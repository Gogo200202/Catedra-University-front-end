import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowForward, FormatQuote, Person } from "@mui/icons-material";
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
                href="#"
                sx={{ mt: 1 }}
              >
                {t("welcome.readMore")}
              </Button>
            </Box>
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
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.light",
              }}
            >
              <Person sx={{ fontSize: 72 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
              {t("welcome.headName")}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "secondary.main", mb: 2 }}>
              {t("welcome.headRole")}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "center", alignItems: "flex-start" }}
            >
              <FormatQuote sx={{ color: "primary.light", transform: "scaleX(-1)" }} />
              <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                {t("welcome.headQuote")}
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
