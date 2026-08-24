import { useMemo } from "react";
import { Box, Chip, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { ArrowBack, EventOutlined } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { news } from "../../data/news.ts";
import type { NewsCategory } from "../../data/news.ts";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

const categoryLabelKey: Record<NewsCategory, TranslationKey> = {
  exams: "news.categories.exams",
  defences: "news.categories.defences",
  events: "news.categories.events",
  lectures: "news.categories.lectures",
  conference: "news.categories.conference",
};

export function NewsDetailPage() {
  const { t, lang } = useLanguage();
  const { id } = useParams();

  const item = useMemo(
    () => news.find((entry) => String(entry.id) === id),
    [id],
  );

  const dateLabel = useMemo(() => {
    if (!item) return "";
    return new Intl.DateTimeFormat(lang === "bg" ? "bg-BG" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${item.date}T00:00:00`));
  }, [item, lang]);

  if (!item) {
    return (
      <Container sx={{ py: 10 }}>
        <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "primary.main" }}>
            {t("news.notFound")}
          </Typography>
          <Box
            component={Link}
            to="/news"
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
            {t("news.backToList")}
          </Box>
        </Stack>
      </Container>
    );
  }

  const paragraphs = item.content[lang];

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
              label={t(categoryLabelKey[item.category])}
              size="small"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "rgba(255,255,255,0.16)",
                color: "common.white",
                fontWeight: 700,
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: "common.white", fontWeight: 700 }}
            >
              {item.title[lang]}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <EventOutlined sx={{ fontSize: 18, color: "rgba(255,255,255,0.85)" }} />
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
                {dateLabel}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 5, maxWidth: 820 }}>
        <Paper elevation={1} sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={2}>
            {paragraphs.map((paragraph) => (
              <Typography key={paragraph.slice(0, 24)} variant="body1" sx={{ color: "text.secondary" }}>
                {paragraph}
              </Typography>
            ))}
          </Stack>

          <Divider sx={{ my: 3.5 }} />

          <Box
            component={Link}
            to="/news"
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
            {t("news.backToList")}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
