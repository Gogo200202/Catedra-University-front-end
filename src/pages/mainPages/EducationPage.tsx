import { Container, Typography } from "@mui/material";
import { useParams } from "react-router";
import { ProgrammesLevelPage } from "../components/ProgrammesLevelPage.tsx";
import { useLanguage } from "../../i18n/useLanguage.ts";

const levelPages = {
  bachelor: {
    level: "bachelor",
    titleKey: "education.bachelor",
    subtitleKey: "pages.bachelorSubtitle",
  },
  master: {
    level: "master",
    titleKey: "education.master",
    subtitleKey: "pages.masterSubtitle",
  },
  doctoral: {
    level: "phd",
    titleKey: "education.doctoral",
    subtitleKey: "pages.doctoralSubtitle",
  },
} as const;

export function EducationPage() {
  const { t } = useLanguage();
  const { level } = useParams();
  const config = level ? levelPages[level as keyof typeof levelPages] : undefined;

  if (!config) {
    return <Container sx={{ py: 8 }}><Typography sx={{ textAlign: "center" }}>{t("education.notFound")}</Typography></Container>;
  }

  return <ProgrammesLevelPage {...config} />;
}
