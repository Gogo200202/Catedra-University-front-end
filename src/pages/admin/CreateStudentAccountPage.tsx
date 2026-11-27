import { useState } from "react";
import { Alert, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { AdminFormShell } from "../components/AdminFormShell.tsx";
import { createAccount } from "../../api/authApi.ts";
import { useUser } from "../../context/useUser.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface StudentAccountValues {
  name: string;
  facultyNumber: string;
  password: string;
}

export function CreateStudentAccountPage({ embedded = false }: { embedded?: boolean }) {
  const { t } = useLanguage();
  const { user } = useUser();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { isSubmitting, errors: formErrors } } = useForm<StudentAccountValues>({
    defaultValues: { name: "", facultyNumber: "", password: "" },
  });

  if (user?.role !== "admin") {
    return <Container sx={{ py: 8 }}><Alert severity="warning">{t("admin.adminOnly")}</Alert></Container>;
  }

  return (
    <AdminFormShell
      titleKey="admin.createStudent"
      subtitleKey="admin.studentSubtitle"
      submitLabel={t("admin.createStudent")}
      submitDisabled={isSubmitting}
      embedded={embedded}
      onSubmit={handleSubmit(async (values) => {
        setSuccess(false);
        setError(null);
        if (!user?.jwt) {
          setError(t("account.loginRequired"));
          return;
        }
        try {
          await createAccount(user.jwt, {
            name: values.name.trim(),
            facultyNumber: values.facultyNumber.trim(),
            password: values.password,
            role: "student",
          });
          reset();
          setSuccess(true);
        } catch {
          setError(t("admin.studentCreateError"));
        }
      })}
    >
      {success && <Alert severity="success" onClose={() => setSuccess(false)}>{t("admin.studentCreated")}</Alert>}
      {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
      <TextField
        label={t("auth.fullName")}
        fullWidth
        required
        autoComplete="name"
        {...register("name", { required: true })}
      />
      <TextField
        label={t("auth.facultyNumber")}
        fullWidth
        required
        {...register("facultyNumber", { required: true })}
      />
      <TextField
        label={t("auth.password")}
        type="password"
        fullWidth
        required
        autoComplete="new-password"
        error={Boolean(formErrors.password)}
        helperText={formErrors.password?.type === "minLength" ? t("auth.passwordMinLength") : undefined}
        {...register("password", { required: true, minLength: 8 })}
      />
    </AdminFormShell>
  );
}
