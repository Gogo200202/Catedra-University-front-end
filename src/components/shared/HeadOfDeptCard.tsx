import { Avatar, Divider, Paper, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface HeadOfDeptCardProps {
  showQuote?: boolean;
}

export function HeadOfDeptCard({ showQuote = true }: HeadOfDeptCardProps) {
  const { t } = useLanguage();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: "center",
        borderTop: 4,
        borderColor: "secondary.main",
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ width: 110, height: 110, mx: "auto", mb: 2, bgcolor: "primary.light" }}>
        <Person sx={{ fontSize: 64 }} />
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
        {t("welcome.headName")}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "secondary.main" }}>
        {t("welcome.headRole")}
      </Typography>
      <Divider sx={{ my: 2 }} />
      {showQuote && (
        <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
          {t("welcome.headQuote")}
        </Typography>
      )}
    </Paper>
  );
}
