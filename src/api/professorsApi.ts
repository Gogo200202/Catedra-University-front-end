import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export interface BilingualText {
  bg?: string;
  en?: string;
}

export interface Professor {
  _id: string;
  Basic_Information?: {
    academicPosition?: BilingualText;
    firstName?: BilingualText;
    middleName?: BilingualText;
    lastName?: BilingualText;
    photo?: BilingualText;
    dateOfBirth?: BilingualText;
    placeOfBirth?: BilingualText;
    officeAddress?: BilingualText;
    officeNumber?: BilingualText;
    administrativeFunction?: BilingualText;
  };
  Education?: {
    university?: BilingualText;
    major?: BilingualText;
    academicDegrees?: {
      degree?: BilingualText;
      dissertationTitle?: BilingualText;
      dateAcquired?: BilingualText;
      scientificSpecialty?: BilingualText;
    }[];
    academicTitles?: {
      title?: BilingualText;
      dateAcquired?: BilingualText;
      scientificSpecialty?: BilingualText;
    }[];
    fieldsOfHigherEducation?: BilingualText[];
    professionalFields?: BilingualText[];
    researchInterests?: BilingualText[];
  };
  Teaching_Activity?: {
    bachelorsCourses?: BilingualText[];
    mastersCourses?: BilingualText[];
    phdCourses?: BilingualText[];
  };
  Foreign_Languages?: {
    languageName?: BilingualText;
    readingLevel?: BilingualText;
    writingLevel?: BilingualText;
    speakingLevel?: BilingualText;
  }[];
  Work_Experience?: {
    period?: { from?: BilingualText; to?: BilingualText };
    organization?: BilingualText;
    position?: BilingualText;
    description?: BilingualText;
  }[];
  Professional_Competences?: {
    programmingLanguages?: { language?: BilingualText; proficiencyLevel?: BilingualText }[];
    technologies?: BilingualText[];
    platforms?: BilingualText[];
    frameworks?: BilingualText[];
    databases?: BilingualText[];
    otherTechnicalSkills?: BilingualText[];
  };
  Membership_in_Organizations?: {
    organization?: BilingualText;
    membershipType?: BilingualText;
    period?: BilingualText;
  }[];
  Participation_in_Research_Projects?: {
    projectName?: BilingualText;
    period?: BilingualText;
    fundingOrganization?: BilingualText;
    contractNumber?: BilingualText;
    projectRole?: BilingualText;
  }[];
  Publications?: {
    summaryIndicators?: {
      numberOfScientificArticles?: number;
      numberOfInternationalReports?: number;
      numberOfNationalReports?: number;
    };
    booksAndTextbooks?: {
      authors?: string[];
      title?: BilingualText;
      publisher?: BilingualText;
      isbn?: BilingualText;
      year?: BilingualText;
      publicationType?: BilingualText;
    }[];
    selectedScientificPublications?: {
      authors?: string[];
      title?: BilingualText;
      publicationOrConference?: BilingualText;
      volume?: BilingualText;
      issue?: BilingualText;
      pages?: BilingualText;
      year?: BilingualText;
      doi?: BilingualText;
      url?: BilingualText;
      pdfFile?: BilingualText;
    }[];
  };
  Citations?: {
    citationsByForeignAuthors?: number;
    citationsByBulgarianAuthors?: number;
    totalCitations?: number;
  };
  Achievements?: {
    scientificAchievements?: BilingualText[];
    professionalAchievements?: BilingualText[];
    awardsAndHonors?: BilingualText[];
    reviewerActivity?: BilingualText[];
    editorialBoardMemberships?: BilingualText[];
    certificates?: BilingualText[];
  };
  Contact_Information?: {
    phoneNumbers?: string[];
    emails?: string[];
    personalWebsite?: BilingualText;
    researchNetworkProfiles?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfessorsPagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedProfessors {
  data: Professor[];
  pagination: ProfessorsPagination;
}

export type ProfessorPayload = Omit<Professor, "_id" | "createdAt" | "updatedAt">;

export interface FetchProfessorsParams {
  page?: number;
  limit?: number;
  search?: string;
}

function withBearerToken(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function fetchProfessors({ page = 1, limit = 10, search = "" }: FetchProfessorsParams = {}) {
  const { data } = await api.get<PaginatedProfessors>("/professors", {
    params: { page, limit, search: search || undefined },
  });
  return data;
}

export async function fetchProfessor(id: string): Promise<Professor> {
  const { data } = await api.get<Professor>(`/professors/${id}`);
  return data;
}

export async function createProfessor(token: string, payload: ProfessorPayload): Promise<Professor> {
  const { data } = await api.post<Professor>("/professors", payload, withBearerToken(token));
  return data;
}

export async function updateProfessor(
  token: string,
  id: string,
  payload: Partial<ProfessorPayload>,
): Promise<Professor> {
  const { data } = await api.put<Professor>(`/professors/${id}`, payload, withBearerToken(token));
  return data;
}

export async function deleteProfessor(token: string, id: string): Promise<void> {
  await api.delete(`/professors/${id}`, withBearerToken(token));
}
