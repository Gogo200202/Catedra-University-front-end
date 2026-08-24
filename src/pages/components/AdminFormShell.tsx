import type { ReactNode } from "react";
import { Box, Button, Container, Paper, Stack } from "@mui/material";
import { PageHero } from "../../components/layout/PageHero.tsx";
import type { TranslationKey } from "../../i18n/translations.ts";

interface AdminFormShellProps {
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  submitLabel: string;
  onSubmit: () => void;
  children: ReactNode;
}

export function AdminFormShell({
  titleKey,
  subtitleKey,
  submitLabel,
  onSubmit,
  children,
}: AdminFormShellProps) {
  return (
    <Box>
      <PageHero titleKey={titleKey} subtitleKey={subtitleKey} />
      <Container sx={{ py: 6 }}>
        <Paper
          elevation={1}
          component="form"
          noValidate
          onSubmit={onSubmit}
          sx={{ p: { xs: 3, md: 5 }, maxWidth: 720, mx: "auto" }}
        >
          <Stack spacing={3}>
            {children}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ alignSelf: "flex-start" }}
            >
              {submitLabel}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
