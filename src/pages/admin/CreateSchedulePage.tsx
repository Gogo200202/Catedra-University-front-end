import { Controller, useForm } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";
import { AdminFormShell } from "../components/AdminFormShell.tsx";
import { scheduleProgrammes } from "../../data/schedules.ts";
import type { Season } from "../../data/schedules.ts";
import type { TranslationKey } from "../../i18n/translations.ts";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface ScheduleFormValues {
  programme: string;
  semester: number;
  season: Season | "";
  academicYear: string;
}

const seasons: { value: Season; labelKey: TranslationKey }[] = [
  { value: "winter", labelKey: "schedules.winter" },
  { value: "summer", labelKey: "schedules.summer" },
];

export function CreateSchedulePage() {
  const { t, lang } = useLanguage();
  const { control, register, handleSubmit, reset } = useForm<ScheduleFormValues>({
    defaultValues: {
      programme: "",
      semester: 1,
      season: "",
      academicYear: "2025/2026",
    },
  });

  return (
    <AdminFormShell
      titleKey="admin.createSchedule"
      subtitleKey="admin.scheduleSubtitle"
      submitLabel={t("admin.submit")}
      onSubmit={handleSubmit((values) => {
        console.log("create schedule", values);
        reset();
      })}
    >
      <Controller
        name="programme"
        control={control}
        render={({ field }) => (
          <TextField {...field} select fullWidth required label={t("admin.field.programme")}>
            <MenuItem value="" disabled>
              {t("admin.selectOption")}
            </MenuItem>
            {scheduleProgrammes.map((programme) => (
              <MenuItem key={programme.id} value={programme.id}>
                {programme.name[lang]} ({programme.abbreviation})
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <TextField
        label={t("admin.field.semester")}
        type="number"
        fullWidth
        required
        slotProps={{ htmlInput: { min: 1, max: 10 } }}
        {...register("semester", { required: true, valueAsNumber: true })}
      />
      <Controller
        name="season"
        control={control}
        render={({ field }) => (
          <TextField {...field} select fullWidth required label={t("admin.field.season")}>
            <MenuItem value="" disabled>
              {t("admin.selectOption")}
            </MenuItem>
            {seasons.map(({ value, labelKey }) => (
              <MenuItem key={value} value={value}>
                {t(labelKey)}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <TextField
        label={t("admin.field.academicYear")}
        fullWidth
        required
        {...register("academicYear", { required: true })}
      />
    </AdminFormShell>
  );
}
