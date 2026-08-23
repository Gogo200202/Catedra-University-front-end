import { Navigate } from "react-router";

export function EducationIndex() {
  return <Navigate to="/education/bachelor" replace />;
}

export function ResearchIndex() {
  return <Navigate to="/research/projects" replace />;
}
