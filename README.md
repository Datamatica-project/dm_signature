<p align="center">
  <img src="public/datamatica_Logo.png" alt="DataMatica" width="80" />
</p>

<h1 align="center">DataMatica 메일 서명 생성기</h1>

<p align="center">
  임직원 정보를 입력하면 회사 표준 메일 서명 HTML을 만들어 주는 웹 도구입니다.<br />
  다우오피스 메일 서명(HTML 편집 모드)에 바로 붙여넣어 사용할 수 있습니다.
</p>

## 주요 기능

- **정보 입력과 검증**: 한글/영문 이름, 부서(목록 선택 또는 직접 입력), 직급, 휴대폰 번호, 이메일 아이디를 입력하면 형식을 검사합니다.
- **휴대폰 번호 자동 표기**: `010-1234-5678`처럼 입력하면 서명에는 `+82 (0)10-1234-5678` 형식으로 들어갑니다.
- **실시간 미리보기**: 입력할 때마다 데스크탑(860px)과 모바일(375px) 서명을 바로 보여줍니다. 데스크탑 미리보기를 누르면 원본 크기로 확인할 수 있습니다.
- **서명 HTML 생성**: 생성된 코드를 복사하거나 `.html` 파일로 내려받을 수 있습니다. 생성한 뒤 입력값을 바꾸면 다시 생성하라고 알려줍니다.
- **어디서나 같은 서명**: 서명은 하나의 HTML이고, 가로형 로고 아래에 정보를 쌓는 한 열 구조라 PC와 모바일에서 같은 순서로 보입니다. 주소는 화면이 넓으면 라벨 옆에 한 줄로, 좁으면 라벨 아래에 2줄로 표시됩니다.

웹사이트 주소, 본사/연구소 주소, 전북 사업장 주소, 로고는 고정값이라 사용자가 수정할 수 없습니다.

## 사용 방법

1. 페이지에서 내 정보를 입력하고 **서명 HTML 생성** 버튼을 누릅니다.
2. **HTML 복사** 버튼으로 코드를 복사합니다.
3. 다우오피스 메일 → 환경설정 → 서명에서 편집 방식을 **HTML**로 바꿉니다.
4. 기존 내용을 모두 지우고 붙여넣은 뒤 저장합니다.

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| 프레임워크 | Next.js 16 (App Router), React 19 |
| 언어 | TypeScript (strict) |
| 스타일 | Tailwind CSS 4, clsx, Pretendard (CDN) |
| 테스트 | Vitest |
| 코드 품질 | ESLint, Prettier (prettier-plugin-tailwindcss) |

## 시작하기

### 요구 사항

- Node.js 20.19 이상 (Next.js만 실행하려면 20.9 이상이면 충분하지만, 테스트 도구 일부가 20.19 이상을 요구합니다.)
- npm

### 설치 및 실행

```bash
git clone https://github.com/Datamatica-project/dm_signature.git
cd dm_signature
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 됩니다.

### 스크립트

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run type-check` | TypeScript 타입 검사 |
| `npm test` | 단위 테스트 1회 실행 |
| `npm run test:watch` | 테스트 watch 모드 |

## 프로젝트 구조

```
app/
├─ layout.tsx                  # 루트 레이아웃, 기본 Metadata, Pretendard
├─ globals.css                 # Tailwind 테마 토큰 (색상, 폰트)
├─ page.tsx                    # 서명 생성기 페이지 (Server Component)
└─ _signature-generator/       # 서명 생성기 기능 전용 코드
   ├─ components/              # 폼, 미리보기, 원본 크기 모달, 생성 코드 패널
   ├─ hooks/                   # 요소 크기 측정, iframe 콘텐츠 높이 측정
   ├─ lib/                     # 서명 HTML 생성, 입력 정규화, 검증 등 순수 로직과 테스트
   ├─ constants.ts             # 부서 목록, 회사 정보, 샘플 값
   └─ types.ts
public/
└─ datamatica_Logo.png         # 페이지 헤더 로고
```

## 서명 내용 수정하기

- **부서 목록, 주소, 웹사이트, 서명 로고 URL**: `app/_signature-generator/constants.ts`
- **서명 HTML 레이아웃**: `app/_signature-generator/lib/signature-html.ts`(전체 배치), `signature-sections.ts`(이름·연락처·주소)
- **입력 검증 규칙**: `app/_signature-generator/lib/validation.ts`

서명 HTML은 `<style>`과 `@media` 없이 `table` 레이아웃과 inline style만으로 작성되어 있습니다. 다우오피스 등에서 서명이 메일 본문 중간에 들어가면 `<style>`이 수신 화면에서 적용되지 않기 때문입니다. 주소의 라벨과 내용은 `display: inline-block`으로 두어 폭이 부족하면 내용이 라벨 아래로 내려갑니다. 주소는 Google 지도 링크로 감싸 Gmail 등의 자동 링크(파란 밑줄)를 막습니다. 서명의 로고는 이 프로젝트에 배포된 `https://dm-signature.vercel.app/signature/logo-horizontal.png`(`public/signature/logo-horizontal.png`)를 참조합니다.

> **주의**: 이미 보낸 메일도 이 주소에서 로고를 불러옵니다. `public/signature/` 폴더의 파일은 지우거나 이름을 바꾸지 마세요. 로고를 교체할 때는 새 파일명으로 추가하고 `constants.ts`의 `logoUrl`을 바꿉니다.

## 개발 규칙

코드 작성 규칙(주석, 스타일, 컴포넌트 분리, 접근성, 테스트, 커밋 등)은 [`CLAUDE.md`](./CLAUDE.md)를 따릅니다.
