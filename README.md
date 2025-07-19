# 쿠폰 계산기

쿠폰의 조건을 입력하면 최적의 할인 금액을 계산해주는 간단한 웹 앱입니다.

## 🚀 데모

https://crowrish.github.io/coupon-calculator/

## ✨ 주요 기능

### 📱 단일 쿠폰 계산기
- **쿠폰 조건 입력**: 할인율, 최소 구매 금액, 최대 할인 금액 설정
- **빠른 입력 버튼**: 자주 사용하는 할인율(5%~50%), 구매 금액, 할인 금액을 버튼으로 빠르게 선택
- **한국어 단위 표시**: 입력한 금액을 실시간으로 한국어 단위(만원, 천원)로 표시
- **최적 할인 정보**: 구매 금액 입력 없이도 최적의 구매 전략 자동 제시
- **실시간 계산**: 구매 금액에 따른 실제 할인 금액 및 최종 결제 금액 계산
- **할인 최적화 안내**: 더 나은 할인을 받기 위한 구매 금액 제안

### 🔄 쿠폰 비교 기능
- **다중 쿠폰 입력**: 최대 3개 쿠폰을 동시에 입력하고 비교
- **최적 전략 제시**: 각 쿠폰별 최적 구매 금액과 최종 결제 금액을 자동 계산
- **순위 시스템**: 할인 효과에 따른 1위~3위 순위 표시
- **특정 금액 비교**: 원하는 구매 금액에서 각 쿠폰의 할인 효과 비교
- **가로 배치 UI**: 3개 쿠폰을 한눈에 비교할 수 있는 직관적 레이아웃

### 🎨 사용자 경험
- **모바일 최적화**: 모바일 우선 반응형 디자인
- **탭 네비게이션**: 단일 쿠폰과 쿠폰 비교 간 쉬운 전환
- **실시간 업데이트**: 입력값 변경시 즉시 결과 반영
- **소수점 반올림**: 모든 금액을 원 단위로 깔끔하게 표시

## 📱 사용 예시

### 예시 1
- 40% 할인 / 10,000원 이상 구매 / 최대 5,000원 할인
- 12,500원 구매시 → 5,000원 할인 (최적)

### 예시 2
- 10% 할인 / 10,000원 이상 구매 / 최대 3,000원 할인
- 30,000원 구매시 → 3,000원 할인 (최적)
- 10,000원 구매시 → 1,000원 할인

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript
- **스타일링**: Tailwind CSS
- **빌드 도구**: Vite
- **라우팅**: React Router DOM
- **폰트**: Pretendard
- **배포**: GitHub Pages

## 🏃‍♂️ 로컬 실행

### 필수 조건
- Node.js 20 이상
- npm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/crowrish/coupon-calculator.git
cd coupon-calculator

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 http://localhost:5173 에서 확인할 수 있습니다.

## 📦 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🚀 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

1. `main` 브랜치에 푸시
2. GitHub Actions 워크플로우 자동 실행
3. 빌드 완료 후 GitHub Pages에 배포

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── Layout.tsx          # 공통 레이아웃 컴포넌트
│   └── Navigation.tsx      # 탭 네비게이션 컴포넌트
├── pages/
│   ├── CouponCalculator.tsx  # 단일 쿠폰 계산기 페이지
│   └── CouponComparison.tsx  # 쿠폰 비교 페이지
├── App.tsx                 # 메인 앱 컴포넌트 (라우팅 설정)
├── main.tsx               # 앱 진입점
├── index.css              # Tailwind CSS 설정
└── vite-env.d.ts          # Vite 타입 정의
```

## 🎯 사용 시나리오

### 단일 쿠폰 분석
1. 할인율, 최소 구매금액, 최대 할인금액 입력
2. 최적 할인 정보 자동 확인
3. 원하는 구매 금액 입력하여 실제 할인액 계산

### 여러 쿠폰 비교
1. 최대 3개 쿠폰 정보 입력
2. 쿠폰별 최적 전략 확인 (1위~3위 순위 표시)
3. 특정 구매 금액에서의 쿠폰별 할인 효과 비교

## 🔮 향후 계획

- 쿠폰 조건 저장 기능
- 할인 히스토리 관리
- 다크 모드 지원
- PWA 지원 (오프라인 사용)

## 📄 라이선스

MIT License

## 🤝 기여하기

이슈 제보나 기능 제안은 언제든 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request