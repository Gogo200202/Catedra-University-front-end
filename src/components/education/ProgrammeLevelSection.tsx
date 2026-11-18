import { Box, Chip, Paper, Typography } from "@mui/material";
import { Link } from "react-router";
import { programmes } from "../../data/programmes.ts";
import type { ProgrammeLevel } from "../../data/programmes.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

export function ProgrammeLevelSection({ level }: { level: ProgrammeLevel }) {
  const { t, lang } = useLanguage();

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "1fr",
          md: programmes.filter((p) => p.level === level).length > 1 ? "repeat(2, 1fr)" : "1fr",
        },
      }}
    >
      {programmes
        .filter((programme) => programme.level === level)
        .map((programme) => (
          <Paper
            key={programme.id}
            elevation={2}
            component={Link}
            to={`/education/${level === "phd" ? "doctoral" : level}/${programme.id}`}
            sx={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background:
                  level === "bachelor"
                    ? "linear-gradient(135deg, #0d3b66, #2d7fc1)"
                    : level === "master"
                      ? "linear-gradient(135deg, #283593, #5c6bc0)"
                      : "linear-gradient(135deg, #00695c, #26a69a)",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ color: "common.white", fontWeight: 700 }}>
                {programme.abbreviation}
              </Typography>
              <Chip
                label={`${programme.semesters} ${t("education.semestersLabel")}`}
                size="small"
                variant="outlined"
                sx={{ color: "common.white", border: "1px solid rgba(255,255,255,0.7)" }}
              />
            </Box>
            <Box sx={{ p: 3, flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
                {programme.name[lang]}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {programme.description[lang]}
              </Typography>
            </Box>
          </Paper>
        ))}
    </Box>
  );
}
