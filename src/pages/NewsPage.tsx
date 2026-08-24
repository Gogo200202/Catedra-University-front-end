import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { Link } from "react-router";
import { news } from "../data/news.ts";
import type { NewsCategory } from "../data/news.ts";
import type { Lang, TranslationKey } from "../i18n/translations.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

const categoryLabelKey: Record<NewsCategory, TranslationKey> = {
  exams: "news.categories.exams",
  defences: "news.categories.defences",
  events: "news.categories.events",
  lectures: "news.categories.lectures",
  conference: "news.categories.conference",
};


function formatDate(dateIso: string, lang: Lang): { day: string; monthYear: string } {
  const date = new Date(`${dateIso}T00:00:00`);
  const day = String(date.getDate()).padStart(2, "0");
  const month = new Intl.DateTimeFormat(lang === "bg" ? "bg-BG" : "en-GB", {
    month: "short",
  }).format(date);  const year = date.getFullYear();
  return { day, monthYear: `${month} ${year}` };
}

export function NewsPage() {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState<"all" | NewsCategory>("all");

  const filtered = useMemo(
    () =>
      [...news]
        .sort((a, b) => b.date.localeCompare(a.date))
        .filter((item) => category === "all" || item.category === category),
    [category],
  );

  return (
    <Box>
      <PageHero titleKey="pages.newsTitle" subtitleKey="pages.newsSubtitle" />
      <Container sx={{ py: 5 }}>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={category}
          onChange={(_, value) => value && setCategory(value)}
          sx={{ mb: 4, flexWrap: "wrap" }}
        >
          <ToggleButton value="all">{t("news.filterAll")}</ToggleButton>
          {(Object.keys(categoryLabelKey) as NewsCategory[]).map((key) => (
            <ToggleButton key={key} value={key}>
              {t(categoryLabelKey[key])}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Stack spacing={2.5}>
          {filtered.map((item) => {
            const { day, monthYear } = formatDate(item.date, lang);
            return (
              <Box
                key={item.id}
                component={Link}
                to={`/news/${item.id}`}
                sx={{ display: "block", textDecoration: "none", color: "inherit" }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    display: "flex",
                    overflow: "hidden",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": { transform: "translateY(-3px)", boxShadow: 6 },
                  }}
                >
                <Box
                  sx={{
                    minWidth: 88,
                    py: 2,
                    px: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "primary.main",
                    color: "common.white",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1 }}>
                    {day}
                  </Typography>
                  <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
                    {monthYear}
                  </Typography>
                </Box>
                <Box sx={{ p: 2.5 }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 0.75, alignItems: "center" }}>
                    <Chip
                      label={t(categoryLabelKey[item.category])}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  </Stack>
                  <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 700, color: "primary.main" }}>
                    {item.title[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.excerpt[lang]}
                  </Typography>
                </Box>
                </Paper>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
