import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Email, Facebook, LinkedIn, Phone, Place, YouTube } from "@mui/icons-material";
import { Link as RouterLink } from "react-router";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

const quickLinks: { labelKey: TranslationKey; path: string }[] = [
  { labelKey: "aboutUs.department", path: "/about" },
  { labelKey: "nav.teachers", path: "/teachers" },
  { labelKey: "education.bachelor", path: "/education" },
  { labelKey: "education.curricula", path: "/education" },
  { labelKey: "research.projects", path: "/research" },
  { labelKey: "nav.news", path: "/news" },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <Box component="footer">
      <Box sx={{ bgcolor: "background.paper", py: 5 }}>
        <Container>
          <Box
            sx={{
              display: "grid",
              gap: 4,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "2fr 1fr 1.2fr",
              },
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 700 }}>
                {t("footer.aboutTitle")}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {t("footer.aboutText")}
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton size="small" aria-label="Facebook" sx={{ color: "primary.main" }}>
                  <Facebook />
                </IconButton>
                <IconButton size="small" aria-label="YouTube" sx={{ color: "primary.main" }}>
                  <YouTube />
                </IconButton>
                <IconButton size="small" aria-label="LinkedIn" sx={{ color: "primary.main" }}>
                  <LinkedIn />
                </IconButton>
              </Stack>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 700 }}>
                {t("footer.quickLinks")}
              </Typography>
              <List disablePadding dense>
                {quickLinks.map(({ labelKey, path }) => (
                  <ListItem key={labelKey} disableGutters sx={{ py: 0.25 }}>
                    <Link
                      component={RouterLink}
                      to={path}
                      variant="body2"
                      underline="hover"
                      sx={{ color: "text.secondary" }}
                    >
                      {t(labelKey)}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 700 }}>
                {t("footer.contactTitle")}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
                <Place fontSize="small" sx={{ mt: 0.25, color: "secondary.main" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {t("footer.address")}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Phone fontSize="small" sx={{ color: "secondary.main" }} />
                <Typography variant="body2">+359 66 827 219</Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Email fontSize="small" sx={{ color: "secondary.main" }} />
                <Typography variant="body2">info@tugab.bg</Typography>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Divider />
      <Box sx={{ bgcolor: "primary.dark", color: "rgba(255,255,255,0.75)", py: 1.5 }}>
        <Container>
          <Typography variant="caption">
            © 2026 {t("header.university")} — {t("header.department")}.{" "}
            {t("footer.rights")}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
