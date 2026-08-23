import type { Lang } from "../i18n/translations.ts";

export interface CurriculumCourse {
  name: Record<Lang, string>;
  lecturesPerWeek: number;
  exercisesPerWeek: number;
  ects: number;
}

export interface CurriculumSemester {
  semester: number;
  courses: CurriculumCourse[];
}

export const kstBachelorCurriculum: CurriculumSemester[] = [
  {
    semester: 1,
    courses: [
      { name: { en: "Introduction to Programming", bg: "Въведение в програмирането" }, lecturesPerWeek: 3, exercisesPerWeek: 3, ects: 6 },
      { name: { en: "Discrete Structures", bg: "Дискретни структури" }, lecturesPerWeek: 3, exercisesPerWeek: 2, ects: 6 },
      { name: { en: "Digital Circuit Design", bg: "Проектиране на цифрови схеми" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Mathematics I", bg: "Математика I" }, lecturesPerWeek: 4, exercisesPerWeek: 3, ects: 7 },
      { name: { en: "Academic English", bg: "Академичен английски език" }, lecturesPerWeek: 0, exercisesPerWeek: 2, ects: 3 },
      { name: { en: "Sport", bg: "Спорт" }, lecturesPerWeek: 0, exercisesPerWeek: 2, ects: 2 },
    ],
  },
  {
    semester: 2,
    courses: [
      { name: { en: "Object-Oriented Programming", bg: "Обектно-ориентирано програмиране" }, lecturesPerWeek: 3, exercisesPerWeek: 3, ects: 6 },
      { name: { en: "Mathematics II", bg: "Математика II" }, lecturesPerWeek: 4, exercisesPerWeek: 3, ects: 7 },
      { name: { en: "Physics", bg: "Физика" }, lecturesPerWeek: 3, exercisesPerWeek: 1, ects: 5 },
      { name: { en: "Data Structures and Algorithms", bg: "Структури от данни и алгоритми" }, lecturesPerWeek: 3, exercisesPerWeek: 2, ects: 6 },
      { name: { en: "Probability and Statistics", bg: "Теория на вероятностите и статистика" }, lecturesPerWeek: 3, exercisesPerWeek: 2, ects: 5 },
    ],
  },
  {
    semester: 3,
    courses: [
      { name: { en: "Computer Architecture", bg: "Архитектура на компютърните системи" }, lecturesPerWeek: 3, exercisesPerWeek: 2, ects: 6 },
      { name: { en: "Operating Systems", bg: "Операционни системи" }, lecturesPerWeek: 3, exercisesPerWeek: 2, ects: 6 },
      { name: { en: "Databases", bg: "Бази от данни" }, lecturesPerWeek: 3, exercisesPerWeek: 2, ects: 6 },
      { name: { en: "Numerical Methods", bg: "Числени методи" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Economics and Engineering", bg: "Икономика и инженерство" }, lecturesPerWeek: 2, exercisesPerWeek: 0, ects: 4 },
    ],
  },
  {
    semester: 4,
    courses: [
      { name: { en: "Computer Networks", bg: "Компютърни мрежи" }, lecturesPerWeek: 3, exercisesPerWeek: 2, ects: 6 },
      { name: { en: "Software Engineering", bg: "Софтуерно инженерство" }, lecturesPerWeek: 3, exercisesPerWeek: 2, ects: 6 },
      { name: { en: "Web Technologies", bg: "Уеб технологии" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Microprocessor Systems", bg: "Микропроцесорни системи" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Elective Course 1", bg: "Избираема дисциплина 1" }, lecturesPerWeek: 2, exercisesPerWeek: 1, ects: 4 },
    ],
  },
  {
    semester: 5,
    courses: [
      { name: { en: "Artificial Intelligence", bg: "Изкуствен интелект" }, lecturesPerWeek: 3, exercisesPerWeek: 2, ects: 6 },
      { name: { en: "Mobile Application Development", bg: "Разработване на мобилни приложения" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Information Security", bg: "Сигурност на информацията" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Cloud Computing", bg: "Облачни изчисления" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Elective Course 2", bg: "Избираема дисциплина 2" }, lecturesPerWeek: 2, exercisesPerWeek: 1, ects: 4 },
    ],
  },
  {
    semester: 6,
    courses: [
      { name: { en: "Machine Learning", bg: "Машинно обучение" }, lecturesPerWeek: 3, exercisesPerWeek: 2, ects: 6 },
      { name: { en: "Distributed Systems", bg: "Разпределени системи" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Software Testing and Quality", bg: "Тестване и качество на софтуера" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Project Management in IT", bg: "Управление на ИТ проекти" }, lecturesPerWeek: 2, exercisesPerWeek: 1, ects: 4 },
      { name: { en: "Elective Course 3", bg: "Избираема дисциплина 3" }, lecturesPerWeek: 2, exercisesPerWeek: 1, ects: 4 },
    ],
  },
  {
    semester: 7,
    courses: [
      { name: { en: "Internet of Things", bg: "Интернет на нещата" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Big Data Technologies", bg: "Технологии за големи данни" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Cryptography and Network Security", bg: "Криптография и мрежова сигурност" }, lecturesPerWeek: 2, exercisesPerWeek: 2, ects: 5 },
      { name: { en: "Diploma Project — Design Phase", bg: "Дипломен проект — проектиране" }, lecturesPerWeek: 0, exercisesPerWeek: 4, ects: 8 },
      { name: { en: "Elective Course 4", bg: "Избираема дисциплина 4" }, lecturesPerWeek: 2, exercisesPerWeek: 1, ects: 4 },
    ],
  },
  {
    semester: 8,
    courses: [
      { name: { en: "Diploma Thesis", bg: "Дипломна работа" }, lecturesPerWeek: 0, exercisesPerWeek: 8, ects: 24 },
      { name: { en: "Professional Internship", bg: "Професионална практика" }, lecturesPerWeek: 0, exercisesPerWeek: 4, ects: 6 },
    ],
  },
];
