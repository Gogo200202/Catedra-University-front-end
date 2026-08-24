import { useRef } from "react";
import type { ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  CheckCircle,
  Language,
  LocationCity,
  MailOutlined,
  PhoneOutlined,
  PictureAsPdf,
  Public,
  School,
} from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { teacherDisplayName, teachers } from "../data/teachers.ts";
import type { TeacherSummary } from "../data/teachers.ts";
import { teacherProfiles } from "../data/teacherProfiles.ts";
import type { TranslationKey } from "../i18n/translations.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

const positionLabelKey: Record<TeacherSummary["academicPosition"], TranslationKey> = {
  professor: "positions.professor",
  assocProfessor: "positions.assocProfessor",
  chiefAssistant: "positions.chiefAssistant",
  assistant: "positions.assistant",
};

const avatarColors = ["#0d3b66", "#283593", "#00695c", "#6a1b9a", "#ad1457", "#ef6c00"];

function initials(teacher: TeacherSummary): string {
  return `${teacher.firstName[0]}${teacher.lastName[0]}`;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Paper elevation={1} sx={{ p: { xs: 2.5, md: 3 } }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <List disablePadding>
      {items.map((item) => (
        <ListItem key={item} disableGutters sx={{ py: 0.5, alignItems: "flex-start" }}>
          <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
            <CheckCircle sx={{ color: "secondary.main", fontSize: 18 }} />
          </ListItemIcon>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {item}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

export function TeacherDetailPage() {
  const { t } = useLanguage();
  const { id } = useParams();
  const printRef = useRef<HTMLDivElement>(null);

  const teacher = teachers.find((entry) => String(entry.id) === id);
  const profile = teacher ? teacherProfiles[teacher.id] : undefined;

  if (!teacher || !profile) {
    return (
      <Container sx={{ py: 10 }}>
        <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "primary.main" }}>
            {t("teachers.notFound")}
          </Typography>
          <Box
            component={Link}
            to="/teachers"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "secondary.main",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <ArrowBack fontSize="small" />
            {t("teachers.backToList")}
          </Box>
        </Stack>
      </Container>
    );
  }

  const colorIndex = teachers.findIndex((entry) => entry.id === teacher.id);
  const comp = profile.professionalCompetences;
  const pub = profile.publications;

  const handleExportPdf = async () => {
    if (!printRef.current) return;
    const html2pdf = (await import("html2pdf.js")).default;
    await html2pdf()
      .set({
        margin: [8, 8],
        filename: `teacher-${teacher.id}-profile.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, windowWidth: 1000 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      })
      .from(printRef.current)
      .save();
  };

  return (
    <Box ref={printRef}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #0d3b66 0%, #1e5f9e 60%, #3f8fd2 100%)",
          py: { xs: 5, md: 6 },
        }}
      >
        <Container>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2.5}
            sx={{
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Stack direction="row" spacing={2.5} sx={{ alignItems: "center", flexWrap: "wrap" }}>
            <Avatar
              sx={{
                width: 88,
                height: 88,
                fontSize: 30,
                bgcolor: avatarColors[(colorIndex >= 0 ? colorIndex : 0) % avatarColors.length],
              }}
            >
              {initials(teacher)}
            </Avatar>
            <Box>
              <Stack direction="row" spacing={1} sx={{ mb: 0.75, flexWrap: "wrap", rowGap: 1 }}>
                <Chip
                  label={t(positionLabelKey[teacher.academicPosition])}
                  size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.16)", color: "common.white", fontWeight: 700 }}
                />
                {teacher.administrativeFunction && (
                  <Chip
                    label={t(teacher.administrativeFunction)}
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.16)", color: "common.white" }}
                  />
                )}
              </Stack>
              <Typography variant="h4" component="h1" sx={{ color: "common.white", fontWeight: 700 }}>
                {teacherDisplayName(teacher)}
              </Typography>
              <Stack direction="row" spacing={2.5} sx={{ mt: 0.75, flexWrap: "wrap", rowGap: 0.5 }}>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                  <LocationCity sx={{ fontSize: 17, color: "rgba(255,255,255,0.85)" }} />
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
                    {t("footer.contactTitle")} — {teacher.officeRoom}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                  <MailOutlined sx={{ fontSize: 17, color: "rgba(255,255,255,0.85)" }} />
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
                    {teacher.email}
                  </Typography>
                </Stack>
              </Stack>
              </Box>
            </Stack>
            <Button
              data-html2canvas-ignore=""
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<PictureAsPdf />}
              onClick={() => void handleExportPdf()}
            >
              {t("teachers.exportPdf")}
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 5, maxWidth: 900 }}>
        <Stack spacing={2.5}>
          <Section title={t("teachers.section.education")}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
              <School sx={{ color: "secondary.main", fontSize: 20 }} />
              <Typography variant="body2">
                {profile.education.university} — {profile.education.major}
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  {t("teachers.label.degrees")}
                </Typography>
                <Stack spacing={1}>
                  {profile.education.academicDegrees.map((degree) => (
                    <Box key={`${degree.degree}-${degree.dateAcquired}`}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {degree.degree} ({degree.dateAcquired}) — {degree.scientificSpecialty}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.disabled", fontStyle: "italic" }}>
                        „{degree.dissertationTitle}“
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {profile.education.academicTitles.length > 0 && (
                  <>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      {t("teachers.label.titles")}
                    </Typography>
                    <Stack spacing={1}>
                      {profile.education.academicTitles.map((title) => (
                        <Typography key={title.title} variant="body2" sx={{ fontWeight: 600 }}>
                          {title.title} ({title.dateAcquired}) — {title.scientificSpecialty}
                        </Typography>
                      ))}
                    </Stack>
                  </>
                )}
              </Grid>
            </Grid>
          </Section>

          <Section title={t("teachers.section.teaching")}>
            <Grid container spacing={3}>
              {(
                [
                  ["education.bachelor", profile.teachingActivity.bachelorsCourses],
                  ["education.master", profile.teachingActivity.mastersCourses],
                  ["education.doctoral", profile.teachingActivity.phdCourses],
                ] as [TranslationKey, string[]][]
              ).map(([labelKey, courses]) =>
                courses.length > 0 ? (
                  <Grid key={labelKey} size={{ xs: 12, sm: 4 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      {t(labelKey)}
                    </Typography>
                    <BulletList items={courses} />
                  </Grid>
                ) : null,
              )}
            </Grid>
          </Section>

          <Section title={t("teachers.section.competences")}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  {t("teachers.comp.programmingLanguages")}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
                  {comp.programmingLanguages.map((skill) => (
                    <Chip
                      key={skill.language}
                      label={`${skill.language} · ${skill.proficiencyLevel}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
              {(
                [
                  ["teachers.comp.technologies", comp.technologies],
                  ["teachers.comp.frameworks", comp.frameworks],
                  ["teachers.comp.databases", comp.databases],
                ] as [TranslationKey, string[]][]
              ).map(([labelKey, items]) =>
                items.length > 0 ? (
                  <Box key={labelKey}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      {t(labelKey)}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
                      {items.map((item) => (
                        <Chip key={item} label={item} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Box>
                ) : null,
              )}
            </Stack>
          </Section>

          <Section title={t("teachers.section.languages")}>
            <Stack spacing={1}>
              {profile.foreignLanguages.map((language) => (
                <Stack
                  key={language.languageName}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 0.25, sm: 2 }}
                >
                  <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", minWidth: 140 }}>
                    <Language sx={{ fontSize: 17, color: "secondary.main" }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {language.languageName}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Reading {language.readingLevel} · Writing {language.writingLevel} · Speaking{" "}
                    {language.speakingLevel}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Section>

          <Section title={t("teachers.section.workExperience")}>
            <Stack spacing={2.5}>
              {profile.workExperience.map((entry) => (
                <Box key={`${entry.organization}-${entry.periodFrom}`}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "baseline", flexWrap: "wrap" }}>
                    <Chip
                      label={`${entry.periodFrom} – ${entry.periodTo}`}
                      size="small"
                      sx={{ bgcolor: "primary.main", color: "common.white", fontWeight: 700 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {entry.organization} — {entry.position}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: "text.disabled", display: "block", mt: 0.5 }}>
                    {entry.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Section>

          {profile.projectParticipations.length > 0 && (
            <Section title={t("teachers.section.projects")}>
              <Stack spacing={2}>
                {profile.projectParticipations.map((project) => (
                  <Box key={project.projectName}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {project.projectName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                      {project.period} · {project.fundingOrganization}
                      {project.contractNumber ? ` · ${project.contractNumber}` : ""}
                    </Typography>
                    <Chip label={project.projectRole} size="small" color="secondary" variant="outlined" sx={{ mt: 0.75 }} />
                  </Box>
                ))}
              </Stack>
            </Section>
          )}

          <Section title={t("teachers.section.publications")}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1, mb: 2.5 }}>
              <Chip label={`${pub.indicators.numberOfScientificArticles} ${t("teachers.pub.articles")}`} size="small" color="primary" />
              <Chip label={`${pub.indicators.numberOfInternationalReports} ${t("teachers.pub.international")}`} size="small" variant="outlined" />
              <Chip label={`${pub.indicators.numberOfNationalReports} ${t("teachers.pub.national")}`} size="small" variant="outlined" />
            </Stack>

            {pub.booksAndTextbooks.length > 0 && (
              <BulletList
                items={pub.booksAndTextbooks.map(
                  (book) => `${book.authors}. ${book.title}. ${book.publisher}, ${book.year}`,
                )}
              />
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              {t("teachers.pub.selected")}
            </Typography>
            <List disablePadding>
              {pub.selectedPublications.map((publication) => (
                <ListItem key={publication.title} disableGutters sx={{ py: 0.75, alignItems: "flex-start" }}>
                  <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                    <CheckCircle sx={{ color: "secondary.main", fontSize: 18 }} />
                  </ListItemIcon>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {publication.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                      {publication.authors}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.disabled", fontStyle: "italic" }}>
                      {publication.publicationOrConference}
                      {publication.pages ? `, ${publication.pages}` : ""} · {publication.year}
                      {publication.doi ? ` · DOI: ${publication.doi}` : ""}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Section>

          <Section title={t("teachers.section.citations")}>
            <Grid container spacing={2}>
              {(
                [
                  [profile.citations.citationsByForeignAuthors, "teachers.cit.foreign"],
                  [profile.citations.citationsByBulgarianAuthors, "teachers.cit.bulgarian"],
                  [profile.citations.totalCitations, "teachers.cit.total"],
                ] as [number, TranslationKey][]
              ).map(([value, labelKey]) => (
                <Grid key={labelKey} size={{ xs: 4 }}>
                  <Paper elevation={0} sx={{ p: 2, textAlign: "center", bgcolor: "action.hover" }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "primary.main" }}>
                      {value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {t(labelKey)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Section>

          <Section title={t("teachers.section.achievements")}>
            {(() => {
              const achievementItems = [
                ...profile.achievements.awardsAndHonors,
                ...profile.achievements.reviewerActivity,
                ...profile.achievements.editorialBoards,
                ...profile.achievements.certificates,
                ...profile.memberships.map(
                  (membership) =>
                    `${membership.organization} (${membership.membershipType}, ${membership.period})`,
                ),
              ];
              return achievementItems.length > 0 ? (
                <BulletList items={achievementItems} />
              ) : null;
            })()}
          </Section>

          <Section title={t("teachers.section.contacts")}>
            <Stack spacing={1}>
              {profile.contacts.phoneNumbers.map((phone) => (
                <Stack key={phone} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <PhoneOutlined sx={{ fontSize: 18, color: "secondary.main" }} />
                  <Typography variant="body2">{phone}</Typography>
                </Stack>
              ))}
              {profile.contacts.emails.map((email) => (
                <Stack key={email} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <MailOutlined sx={{ fontSize: 18, color: "secondary.main" }} />
                  <Typography variant="body2">{email}</Typography>
                </Stack>
              ))}
              {profile.contacts.personalWebsite && (
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Public sx={{ fontSize: 18, color: "secondary.main" }} />
                  <Box
                    component="a"
                    href={profile.contacts.personalWebsite}
                    sx={{ color: "secondary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                  >
                    <Typography variant="body2">{profile.contacts.personalWebsite}</Typography>
                  </Box>
                </Stack>
              )}
              {profile.contacts.researchNetworkProfiles.length > 0 && (
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1, mt: 0.5 }}>
                  {profile.contacts.researchNetworkProfiles.map((networkProfile) => (
                    <Chip key={networkProfile} label={networkProfile} size="small" variant="outlined" />
                  ))}
                </Stack>
              )}
            </Stack>
          </Section>

          <Box component={Link} to="/teachers" sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: "secondary.main", fontWeight: 700, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
            <ArrowBack fontSize="small" />
            {t("teachers.backToList")}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
