// ============================================================
// サイト全体の設定ファイル
// ここを編集するだけでサイト全体の情報が変わります
// ============================================================

export const siteConfig = {
  // 基本情報
  name: "Hy-ro",
  tagline: "VJ / Beatmaker / Creative Coder",
  heroDescription: "TouchDesigner, GLSL, Web — the intersection of code and live visual art.",
  ctaHeading: "Let's create something.",
  bio: "TouchDesigner, GLSL, Webの交差点でリアルタイム表現を作るクリエイター。VJ、ビートメイク、インタラクティブアート、プロダクト開発。",
  location: "Tokyo, Japan",

  // 連絡先・SNS（空文字にするとリンクが非表示になります）
  email: "",
  links: {
    github: "https://github.com/cgchiroyasu-dev",
    instagram: "https://www.instagram.com/cgchiroyasu/",
    twitter: "https://x.com/cgchiroyasu",
    youtube: "https://www.youtube.com/channel/UCMOKob27WSQi5jdRJmdawCQ",
  },

  // 使用ツール一覧（Aboutセクションに表示）
  tools: [
    "TouchDesigner",
    "GLSL",
    "React / Next.js",
    "Blender",
    "Ableton Live",
    "Unreal Engine",
    "TidalCycles",
  ],

  // 仕事依頼受付中フラグ（trueにするとAboutに表示）
  availableForWork: true,
  availableMessage: "VJ出演・映像演出・アートワーク制作のご依頼受付中",

  // Aboutセクションのスタッツ
  stats: [
    { value: '2022', label: 'Started' },
    { value: '10+', label: 'Projects' },
    { value: '5+', label: 'Live Events' },
    { value: '3', label: 'Tech Stacks' },
  ],
} as const
