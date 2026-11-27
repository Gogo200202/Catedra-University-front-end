import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Container,
  InputAdornment,
  Pagination,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { MailOutlined, Room, Search as SearchIcon } from "@mui/icons-material";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { Link } from "react-router";
import { fetchProfessors } from "../../api/professorsApi.ts";
import type { Professor } from "../../api/professorsApi.ts";
import type { TranslationKey } from "../../i18n/translations.ts";
import { dictionaries } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

const PAGE_SIZE = 10;
const positionKeys = [
  "positions.professor",
  "positions.assocProfessor",
  "positions.chiefAssistant",
  "positions.assistant",
] as const satisfies readonly TranslationKey[];
type PositionKey = (typeof positionKeys)[number];
type PositionFilter = "all" | PositionKey;

const avatarColors = ["#0d3b66", "#283593", "#00695c", "#6a1b9a", "#ad1457", "#ef6c00"];

function localized(value: { bg?: string; en?: string } | undefined, lang: "bg" | "en"): string {
  return value?.[lang] || value?.en || value?.bg || "";
}

function professorName(professor: Professor, lang: "bg" | "en"): string {
  const basic = professor.Basic_Information;
  return [basic?.firstName, basic?.middleName, basic?.lastName]
    .map((part) => localized(part, lang))
    .filter(Boolean)
    .join(" ");
}

function positionMatches(value: { bg?: string; en?: string } | undefined, filter: PositionKey): boolean {
  const positionValues = [value?.bg, value?.en]
    .filter((text): text is string => Boolean(text))
    .map((text) => text.toLocaleLowerCase());
  const labels = [dictionaries.en[filter], dictionaries.bg[filter]].map((label) => label.toLocaleLowerCase());
  return labels.some((label) => positionValues.some((positionValue) => positionValue.includes(label)));
}

export function TeachersPage() {
  const { t, lang } = useLanguage();
  const [professors, setProfessors] = useState<Professor[] | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [position, setPosition] = useState<PositionFilter>("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedQuery(query), 300);
    return () => window.clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (query !== debouncedQuery) return;
    let cancelled = false;
    setProfessors(null);
    setFailed(false);
    fetchProfessors({ page, limit: PAGE_SIZE, search: debouncedQuery.trim() })
      .then((response) => {
        if (cancelled) return;
        setProfessors(response.data);
        setTotalPages(response.pagination.pages);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [page, query, debouncedQuery]);

  const filtered = useMemo(() => {
    if (!professors || position === "all") return professors ?? [];
    return professors.filter((professor) =>
      positionMatches(professor.Basic_Information?.academicPosition, position),
    );
  }, [position, professors]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <PageHero titleKey="pages.teachersTitle" subtitleKey="pages.teachersSubtitle" />
      <Container sx={{ py: 5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 3, justifyContent: "space-between", alignItems: { sm: "center" } }}
        >
          <TextField
            size="small"
            placeholder={t("teachers.searchPlaceholder")}
            value={query}
            onChange={(event) => handleSearch(event.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ width: { xs: "100%", sm: 320 } }}
          />

          <ToggleButtonGroup
            exclusive
            size="small"
            value={position}
            onChange={(_, value: PositionFilter | null) => value && setPosition(value)}
            aria-label={t("teachers.filterAll")}
            sx={{ flexWrap: "wrap" }}
          >
            <ToggleButton value="all">{t("teachers.filterAll")}</ToggleButton>
            {positionKeys.map((key) => (
              <ToggleButton key={key} value={key}>
                {t(key)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>

        {failed ? (
          <Typography sx={{ py: 6, color: "error.main", textAlign: "center" }}>
            {t("teachers.loadError")}
          </Typography>
        ) : !professors ? (
          <Stack sx={{ py: 8, alignItems: "center" }}>
            <CircularProgress color="primary" />
          </Stack>
        ) : (
          <>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 2 }}>
              {filtered.length} {t("teachers.foundLabel")}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
              }}
            >
              {filtered.map((professor, index) => {
                const basic = professor.Basic_Information;
                const interests = (professor.Education?.researchInterests ?? [])
                  .map((interest) => localized(interest, lang))
                  .filter(Boolean);
                const name = professorName(professor, lang);
                const photo = localized(basic?.photo, lang);
                const email = professor.Contact_Information?.emails?.[0] ?? "";
                const office = localized(basic?.officeNumber, lang) || localized(basic?.officeAddress, lang);
                const academicPosition = localized(basic?.academicPosition, lang);

                return (
                  <Box
                    key={professor._id}
                    component={Link}
                    to={`/teachers/${professor._id}`}
                    sx={{ display: "block", textDecoration: "none", color: "inherit" }}
                  >
                    <Paper
                      elevation={1}
                      sx={{
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        height: "100%",
                        borderTop: 4,
                        borderColor: "primary.main",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                      }}
                    >
                      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                        <Avatar
                          src={photo || undefined}
                          alt={name}
                          sx={{ bgcolor: avatarColors[index % avatarColors.length], width: 52, height: 52 }}
                        >
                          {name.split(/\s+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("")}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>
                            {name || "—"}
                          </Typography>
                          {academicPosition && (
                            <Chip label={academicPosition} size="small" color="secondary" variant="outlined" />
                          )}
                        </Box>
                      </Stack>

                      {localized(basic?.administrativeFunction, lang) && (
                        <Chip
                          label={localized(basic?.administrativeFunction, lang)}
                          size="small"
                          color="secondary"
                        />
                      )}

                      <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap", rowGap: 0.75, columnGap: 0.75 }}>
                        {interests.map((interest, interestIndex) => (
                          <Chip key={`${interest}-${interestIndex}`} label={interest} size="small" variant="outlined" />
                        ))}
                      </Stack>

                      <Box sx={{ mt: "auto" }}>
                        {office && (
                          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
                            <Room fontSize="small" sx={{ color: "text.disabled" }} />
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              {t("footer.contactTitle")} — {office}
                            </Typography>
                          </Stack>
                        )}
                        {email && (
                          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 0.5 }}>
                            <MailOutlined fontSize="small" sx={{ color: "text.disabled" }} />
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              {email}
                            </Typography>
                          </Stack>
                        )}
                      </Box>
                    </Paper>
                  </Box>
                );
              })}
            </Box>

            {filtered.length === 0 && (
              <Typography sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
                0 {t("teachers.foundLabel")}
              </Typography>
            )}

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
