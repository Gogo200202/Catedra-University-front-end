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
import {
  DataGrid,
  useGridApiRef,
} from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Download, Engineering, ExpandMore, PictureAsPdf, School, Science } from "@mui/icons-material";
import { PageHero } from "../../components/layout/PageHero.tsx";
import {
  kstBachelorCurriculum,
  kstDoctoralCurriculum,
  kstMasterCurriculum,
} from "../../data/curricula.ts";
import type { CurriculumSemester } from "../../data/curricula.ts";
import type { TranslationKey } from "../../i18n/translations.ts";
import { exportTablePdf } from "../../utils/exportTablePdf.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface LevelConfig {
  id: string;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  gradient: string;
  Icon: typeof School;
  curriculum: CurriculumSemester[];
}

const levelConfigs: LevelConfig[] = [
  {
    id: "bachelor",
    titleKey: "education.bachelor",
    subtitleKey: "pages.bachelorSubtitle",
    gradient: "linear-gradient(135deg, #0d3b66, #2d7fc1)",
    Icon: School,
    curriculum: kstBachelorCurriculum,
  },
  {
    id: "master",
    titleKey: "education.master",
    subtitleKey: "pages.masterSubtitle",
    gradient: "linear-gradient(135deg, #283593, #5c6bc0)",
    Icon: Engineering,
    curriculum: kstMasterCurriculum,
  },
  {
    id: "doctoral",
    titleKey: "education.doctoral",
    subtitleKey: "pages.doctoralSubtitle",
    gradient: "linear-gradient(135deg, #00695c, #26a69a)",
    Icon: Science,
    curriculum: kstDoctoralCurriculum,
  },
];

function SemesterBlock({
  levelId,
  levelTitle,
  semester,
  defaultOpen = false,
}: {
  levelId: string;
  levelTitle: string;
  semester: CurriculumSemester;
  defaultOpen?: boolean;
}) {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);
  const apiRef = useGridApiRef();

  const rows = useMemo(
    () =>
      semester.courses.map((course) => ({
        id: course.name.en,
        course: course.name[lang],
        lectures: course.lecturesPerWeek,
        exercises: course.exercisesPerWeek,
        ects: course.ects,
      })),
    [lang, semester],
  );

  const columns: GridColDef[] = [
    { field: "course", headerName: t("curricula.course"), flex: 1, minWidth: 200 },
    {
      field: "lectures",
      headerName: t("curricula.lectures"),
      type: "number",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "exercises",
      headerName: t("curricula.exercises"),
      type: "number",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ects",
      headerName: t("curricula.ects"),
      type: "number",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
  ];

  const handleExportCsv = () => {
    if (!apiRef.current) return;
    apiRef.current.exportDataAsCsv({
      fileName: `${levelId}-semester-${semester.semester}`,
    });
  };

  const handleExportPdf = () => {
    void exportTablePdf({
      fileName: `${levelId}-semester-${semester.semester}`,
      docTitle: `${levelTitle} — ${t("curricula.semesterLabel")} ${semester.semester}`,
      columns: [
        t("curricula.course"),
        t("curricula.lectures"),
        t("curricula.exercises"),
        t("curricula.ects"),
      ],
      rows: semester.courses.map((course) => [
        course.name[lang],
        String(course.lecturesPerWeek),
        String(course.exercisesPerWeek),
        String(course.ects),
      ]),
    });
  };

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
            label={`${t("curricula.semesterLabel")} ${semester.semester}`}
            size="small"
            sx={{ bgcolor: "primary.main", color: "common.white", fontWeight: 700 }}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {rows.length} {t("curricula.course").toLowerCase()}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
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
      </AccordionDetails>
    </Accordion>
  );
}

export function CurriculaPage() {
  const { t } = useLanguage();
  const [expandedLevel, setExpandedLevel] = useState<string>("bachelor");

  return (
    <Box>
      <PageHero titleKey="education.curricula" subtitleKey="pages.curriculaSubtitle" />
      <Container sx={{ py: 5, maxWidth: 980 }}>
        <Stack spacing={3}>
          {levelConfigs.map(({ id, titleKey, subtitleKey, gradient, Icon, curriculum }) => {
            const totalCourses = curriculum.reduce((sum, s) => sum + s.courses.length, 0);
            const expanded = expandedLevel === id;

            return (
              <Paper
                key={id}
                elevation={expanded ? 4 : 1}
                sx={{
                  overflow: "hidden",
                  borderRadius: 2,
                  transition: "box-shadow 0.2s ease",
                }}
              >
                <Accordion
                  expanded={expanded}
                  onChange={(_, isOpen) => setExpandedLevel(isOpen ? id : "")}
                  elevation={0}
                  disableGutters
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: "common.white" }} />}
                    sx={{
                      background: gradient,
                      "& .MuiAccordionSummary-content": { my: 2 },
                    }}
                  >
                    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                      <Icon sx={{ fontSize: 38, color: "rgba(255,255,255,0.92)" }} />
                      <Box>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{ color: "common.white", fontWeight: 700, lineHeight: 1.25 }}
                        >
                          {t(titleKey)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)" }}>
                          {curriculum.length} {t("education.semestersLabel")} · {totalCourses}{" "}
                          {t("curricula.course").toLowerCase()}
                        </Typography>
                      </Box>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 3, pb: 4 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                      {t(subtitleKey)}
                    </Typography>
                    <Stack spacing={1.5}>
                      {curriculum.map((semester) => (
                        <SemesterBlock
                          key={semester.semester}
                          levelId={id}
                          levelTitle={t(titleKey)}
                          semester={semester}
                          defaultOpen={semester.semester === 1 && id === "bachelor"}
                        />
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            );
          })}
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "center", mt: 4 }}>
          <Chip
            icon={<Download />}
            label={`PDF — ${t("education.curricula")}`}
            variant="outlined"
            clickable
            color="primary"
          />
        </Stack>
      </Container>
    </Box>
  );
}
