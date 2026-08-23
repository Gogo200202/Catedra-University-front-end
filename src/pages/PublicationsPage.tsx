import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Container,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { PageHero } from "../components/layout/PageHero.tsx";
import { publications } from "../data/research.ts";
import { useLanguage } from "../i18n/useLanguage.ts";

export function PublicationsPage() {
  const { t } = useLanguage();
  const years = useMemo(
    () => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    [],
  );
  const [yearFilter, setYearFilter] = useState<number | "all">("all");

  const filtered =
    yearFilter === "all"
      ? publications
      : publications.filter((p) => p.year === yearFilter);

  return (
    <Box>
      <PageHero titleKey="research.selectedPublications" subtitleKey="pages.publicationsSubtitle" />
      <Container sx={{ py: 5, maxWidth: 980 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", rowGap: 1 }}>
          <Chip
            label={t("news.filterAll")}
            clickable
            color={yearFilter === "all" ? "primary" : "default"}
            variant={yearFilter === "all" ? "filled" : "outlined"}
            onClick={() => setYearFilter("all")}
          />
          {years.map((year) => (
            <Chip
              key={year}
              label={year}
              clickable
              color={yearFilter === year ? "primary" : "default"}
              variant={yearFilter === year ? "filled" : "outlined"}
              onClick={() => setYearFilter(year)}
            />
          ))}
        </Stack>

        <Paper elevation={1} sx={{ p: 0 }}>
          <List disablePadding>
            {filtered.map((publication, index) => (
              <ListItem
                key={publication.id}
                divider={index < filtered.length - 1}
                component="div"
                sx={{ py: 2.5, px: 3, display: "flex", gap: 2, alignItems: "flex-start" }}
              >
                <Chip
                  label={publication.year}
                  size="small"
                  sx={{ bgcolor: "primary.main", color: "common.white", fontWeight: 700, mt: 0.25 }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {publication.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {publication.authors}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.disabled", fontStyle: "italic" }}>
                    {publication.venue}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>

        {filtered.length === 0 && (
          <Typography sx={{ textAlign: "center", py: 5, color: "text.secondary" }}>—</Typography>
        )}
      </Container>
    </Box>
  );
}
