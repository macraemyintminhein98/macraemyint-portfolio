import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'th';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  currency: (usd: number) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

const translations: Record<string, Record<Language, string>> = {
  // Nav
  'nav.home': { en: 'Home', th: 'หน้าแรก' },
  'nav.portfolio': { en: 'Portfolio', th: 'ผลงาน' },
  'nav.about': { en: 'About', th: 'เกี่ยวกับ' },
  'nav.contact': { en: 'Contact', th: 'ติดต่อ' },
  'nav.bookNow': { en: 'Book Now', th: 'จองเลย' },
  'nav.bookConsultation': { en: 'Book Consultation', th: 'จองเลย' },

  // Hero
  'hero.customCar': { en: 'Custom Car', th: 'ภาพวาดรถยนต์' },
  'hero.illustrations': { en: 'Illustrations', th: 'สั่งทำพิเศษ' },
  'hero.currentlyDrawing': { en: 'Currently drawing:', th: 'กำลังวาด:' },
  'hero.viewPortfolio': { en: 'View Portfolio', th: 'ดูผลงาน' },

  // USP
  'usp.zeroAi': { en: 'Zero AI Used', th: 'ไม่ใช้ AI' },
  'usp.title1': { en: '100%', th: '100%' },
  'usp.title2': { en: 'Hand-Crafted', th: 'งานฝีมือ' },
  'usp.title3': { en: 'Vector Art', th: 'เวกเตอร์อาร์ต' },
  'usp.subtitle': { en: 'Every illustration is built point by point with the Pen Tool in Adobe Illustrator. No AI generation, no auto-trace, no shortcuts — just pure skill and dedication to the craft.', th: 'ทุกภาพวาดสร้างขึ้นทีละจุดด้วย Pen Tool ใน Adobe Illustrator ไม่ใช้ AI ไม่ใช้ auto-trace ไม่มีทางลัด — ทักษะและความทุ่มเทล้วนๆ' },
  'usp.penTool': { en: 'Pen Tool Only', th: 'ใช้ Pen Tool เท่านั้น' },
  'usp.penToolDesc': { en: 'Every curve, line, and shape is manually drawn using the Pen Tool — the gold standard of vector illustration.', th: 'เส้นโค้ง เส้นตรง และรูปทรงทุกชิ้นวาดด้วยมือโดยใช้ Pen Tool — มาตรฐานสูงสุดของงานเวกเตอร์' },
  'usp.vectors': { en: 'Fully Editable Vectors', th: 'เวกเตอร์แก้ไขได้ทั้งหมด' },
  'usp.vectorsDesc': { en: 'Each element is a separate editable vector block. Colors, shapes, and details can be modified individually at any time.', th: 'ทุกองค์ประกอบเป็นบล็อกเวกเตอร์ที่แก้ไขได้แยกส่วน สี รูปทรง และรายละเอียดสามารถปรับเปลี่ยนได้ตลอด' },
  'usp.scalability': { en: 'Infinite Scalability', th: 'ขยายได้ไม่จำกัด' },
  'usp.scalabilityDesc': { en: 'True vector art scales from a phone screen to a billboard without losing a single pixel of quality.', th: 'งานเวกเตอร์ของจริงขยายได้ตั้งแต่หน้าจอโทรศัพท์ถึงป้ายบิลบอร์ดโดยไม่สูญเสียคุณภาพ' },
  'usp.quote': { en: '"When you commission my work, you\'re paying for real talent and real craftsmanship"', th: '"เมื่อคุณสั่งงานของผม คุณจ่ายเพื่อฝีมือและงานคราฟต์ที่แท้จริง"' },
  'usp.quoteEnd': { en: ' — not an algorithm. Every anchor point is intentional, every detail is deliberate.', th: ' — ไม่ใช่อัลกอริทึม ทุก anchor point มีความตั้งใจ ทุกรายละเอียดมีจุดประสงค์' },

  // Portfolio
  'portfolio.featured': { en: 'Featured', th: 'ผลงาน' },
  'portfolio.work': { en: 'Work', th: 'เด่น' },
  'portfolio.subtitle': { en: 'Custom JDM illustrations, anime-inspired automotive art, and more', th: 'ภาพวาด JDM สั่งทำ ศิลปะรถยนต์สไตล์อนิเมะ และอื่นๆ' },
  'portfolio.viewAll': { en: 'View All Projects', th: 'ดูผลงานทั้งหมด' },
  'portfolio.fullDesign': { en: 'Full Design', th: 'ผลงานออกแบบ' },
  'portfolio.portfolioWord': { en: 'Portfolio', th: 'ทั้งหมด' },
  'portfolio.flipThrough': { en: 'Flip through my complete portfolio — branding, packaging, illustrations & more', th: 'เปิดดูผลงานทั้งหมดของผม — แบรนดิ้ง แพ็คเกจจิ้ง ภาพวาด และอื่นๆ' },

  // Pricing
  'pricing.title1': { en: 'Commission', th: 'แพ็คเกจ' },
  'pricing.title2': { en: 'Packages', th: 'คอมมิชชัน' },
  'pricing.subtitle': { en: 'Choose a package that fits your vision', th: 'เลือกแพ็คเกจที่เหมาะกับวิสัยทัศน์ของคุณ' },
  'pricing.mostPopular': { en: 'Most Popular', th: 'ยอดนิยม' },
  'pricing.getStarted': { en: 'Get Started', th: 'จองเลย' },

  // About
  'about.title1': { en: 'Professional', th: 'นักวาด' },
  'about.title2': { en: 'Automotive Illustrator', th: 'ภาพรถยนต์มืออาชีพ' },

  // Process
  'process.howIt': { en: 'How It', th: 'ขั้นตอน' },
  'process.works': { en: 'Works', th: 'การทำงาน' },
  'process.step': { en: 'Step', th: 'ขั้นที่' },
  'process.s1.title': { en: 'Share Your Vision', th: 'แชร์วิสัยทัศน์ของคุณ' },
  'process.s1.desc': { en: 'Send me photos of your car and describe your ideal style', th: 'ส่งรูปรถของคุณและอธิบายสไตล์ที่ต้องการ' },
  'process.s2.title': { en: 'I Create Your Art', th: 'ผมสร้างงานศิลปะของคุณ' },
  'process.s2.desc': { en: 'Hand-crafted with the Pen Tool in Adobe Illustrator — zero AI, every vector point placed by hand', th: 'วาดด้วยมือด้วย Pen Tool ใน Adobe Illustrator — ไม่ใช้ AI ทุกจุดเวกเตอร์วางด้วยมือ' },
  'process.s3.title': { en: 'Receive Your Files', th: 'รับไฟล์ของคุณ' },
  'process.s3.desc': { en: 'High-resolution, print-ready files delivered digitally', th: 'ไฟล์ความละเอียดสูง พร้อมพิมพ์ ส่งแบบดิจิทัล' },
  'process.s4.title': { en: 'Love Your Art', th: 'ชื่นชมผลงาน' },
  'process.s4.desc': { en: 'Perfect for prints, social media, merchandise, or gifts', th: 'เหมาะสำหรับพิมพ์ โซเชียลมีเดีย สินค้า หรือของขวัญ' },

  // Before/After
  'ba.title1': { en: 'From Photo to', th: 'จากรูปถ่ายสู่' },
  'ba.title2': { en: 'Art', th: 'ศิลปะ' },
  'ba.subtitle': { en: 'Drag the slider to see the transformation', th: 'ลากตัวเลื่อนเพื่อดูการเปลี่ยนแปลง' },
  'ba.yourCar': { en: 'Your Car', th: 'รถของคุณ' },
  'ba.yourIllustration': { en: 'Your Illustration', th: 'ภาพวาดของคุณ' },
  'ba.carDesc': { en: 'Reference photo you send me', th: 'รูปอ้างอิงที่คุณส่งมา' },
  'ba.illustrationDesc': { en: 'Finished hand-crafted vector art', th: 'ผลงานเวกเตอร์อาร์ตที่วาดเสร็จ' },

  // Pricing Calculator
  'calc.instantQuote': { en: 'Instant Quote', th: 'ราคาทันที' },
  'calc.title1': { en: 'Pricing', th: 'เครื่องคำนวณ' },
  'calc.title2': { en: 'Calculator', th: 'ราคา' },
  'calc.style': { en: 'Illustration Style', th: 'สไตล์ภาพวาด' },
  'calc.cars': { en: 'Number of Cars', th: 'จำนวนรถ' },
  'calc.background': { en: 'Background Type', th: 'ประเภทพื้นหลัง' },
  'calc.rush': { en: 'Rush Delivery', th: 'จัดส่งด่วน' },
  'calc.rushDesc': { en: '+50% for priority processing', th: '+50% สำหรับงานด่วน' },
  'calc.total': { en: 'Estimated Total', th: 'ราคาโดยประมาณ' },
  'calc.book': { en: 'Book This Package', th: 'จองแพ็คเกจนี้' },
  'calc.simpleOutline': { en: 'Simple Outline', th: 'ลายเส้นเรียบง่าย' },
  'calc.fullColor': { en: 'Full Color', th: 'สีเต็ม' },
  'calc.detailedScene': { en: 'Detailed Scene', th: 'ฉากละเอียด' },
  'calc.animeStyle': { en: 'Anime Style', th: 'สไตล์อนิเมะ' },
  'calc.none': { en: 'None', th: 'ไม่มี' },
  'calc.simple': { en: 'Simple', th: 'เรียบง่าย' },
  'calc.fullScene': { en: 'Full Scene', th: 'ฉากเต็ม' },
  'calc.1car': { en: '1 Car', th: '1 คัน' },
  'calc.2cars': { en: '2 Cars', th: '2 คัน' },
  'calc.3cars': { en: '3+ Cars', th: '3+ คัน' },

  // Testimonials
  'testimonials.title1': { en: 'Client', th: 'รีวิวจาก' },
  'testimonials.title2': { en: 'Reviews', th: 'ลูกค้า' },
  'testimonials.subtitle': { en: 'What fellow car enthusiasts say', th: 'เสียงจากเพื่อนๆ คนรักรถ' },

  // Quiz
  'quiz.title1': { en: "What's Your", th: 'สไตล์ของคุณ' },
  'quiz.title2': { en: 'Style?', th: 'คืออะไร?' },
  'quiz.subtitle': { en: 'Take a quick quiz to find your perfect illustration style', th: 'ทำแบบทดสอบสั้นๆ เพื่อค้นหาสไตล์ภาพวาดที่เหมาะกับคุณ' },
  'quiz.question': { en: 'Question', th: 'คำถาม' },
  'quiz.of': { en: 'of', th: 'จาก' },
  'quiz.q1': { en: 'What era do you love?', th: 'คุณชอบยุคไหน?' },
  'quiz.q2': { en: "What's your vibe?", th: 'สไตล์ของคุณคือ?' },
  'quiz.q3': { en: 'Pick a color:', th: 'เลือกสี:' },
  'quiz.resultLabel': { en: 'Your perfect style is', th: 'สไตล์ที่เหมาะกับคุณคือ' },
  'quiz.bookCommission': { en: 'Book a Commission', th: 'จองคอมมิชชัน' },
  'quiz.retake': { en: 'Retake Quiz', th: 'ทำแบบทดสอบอีกครั้ง' },

  // Commission
  'commission.wait': { en: 'Current wait: 5–7 days', th: 'รอปัจจุบัน: 5–7 วัน' },
  'commission.title1': { en: 'Request a', th: 'ส่งคำขอ' },
  'commission.title2': { en: 'Commission', th: 'คอมมิชชัน' },
  'commission.slots': { en: 'Commission Slots', th: 'ช่องคอมมิชชัน' },
  'commission.available': { en: 'available', th: 'ว่าง' },
  'commission.of': { en: 'of', th: 'จาก' },
  'commission.name': { en: 'Your Name', th: 'ชื่อของคุณ' },
  'commission.email': { en: 'Email', th: 'อีเมล' },
  'commission.carMake': { en: 'Car Make', th: 'ยี่ห้อรถ' },
  'commission.carModel': { en: 'Car Model', th: 'รุ่นรถ' },
  'commission.year': { en: 'Year', th: 'ปี' },
  'commission.color': { en: 'Car Color', th: 'สีรถ' },
  'commission.budget': { en: 'Budget Range', th: 'งบประมาณ' },
  'commission.style': { en: 'Style Preference', th: 'สไตล์ที่ชอบ' },
  'commission.background': { en: 'Background Preference', th: 'พื้นหลังที่ชอบ' },
  'commission.refPhoto': { en: 'Reference Photo', th: 'รูปอ้างอิง' },
  'commission.refPhotoDesc': { en: 'Upload a reference photo of your car (optional)', th: 'อัปโหลดรูปอ้างอิงรถของคุณ (ไม่บังคับ)' },
  'commission.notes': { en: 'Additional Notes', th: 'หมายเหตุเพิ่มเติม' },
  'commission.notesPlaceholder': { en: 'Any special requests, angles, modifications...', th: 'คำขอพิเศษ มุมมอง การดัดแปลง...' },
  'commission.submit': { en: 'Submit Commission Request', th: 'ส่งคำขอคอมมิชชัน' },
  'commission.sent': { en: 'Request Sent!', th: 'ส่งคำขอแล้ว!' },
  'commission.sentDesc': { en: "Your email client should have opened with the details. I'll get back to you within 24 hours.", th: 'อีเมลของคุณควรเปิดขึ้นพร้อมรายละเอียดแล้ว ผมจะตอบกลับภายใน 24 ชั่วโมง' },
  'commission.slotsFull': { en: 'All Slots Are Full', th: 'ช่องเต็มหมดแล้ว' },
  'commission.waitlistDesc': { en: 'Join the waitlist to be notified when a slot opens.', th: 'เข้าร่วมรายชื่อรอเพื่อรับแจ้งเตือนเมื่อมีช่องว่าง' },
  'commission.joinWaitlist': { en: 'Join Waitlist', th: 'เข้าร่วมรายชื่อรอ' },
  'commission.onWaitlist': { en: "You're on the waitlist!", th: 'คุณอยู่ในรายชื่อรอแล้ว!' },
  'commission.onWaitlistDesc': { en: "I'll notify you when a slot opens up.", th: 'ผมจะแจ้งเตือนเมื่อมีช่องว่าง' },

  // Instagram
  'ig.title1': { en: 'Latest', th: 'ผลงาน' },
  'ig.title2': { en: 'Work', th: 'ล่าสุด' },
  'ig.subtitle': { en: 'Fresh from the studio', th: 'สดๆ จากสตูดิโอ' },
  'ig.follow': { en: 'Follow for daily updates @macrae_minhein', th: 'ติดตามอัปเดตรายวัน @macrae_minhein' },

  // Contact
  'contact.readyTo': { en: 'Ready to', th: 'พร้อม' },
  'contact.commission': { en: 'Commission?', th: 'สั่งทำ?' },
  'contact.subtitle': { en: "Let's bring your dream car to life", th: 'มาทำให้รถในฝันของคุณมีชีวิตขึ้นมา' },
  'contact.contact': { en: 'Contact', th: 'ติดต่อ' },
  'contact.bookACall': { en: 'Book a Call', th: 'จองนัดคุย' },
  'contact.bookCallDesc': { en: 'Schedule a free consultation to discuss your project', th: 'นัดปรึกษาฟรีเพื่อพูดคุยเกี่ยวกับโปรเจคของคุณ' },

  // Footer
  'footer.rights': { en: 'All rights reserved.', th: 'สงวนลิขสิทธิ์' },

  // Visitor
  'visitor.viewing': { en: 'people viewing', th: 'คนกำลังดู' },

  // LINE
  'line.chatOnLine': { en: 'Chat on LINE', th: 'แชทผ่าน LINE' },
};

// Thai pricing tiers
const thaiPricingTiers = [
  {
    name: 'Bronze',
    price: 1500,
    features: [
      'ภาพรถยนต์เดี่ยว',
      'พื้นหลังเรียบง่าย',
      'ไฟล์ PNG ความละเอียดสูง',
      'ส่งใน 5-7 วัน',
      'แก้ไขได้ 1 ครั้ง',
    ],
  },
  {
    name: 'Silver',
    price: 2200,
    features: [
      'ภาพรถยนต์เดี่ยว',
      'พื้นหลังละเอียด (พระอาทิตย์ตก/เมือง/กำหนดเอง)',
      'ไฟล์ PNG + JPG',
      'ไฟล์ต้นฉบับ',
      'ส่งใน 5-7 วัน',
      'แก้ไขได้ 2 ครั้ง',
    ],
  },
  {
    name: 'Gold',
    price: 3000,
    features: [
      'รถ + ตัวละครอนิเมะ หรือสไตล์แผงมังงะ',
      'พื้นหลังกำหนดเองละเอียด',
      'ไฟล์ทุกรูปแบบ',
      'ส่งใน 7-10 วัน',
      'แก้ไขได้ 3 ครั้ง',
      'สิทธิ์เชิงพาณิชย์',
    ],
  },
  {
    name: 'Platinum',
    price: 5000,
    features: [
      'หลายมุมมอง หรือฉากซับซ้อน',
      'พื้นหลังพรีเมียมกำหนดเอง',
      'ไฟล์ทุกรูปแบบ',
      'ส่งใน 10-14 วัน',
      'แก้ไขไม่จำกัด',
      'สิทธิ์เชิงพาณิชย์',
      'จัดส่งด่วน',
    ],
  },
];

export function getThaiPricingTiers() {
  return thaiPricingTiers;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('site-language');
    return (saved === 'th' ? 'th' : 'en') as Language;
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('site-language', newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  const currency = (usd: number): string => {
    if (lang === 'th') {
      // Simple conversion display — Thai pricing is separate
      return `$${usd}`;
    }
    return `$${usd}`;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, currency }}>
      {children}
    </LanguageContext.Provider>
  );
}
