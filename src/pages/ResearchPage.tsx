import { Box, Chip, Container, Divider, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { Article, Science } from "@mui/icons-material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { projects, publications } from "../data/research.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

export function ResearchPage() {
  const { t, lang } = useLanguage();

  return (
    <Box>
      <PageHero titleKey="pages.researchTitle" subtitleKey="pages.researchSubtitle" />
      <Container sx={{ py: 5 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 3 }}>
          <Science sx={{ color: "secondary.main", fontSize: 30 }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: "primary.main" }}>
            {t("research.projects")}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          }}
        >
          {projects.map((project) => (
            <Paper
              key={project.id}
              elevation={1}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                borderTop: 4,
                borderColor: "primary.main",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>
                {project.name[lang]}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 0.75 }}>
                <Chip label={project.period} size="small" color="secondary" variant="outlined" />
                {project.contractNumber && (
                  <Chip label={project.contractNumber} size="small" variant="outlined" />
                )}
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" sx={{ color: "text.disabled" }}>
                  {t("research.funding")}:
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                  {project.fundingOrganization[lang]}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {project.description[lang]}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Divider sx={{ my: 6 }} />

        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 3 }}>
          <Article sx={{ color: "secondary.main", fontSize: 30 }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: "primary.main" }}>
            {t("research.selectedPublications")}
          </Typography>
        </Stack>

        <Paper elevation={1} sx={{ p: 0 }}>
          <List disablePadding>
            {publications.map((publication, index) => (
              <ListItem
                key={publication.id}
                divider={index < publications.length - 1}
                component="div"
                sx={{ py: 2.5, px: 3, display: "flex", gap: 2, alignItems: "flex-start" }}
              >
                <Chip
                  label={publication.year}
                  size="small"
                  sx={{ bgcolor: "primary.main", color: "common.white", fontWeight: 700, mt: 0.25 }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {publication.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {publication.authors}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.disabled", fontStyle: "italic" }}>
                    {publication.venue}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
