import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Email, Facebook, Phone } from "@mui/icons-material";
import { useLanguage } from "../../i18n/useLanguage.ts";
import type { Lang } from "../../i18n/translations.ts";

const langButtons: { lang: Lang; label: string }[] = [
  { lang: "en", label: "EN" },
  { lang: "bg", label: "БГ" },
];

export function TopBar() {
  const { lang, setLang } = useLanguage();

  return (
    <Box sx={{ bgcolor: "primary.dark", color: "primary.contrastText" }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 36,
        }}
      >
        <Stack direction="row" spacing={3}>
          <Box
            component="a"
            href="tel:+35966827219"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              color: "inherit",
              textDecoration: "none",
              "&:hover": { color: "secondary.light" },
            }}
          >
            <Phone sx={{ fontSize: 16 }} />
            <Typography variant="caption">+359 66 827 219</Typography>
          </Box>
          <Box
            component="a"
            href="mailto:info@tugab.bg"
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 0.75,
              color: "inherit",
              textDecoration: "none",
              "&:hover": { color: "secondary.light" },
            }}
          >
            <Email sx={{ fontSize: 16 }} />
            <Typography variant="caption">info@tugab.bg</Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Facebook sx={{ fontSize: 18, alignSelf: "center" }} />
          <Box
            sx={{
              display: "flex",
              border: 1,
              borderColor: "primary.light",
              borderRadius: 1,
            }}
          >
            {langButtons.map(({ lang: l, label }) => (
              <Button
                key={l}
                onClick={() => setLang(l)}
                size="small"
                sx={{
                  minWidth: 0,
                  px: 1,
                  py: 0,
                  fontSize: 12,
                  lineHeight: "22px",
                  fontWeight: l === lang ? 700 : 400,
                  color: l === lang ? "common.white" : "rgba(255, 255, 255, 0.6)",
                  backgroundColor: l === lang ? "secondary.main" : "transparent",
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
