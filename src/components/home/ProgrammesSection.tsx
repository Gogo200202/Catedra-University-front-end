import { Box, CardActionArea, Container, Stack, Typography } from "@mui/material";
import { ArrowForward, Engineering, School, Science } from "@mui/icons-material";
import { Link } from "react-router";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface Programme {
  titleKey: TranslationKey;
  descKey: TranslationKey;
  gradient: string;
  Icon: typeof School;
  path: string;
}

const programmes: Programme[] = [
  {
    titleKey: "education.bachelor",
    descKey: "programmes.bachelor.desc",
    gradient: "linear-gradient(135deg, #0d3b66, #2d7fc1)",
    Icon: School,
    path: "/education/bachelor",
  },
  {
    titleKey: "education.master",
    descKey: "programmes.master.desc",
    gradient: "linear-gradient(135deg, #283593, #5c6bc0)",
    Icon: Engineering,
    path: "/education/master",
  },
  {
    titleKey: "education.doctoral",
    descKey: "programmes.doctoral.desc",
    gradient: "linear-gradient(135deg, #00695c, #26a69a)",
    Icon: Science,
    path: "/education/doctoral",
  },
];

export function ProgrammesSection() {
  const { t } = useLanguage();

  return (
    <Container sx={{ py: 7 }}>
      <Stack spacing={0.75} sx={{ alignItems: "center", textAlign: "center", mb: 4 }}>
        <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700 }}>
          {t("programmes.overline")}
        </Typography>
        <Typography variant="h4" component="h2" sx={{ color: "primary.main", fontWeight: 700 }}>
          {t("programmes.title")}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", maxWidth: 620 }}>
          {t("programmes.subtitle")}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        }}
      >
        {programmes.map(({ titleKey, descKey, gradient, Icon, path }) => (
          <Box
            key={titleKey}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "background.paper",
              boxShadow: 1,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
          >
            <CardActionArea component={Link} to={path} sx={{ height: "100%" }}>
              <Box
                sx={{
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: gradient,
                }}
              >
                <Icon sx={{ fontSize: 64, color: "rgba(255,255,255,0.92)" }} />
              </Box>
              <Box sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
                  {t(titleKey)}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                  {t(descKey)}
                </Typography>
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{
                    mt: 1.5,
                    alignItems: "center",
                    color: "secondary.main",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {t("programmes.viewMore")}
                  <ArrowForward fontSize="small" />
                </Stack>
              </Box>
            </CardActionArea>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
