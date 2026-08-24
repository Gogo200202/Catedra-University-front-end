import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";
import { useUser } from "../../context/useUser.ts";

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues {
  fullName: string;
  email: string;
  password: string;
}

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AuthDialog({ open, onClose }: AuthDialogProps) {
  const { t } = useLanguage();
  const { login, register: registerUser } = useUser();
  const [tab, setTab] = useState(0);

  const loginForm = useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
  });
  const registerForm = useForm<RegisterValues>({
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const handleClose = () => {
    onClose();
    setTab(0);
    loginForm.reset();
    registerForm.reset();
  };

  const fieldLabel = (key: TranslationKey) => t(key);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ pt: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, value: number) => setTab(value)}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label={t("auth.login")} />
          <Tab label={t("auth.register")} />
        </Tabs>

        {tab === 0 ? (
          <Stack
            component="form"
            spacing={2.5}
            noValidate
            onSubmit={loginForm.handleSubmit((values) => {
              login(values.email);
              handleClose();
            })}
          >
            <TextField
              type="email"
              label={fieldLabel("auth.email")}
              fullWidth
              required
              {...loginForm.register("email", { required: true })}
            />
            <TextField
              type="password"
              label={fieldLabel("auth.password")}
              fullWidth
              required
              autoComplete="current-password"
              {...loginForm.register("password", { required: true })}
            />
            <Button type="submit" variant="contained" color="primary" size="large">
              {t("auth.login")}
            </Button>
          </Stack>
        ) : (
          <Stack
            component="form"
            spacing={2.5}
            noValidate
            onSubmit={registerForm.handleSubmit((values) => {
              registerUser(values.fullName, values.email);
              handleClose();
            })}
          >
            <TextField
              label={fieldLabel("auth.fullName")}
              fullWidth
              required
              {...registerForm.register("fullName", { required: true })}
            />
            <TextField
              type="email"
              label={fieldLabel("auth.email")}
              fullWidth
              required
              {...registerForm.register("email", { required: true })}
            />
            <TextField
              type="password"
              label={fieldLabel("auth.password")}
              fullWidth
              required
              autoComplete="new-password"
              {...registerForm.register("password", { required: true })}
            />
            <Button type="submit" variant="contained" color="secondary" size="large">
              {t("auth.register")}
            </Button>
          </Stack>
        )}

        <Typography
          variant="caption"
          sx={{ display: "block", mt: 2.5, color: "text.secondary", textAlign: "center" }}
        >
          {t("auth.demoNote")}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
