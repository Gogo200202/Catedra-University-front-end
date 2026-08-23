import { Fragment } from "react";
import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { kstWeeklySchedule, weekDays } from "../data/schedules.ts";
import type { LessonType } from "../data/schedules.ts";
import type { TranslationKey } from "../i18n/translations.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

const dayDate = (index: number) => new Date(2024, 0, 1 + index);

const typeLabelKey: Record<LessonType, TranslationKey> = {
  lecture: "schedules.types.lecture",
  seminar: "schedules.types.seminar",
  lab: "schedules.types.lab",
};

const typeColor: Record<LessonType, "primary" | "secondary" | "default"> = {
  lecture: "primary",
  seminar: "secondary",
  lab: "default",
};

export function SchedulesPage() {
  const { t, lang } = useLanguage();
  const schedule = kstWeeklySchedule;

  const dayFormatter = new Intl.DateTimeFormat(lang === "bg" ? "bg-BG" : "en-GB", {
    weekday: "long",
  });

  return (
    <Box>
      <PageHero titleKey="education.schedules" subtitleKey="pages.schedulesSubtitle" />
      <Container sx={{ py: 5, maxWidth: 1080 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>
              {schedule.scheduleName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {schedule.semester} — {schedule.academicYear}
            </Typography>
          </Box>
          <Chip label={`${t("curricula.semesterLabel")} 3`} color="primary" />
        </Stack>

        <TableContainer component={Paper} elevation={2}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main", "& th": { color: "common.white", fontWeight: 700 } }}>
                <TableCell>{t("schedules.table.time")}</TableCell>
                <TableCell>{t("schedules.table.subject")}</TableCell>
                <TableCell>{t("schedules.table.type")}</TableCell>
                <TableCell>{t("schedules.table.location")}</TableCell>
                <TableCell>{t("schedules.table.lecturer")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weekDays.map((day, index) => (
                <Fragment key={day}>
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      sx={{
                        bgcolor: "action.hover",
                        fontWeight: 700,
                        color: "primary.main",
                        textTransform: "capitalize",
                      }}
                    >
                      {dayFormatter.format(dayDate(index))}
                    </TableCell>
                  </TableRow>
                  {schedule.days[day].length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ color: "text.disabled", fontStyle: "italic" }}>
                        —
                      </TableCell>
                    </TableRow>
                  ) : (
                    schedule.days[day].map((entry, entryIndex) => (
                      <TableRow key={`${day}-${entryIndex}`} hover>
                        <TableCell sx={{ whiteSpace: "nowrap", fontSize: 13 }}>
                          {entry.hour.start} – {entry.hour.end}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{entry.subjectName}</TableCell>
                        <TableCell>
                          <Chip
                            label={t(typeLabelKey[entry.type])}
                            size="small"
                            color={typeColor[entry.type]}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", fontSize: 13 }}>
                          {entry.location.building} — {entry.location.roomNumber}
                        </TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{entry.lecturer}</TableCell>
                      </TableRow>
                    ))
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", mt: 2 }}>
          <Chip icon={<Dot color="#0d3b66" />} label={t("schedules.types.lecture")} size="small" variant="outlined" />
          <Chip icon={<Dot color="#ef6c00" />} label={t("schedules.types.seminar")} size="small" variant="outlined" />
          <Chip icon={<Dot color="#9e9e9e" />} label={t("schedules.types.lab")} size="small" variant="outlined" />
        </Stack>
      </Container>
    </Box>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <Box component="span" sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: color, display: "inline-block" }} />
  );
}
