import { useState } from "react";
import { Alert, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { AdminFormShell } from "../components/AdminFormShell.tsx";
import { useLanguage } from "../../i18n/useLanguage.ts";
import { useUser } from "../../context/useUser.ts";
import { createNewsIssue } from "../../api/newsApi.ts";

interface EventFormValues {
  newspaperNameBg: string;
  newspaperNameEn: string;
  articleTitleBg: string;
  articleTitleEn: string;
  articleDescriptionBg: string;
  articleDescriptionEn: string;
  articleAuthors: string;
  imageUrl: string;
}

export function CreateEventPage() {
  const { t } = useLanguage();
  const { user } = useUser();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<EventFormValues>({
    defaultValues: {
      newspaperNameBg: "",
      newspaperNameEn: "",
      articleTitleBg: "",
      articleTitleEn: "",
      articleDescriptionBg: "",
      articleDescriptionEn: "",
      articleAuthors: "",
      imageUrl: "",
    },
  });

  return (
    <AdminFormShell
      titleKey="admin.createEvent"
      subtitleKey="admin.eventSubtitle"
      submitLabel={t("admin.submit")}
      onSubmit={handleSubmit(async (values) => {
        if (!user?.jwt) {
          setError(t("auth.loginError"));
          return;
        }
        setError(null);
        setSaved(false);
        try {
          await createNewsIssue(user.jwt, {
            newspaperName: {
              bg: values.newspaperNameBg,
              en: values.newspaperNameEn,
            },
            articles: [
              {
                title: {
                  bg: values.articleTitleBg,
                  en: values.articleTitleEn,
                },
                description: {
                  bg: values.articleDescriptionBg,
                  en: values.articleDescriptionEn,
                },
                imageUrl: values.imageUrl || "",
                authors: values.articleAuthors
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              },
            ],
          });
          setSaved(true);
          reset();
        } catch {
          setError(t("account.updateError"));
        }
      })}
    >
      {saved && (
        <Alert severity="success" onClose={() => setSaved(false)}>
          {t("admin.eventCreated")}
        </Alert>
      )}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TextField
        label={t("admin.field.newspaperNameBg")}
        fullWidth
        required
        {...register("newspaperNameBg", { required: true })}
      />
      <TextField
        label={t("admin.field.newspaperNameEn")}
        fullWidth
        required
        {...register("newspaperNameEn", { required: true })}
      />
      <TextField
        label={t("admin.field.articleTitleBg")}
        fullWidth
        required
        {...register("articleTitleBg", { required: true })}
      />
      <TextField
        label={t("admin.field.articleTitleEn")}
        fullWidth
        required
        {...register("articleTitleEn", { required: true })}
      />
      <TextField
        label={t("admin.field.articleDescriptionBg")}
        fullWidth
        required
        multiline
        rows={4}
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("articleDescriptionBg", { required: true })}
      />
      <TextField
        label={t("admin.field.articleDescriptionEn")}
        fullWidth
        required
        multiline
        rows={4}
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("articleDescriptionEn", { required: true })}
      />
      <TextField
        label={t("admin.field.articleAuthors")}
        fullWidth
        {...register("articleAuthors")}
      />
      <TextField
        label={t("account.photoUrl")}
        fullWidth
        {...register("imageUrl")}
      />
    </AdminFormShell>
  );
}
