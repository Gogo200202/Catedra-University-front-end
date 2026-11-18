import { useState } from "react";
import { Alert, Box, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { PageHero } from "../../components/layout/PageHero.tsx";
import { AdminFormShell } from "../components/AdminFormShell.tsx";
import { useLanguage } from "../../i18n/useLanguage.ts";
import { useUser } from "../../context/useUser.ts";
import { DEFAULT_PHOTO_URL } from "../../context/UserContext.ts";
import { updateCurrentUser } from "../../api/authApi.ts";

interface AccountFormValues {
  name: string;
  email: string;
  photoUrl: string;
  password: string;
}

export function AccountPage() {
  const { t } = useLanguage();
  const { user, updateUser } = useUser();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<AccountFormValues>({
    values: user
      ? {
          name: user.name,
          email: user.email,
          photoUrl: user.photoUrl ?? "",
          password: "",
        }
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
      onSubmit={handleSubmit(async (values) => {
        setError(null);
        setSaved(false);
        try {
          const payload: { name: string; email: string; photoUrl?: string; password?: string } = {
            name: values.name,
            email: values.email,
          };
          if (values.photoUrl.trim()) {
            payload.photoUrl = values.photoUrl.trim();
          }
          if (values.password) {
            payload.password = values.password;
          }
          const res = await updateCurrentUser(user.jwt, payload);
          updateUser({
            name: res.name,
            email: res.email,
            photoUrl: res.photoUrl ?? DEFAULT_PHOTO_URL,
          });
          setSaved(true);
        } catch {
          setError(t("account.updateError"));
        }
      })}
    >
      {saved && (
        <Alert severity="success" onClose={() => setSaved(false)}>
          {t("account.saved")}
        </Alert>
      )}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
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
      <TextField
        label={t("account.newPassword")}
        type="password"
        fullWidth
        autoComplete="new-password"
        helperText={t("account.passwordHint")}
        {...register("password")}
      />
    </AdminFormShell>
  );
}
