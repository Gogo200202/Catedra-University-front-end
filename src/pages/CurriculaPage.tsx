import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import { Download, ExpandMore } from "@mui/icons-material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { kstBachelorCurriculum } from "../data/curricula.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

export function CurriculaPage() {
  const { t, lang } = useLanguage();
  const [expanded, setExpanded] = useState<number>(1);

  return (
    <Box>
      <PageHero titleKey="education.curricula" subtitleKey="pages.curriculaSubtitle" />
      <Container sx={{ py: 5, maxWidth: 980 }}>
        <Stack spacing={2}>
          {kstBachelorCurriculum.map((semester) => (
            <Accordion
              key={semester.semester}
              expanded={expanded === semester.semester}
              onChange={(_, isExpanded) =>
                setExpanded(isExpanded ? semester.semester : expanded)
              }
              elevation={1}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Chip
                    label={`${t("curricula.semesterLabel")} ${semester.semester}`}
                    size="small"
                    sx={{ bgcolor: "primary.main", color: "common.white", fontWeight: 700 }}
                  />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {semester.courses.length} {t("curricula.course").toLowerCase()}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <TableContainer component={Paper} elevation={0} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "action.hover" }}>
                        <TableCell sx={{ fontWeight: 700 }}>{t("curricula.course")}</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>
                          {t("curricula.lectures")}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>
                          {t("curricula.exercises")}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>
                          {t("curricula.ects")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {semester.courses.map((course) => (
                        <TableRow key={course.name.en}>
                          <TableCell>{course.name[lang]}</TableCell>
                          <TableCell align="center">{course.lecturesPerWeek}</TableCell>
                          <TableCell align="center">{course.exercisesPerWeek}</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 600 }}>
                            {course.ects}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
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
