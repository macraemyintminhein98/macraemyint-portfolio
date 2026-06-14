/**
 * Core TypeScript interfaces for Macrae Myint Portfolio
 */

export type ProjectCategory = 
  | 'logo-branding' 
  | 'packaging' 
  | 'social-media' 
  | 'promotional' 
  | 'certificates' 
  | 'app-mockups' 
  | 'web-apps' 
  | 'illustrations';

export type AspectRatio = 'portrait' | 'landscape' | 'square';

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: AspectRatio;
  caption?: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  result: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  coverImage: string;
  images: ProjectImage[];
  description: string;
  client?: string;
  tools?: string;
  location?: string;
  camera?: string;
  slug: string;
  dribbbleUrl?: string;
  liveUrl?: string;
  stack?: string[];
  status?: 'Live' | 'Internal' | 'Building';
  caseStudy?: CaseStudy;
}

export interface Skill {
  name: string;
  tools: string[];
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

export interface ProfileInfo {
  name: string;
  fullName: string;
  tagline: string;
  headline: string;
  heroIntroduction: string;
  biography: string;
  location: string;
  email: string;
  emailSecondary?: string;
  phone?: string;
  availability: string;
  socialLinks: {
    dribbble?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
  calendlyUrl?: string;
  skills: SkillCategory[];
  experience: WorkExperience[];
  education: Education[];
  portraitImage: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  projectType: 'design' | 'it-support' | 'both' | 'other';
  message: string;
  timestamp: Date;
}

export interface PricingTier {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}
