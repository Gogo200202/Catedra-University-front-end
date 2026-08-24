import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout.tsx";

const HomePage = lazy(() =>
  import("./pages/HomePage.tsx").then((m) => ({ default: m.HomePage })),
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage.tsx").then((m) => ({ default: m.AboutPage })),
);
const HeadOfDepartmentPage = lazy(() =>
  import("./pages/HeadOfDepartmentPage.tsx").then((m) => ({
    default: m.HeadOfDepartmentPage,
  })),
);
const AccreditationPage = lazy(() =>
  import("./pages/AccreditationPage.tsx").then((m) => ({
    default: m.AccreditationPage,
  })),
);
const HistoryPage = lazy(() =>
  import("./pages/HistoryPage.tsx").then((m) => ({ default: m.HistoryPage })),
);
const TeachersPage = lazy(() =>
  import("./pages/TeachersPage.tsx").then((m) => ({ default: m.TeachersPage })),
);
const BachelorProgrammesPage = lazy(() =>
  import("./pages/BachelorProgrammesPage.tsx").then((m) => ({
    default: m.BachelorProgrammesPage,
  })),
);
const MasterProgrammesPage = lazy(() =>
  import("./pages/MasterProgrammesPage.tsx").then((m) => ({
    default: m.MasterProgrammesPage,
  })),
);
const DoctoralProgrammesPage = lazy(() =>
  import("./pages/DoctoralProgrammesPage.tsx").then((m) => ({
    default: m.DoctoralProgrammesPage,
  })),
);
const CurriculaPage = lazy(() =>
  import("./pages/CurriculaPage.tsx").then((m) => ({ default: m.CurriculaPage })),
);
const SchedulesPage = lazy(() =>
  import("./pages/SchedulesPage.tsx").then((m) => ({ default: m.SchedulesPage })),
);
const ProjectsPage = lazy(() =>
  import("./pages/ProjectsPage.tsx").then((m) => ({ default: m.ProjectsPage })),
);
const PublicationsPage = lazy(() =>
  import("./pages/PublicationsPage.tsx").then((m) => ({
    default: m.PublicationsPage,
  })),
);
const NewsPage = lazy(() =>
  import("./pages/NewsPage.tsx").then((m) => ({ default: m.NewsPage })),
);
const NewsDetailPage = lazy(() =>
  import("./pages/NewsDetailPage.tsx").then((m) => ({
    default: m.NewsDetailPage,
  })),
);
const ContactsPage = lazy(() =>
  import("./pages/ContactsPage.tsx").then((m) => ({ default: m.ContactsPage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage.tsx").then((m) => ({ default: m.NotFoundPage })),
);
const UmisPage = lazy(() =>
  import("./pages/UmisPage.tsx").then((m) => ({ default: m.UmisPage })),
);
const EPublishingPage = lazy(() =>
  import("./pages/EPublishingPage.tsx").then((m) => ({
    default: m.EPublishingPage,
  })),
);
const JournalPage = lazy(() =>
  import("./pages/JournalPage.tsx").then((m) => ({ default: m.JournalPage })),
);
const CareerCentrePage = lazy(() =>
  import("./pages/CareerCentrePage.tsx").then((m) => ({
    default: m.CareerCentrePage,
  })),
);

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: HomePage },
      { path: "/about", Component: AboutPage },
      { path: "/about/head-of-department", Component: HeadOfDepartmentPage },
      { path: "/about/accreditation", Component: AccreditationPage },
      { path: "/about/history", Component: HistoryPage },
      { path: "/teachers", Component: TeachersPage },
      {
        path: "/education",
        lazy: async () => {
          const { EducationIndex } = await import("./pages/Redirects.tsx");
          return { Component: EducationIndex };
        },
      },
      { path: "/education/bachelor", Component: BachelorProgrammesPage },
      { path: "/education/master", Component: MasterProgrammesPage },
      { path: "/education/doctoral", Component: DoctoralProgrammesPage },
      { path: "/education/curricula", Component: CurriculaPage },
      { path: "/education/schedules", Component: SchedulesPage },
      {
        path: "/research",
        lazy: async () => {
          const { ResearchIndex } = await import("./pages/Redirects.tsx");
          return { Component: ResearchIndex };
        },
      },
      { path: "/research/projects", Component: ProjectsPage },
      { path: "/research/publications", Component: PublicationsPage },
      { path: "/news", Component: NewsPage },
      { path: "/news/:id", Component: NewsDetailPage },
      { path: "/contacts", Component: ContactsPage },
      { path: "/systems/umis", Component: UmisPage },
      { path: "/systems/e-publishing", Component: EPublishingPage },
      { path: "/systems/journal", Component: JournalPage },
      { path: "/systems/career", Component: CareerCentrePage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
