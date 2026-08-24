import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { AdminFormShell } from "../components/AdminFormShell.tsx";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface EventFormValues {
  title: string;
  date: string;
  location: string;
  shortDescription: string;
  content: string;
}

export function CreateEventPage() {
  const { t } = useLanguage();
  const { register, handleSubmit, reset } = useForm<EventFormValues>({
    defaultValues: {
      title: "",
      date: "",
      location: "",
      shortDescription: "",
      content: "",
    },
  });

  return (
    <AdminFormShell
      titleKey="admin.createEvent"
      subtitleKey="admin.eventSubtitle"
      submitLabel={t("admin.submit")}
      onSubmit={handleSubmit((values) => {
        console.log("create event", values);
        reset();
      })}
    >
      <TextField
        label={t("admin.field.title")}
        fullWidth
        required
        {...register("title", { required: true })}
      />
      <TextField
        label={t("admin.field.date")}
        type="date"
        fullWidth
        required
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("date", { required: true })}
      />
      <TextField label={t("admin.field.location")} fullWidth {...register("location")} />
      <TextField
        label={t("admin.field.shortDescription")}
        fullWidth
        multiline
        rows={2}
        {...register("shortDescription")}
      />
      <TextField
        label={t("admin.field.content")}
        fullWidth
        multiline
        rows={6}
        {...register("content")}
      />
    </AdminFormShell>
  );
}
