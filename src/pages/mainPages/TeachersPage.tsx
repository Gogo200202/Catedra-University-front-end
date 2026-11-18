import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { MailOutlined, Room } from "@mui/icons-material";
import { Search as SearchIcon } from "@mui/icons-material";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { Link } from "react-router";
import { teacherDisplayName, teachers } from "../../data/teachers.ts";
import type { TeacherSummary } from "../../data/teachers.ts";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

type PositionFilter = "all" | TeacherSummary["academicPosition"];

const positionLabelKey: Record<
  TeacherSummary["academicPosition"],
  TranslationKey
> = {
  professor: "positions.professor",
  assocProfessor: "positions.assocProfessor",
  chiefAssistant: "positions.chiefAssistant",
  assistant: "positions.assistant",
};

const avatarColors = ["#0d3b66", "#283593", "#00695c", "#6a1b9a", "#ad1457", "#ef6c00"];

function initials(teacher: TeacherSummary): string {
  return `${teacher.firstName[0]}${teacher.lastName[0]}`;
}

export function TeachersPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState<PositionFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teachers.filter((teacher) => {
      const matchesPosition =
        position === "all" || teacher.academicPosition === position;
      if (!matchesPosition) return false;
      if (!q) return true;
      const haystack = [
        teacherDisplayName(teacher),
        ...teacher.researchInterests,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, position]);

  return (
    <Box>
      <PageHero titleKey="pages.teachersTitle" subtitleKey="pages.teachersSubtitle" />
      <Container sx={{ py: 5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            mb: 3,
            justifyContent: "space-between",
            alignItems: { sm: "center" },
          }}
        >
          <TextField
            size="small"
            placeholder={t("teachers.searchPlaceholder")}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
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
            onChange={(_, value) => value && setPosition(value)}
          >
            <ToggleButton value="all">{t("teachers.filterAll")}</ToggleButton>
            {(Object.keys(positionLabelKey) as TeacherSummary["academicPosition"][]).map(
              (key) => (
                <ToggleButton key={key} value={key}>
                  {t(positionLabelKey[key])}
                </ToggleButton>
              ),
            )}
          </ToggleButtonGroup>
        </Stack>

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
          {filtered.map((teacher, index) => (
            <Box
              key={teacher.id}
              component={Link}
              to={`/teachers/${teacher.id}`}
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
                <Avatar sx={{ bgcolor: avatarColors[index % avatarColors.length], width: 52, height: 52 }}>
                  {initials(teacher)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>
                    {teacherDisplayName(teacher)}
                  </Typography>
                  <Chip label={t(positionLabelKey[teacher.academicPosition])} size="small" color="secondary" variant="outlined" />
                </Box>
              </Stack>

              {teacher.administrativeFunction && (
                <Chip label={t(teacher.administrativeFunction)} size="small" color="secondary" />
              )}

              <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap", rowGap: 0.75, columnGap: 0.75 }}>
                {teacher.researchInterests.map((interest) => (
                  <Chip key={interest} label={interest} size="small" variant="outlined" />
                ))}
              </Stack>

              <Box sx={{ mt: "auto" }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
                  <Room fontSize="small" sx={{ color: "text.disabled" }} />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {t("footer.contactTitle")} — {teacher.officeRoom}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 0.5 }}>
                  <MailOutlined fontSize="small" sx={{ color: "text.disabled" }} />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {teacher.email}
                  </Typography>
                </Stack>
              </Box>
              </Paper>
            </Box>
          ))}
        </Box>

        {filtered.length === 0 && (
          <Typography sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
            0 {t("teachers.foundLabel")}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
