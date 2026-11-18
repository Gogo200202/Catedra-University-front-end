import { Box, Container, Paper, Typography } from "@mui/material";
import { Article, Computer, MenuBook, Work } from "@mui/icons-material";
import { Link } from "react-router";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface SystemLink {
  labelKey: TranslationKey;
  Icon: typeof Computer;
  path: string;
}

const systemLinks: SystemLink[] = [
  { labelKey: "systems.umis", Icon: Computer, path: "/systems/umis" },
  { labelKey: "systems.epublishing", Icon: MenuBook, path: "/systems/e-publishing" },
  { labelKey: "systems.journal", Icon: Article, path: "/systems/journal" },
  { labelKey: "systems.career", Icon: Work, path: "/systems/career" },
];

export function SystemsLinks() {
  const { t } = useLanguage();

  return (
    <Container sx={{ mt: -4, position: "relative", zIndex: 1 }}>
      <Paper elevation={4} sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
          }}
        >
          {systemLinks.map(({ labelKey, Icon, path }, index) => (
            <Box
              key={labelKey}
              component={Link}
              to={path}
              sx={{
                px: 3,
                py: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
                borderLeft: {
                  xs: "none",
                  sm: index % 2 === 1 ? "1px solid" : "none",
                  md: index === 0 ? "none" : "1px solid",
                },
                borderTop: {
                  xs: index === 0 ? "none" : "1px solid",
                  sm: index > 1 ? "1px solid" : "none",
                  md: "none",
                },
                borderColor: "divider",
                color: "primary.main",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "action.hover",
                  "& .system-icon": { color: "secondary.main" },
                },
              }}
            >
              <Icon className="system-icon" sx={{ fontSize: 34 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t(labelKey)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}
