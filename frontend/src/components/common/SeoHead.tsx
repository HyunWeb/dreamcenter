import { Helmet } from "react-helmet-async";

const SITE_URL = "https://uzbekdream.co.kr";
const SITE_NAME = "드림유학원";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SeoHeadProps {
  /** 브라우저 탭/검색결과에 노출될 페이지 타이틀 (사이트명 포함해서 작성) */
  title: string;
  /** 검색결과 스니펫에 노출될 설명 (120~160자 권장) */
  description: string;
  /** 선행 슬래시 포함 경로, 예: "/about" (메인은 "/") */
  path: string;
  /** 관리자 페이지 등 검색 노출을 막아야 하는 경우 true */
  noindex?: boolean;
  ogImage?: string;
}

// SPA 라우트별로 title/description/canonical/OG를 다르게 설정하기 위한 공통 컴포넌트.
// react-router 라우트가 늘어나면 해당 페이지 컴포넌트 상단에 이 컴포넌트만 추가하면 됨.
export default function SeoHead({
  title,
  description,
  path,
  noindex = false,
  ogImage = DEFAULT_OG_IMAGE,
}: SeoHeadProps) {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}
