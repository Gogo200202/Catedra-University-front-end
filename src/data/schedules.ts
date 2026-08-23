export type LessonType = "lecture" | "seminar" | "lab";

export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export interface ScheduleEntry {
  subjectName: string;
  hour: { start: string; end: string };
  location: { building: string; roomNumber: string };
  lecturer: string;
  type: LessonType;
}

export interface WeeklySchedule {
  scheduleName: string;
  semester: string;
  academicYear: string;
  days: Record<WeekDay, ScheduleEntry[]>;
}

export const kstWeeklySchedule: WeeklySchedule = {
  scheduleName: "Computer Systems and Technologies — 3rd semester",
  semester: "Winter semester",
  academicYear: "2025/2026",
  days: {
    monday: [
      {
        subjectName: "Operating Systems",
        hour: { start: "08:30", end: "10:10" },
        location: { building: "XI", roomNumber: "1104" },
        lecturer: "Assoc. Prof. Stoynev",
        type: "lecture",
      },
      {
        subjectName: "Operating Systems",
        hour: { start: "10:30", end: "12:10" },
        location: { building: "XI", roomNumber: "2108" },
        lecturer: "Chief Assist. Petkov",
        type: "lab",
      },
      {
        subjectName: "Databases",
        hour: { start: "13:00", end: "14:40" },
        location: { building: "XI", roomNumber: "1205" },
        lecturer: "Assoc. Prof. Dimitrova",
        type: "seminar",
      },
    ],
    tuesday: [
      {
        subjectName: "Computer Architecture",
        hour: { start: "08:30", end: "10:10" },
        location: { building: "XI", roomNumber: "1127" },
        lecturer: "Prof. Ivanov",
        type: "lecture",
      },
      {
        subjectName: "Web Technologies",
        hour: { start: "11:00", end: "12:40" },
        location: { building: "XI", roomNumber: "1310" },
        lecturer: "Chief Assist. Georgieva",
        type: "lab",
      },
    ],
    wednesday: [
      {
        subjectName: "Databases",
        hour: { start: "08:30", end: "10:10" },
        location: { building: "XI", roomNumber: "1112" },
        lecturer: "Assoc. Prof. Dimitrova",
        type: "lecture",
      },
      {
        subjectName: "Computer Architecture",
        hour: { start: "10:30", end: "12:10" },
        location: { building: "XI", roomNumber: "2110" },
        lecturer: "Assist. Kolev",
        type: "lab",
      },
      {
        subjectName: "Numerical Methods",
        hour: { start: "13:00", end: "14:40" },
        location: { building: "X", roomNumber: "1003" },
        lecturer: "Assist. Peneva",
        type: "seminar",
      },
    ],
    thursday: [
      {
        subjectName: "Software Engineering",
        hour: { start: "09:00", end: "10:40" },
        location: { building: "XI", roomNumber: "1205" },
        lecturer: "Assoc. Prof. Dimitrova",
        type: "lecture",
      },
      {
        subjectName: "Software Engineering",
        hour: { start: "11:00", end: "12:40" },
        location: { building: "XI", roomNumber: "1302" },
        lecturer: "Chief Assist. Petkov",
        type: "seminar",
      },
    ],
    friday: [
      {
        subjectName: "Numerical Methods",
        hour: { start: "08:30", end: "10:10" },
        location: { building: "X", roomNumber: "1010" },
        lecturer: "Chief Assist. Georgieva",
        type: "lecture",
      },
      {
        subjectName: "Academic English",
        hour: { start: "10:30", end: "12:10" },
        location: { building: "VII", roomNumber: "704" },
        lecturer: "Dept. of Language Training",
        type: "seminar",
      },
    ],
  },
};

export const weekDays: WeekDay[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];
