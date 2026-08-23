import { Avatar, Box, Container, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import { AccountBalance, Search } from "@mui/icons-material";
import { Link } from "react-router";
import { useLanguage } from "../../i18n/useLanguage.ts";

export function Header() {
  const { t } = useLanguage();

  return (
    <Box sx={{ bgcolor: "background.paper", py: 3 }}>
      <Container sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          variant="square"
          sx={{ width: 64, height: 64, bgcolor: "primary.main", borderRadius: 1 }}
        >
          <AccountBalance sx={{ fontSize: 40 }} />
        </Avatar>

        <Stack sx={{ flexGrow: 1 }}>
          <Typography
            variant="overline"
            sx={{ color: "text.secondary", lineHeight: 1.2 }}
          >
            {t("header.university")}
          </Typography>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              textDecoration: "none",
              lineHeight: 1.2,
            }}
          >
            {t("header.department")}
          </Typography>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            px: 1.5,
            py: 0.5,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 999,
          }}
        >
          <InputBase placeholder={t("header.search")} sx={{ width: 180, fontSize: 14 }} />
          <IconButton size="small" aria-label={t("header.search")}>
            <Search />
          </IconButton>
        </Paper>
      </Container>
    </Box>
  );
}
