export interface AcademicDegree {
  degree: string;
  dissertationTitle: string;
  dateAcquired: string;
  scientificSpecialty: string;
}

export interface AcademicTitle {
  title: string;
  dateAcquired: string;
  scientificSpecialty: string;
}

export interface ForeignLanguage {
  languageName: string;
  readingLevel: string;
  writingLevel: string;
  speakingLevel: string;
}

export interface WorkExperienceEntry {
  periodFrom: string;
  periodTo: string;
  organization: string;
  position: string;
  description: string;
}

export interface ProgrammingLanguageSkill {
  language: string;
  proficiencyLevel: string;
}

export interface OrganizationMembership {
  organization: string;
  membershipType: string;
  period: string;
}

export interface ProjectParticipation {
  projectName: string;
  period: string;
  fundingOrganization: string;
  contractNumber?: string;
  projectRole: string;
}

export interface PublicationIndicators {
  numberOfScientificArticles: number;
  numberOfInternationalReports: number;
  numberOfNationalReports: number;
}

export interface BookEntry {
  authors: string;
  title: string;
  publisher: string;
  isbn?: string;
  year: string;
  publicationType: string;
}

export interface SelectedPublicationEntry {
  authors: string;
  title: string;
  publicationOrConference: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: string;
  doi?: string;
}

export interface CitationStats {
  citationsByForeignAuthors: number;
  citationsByBulgarianAuthors: number;
  totalCitations: number;
}

export interface TeacherProfile {
  teacherId: number;
  education: {
    university: string;
    major: string;
    academicDegrees: AcademicDegree[];
    academicTitles: AcademicTitle[];
  };
  teachingActivity: {
    bachelorsCourses: string[];
    mastersCourses: string[];
    phdCourses: string[];
  };
  foreignLanguages: ForeignLanguage[];
  workExperience: WorkExperienceEntry[];
  professionalCompetences: {
    programmingLanguages: ProgrammingLanguageSkill[];
    technologies: string[];
    frameworks: string[];
    databases: string[];
  };
  memberships: OrganizationMembership[];
  projectParticipations: ProjectParticipation[];
  publications: {
    indicators: PublicationIndicators;
    booksAndTextbooks: BookEntry[];
    selectedPublications: SelectedPublicationEntry[];
  };
  citations: CitationStats;
  achievements: {
    awardsAndHonors: string[];
    reviewerActivity: string[];
    editorialBoards: string[];
    certificates: string[];
  };
  contacts: {
    phoneNumbers: string[];
    emails: string[];
    personalWebsite?: string;
    researchNetworkProfiles: string[];
  };
}

export const teacherProfiles: Record<number, TeacherProfile> = {
  1: {
    teacherId: 1,
    education: {
      university: "Technical University of Gabrovo",
      major: "Computer Systems and Technologies",
      academicDegrees: [
        {
          degree: "PhD",
          dissertationTitle:
            "Methods and algorithms for intelligent data processing in distributed information systems",
          dateAcquired: "2003",
          scientificSpecialty: "Computer Systems and Technologies",
        },
        {
          degree: "MSc",
          dissertationTitle: "Real-time control of a flexible production cell",
          dateAcquired: "1998",
          scientificSpecialty: "Automation and Computer Engineering",
        },
      ],
      academicTitles: [
        { title: "Professor", dateAcquired: "2018", scientificSpecialty: "Computer Systems and Technologies" },
        { title: "Associate Professor", dateAcquired: "2008", scientificSpecialty: "Computer Systems and Technologies" },
      ],
    },
    teachingActivity: {
      bachelorsCourses: ["Artificial Intelligence", "Machine Learning", "Computer Architecture"],
      mastersCourses: ["Data Mining and Big Data Analytics", "Distributed Systems", "Research Methods"],
      phdCourses: ["Advanced Machine Learning Methods", "Scientific Writing and Publishing"],
    },
    foreignLanguages: [
      { languageName: "English", readingLevel: "C1", writingLevel: "C1", speakingLevel: "C1" },
      { languageName: "Russian", readingLevel: "B2", writingLevel: "B1", speakingLevel: "B2" },
    ],
    workExperience: [
      {
        periodFrom: "1998",
        periodTo: "present",
        organization: "Technical University of Gabrovo",
        position: "Assistant → Chief Assistant → Associate Professor → Professor",
        description: "Teaching and research in artificial intelligence and intelligent data processing; head of the Department of Computer Systems and Technologies since 2019.",
      },
      {
        periodFrom: "2005",
        periodTo: "2008",
        organization: "IntelliSoft Ltd., Gabrovo",
        position: "R&D Consultant (part-time)",
        description: "Development of predictive analytics modules for industrial monitoring systems.",
      },
    ],
    professionalCompetences: {
      programmingLanguages: [
        { language: "Python", proficiencyLevel: "Expert" },
        { language: "C++", proficiencyLevel: "Advanced" },
        { language: "Java", proficiencyLevel: "Intermediate" },
      ],
      technologies: ["TensorFlow", "PyTorch", "Apache Spark", "Linux"],
      frameworks: ["scikit-learn", "Keras"],
      databases: ["PostgreSQL", "MongoDB"],
    },
    memberships: [
      { organization: "Union of Scientists in Bulgaria", membershipType: "Member", period: "2004 – present" },
      { organization: "IEEE Computer Society", membershipType: "Senior Member", period: "2012 – present" },
    ],
    projectParticipations: [
      {
        projectName:
          "Competence Center “Intelligent Mechatronic, Eco and Energy Saving Technologies and Systems”",
        period: "2019 – 2028",
        fundingOrganization: "Operational Programme Science and Education for Smart Growth",
        contractNumber: "BG05M2OP001-1.002-0023",
        projectRole: "Lead of the Intelligent Systems laboratory",
      },
      {
        projectName:
          "Methods and Algorithms for Intelligent Data Processing in Cyber-Physical Systems",
        period: "2024 – 2027",
        fundingOrganization: "Bulgarian National Science Fund",
        projectRole: "Principal investigator",
      },
    ],
    publications: {
      indicators: { numberOfScientificArticles: 62, numberOfInternationalReports: 18, numberOfNationalReports: 24 },
      booksAndTextbooks: [
        {
          authors: "Ivanov R.",
          title: "Machine Learning: Practical Approaches",
          publisher: "TU — Gabrovo Press",
          isbn: "978-954-90512-3-7",
          year: "2021",
          publicationType: "Textbook",
        },
      ],
      selectedPublications: [
        {
          authors: "Ivanov R., Stoynev S., Dimitrova M.",
          title:
            "An adaptive machine learning approach for predictive maintenance in industrial IoT environments",
          publicationOrConference: "Journal of the Technical University of Gabrovo",
          volume: "61",
          pages: "15–22",
          year: "2025",
          doi: "10.5555/jtug.2025.61.015",
        },
        {
          authors: "Ivanov R., Peneva V.",
          title: "Ensemble feature selection for high-dimensional sensor data streams",
          publicationOrConference: "UNITECH Proceedings, Section Computer Informatics",
          year: "2024",
        },
      ],
    },
    citations: { citationsByForeignAuthors: 84, citationsByBulgarianAuthors: 112, totalCitations: 196 },
    achievements: {
      awardsAndHonors: [
        "Best paper award, UNITECH 2023",
        "Annual award for scientific work of TU — Gabrovo, 2020",
      ],
      reviewerActivity: [
        "Reviewer for the Journal of Intelligent Manufacturing",
        "Programme committee member of UNITECH (2015 – present)",
      ],
      editorialBoards: [
        "Editorial board of the Journal of the Technical University of Gabrovo",
      ],
      certificates: ["Coursera — Deep Learning Specialization, 2019"],
    },
    contacts: {
      phoneNumbers: ["+359 66 827 245"],
      emails: ["r_ivanov@tugab.bg"],
      personalWebsite: "https://www.tugab.bg/~r_ivanov",
      researchNetworkProfiles: ["Google Scholar", "ORCID", "ResearcherID"],
    },
  },

  2: {
    teacherId: 2,
    education: {
      university: "Technical University of Gabrovo",
      major: "Communication Technologies and Cybersecurity",
      academicDegrees: [
        {
          degree: "PhD",
          dissertationTitle: "Traffic modelling and quality of service in wireless sensor networks",
          dateAcquired: "2011",
          scientificSpecialty: "Communication Networks",
        },
      ],
      academicTitles: [
        { title: "Associate Professor", dateAcquired: "2016", scientificSpecialty: "Communication Networks" },
      ],
    },
    teachingActivity: {
      bachelorsCourses: ["Computer Networks", "Information Security", "Signal Processing"],
      mastersCourses: ["Design of Large-Scale Networks", "Ethical Hacking"],
      phdCourses: ["Network Traffic Analysis"],
    },
    foreignLanguages: [
      { languageName: "English", readingLevel: "C1", writingLevel: "B2", speakingLevel: "B2" },
    ],
    workExperience: [
      {
        periodFrom: "2006",
        periodTo: "present",
        organization: "Technical University of Gabrovo",
        position: "Assistant → Associate Professor",
        description: "Teaching network disciplines; administrator of the departmental network infrastructure and laboratories.",
      },
      {
        periodFrom: "2012",
        periodTo: "2014",
        organization: "NetGuard Solutions, Sofia",
        position: "Security Auditor (contract)",
        description: "Penetration testing and security audits for corporate clients.",
      },
    ],
    professionalCompetences: {
      programmingLanguages: [
        { language: "Python", proficiencyLevel: "Advanced" },
        { language: "C", proficiencyLevel: "Advanced" },
      ],
      technologies: ["Wireshark", "Cisco IOS", "pfSense", "Metasploit"],
      frameworks: ["Scapy"],
      databases: ["InfluxDB"],
    },
    memberships: [
      { organization: "IEEE Communications Society", membershipType: "Member", period: "2014 – present" },
    ],
    projectParticipations: [
      {
        projectName:
          "Methods and Algorithms for Intelligent Data Processing in Cyber-Physical Systems",
        period: "2024 – 2027",
        fundingOrganization: "Bulgarian National Science Fund",
        projectRole: "Participant — communication layer",
      },
    ],
    publications: {
      indicators: { numberOfScientificArticles: 34, numberOfInternationalReports: 12, numberOfNationalReports: 14 },
      booksAndTextbooks: [],
      selectedPublications: [
        {
          authors: "Stoynev S., Kolev N.",
          title: "A comparative study of network intrusion detection methods using deep learning",
          publicationOrConference: "International Conference on Communications and Cybersecurity",
          pages: "88–95",
          year: "2024",
        },
        {
          authors: "Stoynev S.",
          title: "QoS-aware routing in industrial wireless sensor networks",
          publicationOrConference: "UNITECH Proceedings, Section Communications",
          year: "2023",
        },
      ],
    },
    citations: { citationsByForeignAuthors: 41, citationsByBulgarianAuthors: 38, totalCitations: 79 },
    achievements: {
      awardsAndHonors: ["Young scientist award of TU — Gabrovo, 2015"],
      reviewerActivity: ["Reviewer for IEEE Access"],
      editorialBoards: [],
      certificates: ["Cisco CCNP Instructor certification"],
    },
    contacts: {
      phoneNumbers: ["+359 66 827 251"],
      emails: ["s_stoynov@tugab.bg"],
      researchNetworkProfiles: ["Google Scholar", "ORCID"],
    },
  },

  3: {
    teacherId: 3,
    education: {
      university: "Technical University of Gabrovo",
      major: "Software Engineering",
      academicDegrees: [
        {
          degree: "PhD",
          dissertationTitle: "Model-driven approaches for evolution of enterprise information systems",
          dateAcquired: "2013",
          scientificSpecialty: "Computer Systems and Technologies",
        },
      ],
      academicTitles: [
        { title: "Associate Professor", dateAcquired: "2019", scientificSpecialty: "Computer Systems and Technologies" },
      ],
    },
    teachingActivity: {
      bachelorsCourses: ["Databases", "Software Engineering", "Data Structures and Algorithms"],
      mastersCourses: ["Advanced Databases", "Cloud Application Development"],
      phdCourses: ["Empirical Software Engineering"],
    },
    foreignLanguages: [
      { languageName: "English", readingLevel: "C1", writingLevel: "C1", speakingLevel: "C1" },
      { languageName: "German", readingLevel: "A2", writingLevel: "A2", speakingLevel: "A2" },
    ],
    workExperience: [
      {
        periodFrom: "2008",
        periodTo: "present",
        organization: "Technical University of Gabrovo",
        position: "Assistant → Associate Professor",
        description: "Teaching software engineering and databases; supervisor of diploma projects with industrial partners.",
      },
      {
        periodFrom: "2010",
        periodTo: "2016",
        organization: "Free-lance",
        position: "Software Architect",
        description: "Design and review of information systems for regional companies.",
      },
    ],
    professionalCompetences: {
      programmingLanguages: [
        { language: "Java", proficiencyLevel: "Expert" },
        { language: "C#", proficiencyLevel: "Advanced" },
        { language: "SQL", proficiencyLevel: "Expert" },
      ],
      technologies: ["Spring", "Docker", "Kubernetes", "Azure"],
      frameworks: ["Hibernate", "React"],
      databases: ["PostgreSQL", "Microsoft SQL Server", "Redis"],
    },
    memberships: [
      { organization: "Bulgarian Society for Informatics and Applied Statistics", membershipType: "Member", period: "2016 – present" },
    ],
    projectParticipations: [
      {
        projectName: "Digital Skills for Engineering Education (Erasmus+ KA220)",
        period: "2024 – 2026",
        fundingOrganization: "European Commission — Erasmus+ Programme",
        contractNumber: "KA220-HED-2024-0042",
        projectRole: "Local coordinator",
      },
    ],
    publications: {
      indicators: { numberOfScientificArticles: 28, numberOfInternationalReports: 9, numberOfNationalReports: 16 },
      booksAndTextbooks: [
        {
          authors: "Dimitrova M., Georgieva E.",
          title: "Introduction to Relational Databases",
          publisher: "TU — Gabrovo Press",
          year: "2022",
          publicationType: "Textbook",
        },
      ],
      selectedPublications: [
        {
          authors: "Dimitrova M., Georgieva E.",
          title: "Microservice-based architecture for scalable university information services",
          publicationOrConference: "UNITECH Proceedings, Section Computer Informatics",
          year: "2025",
        },
        {
          authors: "Dimitrova M.",
          title: "Schema evolution patterns in long-lived enterprise systems",
          publicationOrConference: "International Conference on Software Engineering and Applications",
          pages: "120–127",
          year: "2023",
          doi: "10.5555/icsea.2023.120",
        },
      ],
    },
    citations: { citationsByForeignAuthors: 33, citationsByBulgarianAuthors: 45, totalCitations: 78 },
    achievements: {
      awardsAndHonors: ["Nomination for best lecturer of TU — Gabrovo, 2021"],
      reviewerActivity: ["Reviewer for Data & Knowledge Engineering"],
      editorialBoards: [],
      certificates: ["Microsoft Azure Fundamentals AZ-900"],
    },
    contacts: {
      phoneNumbers: ["+359 66 827 262"],
      emails: ["m_dimitrova@tugab.bg"],
      researchNetworkProfiles: ["Google Scholar", "ORCID"],
    },
  },

  4: {
    teacherId: 4,
    education: {
      university: "Technical University of Gabrovo",
      major: "Computer Systems and Technologies",
      academicDegrees: [
        {
          degree: "PhD",
          dissertationTitle: "Hardware-software co-design of educational robotic platforms",
          dateAcquired: "2019",
          scientificSpecialty: "Computer Systems and Technologies",
        },
      ],
      academicTitles: [],
    },
    teachingActivity: {
      bachelorsCourses: ["Microprocessor Systems", "Digital Circuit Design", "Internet of Things"],
      mastersCourses: ["Embedded System Design"],
      phdCourses: [],
    },
    foreignLanguages: [
      { languageName: "English", readingLevel: "B2", writingLevel: "B2", speakingLevel: "B2" },
    ],
    workExperience: [
      {
        periodFrom: "2011",
        periodTo: "present",
        organization: "Technical University of Gabrovo",
        position: "Assistant → Chief Assistant",
        description: "Responsible for the embedded systems and robotics laboratories; mentor of the student robotics team.",
      },
      {
        periodFrom: "2009",
        periodTo: "2011",
        organization: "Elprom Electronics, Gabrovo",
        position: "Firmware Engineer",
        description: "Development of firmware for motor-control devices.",
      },
    ],
    professionalCompetences: {
      programmingLanguages: [
        { language: "C", proficiencyLevel: "Expert" },
        { language: "Python", proficiencyLevel: "Intermediate" },
        { language: "Assembler (ARM)", proficiencyLevel: "Advanced" },
      ],
      technologies: ["STM32", "Raspberry Pi", "Oscilloscopes", "KiCad"],
      frameworks: ["Zephyr RTOS", "ROS 2"],
      databases: [],
    },
    memberships: [
      { organization: "Union of Electronics, Electrical Engineering and Communications", membershipType: "Member", period: "2018 – present" },
    ],
    projectParticipations: [
      {
        projectName:
          "Competence Center “Intelligent Mechatronic, Eco and Energy Saving Technologies and Systems”",
        period: "2019 – 2028",
        fundingOrganization: "Operational Programme Science and Education for Smart Growth",
        contractNumber: "BG05M2OP001-1.002-0023",
        projectRole: "Participant — rapid prototyping laboratory",
      },
    ],
    publications: {
      indicators: { numberOfScientificArticles: 17, numberOfInternationalReports: 5, numberOfNationalReports: 11 },
      booksAndTextbooks: [
        {
          authors: "Petkov I.",
          title: "Laboratory Exercises in Microprocessor Systems",
          publisher: "TU — Gabrovo Press",
          year: "2023",
          publicationType: "Exercise book",
        },
      ],
      selectedPublications: [
        {
          authors: "Petkov I.",
          title: "Low-cost embedded platform for robotics education in engineering degree courses",
          publicationOrConference: "Bulletin of the Union of Scientists — Gabrovo",
          year: "2024",
        },
      ],
    },
    citations: { citationsByForeignAuthors: 9, citationsByBulgarianAuthors: 21, totalCitations: 30 },
    achievements: {
      awardsAndHonors: ["Student team mentor — national robotics competition finalists, 2022–2024"],
      reviewerActivity: [],
      editorialBoards: [],
      certificates: ["Arm Accredited Engineer program, 2020"],
    },
    contacts: {
      phoneNumbers: ["+359 66 827 270"],
      emails: ["i_petkov@tugab.bg"],
      researchNetworkProfiles: ["ORCID"],
    },
  },

  5: {
    teacherId: 5,
    education: {
      university: "Technical University of Gabrovo",
      major: "Software Engineering",
      academicDegrees: [
        {
          degree: "PhD",
          dissertationTitle: "Usability evaluation methods for web-based learning environments",
          dateAcquired: "2021",
          scientificSpecialty: "Computer Systems and Technologies",
        },
      ],
      academicTitles: [],
    },
    teachingActivity: {
      bachelorsCourses: ["Web Technologies", "Human-Computer Interaction", "Introduction to Programming"],
      mastersCourses: ["Cloud Application Development"],
      phdCourses: [],
    },
    foreignLanguages: [
      { languageName: "English", readingLevel: "C1", writingLevel: "B2", speakingLevel: "C1" },
    ],
    workExperience: [
      {
        periodFrom: "2013",
        periodTo: "present",
        organization: "Technical University of Gabrovo",
        position: "Assistant → Chief Assistant",
        description: "Coordinates the web development curriculum and the annual student web showcase.",
      },
    ],
    professionalCompetences: {
      programmingLanguages: [
        { language: "JavaScript / TypeScript", proficiencyLevel: "Expert" },
        { language: "PHP", proficiencyLevel: "Intermediate" },
      ],
      technologies: ["React", "Node.js", "Figma", "GitLab CI"],
      frameworks: ["Next.js", "Express"],
      databases: ["PostgreSQL", "SQLite"],
    },
    memberships: [],
    projectParticipations: [
      {
        projectName: "Digital Skills for Engineering Education (Erasmus+ KA220)",
        period: "2024 – 2026",
        fundingOrganization: "European Commission — Erasmus+ Programme",
        contractNumber: "KA220-HED-2024-0042",
        projectRole: "Participant — digital laboratories package",
      },
    ],
    publications: {
      indicators: { numberOfScientificArticles: 12, numberOfInternationalReports: 4, numberOfNationalReports: 8 },
      booksAndTextbooks: [],
      selectedPublications: [
        {
          authors: "Georgieva E., Dimitrova M.",
          title: "Microservice-based architecture for scalable university information services",
          publicationOrConference: "UNITECH Proceedings, Section Computer Informatics",
          year: "2025",
        },
        {
          authors: "Georgieva E., Peneva V.",
          title: "Improving first-year programming outcomes through automated assessment tools",
          publicationOrConference: "Annual University Scientific Session, TU — Gabrovo",
          year: "2023",
        },
      ],
    },
    citations: { citationsByForeignAuthors: 7, citationsByBulgarianAuthors: 14, totalCitations: 21 },
    achievements: {
      awardsAndHonors: ["Best presentation award, student session mentoring, 2024"],
      reviewerActivity: [],
      editorialBoards: [],
      certificates: ["UX Certification, Nielsen Norman Group, 2022"],
    },
    contacts: {
      phoneNumbers: ["+359 66 827 274"],
      emails: ["e_georgieva@tugab.bg"],
      personalWebsite: "https://www.tugab.bg/~e_georgieva",
      researchNetworkProfiles: ["Google Scholar"],
    },
  },

  6: {
    teacherId: 6,
    education: {
      university: "Sofia University “St. Kliment Ohridski”",
      major: "Software Engineering",
      academicDegrees: [
        {
          degree: "MSc",
          dissertationTitle: "Static analysis techniques for memory-safety verification",
          dateAcquired: "2017",
          scientificSpecialty: "Informatics",
        },
      ],
      academicTitles: [],
    },
    teachingActivity: {
      bachelorsCourses: ["Programming Languages", "Compiler Construction", "Discrete Structures"],
      mastersCourses: [],
      phdCourses: [],
    },
    foreignLanguages: [
      { languageName: "English", readingLevel: "C1", writingLevel: "B2", speakingLevel: "B2" },
    ],
    workExperience: [
      {
        periodFrom: "2018",
        periodTo: "present",
        organization: "Technical University of Gabrovo",
        position: "Assistant",
        description: "Leads practical exercises in programming languages and compilers; maintains the department's automated assessment server.",
      },
      {
        periodFrom: "2016",
        periodTo: "2018",
        organization: "Chaos Group, Sofia",
        position: "Junior Compiler Developer",
        description: "Optimization passes for an internal shading-language toolchain.",
      },
    ],
    professionalCompetences: {
      programmingLanguages: [
        { language: "Haskell", proficiencyLevel: "Advanced" },
        { language: "C++", proficiencyLevel: "Advanced" },
        { language: "Rust", proficiencyLevel: "Intermediate" },
      ],
      technologies: ["LLVM", "ANTLR", "Git"],
      frameworks: [],
      databases: [],
    },
    memberships: [],
    projectParticipations: [],
    publications: {
      indicators: { numberOfScientificArticles: 6, numberOfInternationalReports: 2, numberOfNationalReports: 4 },
      booksAndTextbooks: [],
      selectedPublications: [
        {
          authors: "Kolev N., Stoynev S.",
          title: "A comparative study of network intrusion detection methods using deep learning",
          publicationOrConference: "International Conference on Communications and Cybersecurity",
          pages: "88–95",
          year: "2024",
        },
      ],
    },
    citations: { citationsByForeignAuthors: 4, citationsByBulgarianAuthors: 6, totalCitations: 10 },
    achievements: {
      awardsAndHonors: [],
      reviewerActivity: [],
      editorialBoards: [],
      certificates: ["Cambridge C1 Advanced certificate"],
    },
    contacts: {
      phoneNumbers: ["+359 66 827 280"],
      emails: ["n_kolev@tugab.bg"],
      researchNetworkProfiles: ["ORCID"],
    },
  },

  7: {
    teacherId: 7,
    education: {
      university: "Technical University of Gabrovo",
      major: "Applied Mathematics and Informatics",
      academicDegrees: [
        {
          degree: "MSc",
          dissertationTitle: "Bayesian methods for short-term electricity load forecasting",
          dateAcquired: "2019",
          scientificSpecialty: "Applied Mathematics",
        },
      ],
      academicTitles: [],
    },
    teachingActivity: {
      bachelorsCourses: ["Numerical Methods", "Probability and Statistics", "Mathematics I/II"],
      mastersCourses: ["Data Mining and Big Data Analytics"],
      phdCourses: [],
    },
    foreignLanguages: [
      { languageName: "English", readingLevel: "C1", writingLevel: "B2", speakingLevel: "B2" },
      { languageName: "French", readingLevel: "B1", writingLevel: "A2", speakingLevel: "A2" },
    ],
    workExperience: [
      {
        periodFrom: "2019",
        periodTo: "present",
        organization: "Technical University of Gabrovo",
        position: "Assistant",
        description: "Teaching mathematics and statistics courses for engineering programmes; consultant for statistical methodology in diploma theses.",
      },
      {
        periodFrom: "2018",
        periodTo: "2019",
        organization: "EnergoPro Grid",
        position: "Intern Analyst",
        description: "Load forecasting experiments on regional consumption data.",
      },
    ],
    professionalCompetences: {
      programmingLanguages: [
        { language: "R", proficiencyLevel: "Expert" },
        { language: "Python", proficiencyLevel: "Advanced" },
      ],
      technologies: ["Jupyter", "Power BI"],
      frameworks: ["pandas", "ggplot2"],
      databases: ["PostgreSQL"],
    },
    memberships: [
      { organization: "Bulgarian Statistical Association", membershipType: "Junior Member", period: "2021 – present" },
    ],
    projectParticipations: [
      {
        projectName:
          "Methods and Algorithms for Intelligent Data Processing in Cyber-Physical Systems",
        period: "2024 – 2027",
        fundingOrganization: "Bulgarian National Science Fund",
        projectRole: "Participant — statistical modelling",
      },
    ],
    publications: {
      indicators: { numberOfScientificArticles: 8, numberOfInternationalReports: 3, numberOfNationalReports: 5 },
      booksAndTextbooks: [],
      selectedPublications: [
        {
          authors: "Peneva V., Ivanov R.",
          title: "Ensemble feature selection for high-dimensional sensor data streams",
          publicationOrConference: "UNITECH Proceedings, Section Computer Informatics",
          year: "2024",
        },
        {
          authors: "Georgieva E., Peneva V.",
          title: "Improving first-year programming outcomes through automated assessment tools",
          publicationOrConference: "Annual University Scientific Session, TU — Gabrovo",
          year: "2023",
        },
      ],
    },
    citations: { citationsByForeignAuthors: 5, citationsByBulgarianAuthors: 11, totalCitations: 16 },
    achievements: {
      awardsAndHonors: [],
      reviewerActivity: [],
      editorialBoards: [],
      certificates: ["SAS Certified Statistical Business Analyst, 2022"],
    },
    contacts: {
      phoneNumbers: ["+359 66 827 283"],
      emails: ["v_peneva@tugab.bg"],
      researchNetworkProfiles: ["Google Scholar", "ORCID"],
    },
  },
};
