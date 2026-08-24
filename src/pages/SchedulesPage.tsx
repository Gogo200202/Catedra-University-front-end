import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import {
  Computer,
  Download,
  Engineering,
  ExpandMore,
  Lan,
  PictureAsPdf,
  Security,
} from "@mui/icons-material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { scheduleProgrammes, weekDays } from "../data/schedules.ts";
import type {
  LessonType,
  ProgrammeSchedules,
  Season,
  SemesterSchedule,
  WeeklySchedule,
} from "../data/schedules.ts";
import type { TranslationKey } from "../i18n/translations.ts";
import { exportTablePdf } from "../utils/exportTablePdf.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

const seasonLabelKey: Record<Season, TranslationKey> = {
  winter: "schedules.winter",
  summer: "schedules.summer",
};

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

const dayDate = (index: number) => new Date(2024, 0, 1 + index);

interface ProgrammeVisualConfig {
  gradient: string;
  Icon: typeof Computer;
}

const programmeVisuals: Record<string, ProgrammeVisualConfig> = {
  "kst-ba": { gradient: "linear-gradient(135deg, #0d3b66, #2d7fc1)", Icon: Computer },
  "ctcs-ba": { gradient: "linear-gradient(135deg, #311b92, #5e35b1)", Icon: Lan },
  "sta-ma": { gradient: "linear-gradient(135deg, #00695c, #26a69a)", Icon: Engineering },
  "cns-ma": { gradient: "linear-gradient(135deg, #bf360c, #ff7043)", Icon: Security },
};

function ScheduleGrid({
  schedule,
  fileName,
}: {
  schedule: WeeklySchedule;
  fileName: string;
}) {
  const { t, lang } = useLanguage();
  const apiRef = useGridApiRef();

  const rows = useMemo(() => {
    const dayFormatter = new Intl.DateTimeFormat(lang === "bg" ? "bg-BG" : "en-GB", {
      weekday: "long",
    });

    return weekDays.flatMap((day, dayIndex) =>
      schedule.days[day].map((entry, entryIndex) => ({
        id: `${day}-${entryIndex}`,
        day: dayFormatter.format(dayDate(dayIndex)),
        time: `${entry.hour.start} – ${entry.hour.end}`,
        subject: entry.subjectName[lang],
        lessonType: entry.type,
        type: t(typeLabelKey[entry.type]),
        location: `${entry.location.building} — ${entry.location.roomNumber}`,
        lecturer: entry.lecturer,
      })),
    );
  }, [lang, schedule, t]);

  const columns: GridColDef[] = [
    { field: "day", headerName: t("schedules.table.day"), width: 110 },
    { field: "time", headerName: t("schedules.table.time"), width: 140 },
    { field: "subject", headerName: t("schedules.table.subject"), flex: 1, minWidth: 200 },
    {
      field: "type",
      headerName: t("schedules.table.type"),
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const lessonType = params.row.lessonType as LessonType;
        return (
          <Chip
            label={t(typeLabelKey[lessonType])}
            size="small"
            color={typeColor[lessonType]}
            variant="outlined"
          />
        );
      },
    },
    { field: "location", headerName: t("schedules.table.location"), width: 130 },
    { field: "lecturer", headerName: t("schedules.table.lecturer"), width: 190 },
  ];

  const handleExportCsv = () => {
    if (!apiRef.current) return;
    apiRef.current.exportDataAsCsv({ fileName });
  };

  const handleExportPdf = () => {
    void exportTablePdf({
      fileName,
      docTitle: `${schedule.scheduleName} — ${schedule.semester} ${schedule.academicYear}`,
      orientation: "landscape",
      columns: [
        t("schedules.table.day"),
        t("schedules.table.time"),
        t("schedules.table.subject"),
        t("schedules.table.type"),
        t("schedules.table.location"),
        t("schedules.table.lecturer"),
      ],
      rows: rows.map((row) => [
        row.day,
        row.time,
        row.subject,
        row.type,
        row.location,
        row.lecturer,
      ]),
    });
  };

  return (
    <Box>
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        autoHeight
        hideFooter
        disableRowSelectionOnClick
        density="compact"
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          "& .MuiDataGrid-columnHeaders": { bgcolor: "action.hover" },
        }}
      />
      <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end", mt: 1.5 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<Download />}
          onClick={handleExportCsv}
        >
          {t("curricula.exportCsv")}
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          startIcon={<PictureAsPdf />}
          onClick={handleExportPdf}
        >
          {t("curricula.exportPdf")}
        </Button>
      </Stack>
    </Box>
  );
}

function SemesterBlock({
  programmeId,
  item,
  defaultOpen = false,
}: {
  programmeId: string;
  item: SemesterSchedule;
  defaultOpen?: boolean;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Accordion
      expanded={open}
      onChange={(_, isOpen) => setOpen(isOpen)}
      elevation={1}
      disableGutters
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Chip
            label={`${t("curricula.semesterLabel")} ${item.semester}`}
            size="small"
            sx={{ bgcolor: "primary.main", color: "common.white", fontWeight: 700 }}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t(seasonLabelKey[item.season])} · {item.schedule.academicYear}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <ScheduleGrid
          schedule={item.schedule}
          fileName={`${programmeId}-semester-${item.semester}`}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export function SchedulesPage() {
  const { t, lang } = useLanguage();
  const [expandedProgramme, setExpandedProgramme] = useState<string>("kst-ba");

  return (
    <Box>
      <PageHero titleKey="education.schedules" subtitleKey="pages.schedulesSubtitle" />
      <Container sx={{ py: 5, maxWidth: 980 }}>
        <Stack spacing={3}>
          {scheduleProgrammes.map((programme) => {
            const visual = programmeVisuals[programme.id];
            const expanded = expandedProgramme === programme.id;

            return (
              <Paper
                key={programme.id}
                elevation={expanded ? 4 : 1}
                sx={{
                  overflow: "hidden",
                  borderRadius: 2,
                  transition: "box-shadow 0.2s ease",
                }}
              >
                <Accordion
                  expanded={expanded}
                  onChange={(_, isOpen) => setExpandedProgramme(isOpen ? programme.id : "")}
                  elevation={0}
                  disableGutters
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: "common.white" }} />}
                    sx={{
                      background: visual.gradient,
                      "& .MuiAccordionSummary-content": { my: 2 },
                    }}
                  >
                    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                      <visual.Icon sx={{ fontSize: 38, color: "rgba(255,255,255,0.92)" }} />
                      <Box>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{ color: "common.white", fontWeight: 700, lineHeight: 1.25 }}
                        >
                          {programme.name[lang]}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)" }}>
                          {programme.abbreviation} · {programme.semesters.length}{" "}
                          {t("education.semestersLabel").toLowerCase()} ·{" "}
                          {programme.semesters[0].schedule.academicYear}
                        </Typography>
                      </Box>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 3, pb: 4 }}>
                    <Stack spacing={1.5}>
                      {programme.semesters.map((item) => (
                        <SemesterBlock
                          key={`${item.season}-${item.semester}`}
                          programmeId={programme.id}
                          item={item}
                          defaultOpen={item === programme.semesters[0]}
                        />
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
