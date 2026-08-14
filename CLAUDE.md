# hiroyasu — CLAUDE.md

## 概要

**Hy-ro** のパーソナルハブWebサイト。Vite + React + TypeScript + Framer Motion。
GitHub Pages で無料ホスティング。mainにpushで自動デプロイ。

**本番URL:** https://cgchiroyasu-dev.github.io/hiroyasu/
**リポジトリ:** https://github.com/cgchiroyasu-dev/hiroyasu

---

## コマンド

```bash
npm run dev      # ローカル開発 → http://localhost:5173/hiroyasu/
npm run build    # 本番ビルド（dist/ に出力）
npm run preview  # ビルド結果をローカルでプレビュー
git push         # → GitHub Actions が自動デプロイ
```

---

## ファイル構成と役割

| ファイル | 役割 |
|---------|------|
| `src/config/site.ts` | **サイト設定の唯一の場所**。名前・bio・SNS・ツール・メール・stats・heroDescription・ctaHeading を管理 |
| `src/data/works.ts` | Works セクションの作品データ |
| `src/data/lab.ts` | Lab/Archive セクションのデータ |
| `src/styles/globals.css` | デザイントークン（CSS変数）＋全コンポーネントのスタイル |
| `src/components/BlurText.tsx` | 単語ごとのblur→clear reveal アニメーション（`as` propでh1等に対応） |
| `src/components/Nav.tsx` | 固定ナビ。アクティブセクションハイライト・モバイルハンバーガーメニュー |
| `src/components/CtaSection.tsx` | 末尾CTAセクション（大見出し＋Contact/Works ボタン） |
| `src/App.tsx` | ルートコンポーネント。`MotionConfig reducedMotion="user"` で reduced motion 対応。BackToTop コンポーネント内蔵 |
| `public/` | 静的ファイル（favicon.svg・robots.txt・sitemap.xml・404.html） |
| `vite.config.ts` | `base: '/hiroyasu/'` が必須（GitHub Pages のパス設定） |
| `.github/workflows/deploy.yml` | push → build → deploy の自動パイプライン |

---

## ブランド名

- **表示名:** Hy-ro（site.ts `name`）
- **SNSアカウント:** cgchiroyasu（GitHub・Instagram・X・YouTube のハンドル）
- **旧名 "CGCひろやす"** は完全に非表示。表示箇所がないことを確認済み

---

## デザイン決定事項（変更時は引き継ぐこと）

### Design Brief
- **トーン:** Maximalist × Minimal — 削ぎ落とした構造の中に映像体験を入れる
- **差別化:** テキスト最小限、映像・作品が主役
- **カラー:** BG `#0A0A0A`, Text `#F0EDE8`, Accent `#CDFF00`（電気ライム）, Muted `#808080`（WCAG AA 準拠）
- **フォント:** `Instrument Serif italic`（大見出し・Hero・Work title）+ `Syne 800`（ラベル・Nav）+ `DM Sans`（本文）
- **スペーシング:** Fibonacci数列ベース（8, 13, 21, 34, 55, 89px）
- **グラスエフェクト:** `.liquid-glass`（blur 4px、subtle）/ `.liquid-glass-strong`（blur 50px、prominent）— Nav pill・Badge・CTAボタンに使用

### 禁止事項（Anti-AI-Slop）
- Purple-to-blueグラデーション禁止
- カード病（全コンテンツをカードに入れる）禁止
- `Inter` / `Roboto` をデフォルトフォントとして使用禁止
- `transition: all` 禁止（特定プロパティのみ指定）

---

## UX 実装済み機能

- **アクティブセクションハイライト:** Nav pill のリンクがスクロール位置に応じてハイライト（IntersectionObserver）
- **ハンバーガーメニュー（モバイル）:** 768px以下で表示。フルスクリーンオーバーレイ + serif フォントリンク + Contact CTA
- **Back to Top ボタン:** Hero を過ぎたら右下に表示。44px タッチターゲット
- **ローディング状態:** index.html にインライン CSS でスキャンラインアニメーション。React マウントで自動消去
- **Reduced Motion 対応:** `MotionConfig reducedMotion="user"` + CSS `prefers-reduced-motion` メディアクエリ

---

## SEO / メタデータ

- `<title>`: "Hy-ro — VJ / Beatmaker / Creative Coder"
- OGP: og:title, og:description, og:type, og:url, og:image, og:locale, og:site_name
- Twitter Card: summary_large_image
- JSON-LD: Person schema（name, jobTitle, sameAs, knowsAbout）
- favicon: SVG (primary) + PNG fallback links + apple-touch-icon
- robots.txt + sitemap.xml
- `<html lang="ja">`

### 未作成アセット
- `og-image.png`（1200×630px）— meta タグは設定済み、画像ファイルの作成が必要
- `favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png` — SVG は作成済み、PNG版は未作成

---

## セマンティック HTML 構造

```
h1: サイト名（Hero — BlurText as="h1"）
  h2: Selected Works（section-badge）
    h3: 各作品タイトル
  h2: Lab / Archive（section-badge）
  h2: About（section-badge）
  h2: CTA見出し
```

---

## Gotchas（ハマりポイント）

### 1. base URL は必ず `/hiroyasu/` のまま
`vite.config.ts` の `base: '/hiroyasu/'` はGitHub Pagesのパス設定。
リポジトリ名を変えたら、ここも同時に変更すること。
カスタムドメインに移行する場合は `base: '/'` に変更。

### 2. package-lock.json は必ずコミットする
GitHub Actions の `npm ci` は `package-lock.json` がないと失敗する。
`npm install` 後は必ず `package-lock.json` もコミットに含める。

### 3. CSS は globals.css に集約
CSS Modulesは使っていない。全スタイルは `src/styles/globals.css` に集約。
コンポーネントを追加するときはこのファイルにセクションを追加する。

### 4. 動画はリポジトリに入れない
動画ファイルをGitに追加するとリポジトリが肥大化する。
動画は YouTube / Vimeo に上げて URL で参照すること。

### 5. GitHub Actions の権限設定
`deploy.yml` に `permissions: pages: write, id-token: write` が必要。
これがないとデプロイが失敗する。

### 6. ハンバーガーメニューの body overflow
メニュー open 時に `document.body.style.overflow = 'hidden'` を設定。
Nav.tsx の useEffect クリーンアップで復元されるが、HMR時にリークする可能性あり。

---

## サイト構成（セクション）

| セクション | ID | 役割 |
|-----------|-----|------|
| Hero | なし | ファーストビュー。名前とタグライン |
| Works | `#works` | 主要作品一覧。タイポグラフィ主体の非カードレイアウト |
| Lab | `#lab` | 日々の実験アーカイブ。グリッドレイアウト |
| About | `#about` | プロフィール・ツール・コンタクト |
| CTA | なし | Contact / View Works ボタン |

---

## 今後の実装予定

- Hero に GLSL シェーダー（React Three Fiber + drei）
  → `src/config/site.ts` に `heroShader: 'name'` フラグを追加して切り替え可能にする
- Works 詳細モーダル（narrative・メディア表示）
- Lab の動画埋め込み（YouTube iframe / Vimeo）
- MicroCMS 連携でスマホからコンテンツ追加
- OGP 画像作成（1200×630px、パス: `public/og-image.png`）
- favicon PNG版作成（32×32, 16×16, 180×180）
- カスタムドメイン（`hiroyasu.dev` など）への移行
- Music セクション追加（Spotify / SoundCloud 埋め込み）
- Shaders セクション追加（WebGL ライブプレビュー or Shadertoy 埋め込み）

---

## コンテンツ追加の手順

```bash
# 1. データファイルを編集
#    src/data/works.ts または src/data/lab.ts

# 2. ローカルで確認
npm run dev

# 3. コミット & push → 自動デプロイ
git add src/data/works.ts
git commit -m "feat: add [作品名] to works"
git push
```
