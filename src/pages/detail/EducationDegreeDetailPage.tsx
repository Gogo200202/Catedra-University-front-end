import { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { ArrowBack, Download, ExpandMore, PictureAsPdf } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { fetchEducation, getEducationClassName, getEducationStudyName, getStudySemesters } from "../../api/educationApi.ts";
import type { EducationClass, EducationDocument, EducationStudy } from "../../api/educationApi.ts";
import { exportTablePdf } from "../../utils/exportTablePdf.ts";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { useLanguage } from "../../i18n/useLanguage.ts";

const levelConfig = {
  bachelor: { backendKey: "Bachelor", titleKey: "education.bachelor", listPath: "/education/bachelor" },
  master: { backendKey: "Master", titleKey: "education.master", listPath: "/education/master" },
  doctoral: { backendKey: "Doctorate", titleKey: "education.doctoral", listPath: "/education/doctoral" },
} as const;

function decodeDegreeName(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function semesterOrder(name: string): number {
  const match = name.match(/\d+/);
  return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
}

function semesterTitle(name: string, label: string): string {
  const match = name.match(/semester\s*(\d+)/i);
  if (match) return `${label} ${match[1]}`;
  return name.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (letter) => letter.toLocaleUpperCase());
}

function EducationSemesterAccordion({
  levelId,
  degreeName,
  semesterName,
  classes,
  defaultOpen = false,
}: {
  levelId: string;
  degreeName: string;
  semesterName: string;
  classes: EducationClass[];
  defaultOpen?: boolean;
}) {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);
  const apiRef = useGridApiRef();
  const title = semesterTitle(semesterName, t("curricula.semesterLabel"));
  const rows = useMemo(
    () => classes.map((course, index) => ({ id: `${index}-${getEducationClassName(course, "en")}`, course: getEducationClassName(course, lang) })),
    [classes, lang],
  );
  const columns: GridColDef[] = [
    { field: "course", headerName: t("curricula.course"), flex: 1, minWidth: 240 },
  ];
  const fileName = `${levelId}-${degreeName}-${semesterName}`.replace(/[^a-z0-9-]+/gi, "-").toLowerCase();

  const exportCsv = () => {
    if (!apiRef.current) return;
    apiRef.current.exportDataAsCsv({ fileName });
  };

  const exportPdf = () => {
    void exportTablePdf({
      fileName,
      docTitle: `${degreeName} — ${title}`,
      columns: [t("curricula.course")],
      rows: classes.map((course) => [getEducationClassName(course, lang)]),
    });
  };

  return (
    <Accordion expanded={open} onChange={(_, expanded) => setOpen(expanded)} elevation={1} disableGutters>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 1 }}>
          <Chip label={title} size="small" sx={{ bgcolor: "primary.main", color: "common.white", fontWeight: 700 }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {classes.length} {t("curricula.course").toLowerCase()}
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
          <Button size="small" variant="outlined" startIcon={<Download />} onClick={exportCsv}>
            {t("curricula.exportCsv")}
          </Button>
          <Button size="small" variant="contained" color="secondary" startIcon={<PictureAsPdf />} onClick={exportPdf}>
            {t("curricula.exportPdf")}
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export function EducationDegreeDetailPage() {
  const { t, lang } = useLanguage();
  const { level, id } = useParams();
  const [education, setEducation] = useState<EducationDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const degreeName = decodeDegreeName(id);
  const config = level ? levelConfig[level as keyof typeof levelConfig] : undefined;

  useEffect(() => {
    let cancelled = false;
    fetchEducation()
      .then((response) => {
        if (!cancelled) setEducation(response);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const study = useMemo<EducationStudy | undefined>(() => {
    if (!education || !config || !degreeName) return undefined;
    return education[config.backendKey]?.degree?.[degreeName];
  }, [config, degreeName, education]);

  if (loading) {
    return <Stack sx={{ py: 10, alignItems: "center" }}><CircularProgress color="primary" /></Stack>;
  }

  if (failed) {
    return <Container sx={{ py: 6 }}><Typography sx={{ color: "error.main", textAlign: "center" }}>{t("education.loadError")}</Typography></Container>;
  }

  if (!config || !study) {
    return <Container sx={{ py: 6 }}><Typography sx={{ color: "text.secondary", textAlign: "center" }}>{t("education.notFound")}</Typography></Container>;
  }

  const localizedDegreeName = getEducationStudyName(study, degreeName ?? "", lang);
  const semesters = Object.entries(getStudySemesters(study)).sort(([left], [right]) => semesterOrder(left) - semesterOrder(right));
  const courseCount = semesters.reduce((total, [, semester]) => total + (semester.classes?.length ?? 0), 0);

  return (
    <Box>
      <PageHero titleKey={config.titleKey} subtitleKey="pages.educationSubtitle" />
      <Container sx={{ py: 5, maxWidth: 980 }}>
        <Paper elevation={1} sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ color: "primary.main", fontWeight: 700 }}>
                {localizedDegreeName}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap", rowGap: 1 }}>
                <Chip size="small" variant="outlined" label={`${semesters.length} ${t("education.semestersLabel")}`} />
                <Chip size="small" variant="outlined" label={`${courseCount} ${t("education.classesLabel")}`} />
              </Stack>
            </Box>

            <Divider />

            <Stack spacing={1.5}>
              {semesters.map(([semesterName, semester], index) => (
                <EducationSemesterAccordion
                  key={semesterName}
                  levelId={level!}
                  degreeName={localizedDegreeName}
                  semesterName={semesterName}
                  classes={semester.classes ?? []}
                  defaultOpen={index === 0}
                />
              ))}
            </Stack>

            <Box component={Link} to={config.listPath} sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: "secondary.main", fontWeight: 700, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              <ArrowBack fontSize="small" />
              {t("education.backToProgrammes")}
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
