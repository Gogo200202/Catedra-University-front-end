import { Box, Card, CardActionArea, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import { ArrowForward, CalendarMonth, PersonAdd } from "@mui/icons-material";
import { Link } from "react-router";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { useLanguage } from "../../i18n/useLanguage.ts";

const actions = [
  {
    labelKey: "admin.createTeacher",
    path: "/admin/teachers/create",
    icon: PersonAdd,
    color: "#0d3b66",
  },
  {
    labelKey: "admin.createEvent",
    path: "/admin/events/create",
    icon: CalendarMonth,
    color: "#6a1b9a",
  },
] as const;

export function AdminPanelPage() {
  const { t } = useLanguage();

  return (
    <Box>
      <PageHero titleKey="admin.panelTitle" subtitleKey="admin.panelSubtitle" />
      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {actions.map(({ labelKey, path, icon: Icon, color }) => (
            <Grid key={path} size={{ xs: 12, sm: 6 }}>
              <Card
                elevation={1}
                sx={{ height: "100%", borderTop: 4, borderColor: color }}
              >
                <CardActionArea
                  component={Link}
                  to={path}
                  sx={{ height: "100%" }}
                >
                  <CardContent>
                    <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: 999,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: color,
                          color: "common.white",
                        }}
                      >
                        <Icon />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
                        {t(labelKey)}
                      </Typography>
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", color: "secondary.main" }}>
                        <ArrowForward sx={{ fontSize: 18 }} />
                      </Stack>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
