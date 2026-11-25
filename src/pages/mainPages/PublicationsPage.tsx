import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  List,
  ListItem,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { Link } from "react-router";
import { fetchPublications } from "../../api/researchApi.ts";
import type { Publication } from "../../api/researchApi.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

const PAGE_SIZE = 10;

type YearFilter = number | "all";

export function PublicationsPage() {
  const { t } = useLanguage();
  const [publications, setPublications] = useState<Publication[] | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [yearFilter, setYearFilter] = useState<YearFilter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPublications(null);
    setFailed(false);
    fetchPublications({
      search: search.trim() || undefined,
      year: yearFilter === "all" ? undefined : yearFilter,
      page,
      limit: PAGE_SIZE,
    })
      .then((response) => {
        if (cancelled) return;
        setPublications(response.data);
        setTotalPages(response.pagination.pages);
        if (yearFilter === "all" && response.years) {
          setYears([...new Set(response.years)].sort((a, b) => b - a));
        } else if (yearFilter === "all") {
          setYears((currentYears) =>
            [...new Set([...currentYears, ...response.data.map((publication) => publication.year)])].sort(
              (a, b) => b - a,
            ),
          );
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [page, search, yearFilter]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleYearChange = (value: YearFilter) => {
    setYearFilter(value);
    setPage(1);
  };

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <PageHero titleKey="research.selectedPublications" subtitleKey="pages.publicationsSubtitle" />
      <Container sx={{ py: 5, maxWidth: 980 }}>
        <TextField
          fullWidth
          value={search}
          label={t("research.searchPublications")}
          onChange={(event) => handleSearch(event.target.value)}
          sx={{ mb: 3 }}
        />

        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", rowGap: 1 }}>
          <Chip
            label={t("news.filterAll")}
            clickable
            color={yearFilter === "all" ? "primary" : "default"}
            variant={yearFilter === "all" ? "filled" : "outlined"}
            onClick={() => handleYearChange("all")}
          />
          {years.map((year) => (
            <Chip
              key={year}
              label={year}
              clickable
              color={yearFilter === year ? "primary" : "default"}
              variant={yearFilter === year ? "filled" : "outlined"}
              onClick={() => handleYearChange(year)}
            />
          ))}
        </Stack>

        {failed ? (
          <Typography sx={{ py: 5, color: "error.main", textAlign: "center" }}>
            {t("research.loadError")}
          </Typography>
        ) : !publications ? (
          <Stack sx={{ py: 8, alignItems: "center" }}>
            <CircularProgress color="primary" />
          </Stack>
        ) : publications.length === 0 ? (
          <Typography sx={{ py: 5, color: "text.secondary", textAlign: "center" }}>
            {t("research.noPublications")}
          </Typography>
        ) : (
          <>
            <Paper elevation={1} sx={{ p: 0 }}>
              <List disablePadding>
                {publications.map((publication, index) => (
                  <ListItem
                    key={publication._id}
                    divider={index < publications.length - 1}
                    component="div"
                    sx={{ py: 0, px: 0 }}
                  >
                    <Box
                      component={Link}
                      to={`/research/publications/${publication._id}`}
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                        width: "100%",
                        px: 3,
                        py: 2.5,
                        textDecoration: "none",
                        color: "inherit",
                        transition: "background-color 0.15s ease",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
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
                          {publication.authors.join(", ")}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.disabled", fontStyle: "italic" }}>
                          {publication.venue}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>

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
