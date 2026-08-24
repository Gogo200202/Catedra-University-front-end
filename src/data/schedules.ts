import type { Lang } from "../i18n/translations.ts";

export type LessonType = "lecture" | "seminar" | "lab";

export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export type Season = "winter" | "summer";

export interface ScheduleEntry {
  subjectName: Record<Lang, string>;
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

export const weekDays: WeekDay[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

export const ACADEMIC_YEAR = "2025/2026";

interface SubjectDef {
  name: Record<Lang, string>;
  lecturer: string;
  type: LessonType;
}

const subjects: Record<string, SubjectDef> = {
  prog: {
    name: {
      en: "Introduction to Programming",
      bg: "Въведение в програмирането",
    },
    lecturer: "Chief Assist. Georgieva",
    type: "lab",
  },
  discr: {
    name: { en: "Discrete Structures", bg: "Дискретни структури" },
    lecturer: "Assist. Peneva",
    type: "seminar",
  },
  dcd: {
    name: { en: "Digital Circuit Design", bg: "Проектиране на цифрови схеми" },
    lecturer: "Chief Assist. Petkov",
    type: "lab",
  },
  math1: {
    name: { en: "Mathematics I", bg: "Математика I" },
    lecturer: "Assist. Peneva",
    type: "seminar",
  },
  eng: {
    name: { en: "Academic English", bg: "Академичен английски език" },
    lecturer: "Dept. of Language Training",
    type: "seminar",
  },
  oop: {
    name: {
      en: "Object-Oriented Programming",
      bg: "Обектно-ориентирано програмиране",
    },
    lecturer: "Assoc. Prof. Stoynev",
    type: "lecture",
  },
  math2: {
    name: { en: "Mathematics II", bg: "Математика II" },
    lecturer: "Assist. Peneva",
    type: "seminar",
  },
  phys: {
    name: { en: "Physics", bg: "Физика" },
    lecturer: "Dept. of Physics",
    type: "seminar",
  },
  dsa: {
    name: {
      en: "Data Structures and Algorithms",
      bg: "Структури от данни и алгоритми",
    },
    lecturer: "Assoc. Prof. Dimitrova",
    type: "lecture",
  },
  prob: {
    name: {
      en: "Probability and Statistics",
      bg: "Теория на вероятностите и статистика",
    },
    lecturer: "Assist. Peneva",
    type: "seminar",
  },
  arch: {
    name: {
      en: "Computer Architecture",
      bg: "Архитектура на компютърните системи",
    },
    lecturer: "Prof. Ivanov",
    type: "lecture",
  },
  os: {
    name: { en: "Operating Systems", bg: "Операционни системи" },
    lecturer: "Assoc. Prof. Stoynev",
    type: "lecture",
  },
  db: {
    name: { en: "Databases", bg: "Бази от данни" },
    lecturer: "Assoc. Prof. Dimitrova",
    type: "lecture",
  },
  nm: {
    name: { en: "Numerical Methods", bg: "Числени методи" },
    lecturer: "Assist. Peneva",
    type: "seminar",
  },
  se: {
    name: { en: "Software Engineering", bg: "Софтуерно инженерство" },
    lecturer: "Assoc. Prof. Dimitrova",
    type: "lecture",
  },
  web: {
    name: { en: "Web Technologies", bg: "Уеб технологии" },
    lecturer: "Chief Assist. Georgieva",
    type: "lab",
  },
  net: {
    name: { en: "Computer Networks", bg: "Компютърни мрежи" },
    lecturer: "Assoc. Prof. Hristov",
    type: "lecture",
  },
  sec: {
    name: { en: "Information Security", bg: "Сигурност на информацията" },
    lecturer: "Chief Assist. Todorov",
    type: "seminar",
  },
  mpu: {
    name: { en: "Microprocessor Systems", bg: "Микропроцесорни системи" },
    lecturer: "Chief Assist. Petkov",
    type: "lab",
  },
  ai: {
    name: { en: "Artificial Intelligence", bg: "Изкуствен интелект" },
    lecturer: "Prof. Ivanov",
    type: "lecture",
  },
  ml: {
    name: { en: "Machine Learning", bg: "Машинно обучение" },
    lecturer: "Assoc. Prof. Stoynev",
    type: "seminar",
  },
  crypto: {
    name: {
      en: "Cryptography and Network Security",
      bg: "Криптография и мрежова сигурност",
    },
    lecturer: "Chief Assist. Todorov",
    type: "lecture",
  },
  sig: {
    name: { en: "Signal Processing", bg: "Обработка на сигнали" },
    lecturer: "Assoc. Prof. Hristov",
    type: "seminar",
  },
  rf: {
    name: {
      en: "Radio Communication Systems",
      bg: "Радиокомуникационни системи",
    },
    lecturer: "Prof. Marinov",
    type: "lecture",
  },
  netdesign: {
    name: {
      en: "Design of Large-Scale Networks",
      bg: "Проектиране на мащабни мрежи",
    },
    lecturer: "Assoc. Prof. Hristov",
    type: "lecture",
  },
  ethhack: {
    name: { en: "Ethical Hacking", bg: "Етичен хакинг" },
    lecturer: "Chief Assist. Todorov",
    type: "lab",
  },
  secmgmt: {
    name: { en: "Security Management", bg: "Управление на сигурността" },
    lecturer: "Prof. Marinov",
    type: "seminar",
  },
  swarch: {
    name: {
      en: "Software Architecture and Design",
      bg: "Софтуерна архитектура и дизайн",
    },
    lecturer: "Prof. Ivanov",
    type: "lecture",
  },
  advdb: {
    name: { en: "Advanced Databases", bg: "Разширени бази от данни" },
    lecturer: "Assoc. Prof. Dimitrova",
    type: "seminar",
  },
  hci: {
    name: {
      en: "Human-Computer Interaction",
      bg: "Взаимодействие човек–компютър",
    },
    lecturer: "Chief Assist. Georgieva",
    type: "seminar",
  },
  rm: {
    name: {
      en: "Research Methods and Scientific Writing",
      bg: "Методи на изследването и научно писане",
    },
    lecturer: "Prof. Marinov",
    type: "seminar",
  },
  cloud: {
    name: {
      en: "Cloud Application Development",
      bg: "Разработване на облачни приложения",
    },
    lecturer: "Assoc. Prof. Stoynev",
    type: "lab",
  },
  dm: {
    name: {
      en: "Data Mining and Big Data Analytics",
      bg: "Извличане на данни и анализ на големи данни",
    },
    lecturer: "Prof. Ivanov",
    type: "lecture",
  },
  devops: {
    name: {
      en: "DevOps and Continuous Delivery",
      bg: "DevOps и непрекъснато доставяне",
    },
    lecturer: "Chief Assist. Todorov",
    type: "lab",
  },
  iot: {
    name: { en: "Internet of Things", bg: "Интернет на нещата" },
    lecturer: "Chief Assist. Petkov",
    type: "lab",
  },
};

const slots: Array<{ start: string; end: string }> = [
  { start: "08:30", end: "10:10" },
  { start: "10:30", end: "12:10" },
  { start: "13:00", end: "14:40" },
];

const lectureRooms = [
  { building: "XI", roomNumber: "1127" },
  { building: "XI", roomNumber: "1205" },
];
const labRooms = [
  { building: "XI", roomNumber: "2108" },
  { building: "XI", roomNumber: "1310" },
];

type DayPlan = Array<[subjectKey: string, slotIndex: number]>;

function buildSchedule(
  scheduleName: string,
  semesterLabel: string,
  plan: Partial<Record<WeekDay, DayPlan>>,
): WeeklySchedule {
  let roomCursor = 0;
  const days = {} as Record<WeekDay, ScheduleEntry[]>;

  for (const day of weekDays) {
    days[day] = (plan[day] ?? []).map(([key, slotIndex]) => {
      const def = subjects[key];
      roomCursor += 1;
      const rooms = def.type === "lecture" ? lectureRooms : labRooms;
      return {
        subjectName: def.name,
        hour: slots[slotIndex],
        location: rooms[roomCursor % rooms.length],
        lecturer: def.lecturer,
        type: def.type,
      };
    });
  }

  return {
    scheduleName,
    semester: semesterLabel,
    academicYear: ACADEMIC_YEAR,
    days,
  };
}

export interface SemesterSchedule {
  semester: number;
  season: Season;
  schedule: WeeklySchedule;
}

export interface ProgrammeSchedules {
  id: string;
  abbreviation: string;
  name: Record<Lang, string>;
  semesters: SemesterSchedule[];
}

function semester(
  abbreviation: string,
  num: number,
  season: Season,
  plan: Partial<Record<WeekDay, DayPlan>>,
): SemesterSchedule {
  return {
    semester: num,
    season,
    schedule: buildSchedule(
      `${abbreviation} — Semester ${num}`,
      season === "winter" ? "Winter semester" : "Summer semester",
      plan,
    ),
  };
}

const kstSemesters: SemesterSchedule[] = [
  semester("KST", 1, "winter", {
    monday: [
      ["prog", 0],
      ["prog", 1],
      ["math1", 2],
    ],
    tuesday: [
      ["discr", 0],
      ["dcd", 1],
    ],
    wednesday: [
      ["math1", 0],
      ["discr", 1],
      ["dcd", 2],
    ],
    thursday: [
      ["prog", 1],
      ["eng", 2],
    ],
    friday: [
      ["eng", 0],
      ["math1", 1],
    ],
  }),
  semester("KST", 2, "summer", {
    monday: [
      ["oop", 0],
      ["oop", 1],
      ["dsa", 2],
    ],
    tuesday: [
      ["math2", 0],
      ["phys", 1],
    ],
    wednesday: [
      ["dsa", 0],
      ["oop", 1],
      ["prob", 2],
    ],
    thursday: [
      ["phys", 1],
      ["math2", 2],
    ],
    friday: [
      ["prob", 0],
      ["eng", 1],
    ],
  }),
  semester("KST", 3, "winter", {
    monday: [
      ["os", 0],
      ["os", 1],
      ["db", 2],
    ],
    tuesday: [
      ["arch", 0],
      ["web", 1],
    ],
    wednesday: [
      ["db", 0],
      ["arch", 1],
      ["nm", 2],
    ],
    thursday: [
      ["se", 1],
      ["se", 2],
    ],
    friday: [
      ["nm", 0],
      ["eng", 1],
    ],
  }),
  semester("KST", 4, "winter", {
    monday: [
      ["ai", 0],
      ["ml", 2],
    ],
    tuesday: [
      ["sec", 0],
      ["mpu", 1],
      ["web", 2],
    ],
    wednesday: [
      ["ml", 0],
      ["ai", 1],
    ],
    thursday: [
      ["mpu", 0],
      ["sec", 2],
    ],
    friday: [
      ["iot", 1],
      ["ml", 2],
    ],
  }),
];

const ctcsSemesters: SemesterSchedule[] = [
  semester("CTCS", 1, "winter", {
    monday: [
      ["prog", 0],
      ["prog", 1],
      ["math1", 2],
    ],
    tuesday: [
      ["phys", 0],
      ["dcd", 1],
    ],
    wednesday: [
      ["discr", 0],
      ["dcd", 1],
      ["math1", 2],
    ],
    thursday: [
      ["sig", 1],
      ["eng", 2],
    ],
    friday: [
      ["eng", 0],
      ["discr", 1],
    ],
  }),
  semester("CTCS", 2, "summer", {
    monday: [
      ["net", 0],
      ["sig", 1],
      ["mpu", 2],
    ],
    tuesday: [
      ["rf", 0],
      ["crypto", 1],
    ],
    wednesday: [
      ["sig", 0],
      ["net", 2],
    ],
    thursday: [
      ["crypto", 0],
      ["mpu", 1],
    ],
    friday: [
      ["prob", 0],
      ["rf", 2],
    ],
  }),
  semester("CTCS", 3, "winter", {
    monday: [
      ["crypto", 0],
      ["net", 1],
      ["sec", 2],
    ],
    tuesday: [
      ["rf", 0],
      ["sig", 1],
    ],
    wednesday: [
      ["sec", 0],
      ["mpu", 2],
    ],
    thursday: [
      ["netdesign", 0],
      ["ethhack", 1],
    ],
    friday: [
      ["sig", 0],
      ["rf", 2],
    ],
  }),
];

const staSemesters: SemesterSchedule[] = [
  semester("STA", 1, "winter", {
    monday: [
      ["swarch", 0],
      ["advdb", 1],
    ],
    tuesday: [
      ["hci", 0],
      ["swarch", 2],
    ],
    wednesday: [
      ["rm", 0],
      ["advdb", 1],
    ],
    thursday: [
      ["cloud", 1],
      ["cloud", 2],
    ],
    friday: [
      ["hci", 0],
      ["dm", 1],
    ],
  }),
  semester("STA", 2, "summer", {
    monday: [
      ["dm", 0],
      ["devops", 1],
      ["iot", 2],
    ],
    tuesday: [
      ["devops", 0],
      ["swarch", 2],
    ],
    wednesday: [
      ["iot", 0],
      ["dm", 1],
    ],
    thursday: [
      ["cloud", 0],
      ["advdb", 2],
    ],
    friday: [
      ["rm", 1],
      ["devops", 2],
    ],
  }),
];

const cnsSemesters: SemesterSchedule[] = [
  semester("CNS", 1, "winter", {
    monday: [
      ["netdesign", 0],
      ["net", 1],
      ["crypto", 2],
    ],
    tuesday: [
      ["sec", 0],
      ["ethhack", 1],
    ],
    wednesday: [
      ["crypto", 0],
      ["netdesign", 1],
    ],
    thursday: [
      ["ethhack", 0],
      ["rf", 2],
    ],
    friday: [
      ["rm", 0],
      ["sig", 1],
    ],
  }),
  semester("CNS", 2, "summer", {
    monday: [
      ["secmgmt", 0],
      ["ethhack", 1],
      ["iot", 2],
    ],
    tuesday: [
      ["crypto", 0],
      ["netdesign", 2],
    ],
    wednesday: [
      ["net", 0],
      ["secmgmt", 1],
    ],
    thursday: [
      ["rf", 0],
      ["ethhack", 1],
    ],
    friday: [
      ["advdb", 0],
      ["iot", 1],
    ],
  }),
];

export const scheduleProgrammes: ProgrammeSchedules[] = [
  {
    id: "kst-ba",
    abbreviation: "KST",
    name: {
      en: "Computer Systems and Technologies",
      bg: "Компютърни системи и технологии",
    },
    semesters: kstSemesters,
  },
  {
    id: "ctcs-ba",
    abbreviation: "CTCS",
    name: {
      en: "Communication Technologies and Cybersecurity",
      bg: "Комуникационни технологии и киберсигурност",
    },
    semesters: ctcsSemesters,
  },
  {
    id: "sta-ma",
    abbreviation: "STA",
    name: {
      en: "Software Technologies and Applications",
      bg: "Софтуерни технологии и приложения",
    },
    semesters: staSemesters,
  },
  {
    id: "cns-ma",
    abbreviation: "CNS",
    name: {
      en: "Computer Networks and Security",
      bg: "Компютърни мрежи и сигурност",
    },
    semesters: cnsSemesters,
  },
];
