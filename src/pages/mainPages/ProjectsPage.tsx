import { Box, Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { projects } from "../../data/research.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

export function ProjectsPage() {
  const { t, lang } = useLanguage();

  return (
    <Box>
      <PageHero titleKey="research.projects" subtitleKey="pages.projectsSubtitle" />
      <Container sx={{ py: 5 }}>
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid key={project.id} size={{ xs: 12, md: 6 }}>
              <Box
                component={Link}
                to={`/research/projects/${project.id}`}
                sx={{ display: "block", textDecoration: "none", color: "inherit", height: "100%" }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    borderTop: 4,
                    borderColor: "primary.main",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": { transform: "translateY(-3px)", boxShadow: 6 },
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
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
