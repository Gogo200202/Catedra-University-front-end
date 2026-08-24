import { useState } from "react";
import { Alert, Box, Chip, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { AdminFormShell } from "../components/AdminFormShell.tsx";
import { useLanguage } from "../../i18n/useLanguage.ts";
import { useUser } from "../../context/useUser.ts";

interface AccountFormValues {
  name: string;
  email: string;
  photoUrl: string;
}

export function AccountPage() {
  const { t } = useLanguage();
  const { user, updateUser } = useUser();
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit } = useForm<AccountFormValues>({
    values: user
      ? { name: user.name, email: user.email, photoUrl: user.photoUrl ?? "" }
      : undefined,
  });

  if (!user) {
    return (
      <Box>
        <PageHero titleKey="auth.accountDetails" subtitleKey="account.pageSubtitle" />
        <Container sx={{ py: 6 }}>
          <Alert severity="warning" sx={{ maxWidth: 720, mx: "auto" }}>
            {t("account.loginRequired")}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <AdminFormShell
      titleKey="auth.accountDetails"
      subtitleKey="account.pageSubtitle"
      submitLabel={t("account.save")}
      onSubmit={handleSubmit((values) => {
        updateUser({
          name: values.name,
          email: values.email,
          photoUrl: values.photoUrl.trim() || null,
        });
        setSaved(true);
      })}
    >
      {saved && (
        <Alert severity="success" onClose={() => setSaved(false)}>
          {t("account.saved")}
        </Alert>
      )}
      <TextField
        label={t("auth.fullName")}
        fullWidth
        required
        {...register("name", { required: true })}
      />
      <TextField
        label={t("auth.email")}
        type="email"
        fullWidth
        required
        {...register("email", { required: true })}
      />
      <TextField label={t("account.photoUrl")} fullWidth {...register("photoUrl")} />
      <Chip
        label={`${t("account.role")}: ${user.role}`}
        sx={{ alignSelf: "flex-start", bgcolor: "primary.main", color: "common.white" }}
      />
    </AdminFormShell>
  );
}
