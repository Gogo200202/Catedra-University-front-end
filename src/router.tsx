import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout.tsx";

const HomePage = lazy(() =>
  import("./pages/HomePage.tsx").then((m) => ({ default: m.HomePage })),
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage.tsx").then((m) => ({ default: m.AboutPage })),
);
const TeachersPage = lazy(() =>
  import("./pages/TeachersPage.tsx").then((m) => ({ default: m.TeachersPage })),
);
const EducationPage = lazy(() =>
  import("./pages/EducationPage.tsx").then((m) => ({ default: m.EducationPage })),
);
const ResearchPage = lazy(() =>
  import("./pages/ResearchPage.tsx").then((m) => ({ default: m.ResearchPage })),
);
const NewsPage = lazy(() =>
  import("./pages/NewsPage.tsx").then((m) => ({ default: m.NewsPage })),
);
const ContactsPage = lazy(() =>
  import("./pages/ContactsPage.tsx").then((m) => ({ default: m.ContactsPage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage.tsx").then((m) => ({ default: m.NotFoundPage })),
);

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: HomePage },
      { path: "/about", Component: AboutPage },
      { path: "/teachers", Component: TeachersPage },
      { path: "/education", Component: EducationPage },
      { path: "/research", Component: ResearchPage },
      { path: "/news", Component: NewsPage },
      { path: "/contacts", Component: ContactsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
