/**
 * 드림델 퀵서비스 요금 조회 서비스 인터페이스
 * 
 * 실제 회사 DB(MySQL, PostgreSQL, Oracle, REST API 등) 연동 시 
 * 아래 fetch 함수 내부의 API 엔드포인트 URL 및 쿼리 로직만 교체하시면 됩니다.
 */

export interface DongPricingRequest {
  originSido: string;      // 출발 시/도 (예: 서울특별시)
  originGungu: string;     // 출발 구/군 (예: 강남구)
  originDong: string;      // 출발 동 (예: 역삼동)
  destSido: string;        // 도착 시/도 (예: 서울특별시)
  destGungu: string;       // 도착 구/군 (예: 송파구)
  destDong: string;        // 도착 동 (예: 잠실동)
  vehicleType: "bike" | "damas" | "labo" | "van" | "truck";
}

export interface DistancePricingRequest {
  originAddress: string;   // 출발지 주소
  destAddress: string;     // 도착지 주소
  distanceKm: number;      // 거리(km)
  vehicleType: "bike" | "damas" | "labo" | "van" | "truck";
  isExpress?: boolean;     // 초특급 직행
  isNight?: boolean;       // 야간/심야
  hasHelper?: boolean;     // 상하차 지원
}

export interface PricingResult {
  basePrice: number;       // 기본 요금
  extraPrice: number;      // 거리/구간 추가 요금
  optionPrice: number;     // 특수 옵션 할증
  totalPrice: number;      // 최종 합계 금액
  estimatedMinutes: number;// 예상 소요 시간
  distanceKm?: number;     // 거리 (km)
  vehicleName: string;     // 차종명
  routeDescription: string;// 구간 요약
}

/**
 * 1. 동대동 구간별 요금 조회 (회사 DB 연동용)
 */
export async function fetchDongPrice(req: DongPricingRequest): Promise<PricingResult> {
  const vehicleNames: Record<string, string> = {
    bike: "오토바이 급행",
    damas: "다마스",
    labo: "라보",
    van: "밴 (500kg)",
    truck: "트럭 (1500kg)",
  };

  const baseRates: Record<string, number> = {
    bike: 8000,
    damas: 25000,
    labo: 35000,
    van: 40000,
    truck: 50000,
  };

  const isSameGungu = req.originGungu === req.destGungu;
  const isSameSido = req.originSido === req.destSido;

  let multiplier = 1.0;
  if (!isSameSido) multiplier = 2.2;
  else if (!isSameGungu) multiplier = 1.5;

  const base = baseRates[req.vehicleType] || 8000;
  const extra = Math.round((base * (multiplier - 1)) / 1000) * 1000;
  const total = base + extra;

  return {
    basePrice: base,
    extraPrice: extra,
    optionPrice: 0,
    totalPrice: total,
    estimatedMinutes: isSameGungu ? 25 : isSameSido ? 40 : 70,
    vehicleName: vehicleNames[req.vehicleType] || "오토바이 급행",
    routeDescription: `${req.originGungu} ${req.originDong} → ${req.destGungu} ${req.destDong}`,
  };
}

/**
 * 2. 실시간 주행 거리별 요금 조회 (회사 DB 연동용)
 */
export async function fetchDistancePrice(req: DistancePricingRequest): Promise<PricingResult> {
  const vehicleRates: Record<string, { name: string; base: number; baseKm: number; perKm: number }> = {
    bike: { name: "오토바이 급행", base: 8000, baseKm: 5, perKm: 1000 },
    damas: { name: "다마스", base: 25000, baseKm: 10, perKm: 1500 },
    labo: { name: "라보", base: 35000, baseKm: 10, perKm: 1800 },
    van: { name: "밴 (500kg)", base: 40000, baseKm: 12, perKm: 2000 },
    truck: { name: "트럭 (1500kg)", base: 50000, baseKm: 15, perKm: 2200 },
  };

  const v = vehicleRates[req.vehicleType] || vehicleRates.bike;
  const excessKm = Math.max(0, req.distanceKm - v.baseKm);
  const distanceExtra = excessKm * v.perKm;

  let optionExtra = 0;
  if (req.isExpress) optionExtra += 4000;
  if (req.isNight) optionExtra += 5000;
  if (req.hasHelper) optionExtra += 15000;

  const total = v.base + distanceExtra + optionExtra;

  return {
    basePrice: v.base,
    extraPrice: distanceExtra,
    optionPrice: optionExtra,
    totalPrice: total,
    estimatedMinutes: Math.round(req.distanceKm * 2.2 + 10),
    distanceKm: req.distanceKm,
    vehicleName: v.name,
    routeDescription: `${req.originAddress} → ${req.destAddress} (${req.distanceKm}km)`,
  };
}