import { useState } from "react";
import type { FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Email, Phone, Place, Schedule } from "@mui/icons-material";
import { Map as MapIcon } from "@mui/icons-material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { useLanguage } from "../i18n/useLanguage.ts";

export function ContactsPage() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <Box>
      <PageHero titleKey="pages.contactsTitle" subtitleKey="pages.contactsSubtitle" />
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2}>
              <Paper elevation={1} sx={{ p: 3, display: "flex", gap: 2 }}>
                <Place sx={{ color: "secondary.main" }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
                    {t("footer.contactTitle")}
                  </Typography>
                  <Typography variant="body2">{t("footer.address")}</Typography>
                </Box>
              </Paper>
              <Paper elevation={1} sx={{ p: 3, display: "flex", gap: 2 }}>
                <Phone sx={{ color: "secondary.main" }} />
                <Box component="a" href="tel:+35966827219" sx={{ textDecoration: "none", color: "inherit" }}>
                  <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
                    {t("nav.contacts")}
                  </Typography>
                  <Typography variant="body2">+359 66 827 219</Typography>
                </Box>
              </Paper>
              <Paper elevation={1} sx={{ p: 3, display: "flex", gap: 2 }}>
                <Email sx={{ color: "secondary.main" }} />
                <Box component="a" href="mailto:info@tugab.bg" sx={{ textDecoration: "none", color: "inherit" }}>
                  <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
                    Email
                  </Typography>
                  <Typography variant="body2">info@tugab.bg</Typography>
                </Box>
              </Paper>
              <Paper elevation={1} sx={{ p: 3, display: "flex", gap: 2 }}>
                <Schedule sx={{ color: "secondary.main" }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
                    {t("contacts.hours")}
                  </Typography>
                  <Typography variant="body2">{t("contacts.hoursValue")}</Typography>
                </Box>
              </Paper>

              <Box
                sx={{
                  height: 220,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  bgcolor: "action.hover",
                  border: "2px dashed",
                  borderColor: "divider",
                }}
              >
                <MapIcon sx={{ fontSize: 44, color: "text.disabled" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {t("contacts.mapPlaceholder")}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
                {t("contacts.formTitle")}
              </Typography>
              {sent && (
                <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSent(false)}>
                  {t("contacts.formSuccess")}
                </Alert>
              )}
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2.5}>
                  <TextField required name="name" label={t("contacts.formName")} fullWidth size="small" />
                  <TextField
                    required
                    type="email"
                    name="email"
                    label={t("contacts.formEmail")}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    required
                    multiline
                    rows={5}
                    name="message"
                    label={t("contacts.formMessage")}
                    fullWidth
                    size="small"
                  />
                  <Box>
                    <Button type="submit" variant="contained" color="secondary" size="large">
                      {t("contacts.formSend")}
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
