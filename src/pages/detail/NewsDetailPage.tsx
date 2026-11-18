import { useEffect, useMemo, useState } from "react";
import { Box, Button, Chip, CircularProgress, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { ArrowBack, DeleteOutlined, EditOutlined, EventOutlined, PersonOutlined } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router";
import { deleteNewsIssue, fetchNewsIssue } from "../../api/newsApi.ts";
import type { NewsArticle, NewsIssue } from "../../api/newsApi.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";
import { useUser } from "../../context/useUser.ts";

export function NewsDetailPage() {
  const { t, lang } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [issue, setIssue] = useState<NewsIssue | null>(null);
  const [failed, setFailed] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setFailed(false);
    setIssue(null);
    fetchNewsIssue(id)
      .then((data) => {
        if (!cancelled) setIssue(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const dateLabel = useMemo(() => {
    if (!issue) return "";
    return new Intl.DateTimeFormat(lang === "bg" ? "bg-BG" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(issue.issueDate));
  }, [issue, lang]);

  const backLink = (
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
  );

  if (failed) {
    return (
      <Container sx={{ py: 10 }}>
        <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "primary.main" }}>
            {t("news.notFound")}
          </Typography>
          {backLink}
        </Stack>
      </Container>
    );
  }

  if (!issue) {
    return (
      <Stack sx={{ py: 10, alignItems: "center" }}>
        <CircularProgress color="primary" />
      </Stack>
    );
  }

  const renderArticle = (article: NewsArticle) => (
    <>
      <Typography variant="h6" component="h2" sx={{ color: "primary.main", fontWeight: 700 }}>
        {article.title[lang]}
      </Typography>
      {article.authors.length > 0 && (
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", flexWrap: "wrap" }}>
          <PersonOutlined sx={{ fontSize: 17, color: "text.secondary" }} />
          {article.authors.map((author) => (
            <Chip key={author} label={author} size="small" variant="outlined" />
          ))}
        </Stack>
      )}
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        {article.description[lang]}
      </Typography>
    </>
  );

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
            <Typography variant="h4" component="h1" sx={{ color: "common.white", fontWeight: 700 }}>
              {issue.newspaperName[lang]}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <EventOutlined sx={{ fontSize: 18, color: "rgba(255,255,255,0.85)" }} />
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
                {dateLabel}
              </Typography>
            </Stack>
            {user?.jwt && (
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  startIcon={<EditOutlined />}
                  onClick={() => navigate(`/admin/events/edit/${id}`)}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
                >
                  {t("admin.editEvent")}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteOutlined />}
                  disabled={deleting}
                  onClick={async () => {
                    if (!id || !user.jwt) return;
                    if (!window.confirm(t("news.backToList"))) return;
                    setDeleting(true);
                    try {
                      await deleteNewsIssue(user.jwt, id);
                      navigate("/news");
                    } catch {
                      setDeleting(false);
                    }
                  }}
                >
                  {t("admin.deleteEvent")}
                </Button>
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 5, maxWidth: 820 }}>
        <Paper elevation={1} sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={2.5}>
            {issue.articles.map((article, index) => (
              <Box key={`${article.title.en}-${index}`}>
                {renderArticle(article)}
                {index < issue.articles.length - 1 && <Divider sx={{ mt: 2.5 }} />}
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 3.5 }} />

          {backLink}
        </Paper>
      </Container>
    </Box>
  );
}
