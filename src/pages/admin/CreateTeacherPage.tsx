import { Controller, useForm } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";
import { AdminFormShell } from "../components/AdminFormShell.tsx";
import { useLanguage } from "../../i18n/useLanguage.ts";

interface TeacherFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  officeRoom: string;
  bio: string;
}

const positions = [
  { value: "professor", labelKey: "positions.professor" },
  { value: "assocProfessor", labelKey: "positions.assocProfessor" },
  { value: "chiefAssistant", labelKey: "positions.chiefAssistant" },
  { value: "assistant", labelKey: "positions.assistant" },
] as const;

export function CreateTeacherPage() {
  const { t } = useLanguage();
  const { control, register, handleSubmit, reset } = useForm<TeacherFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      officeRoom: "",
      bio: "",
    },
  });

  return (
    <AdminFormShell
      titleKey="admin.createTeacher"
      subtitleKey="admin.teacherSubtitle"
      submitLabel={t("admin.submit")}
      onSubmit={handleSubmit((values) => {
        console.log("create teacher", values);
        reset();
      })}
    >
      <TextField
        label={t("admin.field.firstName")}
        fullWidth
        required
        {...register("firstName", { required: true })}
      />
      <TextField
        label={t("admin.field.lastName")}
        fullWidth
        required
        {...register("lastName", { required: true })}
      />
      <Controller
        name="position"
        control={control}
        render={({ field }) => (
          <TextField {...field} select fullWidth label={t("admin.field.position")}>
            <MenuItem value="" disabled>
              {t("admin.selectOption")}
            </MenuItem>
            {positions.map(({ value, labelKey }) => (
              <MenuItem key={value} value={value}>
                {t(labelKey)}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <TextField
        label={t("admin.field.email")}
        type="email"
        fullWidth
        required
        {...register("email", { required: true })}
      />
      <TextField label={t("admin.field.phone")} fullWidth {...register("phone")} />
      <TextField label={t("admin.field.officeRoom")} fullWidth {...register("officeRoom")} />
      <TextField
        label={t("admin.field.bio")}
        fullWidth
        multiline
        rows={4}
        {...register("bio")}
      />
    </AdminFormShell>
  );
}
