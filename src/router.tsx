import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout.tsx";

const HomePage = lazy(() =>
  import("./pages/mainPages/HomePage.tsx").then((m) => ({ default: m.HomePage })),
);
const AboutPage = lazy(() =>
  import("./pages/mainPages/AboutPage.tsx").then((m) => ({ default: m.AboutPage })),
);
const TeachersPage = lazy(() =>
  import("./pages/mainPages/TeachersPage.tsx").then((m) => ({ default: m.TeachersPage })),
);
const TeacherDetailPage = lazy(() =>
  import("./pages/detail/TeacherDetailPage.tsx").then((m) => ({
    default: m.TeacherDetailPage,
  })),
);
const BachelorProgrammesPage = lazy(() =>
  import("./pages/mainPages/BachelorProgrammesPage.tsx").then((m) => ({
    default: m.BachelorProgrammesPage,
  })),
);
const MasterProgrammesPage = lazy(() =>
  import("./pages/mainPages/MasterProgrammesPage.tsx").then((m) => ({
    default: m.MasterProgrammesPage,
  })),
);
const DoctoralProgrammesPage = lazy(() =>
  import("./pages/mainPages/DoctoralProgrammesPage.tsx").then((m) => ({
    default: m.DoctoralProgrammesPage,
  })),
);
const CurriculaPage = lazy(() =>
  import("./pages/mainPages/CurriculaPage.tsx").then((m) => ({ default: m.CurriculaPage })),
);
const SchedulesPage = lazy(() =>
  import("./pages/mainPages/SchedulesPage.tsx").then((m) => ({ default: m.SchedulesPage })),
);
const ProjectsPage = lazy(() =>
  import("./pages/mainPages/ProjectsPage.tsx").then((m) => ({ default: m.ProjectsPage })),
);
const ProjectDetailPage = lazy(() =>
  import("./pages/detail/ProjectDetailPage.tsx").then((m) => ({
    default: m.ProjectDetailPage,
  })),
);
const PublicationsPage = lazy(() =>
  import("./pages/mainPages/PublicationsPage.tsx").then((m) => ({
    default: m.PublicationsPage,
  })),
);
const PublicationDetailPage = lazy(() =>
  import("./pages/detail/PublicationDetailPage.tsx").then((m) => ({
    default: m.PublicationDetailPage,
  })),
);
const NewsPage = lazy(() =>
  import("./pages/mainPages/NewsPage.tsx").then((m) => ({ default: m.NewsPage })),
);
const NewsDetailPage = lazy(() =>
  import("./pages/detail/NewsDetailPage.tsx").then((m) => ({
    default: m.NewsDetailPage,
  })),
);
const ContactsPage = lazy(() =>
  import("./pages/mainPages/ContactsPage.tsx").then((m) => ({ default: m.ContactsPage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/mainPages/NotFoundPage.tsx").then((m) => ({ default: m.NotFoundPage })),
);
const UmisPage = lazy(() =>
  import("./pages/mainPages/UmisPage.tsx").then((m) => ({ default: m.UmisPage })),
);
const EPublishingPage = lazy(() =>
  import("./pages/mainPages/EPublishingPage.tsx").then((m) => ({
    default: m.EPublishingPage,
  })),
);
const JournalPage = lazy(() =>
  import("./pages/mainPages/JournalPage.tsx").then((m) => ({ default: m.JournalPage })),
);
const CareerCentrePage = lazy(() =>
  import("./pages/mainPages/CareerCentrePage.tsx").then((m) => ({
    default: m.CareerCentrePage,
  })),
);
const AdminPanelPage = lazy(() =>
  import("./pages/admin/AdminPanelPage.tsx").then((m) => ({
    default: m.AdminPanelPage,
  })),
);
const CreateTeacherPage = lazy(() =>
  import("./pages/admin/CreateTeacherPage.tsx").then((m) => ({
    default: m.CreateTeacherPage,
  })),
);
const CreateEventPage = lazy(() =>
  import("./pages/admin/CreateEventPage.tsx").then((m) => ({
    default: m.CreateEventPage,
  })),
);
const CreateSchedulePage = lazy(() =>
  import("./pages/admin/CreateSchedulePage.tsx").then((m) => ({
    default: m.CreateSchedulePage,
  })),
);
const AccountPage = lazy(() =>
  import("./pages/mainPages/AccountPage.tsx").then((m) => ({
    default: m.AccountPage,
  })),
);
const ProgrammeDetailPage = lazy(() =>
  import("./pages/detail/ProgrammeDetailPage.tsx").then((m) => ({
    default: m.ProgrammeDetailPage,
  })),
);

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: HomePage },
      { path: "/about", Component: AboutPage },
      { path: "/teachers", Component: TeachersPage },
      { path: "/teachers/:id", Component: TeacherDetailPage },
      {
        path: "/education",
        lazy: async () => {
          const { EducationIndex } = await import("./pages/components/Redirects.tsx");
          return { Component: EducationIndex };
        },
      },
      { path: "/education/bachelor", Component: BachelorProgrammesPage },
      { path: "/education/master", Component: MasterProgrammesPage },
      { path: "/education/doctoral", Component: DoctoralProgrammesPage },
      { path: "/education/bachelor/:id", Component: ProgrammeDetailPage },
      { path: "/education/master/:id", Component: ProgrammeDetailPage },
      { path: "/education/doctoral/:id", Component: ProgrammeDetailPage },
      { path: "/education/curricula", Component: CurriculaPage },
      { path: "/education/schedules", Component: SchedulesPage },
      {
        path: "/research",
        lazy: async () => {
          const { ResearchIndex } = await import("./pages/components/Redirects.tsx");
          return { Component: ResearchIndex };
        },
      },
      { path: "/research/projects", Component: ProjectsPage },
      { path: "/research/projects/:id", Component: ProjectDetailPage },
      { path: "/research/publications", Component: PublicationsPage },
      { path: "/research/publications/:id", Component: PublicationDetailPage },
      { path: "/news", Component: NewsPage },
      { path: "/news/:id", Component: NewsDetailPage },
      { path: "/contacts", Component: ContactsPage },
      { path: "/systems/umis", Component: UmisPage },
      { path: "/systems/e-publishing", Component: EPublishingPage },
      { path: "/systems/journal", Component: JournalPage },
      { path: "/systems/career", Component: CareerCentrePage },
      { path: "/admin", Component: AdminPanelPage },
      { path: "/admin/teachers/create", Component: CreateTeacherPage },
      { path: "/admin/events/create", Component: CreateEventPage },
      { path: "/admin/schedules/create", Component: CreateSchedulePage },
      { path: "/account", Component: AccountPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
