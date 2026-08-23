import { Box, Chip, Container, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { historyMilestones } from "../data/department.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

export function HistoryPage() {
  const { lang } = useLanguage();

  return (
    <Box>
      <PageHero titleKey="aboutUs.history" subtitleKey="pages.historySubtitle" />
      <Container sx={{ py: 6 }}>
        <Box sx={{ maxWidth: 760, mx: "auto", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: 39,
              top: 12,
              bottom: 12,
              width: 2,
              bgcolor: "divider",
              display: { xs: "none", sm: "block" },
            }}
          />
          <List disablePadding>
            {historyMilestones.map((milestone) => (
              <ListItem key={milestone.year} disableGutters sx={{ pb: 3 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1.5, sm: 3 }}
                  sx={{ width: "100%", alignItems: "flex-start" }}
                >
                  <Chip
                    label={milestone.year}
                    sx={{
                      bgcolor: "primary.main",
                      color: "common.white",
                      fontWeight: 700,
                      minWidth: 80,
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                  <Paper elevation={1} sx={{ p: 2.5, flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      {milestone.text[lang]}
                    </Typography>
                  </Paper>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
}
