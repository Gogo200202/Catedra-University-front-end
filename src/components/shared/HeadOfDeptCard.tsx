import { useEffect, useState } from "react";
import { Avatar, Chip, CircularProgress, Link as MuiLink, Paper, Stack, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { Link } from "react-router";
import { fetchProfessors } from "../../api/professorsApi.ts";
import type { BilingualText, Professor } from "../../api/professorsApi.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

function localized(value: BilingualText | undefined, lang: "bg" | "en"): string {
  return value?.[lang] || value?.en || value?.bg || "";
}

function isDepartmentHead(professor: Professor): boolean {
  const functionText = `${professor.Basic_Information?.administrativeFunction?.en ?? ""} ${professor.Basic_Information?.administrativeFunction?.bg ?? ""}`.toLocaleLowerCase();
  return functionText.includes("head") || functionText.includes("ръководител");
}

function isProfessor(professor: Professor): boolean {
  const position = `${professor.Basic_Information?.academicPosition?.en ?? ""} ${professor.Basic_Information?.academicPosition?.bg ?? ""}`.toLocaleLowerCase();
  return position.includes("professor") || position.includes("професор");
}

export function HeadOfDeptCard() {
  const { t, lang } = useLanguage();
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const loadHead = async () => {
      try {
        const firstPage = await fetchProfessors({ page: 1, limit: 10 });
        const allProfessors = [...firstPage.data];
        for (let page = 2; page <= firstPage.pagination.pages; page += 1) {
          const response = await fetchProfessors({ page, limit: 10 });
          allProfessors.push(...response.data);
        }
        const selected = allProfessors.find(isDepartmentHead) ?? allProfessors.find(isProfessor) ?? null;
        if (!cancelled) setProfessor(selected);
      } catch {
        if (!cancelled) setProfessor(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void loadHead();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 4, display: "grid", placeItems: "center", minHeight: 220 }}>
        <CircularProgress size={28} />
      </Paper>
    );
  }
  if (!professor) return null;

  const basic = professor.Basic_Information ?? {};
  const name = [basic.firstName, basic.middleName, basic.lastName]
    .map((value) => localized(value, lang))
    .filter(Boolean)
    .join(" ");
  const photo = localized(basic.photo, lang);
  const interests = (professor.Education?.researchInterests ?? [])
    .map((interest) => localized(interest, lang))
    .filter(Boolean);
  const university = localized(professor.Education?.university, lang);
  const major = localized(professor.Education?.major, lang);

  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderTop: 4, borderColor: "secondary.main", borderRadius: 2 }}>
      <Avatar src={photo || undefined} alt={name} sx={{ width: 110, height: 110, mx: "auto", mb: 2, bgcolor: "primary.light" }}>
        {!photo && <Person sx={{ fontSize: 64 }} />}
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
        {name || "—"}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "secondary.main" }}>
        {localized(basic.administrativeFunction, lang) || t("aboutUs.headOfDept")}
      </Typography>
      {(university || major) && (
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          {[university, major].filter(Boolean).join(" — ")}
        </Typography>
      )}
      {interests.length > 0 && (
        <Stack direction="row" spacing={0.75} sx={{ justifyContent: "center", flexWrap: "wrap", rowGap: 0.75, mt: 1.5 }}>
          {interests.slice(0, 3).map((interest, index) => <Chip key={`${index}-${interest}`} label={interest} size="small" variant="outlined" />)}
        </Stack>
      )}
      <MuiLink component={Link} to={`/teachers/${professor._id}`} underline="hover" sx={{ display: "inline-block", mt: 2 }}>
        {t("common.readMore")}
      </MuiLink>
    </Paper>
  );
}
