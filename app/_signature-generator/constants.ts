export const DEPARTMENTS = [
  '대표이사',
  '경영지원실',
  '기업부설연구소',
  '사업개발본부',
  '솔루션개발본부',
] as const;

export const CUSTOM_DEPARTMENT = 'custom';

export const EMAIL_DOMAIN = 'datamatica.kr';

export const COMPANY = {
  website: 'https://www.datamatica.kr',
  websiteLabel: 'www.datamatica.kr',
  // 메일 수신자가 열어 보는 HTML 서명은 외부에서 접근 가능한 절대 URL이 필요하다.
  logoUrl: 'https://www.datamatica.kr/signature-logo.png',
  bundledLogoPath: '/signature-logo.png',
  headOffice: {
    label: '본사/연구소',
    lines: ['경기 성남시 분당구 판교로255번길 9-22', '우림 W-City 809-1호'],
  },
  jeonbukOffice: {
    label: '전북 사업장',
    lines: ['전북특별자치도 전주시 덕진구', '반룡로 111, 509호 (한국전자기술연구원)'],
  },
} as const;

export const SAMPLE_SIGNATURE = {
  ko: '홍길동',
  en: 'Gildong Hong',
  department: '솔루션개발본부',
  title: '연구원',
  phoneDisplay: '+82 (0)10-0000-0000',
  email: `gildong@${EMAIL_DOMAIN}`,
} as const;

export const DESKTOP_SIGNATURE_WIDTH = 860;
