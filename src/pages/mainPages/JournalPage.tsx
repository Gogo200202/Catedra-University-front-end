import { SystemServicePage } from "../components/SystemServicePage.tsx";

export function JournalPage() {
  return (
    <SystemServicePage
      serviceId="journal"
      titleKey="systems.journal"
      subtitleKey="pages.journalSubtitle"
    />
  );
}
