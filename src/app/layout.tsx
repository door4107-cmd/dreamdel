import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dreamdel.co.kr"),
  title: "드림델 퀵서비스 | 서울·경기 10초 배차, 30분 안심 배송 | 오토바이·다마스·라보·밴·트럭",
  description: "대한민국 No.1 퀵서비스 드림델. 현대해상 1억원 적재물 배상책임보험 100% 가입. 오토바이 급행부터 다마스, 라보, 밴, 트럭까지 실시간 GPS 관제 및 10초 온라인 간편접수 지원.",
  keywords: [
    "드림델",
    "드림델 퀵서비스",
    "퀵서비스",
    "서울 퀵서비스",
    "강남 퀵서비스",
    "오토바이 퀵",
    "다마스 퀵",
    "라보 퀵",
    "밴 퀵서비스",
    "1톤 트럭 화물",
    "24시간 퀵서비스",
    "퀵서비스 요금조회",
    "실시간 배차",
    "용달 화물",
  ],
  authors: [{ name: "드림델 퀵서비스" }],
  creator: "드림델 퀵서비스",
  publisher: "드림델 퀵서비스",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    title: "드림델 퀵서비스 | 서울·경기 10초 배차, 30분 안심 배송",
    description: "보내시는 마음도, 닿아야 할 꿈도 가장 빠르게 전해드립니다. 현대해상 1억원 보험 가입 & 24시간 실시간 요금조회.",
    url: "https://dreamdel.co.kr",
    siteName: "드림델 퀵서비스 (DREAMDEL)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/vehicles/van.jpg",
        width: 1200,
        height: 630,
        alt: "드림델 퀵서비스 대표 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "드림델 퀵서비스 | 10초 배차, 30분 안심 배송",
    description: "서울·경기 전지역 오토바이, 다마스, 라보, 밴, 트럭 실시간 퀵서비스.",
    images: ["/images/vehicles/van.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://dreamdel.co.kr",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DeliveryService",
  "name": "드림델 퀵서비스",
  "alternateName": "DREAMDEL Quick Service",
  "url": "https://dreamdel.co.kr",
  "logo": "https://dreamdel.co.kr/images/vehicles/bike.jpg",
  "image": "https://dreamdel.co.kr/images/vehicles/van.jpg",
  "description": "서울·경기 전 지역 10초 배차, 30분 안심 도착 퀵서비스 및 용달 화물",
  "telephone": "1588-5575",
  "priceRange": "8,000원 ~",
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "서울특별시" },
    { "@type": "AdministrativeArea", "name": "경기도" },
    { "@type": "AdministrativeArea", "name": "인천광역시" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "논현동 114-14 금산빌딩 4층",
    "addressLocality": "강남구",
    "addressRegion": "서울특별시",
    "addressCountry": "KR"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#F8F9FC] text-slate-900 antialiased min-h-screen font-sans selection:bg-orange-500 selection:text-white pb-16 sm:pb-0">
        {children}
      </body>
    </html>
  );
}