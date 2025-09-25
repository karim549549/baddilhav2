export interface Country {
  code: string;
  name: string;
  flag: string;
  extension: string;
}

export const COUNTRIES: Country[] = [
  { code: "US", name: "United States", flag: "🇺🇸", extension: "+1" },
  { code: "CA", name: "Canada", flag: "🇨🇦", extension: "+1" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", extension: "+44" },
  { code: "DE", name: "Germany", flag: "🇩🇪", extension: "+49" },
  { code: "FR", name: "France", flag: "🇫🇷", extension: "+33" },
  { code: "IT", name: "Italy", flag: "🇮🇹", extension: "+39" },
  { code: "ES", name: "Spain", flag: "🇪🇸", extension: "+34" },
  { code: "AU", name: "Australia", flag: "🇦🇺", extension: "+61" },
  { code: "JP", name: "Japan", flag: "🇯🇵", extension: "+81" },
  { code: "CN", name: "China", flag: "🇨🇳", extension: "+86" },
  { code: "IN", name: "India", flag: "🇮🇳", extension: "+91" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", extension: "+55" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", extension: "+52" },
  { code: "RU", name: "Russia", flag: "🇷🇺", extension: "+7" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", extension: "+82" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", extension: "+31" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", extension: "+46" },
  { code: "NO", name: "Norway", flag: "🇳🇴", extension: "+47" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", extension: "+45" },
  { code: "FI", name: "Finland", flag: "🇫🇮", extension: "+358" },
];
