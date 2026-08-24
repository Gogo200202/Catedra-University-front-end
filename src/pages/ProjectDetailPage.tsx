import { useMemo } from "react";
import { Box, Chip, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { ArrowBack, BusinessCenterOutlined } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { projects } from "../data/research.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

export function ProjectDetailPage() {
  const { t, lang } = useLanguage();
  const { id } = useParams();

  const project = useMemo(
    () => projects.find((entry) => String(entry.id) === id),
    [id],
  );

  if (!project) {
    return (
      <Container sx={{ py: 10 }}>
        <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "primary.main" }}>
            {t("projects.notFound")}
          </Typography>
          <Box
            component={Link}
            to="/research/projects"
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
            {t("projects.backToList")}
          </Box>
        </Stack>
      </Container>
    );
  }

  const paragraphs = project.content[lang];

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
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
              <Chip
                label={project.period}
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.16)", color: "common.white", fontWeight: 700 }}
              />
              {project.contractNumber && (
                <Chip
                  label={project.contractNumber}
                  size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.16)", color: "common.white" }}
                />
              )}
            </Stack>
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: "common.white", fontWeight: 700 }}
            >
              {project.name[lang]}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <BusinessCenterOutlined sx={{ fontSize: 18, color: "rgba(255,255,255,0.85)" }} />
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
                {project.fundingOrganization[lang]}
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
            to="/research/projects"
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
            {t("projects.backToList")}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
