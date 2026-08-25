import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { Link } from "react-router";
import { fetchNewsIssues } from "../../api/newsApi.ts";
import type { NewsIssue } from "../../api/newsApi.ts";
import type { Lang } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

const PAGE_SIZE = 5;

function formatDate(dateIso: string, lang: Lang): { day: string; monthYear: string } {
  const date = new Date(dateIso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = new Intl.DateTimeFormat(lang === "bg" ? "bg-BG" : "en-GB", {
    month: "short",
  }).format(date);
  return { day, monthYear: `${month} ${date.getFullYear()}` };
}

export function NewsPage() {
  const { t, lang } = useLanguage();
  const [page, setPage] = useState(1);
  const [issues, setIssues] = useState<NewsIssue[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(false);

  const loadPage = useCallback(
    (p: number) => {
      setIssues(null);
      setError(false);
      fetchNewsIssues(p, PAGE_SIZE)
        .then((res) => {
          setIssues(res.data);
          setTotalPages(res.pagination.pages);
        })
        .catch(() => setError(true));
    },
    [],
  );

  useEffect(() => {
    loadPage(page);
  }, [page, loadPage]);

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <Box>
        <PageHero titleKey="pages.newsTitle" subtitleKey="pages.newsSubtitle" />
        <Container sx={{ py: 8 }}>
          <Typography variant="h6" sx={{ color: "text.secondary", textAlign: "center" }}>
            {t("news.loadError")}
          </Typography>
        </Container>
      </Box>
    );
  }

  if (!issues) {
    return (
      <Box>
        <PageHero titleKey="pages.newsTitle" subtitleKey="pages.newsSubtitle" />
        <Stack sx={{ py: 10, alignItems: "center" }}>
          <CircularProgress color="primary" />
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <PageHero titleKey="pages.newsTitle" subtitleKey="pages.newsSubtitle" />
      <Container sx={{ py: 5 }}>
        <Stack spacing={2.5}>
          {issues.map((issue) => {
            const { day, monthYear } = formatDate(issue.issueDate, lang);
            const firstArticle = issue.articles[0];
            return (
              <Box
                key={issue._id}
                component={Link}
                to={`/news/${issue._id}`}
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
                        label={`${issue.articles.length} ${t("news.articlesChip")}`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </Stack>
                    <Typography
                      variant="subtitle1"
                      component="h2"
                      sx={{ fontWeight: 700, color: "primary.main" }}
                    >
                      {issue.newspaperName[lang]}
                    </Typography>
                    {firstArticle && (
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {firstArticle.description[lang]}
                      </Typography>
                    )}
                  </Box>
                </Paper>
              </Box>
            );
          })}
        </Stack>

        {totalPages > 1 && (
          <Stack sx={{ mt: 5, alignItems: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="medium"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </Container>
    </Box>
  );
}
