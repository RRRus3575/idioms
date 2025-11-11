import ContentLoader from 'react-content-loader';
import styles from "./LoaderIdioms.module.css";

/* ====== MOBILE (≈360px) ====== */
function SkeletonCardMobile() {
  return (
    <ContentLoader
      speed={1.2}
      backgroundColor="#e7e7e7"
      foregroundColor="#f3f3f3"
      viewBox="0 0 360 172"
      width="100%"
      height={172}
      preserveAspectRatio="xMinYMin meet"
      role="img"
      aria-label="Loading idiom card (mobile)"
      className={styles.mobile}
    >
      {/* title */}
      <rect x="0"   y="0"  rx="4" ry="4" width="240" height="16" />
      {/* actions (спикер/закладка) */}
      <rect x="280" y="0"  rx="5" ry="5" width="20"  height="20" />
      <rect x="312" y="0"  rx="5" ry="5" width="20"  height="20" />

      {/* Meaning label */}
      <rect x="0"   y="28" rx="3" ry="3" width="70"  height="9" />
      {/* Meaning text */}
      <rect x="0"   y="46" rx="3" ry="3" width="300" height="11" />
      <rect x="0"   y="64" rx="3" ry="3" width="320" height="11" />
      <rect x="0"   y="82" rx="3" ry="3" width="240" height="11" />

      {/* Analogs label */}
      <rect x="0"   y="104" rx="3" ry="3" width="60"  height="9" />
      {/* Analogs lines */}
      <rect x="0"   y="122" rx="3" ry="3" width="300" height="11" />
      <rect x="0"   y="140" rx="3" ry="3" width="220" height="11" />

      {/* Read more → (слева, как на скрине) */}
      <rect x="0"   y="154" rx="6" ry="6" width="110" height="14" />
      <rect x="118" y="156" rx="4" ry="4" width="8"  height="8" />
    </ContentLoader>
  );
}

/* ====== DESKTOP (резиновый 640px макет) ====== */
function SkeletonCardDesktop() {
  return (
    <ContentLoader
      speed={1.2}
      backgroundColor="#e7e7e7"
      foregroundColor="#f3f3f3"
      viewBox="0 0 640 180"
      width="100%"
      height={180}
      preserveAspectRatio="xMinYMin meet"
      role="img"
      aria-label="Loading idiom card (desktop)"
      className={styles.desktop}
    >
      {/* Title */}
      <rect x="0"   y="0"  rx="4" ry="4" width="260" height="18" />

      {/* Actions (спикер/букмарк) */}
      <rect x="560" y="0"  rx="6" ry="6" width="24"  height="24" />
      <rect x="596" y="0"  rx="6" ry="6" width="24"  height="24" />

      {/* Meaning label */}
      <rect x="0"   y="36" rx="3" ry="3" width="80"  height="10" />
      {/* Meaning text */}
      <rect x="0"   y="54" rx="3" ry="3" width="520" height="12" />
      <rect x="0"   y="74" rx="3" ry="3" width="560" height="12" />
      <rect x="0"   y="94" rx="3" ry="3" width="420" height="12" />

      {/* Analogs label */}
      <rect x="0"   y="118" rx="3" ry="3" width="70"  height="10" />
      {/* Analogs lines */}
      <rect x="0"   y="136" rx="3" ry="3" width="360" height="12" />
      <rect x="0"   y="156" rx="3" ry="3" width="300" height="12" />

      {/* Read more → (справа) */}
      <rect x="520" y="152" rx="7" ry="7" width="96" height="14" />
      <rect x="620" y="154" rx="5" ry="5" width="10" height="10" />
    </ContentLoader>
  );
}

export default function LoaderIdioms() {
  return (
    <div className={styles.container}>
      <SkeletonCardMobile />
      <SkeletonCardDesktop />
      <SkeletonCardMobile />
      <SkeletonCardDesktop />
      <SkeletonCardMobile />
      <SkeletonCardDesktop />
    </div>
  );
}
