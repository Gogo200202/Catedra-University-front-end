import { useMemo } from "react";
import { Box, Chip, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { ArrowBack, MenuBookOutlined } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { publications } from "../data/research.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

export function PublicationDetailPage() {
  const { t, lang } = useLanguage();
  const { id } = useParams();

  const publication = useMemo(
    () => publications.find((entry) => String(entry.id) === id),
    [id],
  );

  if (!publication) {
    return (
      <Container sx={{ py: 10 }}>
        <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "primary.main" }}>
            {t("publications.notFound")}
          </Typography>
          <Box
            component={Link}
            to="/research/publications"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "secondary.main",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <ArrowBack fontSize="small" />
            {t("publications.backToList")}
          </Box>
        </Stack>
      </Container>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(135deg, #0d3b66 0%, #1e5f9e 60%, #3f8fd2 100%)",
          py: { xs: 5, md: 6 },
        }}
      >
        <Container>
          <Stack spacing={1.5}>
            <Chip
              label={publication.year}
              size="small"
              sx={{ alignSelf: "flex-start", bgcolor: "rgba(255,255,255,0.16)", color: "common.white", fontWeight: 700 }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: "common.white", fontWeight: 700 }}
            >
              {publication.title}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.92)" }}>
              {publication.authors}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <MenuBookOutlined sx={{ fontSize: 18, color: "rgba(255,255,255,0.85)" }} />
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", fontStyle: "italic" }}>
                {publication.venue}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 5, maxWidth: 820 }}>
        <Paper elevation={1} sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={2}>
            {publication.content[lang].map((paragraph) => (
              <Typography key={paragraph.slice(0, 24)} variant="body1" sx={{ color: "text.secondary" }}>
                {paragraph}
              </Typography>
            ))}
          </Stack>

          <Divider sx={{ my: 3.5 }} />

          <Box
            component={Link}
            to="/research/publications"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "secondary.main",
              fontWeight: 700,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <ArrowBack fontSize="small" />
            {t("publications.backToList")}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
