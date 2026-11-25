import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link as MuiLink,
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
  DeleteOutlined,
  EditOutlined,
  Language,
  LocationCity,
  MailOutlined,
  PhoneOutlined,
  PictureAsPdf,
  Public,
  School,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router";
import { deleteProfessor, fetchProfessor } from "../../api/professorsApi.ts";
import type { BilingualText, Professor } from "../../api/professorsApi.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";
import { useUser } from "../../context/useUser.ts";

const avatarColors = ["#0d3b66", "#283593", "#00695c", "#6a1b9a", "#ad1457", "#ef6c00"];

function localized(value: BilingualText | undefined, lang: "bg" | "en"): string {
  return value?.[lang] || value?.en || value?.bg || "";
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
  const presentItems = items.filter(Boolean);
  if (presentItems.length === 0) return null;
  return (
    <List disablePadding>
      {presentItems.map((item, index) => (
        <ListItem key={`${index}-${item}`} disableGutters sx={{ py: 0.5, alignItems: "flex-start" }}>
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

function LocalizedChips({ values, lang }: { values: BilingualText[]; lang: "bg" | "en" }) {
  const labels = values.map((value) => localized(value, lang)).filter(Boolean);
  if (labels.length === 0) return null;
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
      {labels.map((label, index) => (
        <Chip key={`${index}-${label}`} label={label} size="small" variant="outlined" />
      ))}
    </Stack>
  );
}

export function TeacherDetailPage() {
  const { t, lang } = useLanguage();
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setFailed(true);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setFailed(false);
    setProfessor(null);
    fetchProfessor(id)
      .then((data) => {
        if (!cancelled) setProfessor(data);
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
  }, [id]);

  if (loading) {
    return (
      <Stack sx={{ py: 10, alignItems: "center" }}>
        <CircularProgress color="primary" />
      </Stack>
    );
  }

  if (failed || !professor) {
    return (
      <Container sx={{ py: 10 }}>
        <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "primary.main" }}>
            {t("teachers.notFound")}
          </Typography>
          <Box
            component={Link}
            to="/teachers"
            sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: "secondary.main", fontWeight: 700, textDecoration: "none" }}
          >
            <ArrowBack fontSize="small" />
            {t("teachers.backToList")}
          </Box>
        </Stack>
      </Container>
    );
  }

  const basic = professor.Basic_Information ?? {};
  const education = professor.Education ?? {};
  const teaching = professor.Teaching_Activity ?? {};
  const competence = professor.Professional_Competences ?? {};
  const publications = professor.Publications ?? {};
  const citations = professor.Citations ?? {};
  const contact = professor.Contact_Information ?? {};
  const achievements = professor.Achievements ?? {};
  const name = [basic.firstName, basic.middleName, basic.lastName]
    .map((part) => localized(part, lang))
    .filter(Boolean)
    .join(" ");
  const initials = name.split(/\s+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("");
  const photo = localized(basic.photo, lang);

  const handleExportPdf = async () => {
    if (!printRef.current) return;
    const html2pdf = (await import("html2pdf.js")).default;
    await html2pdf()
      .set({
        margin: [8, 8],
        filename: `professor-${professor._id}-profile.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, windowWidth: 1000 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(printRef.current)
      .save();
  };

  const handleDelete = async () => {
    if (!id || !user?.jwt || !window.confirm(t("teachers.confirmDelete"))) return;
    setDeleting(true);
    setDeleteError(false);
    try {
      await deleteProfessor(user.jwt, id);
      navigate("/teachers", { replace: true });
    } catch {
      setDeleteError(true);
      setDeleting(false);
    }
  };

  const researchInterests = education.researchInterests ?? [];
  const summaryIndicators = publications.summaryIndicators ?? {};
  const bookLines = (publications.booksAndTextbooks ?? []).map((book) =>
    [book.authors?.join(", "), localized(book.title, lang), localized(book.publisher, lang), localized(book.year, lang)]
      .filter(Boolean)
      .join(". "),
  );
  const selectedPublicationLines = (publications.selectedScientificPublications ?? []).map((publication) => {
    const details = [
      localized(publication.publicationOrConference, lang),
      localized(publication.volume, lang),
      localized(publication.issue, lang),
      localized(publication.pages, lang),
      localized(publication.year, lang),
      localized(publication.doi, lang) ? `DOI: ${localized(publication.doi, lang)}` : "",
    ].filter(Boolean);
    return [publication.authors?.join(", "), localized(publication.title, lang), details.join(" · ")]
      .filter(Boolean)
      .join(" — ");
  });
  const achievementLines = [
    ...(achievements.scientificAchievements ?? []),
    ...(achievements.professionalAchievements ?? []),
    ...(achievements.awardsAndHonors ?? []),
    ...(achievements.reviewerActivity ?? []),
    ...(achievements.editorialBoardMemberships ?? []),
    ...(achievements.certificates ?? []),
  ].map((item) => localized(item, lang));
  const membershipLines = (professor.Membership_in_Organizations ?? []).map((item) =>
    [localized(item.organization, lang), localized(item.membershipType, lang), localized(item.period, lang)]
      .filter(Boolean)
      .join(" — "),
  );

  return (
    <Box ref={printRef}>
      <Box sx={{ background: "linear-gradient(135deg, #0d3b66 0%, #1e5f9e 60%, #3f8fd2 100%)", py: { xs: 5, md: 6 } }}>
        <Container>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2.5}
            sx={{ alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", flexWrap: "wrap" }}
          >
            <Stack direction="row" spacing={2.5} sx={{ alignItems: "center", flexWrap: "wrap" }}>
              <Avatar src={photo || undefined} alt={name} sx={{ width: 88, height: 88, fontSize: 30, bgcolor: avatarColors[0] }}>
                {initials}
              </Avatar>
              <Box>
                <Stack direction="row" spacing={1} sx={{ mb: 0.75, flexWrap: "wrap", rowGap: 1 }}>
                  {localized(basic.academicPosition, lang) && (
                    <Chip label={localized(basic.academicPosition, lang)} size="small" sx={{ bgcolor: "rgba(255,255,255,0.16)", color: "common.white", fontWeight: 700 }} />
                  )}
                  {localized(basic.administrativeFunction, lang) && (
                    <Chip label={localized(basic.administrativeFunction, lang)} size="small" sx={{ bgcolor: "rgba(255,255,255,0.16)", color: "common.white" }} />
                  )}
                </Stack>
                <Typography variant="h4" component="h1" sx={{ color: "common.white", fontWeight: 700 }}>
                  {name || "—"}
                </Typography>
                <Stack direction="row" spacing={2.5} sx={{ mt: 0.75, flexWrap: "wrap", rowGap: 0.5 }}>
                  {localized(basic.officeNumber, lang) && (
                    <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                      <LocationCity sx={{ fontSize: 17, color: "rgba(255,255,255,0.85)" }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
                        {localized(basic.officeNumber, lang)}
                      </Typography>
                    </Stack>
                  )}
                  {(contact.emails ?? []).map((email) => (
                    <Stack key={email} direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                      <MailOutlined sx={{ fontSize: 17, color: "rgba(255,255,255,0.85)" }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>{email}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button data-html2canvas-ignore="" variant="contained" color="secondary" size="small" startIcon={<PictureAsPdf />} onClick={() => void handleExportPdf()}>
                {t("teachers.exportPdf")}
              </Button>
              {user?.jwt && (
                <>
                  <Button data-html2canvas-ignore="" variant="contained" size="small" startIcon={<EditOutlined />} onClick={() => navigate(`/admin/teachers/edit/${professor._id}`)}>
                    {t("admin.editTeacher")}
                  </Button>
                  <Button data-html2canvas-ignore="" variant="contained" color="error" size="small" startIcon={<DeleteOutlined />} disabled={deleting} onClick={() => void handleDelete()}>
                    {t("teachers.delete")}
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 5, maxWidth: 900 }}>
        <Stack spacing={2.5}>
          {deleteError && <Alert severity="error">{t("teachers.deleteError")}</Alert>}

          <Section title={t("teachers.section.education")}>
            <Stack spacing={2}>
              {(localized(education.university, lang) || localized(education.major, lang)) && (
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <School sx={{ color: "secondary.main", fontSize: 20 }} />
                  <Typography variant="body2">
                    {[localized(education.university, lang), localized(education.major, lang)].filter(Boolean).join(" — ")}
                  </Typography>
                </Stack>
              )}
              {(education.academicDegrees ?? []).length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{t("teachers.label.degrees")}</Typography>
                  <Stack spacing={1}>
                    {(education.academicDegrees ?? []).map((degree, index) => (
                      <Box key={`${index}-${localized(degree.degree, lang)}`}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {[localized(degree.degree, lang), localized(degree.dateAcquired, lang), localized(degree.scientificSpecialty, lang)].filter(Boolean).join(" — ")}
                        </Typography>
                        {localized(degree.dissertationTitle, lang) && <Typography variant="caption" sx={{ color: "text.disabled", fontStyle: "italic" }}>„{localized(degree.dissertationTitle, lang)}“</Typography>}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
              {(education.academicTitles ?? []).length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{t("teachers.label.titles")}</Typography>
                  <BulletList items={(education.academicTitles ?? []).map((title) => [localized(title.title, lang), localized(title.dateAcquired, lang), localized(title.scientificSpecialty, lang)].filter(Boolean).join(" — "))} />
                </Box>
              )}
              <LocalizedChips values={education.fieldsOfHigherEducation ?? []} lang={lang} />
              <LocalizedChips values={education.professionalFields ?? []} lang={lang} />
              {researchInterests.length > 0 && <LocalizedChips values={researchInterests} lang={lang} />}
            </Stack>
          </Section>

          <Section title={t("teachers.section.teaching")}>
            <Grid container spacing={3}>
              {([
                ["education.bachelor", teaching.bachelorsCourses ?? []],
                ["education.master", teaching.mastersCourses ?? []],
                ["education.doctoral", teaching.phdCourses ?? []],
              ] as const).map(([labelKey, courses]) => {
                const items = courses.map((course) => localized(course, lang)).filter(Boolean);
                return items.length ? (
                  <Grid key={labelKey} size={{ xs: 12, sm: 4 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{t(labelKey)}</Typography>
                    <BulletList items={items} />
                  </Grid>
                ) : null;
              })}
            </Grid>
          </Section>

          <Section title={t("teachers.section.competences")}>
            <Stack spacing={2}>
              {(competence.programmingLanguages ?? []).length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{t("teachers.comp.programmingLanguages")}</Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
                    {(competence.programmingLanguages ?? []).map((skill, index) => {
                      const language = localized(skill.language, lang);
                      const level = localized(skill.proficiencyLevel, lang);
                      return <Chip key={`${index}-${language}`} label={[language, level].filter(Boolean).join(" · ")} size="small" color="primary" variant="outlined" />;
                    })}
                  </Stack>
                </Box>
              )}
              {([
                ["teachers.comp.technologies", competence.technologies ?? []],
                ["teachers.comp.frameworks", competence.frameworks ?? []],
                ["teachers.comp.databases", competence.databases ?? []],
                ["teachers.comp.platforms", competence.platforms ?? []],
              ] as const).map(([key, values]) => {
                const items = values.map((value) => localized(value, lang)).filter(Boolean);
                return items.length ? <Box key={key}><Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{t(key)}</Typography><LocalizedChips values={values} lang={lang} /></Box> : null;
              })}
              <LocalizedChips values={competence.otherTechnicalSkills ?? []} lang={lang} />
            </Stack>
          </Section>

          {(professor.Foreign_Languages ?? []).length > 0 && (
            <Section title={t("teachers.section.languages")}>
              <Stack spacing={1}>
                {(professor.Foreign_Languages ?? []).map((language, index) => {
                  const namePart = localized(language.languageName, lang);
                  const levels = [
                    `${t("teachers.reading")}: ${localized(language.readingLevel, lang)}`,
                    `${t("teachers.writing")}: ${localized(language.writingLevel, lang)}`,
                    `${t("teachers.speaking")}: ${localized(language.speakingLevel, lang)}`,
                  ].filter((part) => !part.endsWith(": "));
                  return (
                    <Stack key={`${index}-${namePart}`} direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.25, sm: 2 }}>
                      <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", minWidth: 140 }}>
                        <Language sx={{ fontSize: 17, color: "secondary.main" }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{namePart}</Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>{levels.join(" · ")}</Typography>
                    </Stack>
                  );
                })}
              </Stack>
            </Section>
          )}

          {(professor.Work_Experience ?? []).length > 0 && (
            <Section title={t("teachers.section.workExperience")}>
              <Stack spacing={2.5}>
                {(professor.Work_Experience ?? []).map((entry, index) => {
                  const from = localized(entry.period?.from, lang);
                  const to = localized(entry.period?.to, lang);
                  return (
                    <Box key={`${index}-${localized(entry.organization, lang)}`}>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: "baseline", flexWrap: "wrap" }}>
                        {(from || to) && <Chip label={`${from} – ${to}`} size="small" sx={{ bgcolor: "primary.main", color: "common.white", fontWeight: 700 }} />}
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {[localized(entry.organization, lang), localized(entry.position, lang)].filter(Boolean).join(" — ")}
                        </Typography>
                      </Stack>
                      {localized(entry.description, lang) && <Typography variant="caption" sx={{ color: "text.disabled", display: "block", mt: 0.5 }}>{localized(entry.description, lang)}</Typography>}
                    </Box>
                  );
                })}
              </Stack>
            </Section>
          )}

          {(professor.Participation_in_Research_Projects ?? []).length > 0 && (
            <Section title={t("teachers.section.projects")}>
              <Stack spacing={2}>
                {(professor.Participation_in_Research_Projects ?? []).map((project, index) => (
                  <Box key={`${index}-${localized(project.projectName, lang)}`}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{localized(project.projectName, lang)}</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                      {[localized(project.period, lang), localized(project.fundingOrganization, lang), localized(project.contractNumber, lang)].filter(Boolean).join(" · ")}
                    </Typography>
                    {localized(project.projectRole, lang) && <Chip label={localized(project.projectRole, lang)} size="small" color="secondary" variant="outlined" sx={{ mt: 0.75 }} />}
                  </Box>
                ))}
              </Stack>
            </Section>
          )}

          <Section title={t("teachers.section.publications")}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1, mb: 2.5 }}>
              <Chip label={`${summaryIndicators.numberOfScientificArticles ?? 0} ${t("teachers.pub.articles")}`} size="small" color="primary" />
              <Chip label={`${summaryIndicators.numberOfInternationalReports ?? 0} ${t("teachers.pub.international")}`} size="small" variant="outlined" />
              <Chip label={`${summaryIndicators.numberOfNationalReports ?? 0} ${t("teachers.pub.national")}`} size="small" variant="outlined" />
            </Stack>
            <BulletList items={bookLines} />
            {(publications.selectedScientificPublications ?? []).length > 0 && <Divider sx={{ my: 2 }} />}
            {(publications.selectedScientificPublications ?? []).length > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{t("teachers.pub.selected")}</Typography>
                <BulletList items={selectedPublicationLines} />
              </>
            )}
          </Section>

          {Object.values(citations).some((value) => typeof value === "number" && value > 0) && (
            <Section title={t("teachers.section.citations")}>
              <Grid container spacing={2}>
                {([
                  [citations.citationsByForeignAuthors ?? 0, "teachers.cit.foreign"],
                  [citations.citationsByBulgarianAuthors ?? 0, "teachers.cit.bulgarian"],
                  [citations.totalCitations ?? 0, "teachers.cit.total"],
                ] as const).map(([value, key]) => (
                  <Grid key={key} size={{ xs: 4 }}>
                    <Paper elevation={0} sx={{ p: 2, textAlign: "center", bgcolor: "action.hover" }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: "primary.main" }}>{value}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>{t(key)}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Section>
          )}

          {(achievementLines.some(Boolean) || membershipLines.some(Boolean)) && (
            <Section title={t("teachers.section.achievements")}>
              <BulletList items={[...achievementLines, ...membershipLines]} />
            </Section>
          )}

          <Section title={t("teachers.section.contacts")}>
            <Stack spacing={1}>
              {(contact.phoneNumbers ?? []).map((phone) => (
                <Stack key={phone} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <PhoneOutlined sx={{ fontSize: 18, color: "secondary.main" }} />
                  <Typography variant="body2">{phone}</Typography>
                </Stack>
              ))}
              {(contact.emails ?? []).map((email) => (
                <Stack key={email} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <MailOutlined sx={{ fontSize: 18, color: "secondary.main" }} />
                  <Typography variant="body2">{email}</Typography>
                </Stack>
              ))}
              {localized(contact.personalWebsite, lang) && (
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Public sx={{ fontSize: 18, color: "secondary.main" }} />
                  <MuiLink href={localized(contact.personalWebsite, lang)} target="_blank" rel="noreferrer">
                    {localized(contact.personalWebsite, lang)}
                  </MuiLink>
                </Stack>
              )}
              {(contact.researchNetworkProfiles ?? []).length > 0 && (
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1, mt: 0.5 }}>
                  {(contact.researchNetworkProfiles ?? []).map((networkProfile) => (
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
