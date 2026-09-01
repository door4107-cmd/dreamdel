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
  title: "드림델 퀵서비스 | 서울·경기 퀵·화물·전국연계 운송 상담",
  description: "드림델 퀵서비스 오토바이 퀵 다마스·라보·밴·트럭 화물 전국연계 운송을 상담하고 인터넷 접수를 제공합니다",
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
    title: "드림델 퀵서비스 | 퀵·화물·전국연계 운송 상담",
    description: "오토바이 퀵부터 차량 화물과 전국연계 운송까지 운송 조건을 확인하고 상담·인터넷 접수를 이용하세요",
    url: "https://dreamdel.co.kr",
    siteName: "드림델 퀵서비스 (DREAMDEL)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/vehicles/van.jpg",
        width: 1376,
        height: 768,
        alt: "드림델 퀵서비스 대표 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "드림델 퀵서비스 | 퀵·화물·전국연계 운송 상담",
    description: "서울·경기 퀵서비스 차량 화물 전국연계 운송 상담",
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
  "description": "서울·경기 퀵서비스 차량 화물 전국연계 운송 상담 및 인터넷 접수",
  "telephone": "1588-5452",

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