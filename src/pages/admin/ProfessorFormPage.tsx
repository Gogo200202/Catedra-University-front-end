import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, DeleteOutlined, ExpandMore } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import { AdminFormShell } from "../components/AdminFormShell.tsx";
import {
  createProfessor,
  fetchProfessor,
  updateProfessor,
} from "../../api/professorsApi.ts";
import type { BilingualText, Professor, ProfessorPayload } from "../../api/professorsApi.ts";
import { useUser } from "../../context/useUser.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

type PathPart = string | number;
type FieldKind = "bilingual" | "stringList";

interface ObjectField {
  path: string;
  label: string;
  kind?: FieldKind;
}

const blankBilingual = (): BilingualText => ({ bg: "", en: "" });

function emptyProfessor(): ProfessorPayload {
  return {
    Basic_Information: {
      academicPosition: blankBilingual(),
      firstName: blankBilingual(),
      middleName: blankBilingual(),
      lastName: blankBilingual(),
      photo: blankBilingual(),
      dateOfBirth: blankBilingual(),
      placeOfBirth: blankBilingual(),
      officeAddress: blankBilingual(),
      officeNumber: blankBilingual(),
      administrativeFunction: blankBilingual(),
    },
    Education: {
      university: blankBilingual(),
      major: blankBilingual(),
      academicDegrees: [],
      academicTitles: [],
      fieldsOfHigherEducation: [],
      professionalFields: [],
      researchInterests: [],
    },
    Teaching_Activity: { bachelorsCourses: [], mastersCourses: [], phdCourses: [] },
    Foreign_Languages: [],
    Work_Experience: [],
    Professional_Competences: {
      programmingLanguages: [],
      technologies: [],
      platforms: [],
      frameworks: [],
      databases: [],
      otherTechnicalSkills: [],
    },
    Membership_in_Organizations: [],
    Participation_in_Research_Projects: [],
    Publications: {
      summaryIndicators: {
        numberOfScientificArticles: 0,
        numberOfInternationalReports: 0,
        numberOfNationalReports: 0,
      },
      booksAndTextbooks: [],
      selectedScientificPublications: [],
    },
    Citations: {
      citationsByForeignAuthors: 0,
      citationsByBulgarianAuthors: 0,
      totalCitations: 0,
    },
    Achievements: {
      scientificAchievements: [],
      professionalAchievements: [],
      awardsAndHonors: [],
      reviewerActivity: [],
      editorialBoardMemberships: [],
      certificates: [],
    },
    Contact_Information: {
      phoneNumbers: [],
      emails: [],
      personalWebsite: blankBilingual(),
      researchNetworkProfiles: [],
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeDefaults(defaults: unknown, existing: unknown): unknown {
  if (Array.isArray(defaults)) return Array.isArray(existing) ? existing : defaults;
  if (isRecord(defaults)) {
    const source = isRecord(existing) ? existing : {};
    return Object.fromEntries(
      Object.entries(defaults).map(([key, defaultValue]) => [key, mergeDefaults(defaultValue, source[key])]),
    );
  }
  return existing === undefined || existing === null ? defaults : existing;
}

function getAtPath(source: unknown, path: PathPart[]): unknown {
  let value = source;
  for (const part of path) {
    if (Array.isArray(value) && typeof part === "number") value = value[part];
    else if (isRecord(value)) value = value[String(part)];
    else return undefined;
  }
  return value;
}

function setAtPath(source: ProfessorPayload, path: PathPart[], value: unknown): ProfessorPayload {
  const updateAt = (current: unknown, index: number): unknown => {
    if (index === path.length) return value;
    const part = path[index];
    if (Array.isArray(current) && typeof part === "number") {
      const copy = current.slice();
      copy[part] = updateAt(copy[part], index + 1);
      return copy;
    }
    const record = isRecord(current) ? current : {};
    const key = String(part);
    return { ...record, [key]: updateAt(record[key], index + 1) };
  };
  return updateAt(source, 0) as ProfessorPayload;
}

function splitList(value: string): string[] {
  return value.split(/[\n,]/).map((part) => part.trim()).filter(Boolean);
}

export function ProfessorFormPage({ mode, embedded = false }: { mode: "create" | "edit"; embedded?: boolean }) {
  const { t } = useLanguage();
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState<ProfessorPayload>(() => emptyProfessor());
  const pendingValues = useRef(values);
  const [structureRevision, setStructureRevision] = useState(0);
  const accountEmail = useRef("");
  const accountPassword = useRef("");
  const [loading, setLoading] = useState(mode === "edit");
  const [loaded, setLoaded] = useState(mode === "create");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== "edit") return;
    if (!id) {
      setError(t("teachers.notFound"));
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoaded(false);
    let cancelled = false;
    fetchProfessor(id)
      .then((professor) => {
        if (!cancelled) {
          const merged = mergeDefaults(emptyProfessor(), professor) as ProfessorPayload;
          pendingValues.current = merged;
          setValues(merged);
          setLoaded(true);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError(t("teachers.notFound"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id, mode, t]);

  const update = (path: PathPart[], value: unknown) => {
    const next = setAtPath(pendingValues.current, path, value);
    pendingValues.current = next;
    setValues(next);
    setStructureRevision((revision) => revision + 1);
  };

  const textField = (
    path: PathPart[],
    label: string,
    options: { multiline?: boolean; rows?: number; type?: string } = {},
  ) => (
    <TextField
      label={label}
      fullWidth
      type={options.type ?? "text"}
      multiline={options.multiline}
      rows={options.rows}
      defaultValue={String(getAtPath(values, path) ?? "")}
      onChange={(event) => {
        const nextValue = options.type === "number" ? Number(event.target.value) : event.target.value;
        pendingValues.current = setAtPath(pendingValues.current, path, nextValue);
      }}
      slotProps={options.multiline ? { inputLabel: { shrink: true } } : undefined}
    />
  );

  const bilingualFields = (path: PathPart[], label: string) => (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{label}</Typography>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>{textField([...path, "bg"], `${label} (BG)`)}</Grid>
        <Grid size={{ xs: 12, sm: 6 }}>{textField([...path, "en"], `${label} (EN)`)}</Grid>
      </Grid>
    </Box>
  );

  const bilingualArray = (path: PathPart[], title: string) => {
    const items = getAtPath(values, path);
    const rows = Array.isArray(items) ? items : [];
    return (
      <Accordion key={path.join(".")} disableGutters>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontWeight: 600 }}>{title} ({rows.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            {rows.map((_, index) => (
              <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    aria-label={t("common.remove")}
                    onClick={() => {
                      const latestRows = getAtPath(pendingValues.current, path);
                      if (Array.isArray(latestRows)) update(path, latestRows.filter((_, rowIndex) => rowIndex !== index));
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                </Stack>
                {bilingualFields([...path, index], `${title} ${index + 1}`)}
              </Paper>
            ))}
            <Button
              startIcon={<Add />}
              onClick={() => {
                const latestRows = getAtPath(pendingValues.current, path);
                update(path, [...(Array.isArray(latestRows) ? latestRows : []), blankBilingual()]);
              }}
              sx={{ alignSelf: "flex-start" }}
            >
              {t("common.add")}
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  };

  const stringArray = (path: PathPart[], title: string) => {
    const valuesAtPath = getAtPath(values, path);
    const current = Array.isArray(valuesAtPath) ? valuesAtPath as string[] : [];
    return (
      <TextField
        label={title}
        fullWidth
        multiline
        rows={3}
        helperText={t("admin.listInputHint")}
        defaultValue={current.join("\n")}
        onChange={(event) => {
          pendingValues.current = setAtPath(pendingValues.current, path, splitList(event.target.value));
        }}
        slotProps={{ inputLabel: { shrink: true } }}
      />
    );
  };

  const objectArray = (
    path: PathPart[],
    title: string,
    fields: ObjectField[],
    createRow: () => Record<string, unknown>,
  ) => {
    const itemsAtPath = getAtPath(values, path);
    const rows = Array.isArray(itemsAtPath) ? itemsAtPath : [];
    return (
      <Accordion key={path.join(".")} disableGutters>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontWeight: 600 }}>{title} ({rows.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            {rows.map((_, index) => (
              <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{title} {index + 1}</Typography>
                  <IconButton
                    aria-label={t("common.remove")}
                    onClick={() => {
                      const latestRows = getAtPath(pendingValues.current, path);
                      if (Array.isArray(latestRows)) update(path, latestRows.filter((_, rowIndex) => rowIndex !== index));
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                </Stack>
                <Stack spacing={2}>
                  {fields.map((field) => {
                    const fieldPath = [...path, index, ...field.path.split(".")];
                    if (field.kind === "stringList") return <Box key={field.path}>{stringArray(fieldPath, field.label)}</Box>;
                    if (field.kind === "bilingual") return <Box key={field.path}>{bilingualFields(fieldPath, field.label)}</Box>;
                    return <Box key={field.path}>{textField(fieldPath, field.label)}</Box>;
                  })}
                </Stack>
              </Paper>
            ))}
            <Button
              startIcon={<Add />}
              onClick={() => {
                const latestRows = getAtPath(pendingValues.current, path);
                update(path, [...(Array.isArray(latestRows) ? latestRows : []), createRow()]);
              }}
              sx={{ alignSelf: "flex-start" }}
            >
              {t("common.add")}
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  };

  const section = (title: string, children: ReactNode, expanded = false) => (
    <Accordion defaultExpanded={expanded} disableGutters>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails><Stack spacing={2.5}>{children}</Stack></AccordionDetails>
    </Accordion>
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user?.jwt) {
      setError(t("account.loginRequired"));
      return;
    }
    if (mode === "edit" && !id) {
      setError(t("teachers.notFound"));
      return;
    }
    const draft = pendingValues.current;
    setSaving(true);
    setError(null);
    try {
      let saved: Professor;
      if (mode === "create") {
        const payload = structuredClone(draft);
        const currentEmails = payload.Contact_Information?.emails ?? [];
        payload.Contact_Information = {
          ...payload.Contact_Information,
          emails: [...new Set([...currentEmails, accountEmail.current.trim()])],
        };
        saved = await createProfessor(user.jwt, {
          ...payload,
          professorLoginAccount: {
            email: accountEmail.current.trim(),
            password: accountPassword.current,
          },
        });
      } else {
        saved = await updateProfessor(user.jwt, id!, draft);
      }
      navigate(`/teachers/${saved._id}`);
    } catch {
      setError(mode === "create" ? t("admin.createTeacherError") : t("admin.updateTeacherError"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Stack sx={{ py: 10, alignItems: "center" }}><CircularProgress color="primary" /></Stack>;
  }

  if (mode === "edit" && error && !loaded) {
    return <Container sx={{ py: 8 }}><Alert severity="error">{error}</Alert></Container>;
  }

  if (mode === "create" && user?.role !== "admin") {
    return <Container sx={{ py: 8 }}><Alert severity="warning">{t("admin.adminOnly")}</Alert></Container>;
  }

  const position = ["Basic_Information", "academicPosition"];
  const education = ["Education"];
  const competence = ["Professional_Competences"];
  const publications = ["Publications"];
  const contact = ["Contact_Information"];

  return (
    <AdminFormShell
      key={structureRevision}
      titleKey={mode === "create" ? "admin.createTeacher" : "admin.editTeacher"}
      subtitleKey="admin.teacherSubtitle"
      submitLabel={mode === "create" ? t("admin.submit") : t("account.save")}
      onSubmit={submit}
      submitDisabled={saving}
      embedded={embedded}
    >
      {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
      {saving && <Alert severity="info">{t("common.saving")}</Alert>}

      {section(t("teachers.section.basicInformation"), <>
        {bilingualFields([...position.slice(0, 1), "firstName"], t("admin.field.firstName"))}
        {bilingualFields([...position.slice(0, 1), "middleName"], t("admin.field.middleName"))}
        {bilingualFields([...position.slice(0, 1), "lastName"], t("admin.field.lastName"))}
        {bilingualFields(position, t("admin.field.position"))}
        {bilingualFields(["Basic_Information", "photo"], t("admin.field.photoUrl"))}
        {bilingualFields(["Basic_Information", "dateOfBirth"], t("admin.field.dateOfBirth"))}
        {bilingualFields(["Basic_Information", "placeOfBirth"], t("admin.field.placeOfBirth"))}
        {bilingualFields(["Basic_Information", "officeAddress"], t("admin.field.officeAddress"))}
        {bilingualFields(["Basic_Information", "officeNumber"], t("admin.field.officeRoom"))}
        {bilingualFields(["Basic_Information", "administrativeFunction"], t("admin.field.administrativeFunction"))}
      </>, true)}

      {mode === "create" && section(t("admin.teacherAccountTitle"), <>
        <TextField
          label={t("auth.email")}
          type="email"
          defaultValue={accountEmail.current}
          onChange={(event) => { accountEmail.current = event.target.value; }}
          autoComplete="username"
          fullWidth
        />
        <TextField
          label={t("auth.password")}
          type="password"
          defaultValue={accountPassword.current}
          onChange={(event) => { accountPassword.current = event.target.value; }}
          autoComplete="new-password"
          fullWidth
        />
      </>)}

      {section(t("teachers.section.education"), <>
        {bilingualFields([...education, "university"], t("admin.field.university"))}
        {bilingualFields([...education, "major"], t("admin.field.major"))}
        {objectArray([...education, "academicDegrees"], t("teachers.label.degrees"), [
          { path: "degree", label: t("teachers.field.degree"), kind: "bilingual" },
          { path: "dissertationTitle", label: t("teachers.field.dissertationTitle"), kind: "bilingual" },
          { path: "dateAcquired", label: t("teachers.field.dateAcquired"), kind: "bilingual" },
          { path: "scientificSpecialty", label: t("teachers.field.scientificSpecialty"), kind: "bilingual" },
        ], () => ({ degree: blankBilingual(), dissertationTitle: blankBilingual(), dateAcquired: blankBilingual(), scientificSpecialty: blankBilingual() }))}
        {objectArray([...education, "academicTitles"], t("teachers.label.titles"), [
          { path: "title", label: t("admin.field.title"), kind: "bilingual" },
          { path: "dateAcquired", label: t("teachers.field.dateAcquired"), kind: "bilingual" },
          { path: "scientificSpecialty", label: t("teachers.field.scientificSpecialty"), kind: "bilingual" },
        ], () => ({ title: blankBilingual(), dateAcquired: blankBilingual(), scientificSpecialty: blankBilingual() }))}
        {bilingualArray([...education, "fieldsOfHigherEducation"], t("teachers.field.fieldsOfHigherEducation"))}
        {bilingualArray([...education, "professionalFields"], t("teachers.field.professionalFields"))}
        {bilingualArray([...education, "researchInterests"], t("admin.field.researchInterests"))}
      </>)}

      {section(t("teachers.section.teaching"), <>
        {bilingualArray(["Teaching_Activity", "bachelorsCourses"], t("education.bachelor"))}
        {bilingualArray(["Teaching_Activity", "mastersCourses"], t("education.master"))}
        {bilingualArray(["Teaching_Activity", "phdCourses"], t("education.doctoral"))}
      </>)}

      {section(t("teachers.section.languages"), objectArray(["Foreign_Languages"], t("teachers.section.languages"), [
        { path: "languageName", label: t("teachers.field.languageName"), kind: "bilingual" },
        { path: "readingLevel", label: t("teachers.reading"), kind: "bilingual" },
        { path: "writingLevel", label: t("teachers.writing"), kind: "bilingual" },
        { path: "speakingLevel", label: t("teachers.speaking"), kind: "bilingual" },
      ], () => ({ languageName: blankBilingual(), readingLevel: blankBilingual(), writingLevel: blankBilingual(), speakingLevel: blankBilingual() })))}

      {section(t("teachers.section.workExperience"), objectArray(["Work_Experience"], t("teachers.section.workExperience"), [
        { path: "period.from", label: t("teachers.field.periodFrom"), kind: "bilingual" },
        { path: "period.to", label: t("teachers.field.periodTo"), kind: "bilingual" },
        { path: "organization", label: t("teachers.field.organization"), kind: "bilingual" },
        { path: "position", label: t("admin.field.position"), kind: "bilingual" },
        { path: "description", label: t("admin.field.content"), kind: "bilingual" },
      ], () => ({ period: { from: blankBilingual(), to: blankBilingual() }, organization: blankBilingual(), position: blankBilingual(), description: blankBilingual() })))}

      {section(t("teachers.section.competences"), <>
        {objectArray([...competence, "programmingLanguages"], t("teachers.comp.programmingLanguages"), [
          { path: "language", label: t("teachers.field.language"), kind: "bilingual" },
          { path: "proficiencyLevel", label: t("teachers.field.proficiencyLevel"), kind: "bilingual" },
        ], () => ({ language: blankBilingual(), proficiencyLevel: blankBilingual() }))}
        {bilingualArray([...competence, "technologies"], t("teachers.comp.technologies"))}
        {bilingualArray([...competence, "platforms"], t("teachers.comp.platforms"))}
        {bilingualArray([...competence, "frameworks"], t("teachers.comp.frameworks"))}
        {bilingualArray([...competence, "databases"], t("teachers.comp.databases"))}
        {bilingualArray([...competence, "otherTechnicalSkills"], t("teachers.comp.otherTechnicalSkills"))}
      </>)}

      {section(t("teachers.section.memberships"), objectArray(["Membership_in_Organizations"], t("teachers.section.memberships"), [
        { path: "organization", label: t("teachers.field.organization"), kind: "bilingual" },
        { path: "membershipType", label: t("teachers.field.membershipType"), kind: "bilingual" },
        { path: "period", label: t("admin.field.period"), kind: "bilingual" },
      ], () => ({ organization: blankBilingual(), membershipType: blankBilingual(), period: blankBilingual() })))}

      {section(t("teachers.section.projects"), objectArray(["Participation_in_Research_Projects"], t("teachers.section.projects"), [
        { path: "projectName", label: t("teachers.field.projectName"), kind: "bilingual" },
        { path: "period", label: t("admin.field.period"), kind: "bilingual" },
        { path: "fundingOrganization", label: t("research.funding"), kind: "bilingual" },
        { path: "contractNumber", label: t("teachers.field.contractNumber"), kind: "bilingual" },
        { path: "projectRole", label: t("teachers.field.projectRole"), kind: "bilingual" },
      ], () => ({ projectName: blankBilingual(), period: blankBilingual(), fundingOrganization: blankBilingual(), contractNumber: blankBilingual(), projectRole: blankBilingual() })))}

      {section(t("teachers.section.publications"), <>
        {textField([...publications, "summaryIndicators", "numberOfScientificArticles"], t("teachers.pub.articles"), { type: "number" })}
        {textField([...publications, "summaryIndicators", "numberOfInternationalReports"], t("teachers.pub.international"), { type: "number" })}
        {textField([...publications, "summaryIndicators", "numberOfNationalReports"], t("teachers.pub.national"), { type: "number" })}
        {objectArray([...publications, "booksAndTextbooks"], t("teachers.pub.books"), [
          { path: "authors", label: t("admin.field.articleAuthors"), kind: "stringList" },
          { path: "title", label: t("admin.field.title"), kind: "bilingual" },
          { path: "publisher", label: t("teachers.field.publisher"), kind: "bilingual" },
          { path: "isbn", label: "ISBN", kind: "bilingual" },
          { path: "year", label: t("teachers.field.year"), kind: "bilingual" },
          { path: "publicationType", label: t("teachers.field.publicationType"), kind: "bilingual" },
        ], () => ({ authors: [], title: blankBilingual(), publisher: blankBilingual(), isbn: blankBilingual(), year: blankBilingual(), publicationType: blankBilingual() }))}
        {objectArray([...publications, "selectedScientificPublications"], t("teachers.pub.selected"), [
          { path: "authors", label: t("admin.field.articleAuthors"), kind: "stringList" },
          { path: "title", label: t("admin.field.title"), kind: "bilingual" },
          { path: "publicationOrConference", label: t("teachers.field.publicationOrConference"), kind: "bilingual" },
          { path: "volume", label: t("research.volume"), kind: "bilingual" },
          { path: "issue", label: t("research.issue"), kind: "bilingual" },
          { path: "pages", label: t("research.pages"), kind: "bilingual" },
          { path: "year", label: t("teachers.field.year"), kind: "bilingual" },
          { path: "doi", label: t("research.doi"), kind: "bilingual" },
          { path: "url", label: t("research.openUrl"), kind: "bilingual" },
          { path: "pdfFile", label: t("research.pdf"), kind: "bilingual" },
        ], () => ({ authors: [], title: blankBilingual(), publicationOrConference: blankBilingual(), volume: blankBilingual(), issue: blankBilingual(), pages: blankBilingual(), year: blankBilingual(), doi: blankBilingual(), url: blankBilingual(), pdfFile: blankBilingual() }))}
      </>)}

      {section(t("teachers.section.citations"), <>
        {textField(["Citations", "citationsByForeignAuthors"], t("teachers.cit.foreign"), { type: "number" })}
        {textField(["Citations", "citationsByBulgarianAuthors"], t("teachers.cit.bulgarian"), { type: "number" })}
        {textField(["Citations", "totalCitations"], t("teachers.cit.total"), { type: "number" })}
      </>)}

      {section(t("teachers.section.achievements"), <>
        {bilingualArray(["Achievements", "scientificAchievements"], t("teachers.field.scientificAchievements"))}
        {bilingualArray(["Achievements", "professionalAchievements"], t("teachers.field.professionalAchievements"))}
        {bilingualArray(["Achievements", "awardsAndHonors"], t("teachers.field.awardsAndHonors"))}
        {bilingualArray(["Achievements", "reviewerActivity"], t("teachers.field.reviewerActivity"))}
        {bilingualArray(["Achievements", "editorialBoardMemberships"], t("teachers.field.editorialBoardMemberships"))}
        {bilingualArray(["Achievements", "certificates"], t("teachers.field.certificates"))}
      </>)}

      {section(t("teachers.section.contacts"), <>
        {stringArray([...contact, "phoneNumbers"], t("admin.field.phone"))}
        {stringArray([...contact, "emails"], t("admin.field.email"))}
        {bilingualFields([...contact, "personalWebsite"], t("admin.field.website"))}
        {stringArray([...contact, "researchNetworkProfiles"], t("teachers.field.researchProfiles"))}
      </>)}

    </AdminFormShell>
  );
}
