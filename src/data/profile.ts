import type { ProfileInfo } from '@/types';
import macraeProfile from '@/assets/macrae-profile.jpg';

export const profileInfo: ProfileInfo = {
  name: 'Macrae Myint',
  fullName: 'Macrae (Min Hein) Myint',
  tagline: 'Web Designer & Developer — 12+ Years Design Experience',
  headline: 'I build clean, fast websites for local businesses. Based in Seattle, WA.',
  heroIntroduction:
    'Web designer and developer building products for local businesses and startups. 12 years of design discipline behind every project.',
  biography: `I'm Macrae Myint — a web designer and developer with 12+ years of design experience behind every project I ship. I started in graphic design in 2014 and spent years doing brand identity, print, and digital work for clients across Myanmar and the US. In the last few years I've moved into web development and AI systems — building production SaaS platforms, client tools, and local business websites.

Based in Redmond, WA (moving to Yangon, Myanmar in late 2026), I work with local service businesses who need a clean, fast website that actually converts visitors.

My offer: a polished single-page site built in ~48 hours, then managed for a flat monthly fee. No templates. No page builders. Just good design and clean code.`,
  location: 'Redmond, WA → Yangon, Myanmar',
  email: 'macrae@macraemyint.com',
  emailSecondary: 'macrae.xmyint@gmail.com',
  availability: 'Taking on new clients',
  socialLinks: {
    instagram: 'https://www.instagram.com/macrae_minhein/',
    twitter: 'https://x.com/macrae_minhein',
    dribbble: 'https://dribbble.com/macraexmyint',
    linkedin: 'https://www.linkedin.com/in/macraemyint-minhein',
  },
  skills: [
    {
      category: 'Web Development',
      skills: [
        { name: 'Frontend', tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
        { name: 'Backend', tools: ['Node.js', 'MongoDB Atlas', 'Supabase', 'NextAuth'] },
        { name: 'Deployment', tools: ['Vercel', 'PM2', 'Tailscale', 'GitHub'] },
      ],
    },
    {
      category: 'Design',
      skills: [
        { name: 'Branding', tools: ['Logo Design', 'Brand Identity', 'Print Design'] },
        { name: 'Digital', tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'] },
        { name: 'UI/UX', tools: ['Web Design', 'Responsive Layout', 'Design Systems'] },
      ],
    },
  ],
  experience: [
    {
      id: '1',
      title: 'Graphic Designer',
      company: "Sign Pros Inc.",
      location: 'Redmond, WA',
      period: 'Apr 2025 - Present',
      current: true,
      responsibilities: [
        'Design 15+ monthly print materials in Adobe Creative Suite with 100% brand consistency',
        'Lead client communications managing 5+ concurrent projects with 95% on-time delivery',
        'Collaborated with production team to optimize print workflows, reducing turnaround time by 20%',
        'Maintained design asset library and brand guidelines documentation for team reference',
      ],
    },
    {
      id: '2',
      title: 'Freelance Web Designer & Developer',
      company: 'Self-Employed',
      location: 'Seattle, WA',
      period: 'Dec 2020 - Present',
      current: true,
      responsibilities: [
        'Built and launched Lumino AI Studios — Myanmar-first AI SaaS with 41+ tools, Wave Pay/KBZ billing, and multi-language support',
        'Delivered SignPros Demo — production portfolio SPA with 58 real estate brand logos and FAQ chatbot',
        'Built MN Order Sync — custom order tracking tool for MN Custom Homes using OpenAI Vision API and Supabase',
        'Managed end-to-end project lifecycles from concept development through final delivery and hosting',
      ],
    },
    {
      id: '3',
      title: 'Content Creation & IT Support Specialist',
      company: 'Kairox Solutions LLC',
      location: 'Seattle, WA',
      period: 'Jan 2023 - Oct 2023',
      current: false,
      responsibilities: [
        'Created 50+ social media graphics monthly across multiple platforms (45% engagement increase)',
        'Managed IT operations for 12-person team; designed systems reducing design time by 40%',
        'Developed social media content calendar and brand messaging strategy across all channels',
      ],
    },
    {
      id: '4',
      title: 'Graphic Designer / IT Support',
      company: 'Greenland Inc',
      location: 'Seattle, WA',
      period: 'May 2022 - Dec 2022',
      current: false,
      responsibilities: [
        'Delivered 30+ design solutions managing 5+ concurrent projects for diverse client base',
        'Provided IT infrastructure support and bilingual translation services (Burmese-English)',
        'Designed and maintained comprehensive brand identity systems for multiple client accounts',
      ],
    },
    {
      id: '5',
      title: 'Course Instructor',
      company: 'iNitiate Success Co., Ltd',
      location: 'Yangon, Myanmar',
      period: 'Feb 2019 - Dec 2020',
      current: false,
      responsibilities: [
        'Created and distributed new courses in an agile education development environment',
        'Prepared and presented executive-level presentations and status reports',
        'Delivered end-student training via online LMS platforms and face-to-face sessions',
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science (Hons) in Information and Communication Technology',
      institution: 'The University of Huddersfield',
      period: 'Sep 2017 - May 2018',
      grade: 'Upper Second Class Honors · 3.8 GPA',
    },
    {
      id: '2',
      degree: 'Higher National Diploma in Computing and System Development',
      institution: 'GUSTO College',
      period: 'May 2014 - Dec 2016',
      grade: 'Merit Distinction · 3.5 GPA',
    },
  ],
  portraitImage: macraeProfile,
};
