import { useState } from "react";
import type { FormEvent } from "react";
import { Alert, Button, Dialog, DialogContent, MenuItem, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../i18n/useLanguage.ts";
import { useUser } from "../../context/useUser.ts";
import type { UserRole } from "../../context/UserContext.ts";

interface LoginValues {
  role: UserRole;
  identifier: string;
  password: string;
}

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AuthDialog({ open, onClose }: AuthDialogProps) {
  const { t } = useLanguage();
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, getValues, reset, watch } = useForm<LoginValues>({
    defaultValues: { role: "student", identifier: "", password: "" },
  });
  const selectedRole = watch("role");

  const handleClose = () => {
    onClose();
    setError(null);
    setLoading(false);
    reset();
  };

  const submitLogin = async (values: LoginValues) => {
    setError(null);
    setLoading(true);
    try {
      await login(values.identifier.trim(), values.password, values.role);
      handleClose();
    } catch {
      setError(t("auth.loginError"));
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (selectedRole === "admin") {
      // Temporary admin access for the local frontend while admin auth is being implemented.
      event.preventDefault();
      void submitLogin(getValues());
      return;
    }
    void handleSubmit(submitLogin)(event);
  };

  const identifierLabel = selectedRole === "student"
    ? t("auth.facultyNumber")
    : selectedRole === "teacher"
      ? t("auth.email")
      : t("auth.adminUsername");

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ pt: 3 }}>
        <Stack component="form" spacing={2.5} noValidate onSubmit={handleFormSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField select label={t("auth.role")} fullWidth {...register("role")}>
            <MenuItem value="admin">{t("roles.admin")}</MenuItem>
            <MenuItem value="teacher">{t("roles.teacher")}</MenuItem>
            <MenuItem value="student">{t("roles.student")}</MenuItem>
          </TextField>
          <TextField
            type={selectedRole === "teacher" ? "email" : "text"}
            label={identifierLabel}
            fullWidth
            required={selectedRole !== "admin"}
            autoComplete="username"
            {...register("identifier", selectedRole === "admin" ? {} : { required: true })}
          />
          <TextField
            type="password"
            label={t("auth.password")}
            fullWidth
            required={selectedRole !== "admin"}
            autoComplete="current-password"
            {...register("password", selectedRole === "admin" ? {} : { required: true })}
          />
          <Button type="submit" variant="contained" color="primary" size="large" disabled={loading}>
            {t("auth.login")}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
