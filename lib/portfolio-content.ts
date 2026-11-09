import rawPortfolioContent from "../data/portfolio.json";

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  portraitImage?: string;
  portraitAlt?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl?: string;
  liveUrl: string;
  previewImage?: string;
  previewAlt?: string;
}

export interface ExperienceRecord {
  id: string;
  employer: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface PortfolioContent {
  profile: Profile;
  projects: Project[];
  experience: ExperienceRecord[];
  certifications: Certification[];
  contact: {
    email: string;
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function objectAt(
  value: unknown,
  path: string,
  requiredKeys: string[],
  optionalKeys: string[] = [],
): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  for (const key of requiredKeys) {
    if (!(key in value)) {
      throw new Error(`${path}.${key} is required.`);
    }
  }
  for (const key of Object.keys(value)) {
    if (!requiredKeys.includes(key) && !optionalKeys.includes(key)) {
      throw new Error(`${path}.${key} is not a supported field.`);
    }
  }

  return value;
}

function nonEmptyString(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${path} must be a non-empty string.`);
  }
  return value.trim();
}

function httpsUrl(value: unknown, path: string, hostname?: string): string {
  const text = nonEmptyString(value, path);
  let url: URL;
  try {
    url = new URL(text);
  } catch {
    throw new Error(`${path} must be a valid HTTPS URL.`);
  }

  if (
    url.protocol !== "https:" ||
    (hostname && url.hostname !== hostname) ||
    (hostname === "github.com" &&
      url.pathname.split("/").filter(Boolean).length < 2) ||
    url.username ||
    url.password
  ) {
    throw new Error(
      `${path} must be an HTTPS URL${hostname ? ` on ${hostname}` : ""}.`,
    );
  }
  return text;
}

function localImagePath(value: unknown, path: string): string {
  const imagePath = nonEmptyString(value, path);
  if (
    !imagePath.startsWith("/images/") ||
    imagePath.includes("\\") ||
    imagePath.split("/").includes("..")
  ) {
    throw new Error(`${path} must be a root-relative path under /images/.`);
  }
  return imagePath;
}

function monthDate(value: unknown, path: string): string {
  const date = nonEmptyString(value, path);
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(date)) {
    throw new Error(`${path} must use YYYY-MM format.`);
  }
  return date;
}

function uniqueIds<T extends { id: string }>(items: T[], path: string) {
  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) {
      throw new Error(`${path} contains duplicate id "${item.id}".`);
    }
    ids.add(item.id);
  }
}

function parseProject(value: unknown, index: number): Project {
  const path = `projects[${index}]`;
  const project = objectAt(
    value,
    path,
    ["id", "name", "description", "liveUrl"],
    ["githubUrl", "previewImage", "previewAlt"],
  );
  const githubUrl =
    project.githubUrl === undefined || project.githubUrl === ""
      ? undefined
      : httpsUrl(project.githubUrl, `${path}.githubUrl`, "github.com");
  const previewImage =
    project.previewImage === undefined
      ? undefined
      : localImagePath(project.previewImage, `${path}.previewImage`);
  const previewAlt =
    project.previewAlt === undefined
      ? undefined
      : nonEmptyString(project.previewAlt, `${path}.previewAlt`);

  if ((previewImage === undefined) !== (previewAlt === undefined)) {
    throw new Error(`${path}.previewImage and ${path}.previewAlt must be provided together.`);
  }

  return {
    id: nonEmptyString(project.id, `${path}.id`),
    name: nonEmptyString(project.name, `${path}.name`),
    description: nonEmptyString(project.description, `${path}.description`),
    liveUrl: httpsUrl(project.liveUrl, `${path}.liveUrl`),
    ...(githubUrl ? { githubUrl } : {}),
    ...(previewImage && previewAlt ? { previewImage, previewAlt } : {}),
  };
}

function parseExperience(value: unknown, index: number): ExperienceRecord {
  const path = `experience[${index}]`;
  const record = objectAt(
    value,
    path,
    [
      "id",
      "employer",
      "title",
      "location",
      "startDate",
      "endDate",
      "description",
    ],
  );
  const endDate: string | null =
    record.endDate === null
      ? null
      : monthDate(record.endDate, `${path}.endDate`);

  return {
    id: nonEmptyString(record.id, `${path}.id`),
    employer: nonEmptyString(record.employer, `${path}.employer`),
    title: nonEmptyString(record.title, `${path}.title`),
    location: nonEmptyString(record.location, `${path}.location`),
    startDate: monthDate(record.startDate, `${path}.startDate`),
    endDate,
    description: nonEmptyString(record.description, `${path}.description`),
  };
}

function parseCertification(value: unknown, index: number): Certification {
  const path = `certifications[${index}]`;
  const record = objectAt(
    value,
    path,
    ["id", "name", "issuer", "date"],
    ["credentialUrl"],
  );
  const credentialUrl =
    record.credentialUrl === undefined
      ? undefined
      : httpsUrl(record.credentialUrl, `${path}.credentialUrl`);

  return {
    id: nonEmptyString(record.id, `${path}.id`),
    name: nonEmptyString(record.name, `${path}.name`),
    issuer: nonEmptyString(record.issuer, `${path}.issuer`),
    date: monthDate(record.date, `${path}.date`),
    ...(credentialUrl ? { credentialUrl } : {}),
  };
}

function parseEmail(value: unknown, path: string): string {
  const email = nonEmptyString(value, path);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(`${path} must be a valid email address.`);
  }
  return email;
}

export function validatePortfolioContent(input: unknown): PortfolioContent {
  const content = objectAt(
    input,
    "portfolio",
    ["profile", "projects", "experience", "certifications", "contact"],
  );
  const profile = objectAt(
    content.profile,
    "profile",
    ["name", "tagline", "bio"],
    ["portraitImage", "portraitAlt"],
  );
  const contact = objectAt(content.contact, "contact", ["email"]);
  const portraitImage =
    profile.portraitImage === undefined
      ? undefined
      : localImagePath(profile.portraitImage, "profile.portraitImage");
  const portraitAlt =
    profile.portraitAlt === undefined
      ? undefined
      : nonEmptyString(profile.portraitAlt, "profile.portraitAlt");

  if ((portraitImage === undefined) !== (portraitAlt === undefined)) {
    throw new Error(
      "profile.portraitImage and profile.portraitAlt must be provided together.",
    );
  }

  if (!Array.isArray(content.projects) || content.projects.length !== 3) {
    throw new Error("projects must contain exactly three entries.");
  }
  if (!Array.isArray(content.experience)) {
    throw new Error("experience must be an array.");
  }
  if (!Array.isArray(content.certifications)) {
    throw new Error("certifications must be an array.");
  }

  const projects = content.projects.map(parseProject);
  const experience = content.experience.map(parseExperience);
  const certifications = content.certifications.map(parseCertification);
  uniqueIds(projects, "projects");
  uniqueIds(experience, "experience");
  uniqueIds(certifications, "certifications");

  return {
    profile: {
      name: nonEmptyString(profile.name, "profile.name"),
      tagline: nonEmptyString(profile.tagline, "profile.tagline"),
      bio: nonEmptyString(profile.bio, "profile.bio"),
      ...(portraitImage && portraitAlt ? { portraitImage, portraitAlt } : {}),
    },
    projects,
    experience,
    certifications,
    contact: {
      email: parseEmail(contact.email, "contact.email"),
    },
  };
}

export const portfolioContent = validatePortfolioContent(rawPortfolioContent);
