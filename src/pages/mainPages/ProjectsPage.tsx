import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { fetchResearchProjects } from "../../api/researchApi.ts";
import type { ResearchProject } from "../../api/researchApi.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

const PAGE_SIZE = 10;

export function ProjectsPage() {
  const { t, lang } = useLanguage();
  const [projects, setProjects] = useState<ResearchProject[] | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setProjects(null);
    setFailed(false);
    fetchResearchProjects({ search: search.trim() || undefined, page, limit: PAGE_SIZE })
      .then((response) => {
        if (cancelled) return;
        setProjects(response.data);
        setTotalPages(response.pagination.pages);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [page, search]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <PageHero titleKey="research.projects" subtitleKey="pages.projectsSubtitle" />
      <Container sx={{ py: 5 }}>
        <TextField
          fullWidth
          value={search}
          label={t("research.searchProjects")}
          onChange={(event) => handleSearch(event.target.value)}
          sx={{ mb: 3 }}
        />

        {failed ? (
          <Typography sx={{ py: 5, color: "error.main", textAlign: "center" }}>
            {t("research.loadError")}
          </Typography>
        ) : !projects ? (
          <Stack sx={{ py: 8, alignItems: "center" }}>
            <CircularProgress color="primary" />
          </Stack>
        ) : projects.length === 0 ? (
          <Typography sx={{ py: 5, color: "text.secondary", textAlign: "center" }}>
            {t("research.noProjects")}
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid key={project._id} size={{ xs: 12, md: 6 }}>
                  <Box
                    component={Link}
                    to={`/research/projects/${project._id}`}
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

            {totalPages > 1 && (
              <Stack sx={{ mt: 5, alignItems: "center" }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Stack>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
