# 우즈벡드림 유학원 웹사이트

> 우즈벡 유학 전문 기관의 공식 웹사이트  
> 웹 디자이너와 협업하여 기획부터 프론트엔드, 백엔드, 배포까지 전체 개발 담당
---

## 프로젝트 개요

- **프로젝트명**: 우즈벡 드림 유학원 홈페이지
- **기간**: 2025.04.26 ~ 2025.06.18 (약 2개월)
- **개발 형태**: 프리랜서 외주 프로젝트
- **기여도**: 100%
- **URL**: [https://uzbekdream.co.kr](https://uzbekdream.co.kr)

---

## 사용 기술 스택

### Frontend
- React + TypeScript
- Zustand (전역 상태 관리)
- Styled-components

### Backend
- Node.js + Express
- Sequelize + MySQL
- JWT + OAuth (Naver Login)

### Infra / DevOps
- AWS EC2 (Ubuntu)
- Docker, Docker Compose
- Nginx (HTTPS, Reverse Proxy)
- GitHub Actions (CI/CD)

### 기타
- Google Analytics (GA4), Naver Analytics
- robots.txt, sitemap.xml, Open Graph

---

## 주요 기능

### 사용자
- 유학원/사무소 정보 및 이미지 슬라이드 확인
- 유학원 네이버 블로그 게시글 실시간 연동 (RSS)
- 예약 상담 신청 폼 및 제출
- 네이버 로그인 (OAuth)
- 질문 게시판 작성 (비공개글 비밀번호 설정 가능)
- Naver Map API를 통한 오시는 길 확인
- 모바일 반응형 UI 지원

### 관리자
- 메인 배너 문구 및 이미지 수정
- 블로그 RSS 연동 글 실시간 확인 및 제어
- 푸터 정보 및 오시는 길 정보 수정 (주소/전화번호/운영시간)
- 유학원·사무소 슬라이드 이미지 및 설명 관리 (TinyMCE 사용)
- 질문 게시판 글쓴이 이름 수정
- 이미지 갤러리 콘텐츠 등록 및 삭제
- 예약 상담 신청 현황 확인 및 관리

---

## 주요 화면
### 홈 화면
<img width="955" alt="스크린샷 2025-06-23 오후 5 26 48" src="https://github.com/user-attachments/assets/dc1f0867-d1d6-4c5f-b6fd-0ef2b141d034" />
<img width="955" alt="스크린샷 2025-06-23 오후 5 28 03" src="https://github.com/user-attachments/assets/de5af456-ae7b-478a-a019-86c01ce3ca3a" />
<img width="955" alt="스크린샷 2025-06-23 오후 5 28 11" src="https://github.com/user-attachments/assets/90d79e9a-c948-4986-bb9b-5506984e78b5" />

### 유학원 및 사무소 자세히보기
<img width="955" alt="스크린샷 2025-06-23 오후 5 28 59" src="https://github.com/user-attachments/assets/f52e4f66-c39a-4c17-a5d4-9a837b752261" />
<img width="955" alt="스크린샷 2025-06-23 오후 5 29 09" src="https://github.com/user-attachments/assets/7ded587b-31ac-443c-94e9-cf1bed2cfd83" />
<img width="955" alt="스크린샷 2025-06-23 오후 5 29 22" src="https://github.com/user-attachments/assets/959ad6ea-1085-4a4f-8afa-5e1a53fe81bf" />

### 질문 게시판
<img width="955" alt="스크린샷 2025-06-23 오후 5 30 03" src="https://github.com/user-attachments/assets/d4972d3f-2742-476f-b602-15e3973b44ad" />

### 예약 상담 신청
<img width="955" alt="스크린샷 2025-06-23 오후 5 30 29" src="https://github.com/user-attachments/assets/e1939dc6-ad20-4908-8965-2c8decf0db6a" />

### 이미지 갤러리
<img width="955" alt="스크린샷 2025-06-23 오후 5 30 49" src="https://github.com/user-attachments/assets/47a3dd5e-25cb-4edf-8854-7e33893155e2" />

### 오시는 길
<img width="955" alt="스크린샷 2025-06-23 오후 5 31 26" src="https://github.com/user-attachments/assets/56ec507f-dafe-4aa1-9294-4e10d755ca03" />

---

## 배포 및 운영
- AWS EC2 서버에 Docker 기반 프론트/백엔드 배포
- Nginx로 HTTPS 및 리버스 프록시 처리
- GitHub Actions로 CI/CD 자동화

---

## SEO / 검색 최적화

- 메타태그, Open Graph, favicon 설정
- sitemap.xml 및 robots.txt 작성
- Google Search Console / Naver Search Advisor 등록 완료

---

## 성과

- 실서비스 운영 중 (2025.06 기준)
- 서비스 오픈 이후 약 1주 내 Google/네이버 검색 노출 확인
- 네이버 로그인 API 검수 통과
- 클라이언트 만족도 높음
- 서비스 오픈 5일 내로 방문자 수 70명 이상 기록
<img width="955" alt="스크린샷 2025-06-23 오후 5 43 10" src="https://github.com/user-attachments/assets/543a6847-7b56-4617-9f54-0c43423950c0" />

- 준수한 LightHouse 성능 지표 확인
<img width="448" alt="스크린샷 2025-06-18 오전 5 48 36" src="https://github.com/user-attachments/assets/74df37f1-7935-4bcc-bd17-6bf314729e14" />

--- 

## 회고
- 실제 서비스를 운영하는 외주 프로젝트를 통해 SEO, 로그인 연동, CI/CD 자동화, 서버 구성 등 실전 경험을 폭넓게 습득
- 초기 배포 중 Nginx 프록시 설정 누락으로 발생한 502 오류를 직접 해결하며 서버 인프라 이해도 향상
- 클라이언트와의 주기적인 피드백 및 협업을 통해 요구사항을 반영하고 만족도를 높이는 실전 소통 능력 향상
- 관리자 기능 개발 시 TinyMCE, RSS, 이미지 업로드 처리 등 다양한 UI/UX 구성 요소를 직접 구현하며 프론트엔드 실무 능력 강화

---

## 개발자
- **이름**: 황종현 (JongHyun Hwang)
- **이메일**: jonghyun1803@naver.com
