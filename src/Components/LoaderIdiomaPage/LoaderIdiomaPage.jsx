import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./LoaderIdiomaPage.module.css";

export default function LoaderIdiomaPage() {
  return (
    <div className={styles.container}>
      {/* Desktop ≥ 1025px */}
      <div className={styles.desktop}>
        <ContentLoader
          speed={1.2}
          backgroundColor="#e7e7e7"
          foregroundColor="#f3f3f3"
          viewBox="0 0 720 720"
          width="100%"
          height={720}
        >
          {/* breadcrumbs */}
          <rect x="0" y="0" rx="3" ry="3" width="140" height="10" />
          {/* title + icons + badge */}
          <rect x="0"   y="28" rx="6" ry="6" width="420" height="34" />
          <rect x="560" y="32" rx="6" ry="6" width="24"  height="24" />
          <rect x="596" y="32" rx="6" ry="6" width="24"  height="24" />
          <rect x="632" y="32" rx="12" ry="12" width="88" height="24" />
          {/* meaning */}
          <rect x="0" y="84" rx="4" ry="4" width="90" height="12" />
          <rect x="0" y="104" rx="4" ry="4" width="600" height="12" />
          <rect x="0" y="124" rx="4" ry="4" width="560" height="12" />
          {/* analogs */}
          <rect x="0" y="154" rx="4" ry="4" width="80" height="12" />
          <rect x="0"   y="174" rx="4" ry="4" width="180" height="10" />
          <rect x="190" y="174" rx="4" ry="4" width="410" height="10" />
          <rect x="0"   y="194" rx="4" ry="4" width="180" height="10" />
          <rect x="190" y="194" rx="4" ry="4" width="340" height="10" />
          <rect x="0"   y="214" rx="4" ry="4" width="180" height="10" />
          <rect x="190" y="214" rx="4" ry="4" width="380" height="10" />
          <rect x="0"   y="234" rx="4" ry="4" width="180" height="10" />
          <rect x="190" y="234" rx="4" ry="4" width="360" height="10" />
          <rect x="0"   y="254" rx="4" ry="4" width="180" height="10" />
          <rect x="190" y="254" rx="4" ry="4" width="420" height="10" />
          {/* show more */}
          <rect x="0" y="278" rx="8" ry="8" width="96" height="14" />
          <rect x="100" y="280" rx="5" ry="5" width="10" height="10" />
          {/* examples */}
          <rect x="0" y="312" rx="4" ry="4" width="80" height="12" />
          <rect x="0"  y="334" rx="6" ry="6" width="6"  height="6" />
          <rect x="14" y="330" rx="4" ry="4" width="640" height="12" />
          <rect x="0"  y="356" rx="6" ry="6" width="6"  height="6" />
          <rect x="14" y="352" rx="4" ry="4" width="600" height="12" />
          <rect x="0"  y="378" rx="6" ry="6" width="6"  height="6" />
          <rect x="14" y="374" rx="4" ry="4" width="520" height="12" />
          {/* origin */}
          <rect x="0" y="410" rx="4" ry="4" width="60" height="12" />
          <rect x="0" y="430" rx="4" ry="4" width="640" height="12" />
          <rect x="0" y="450" rx="4" ry="4" width="610" height="12" />
          <rect x="0" y="470" rx="4" ry="4" width="520" height="12" />
          {/* synonyms */}
          <rect x="0" y="504" rx="4" ry="4" width="80" height="12" />
          <rect x="0" y="524" rx="4" ry="4" width="240" height="12" />
          <rect x="0" y="544" rx="4" ry="4" width="220" height="12" />
          <rect x="0" y="564" rx="4" ry="4" width="260" height="12" />
          {/* antonyms */}
          <rect x="0" y="598" rx="4" ry="4" width="82" height="12" />
          <rect x="0" y="618" rx="4" ry="4" width="260" height="12" />
          <rect x="0" y="638" rx="4" ry="4" width="200" height="12" />
          <rect x="0" y="658" rx="4" ry="4" width="240" height="12" />
        </ContentLoader>
      </div>

      {/* Tablet 641–1024px */}
      <div className={styles.tablet}>
        <ContentLoader
          speed={1.2}
          backgroundColor="#e7e7e7"
          foregroundColor="#f3f3f3"
          viewBox="0 0 640 840"
          width="100%"
          height={840}
        >
          {/* чуть более узкая сетка под планшет */}
          {/* breadcrumbs */}
          <rect x="0" y="0" rx="3" ry="3" width="160" height="10" />
          {/* title + icons + badge (в две строки поуже) */}
          <rect x="0"   y="24" rx="6" ry="6" width="380" height="30" />
          <rect x="0"   y="60" rx="6" ry="6" width="260" height="22" />
          <rect x="500" y="30" rx="6" ry="6" width="24" height="24" />
          <rect x="536" y="30" rx="6" ry="6" width="24" height="24" />
          <rect x="0"   y="92" rx="10" ry="10" width="110" height="22" />

          {/* meaning */}
          <rect x="0" y="128" rx="4" ry="4" width="90"  height="12" />
          <rect x="0" y="148" rx="4" ry="4" width="560" height="12" />
          <rect x="0" y="168" rx="4" ry="4" width="520" height="12" />

          {/* analogs */}
          <rect x="0" y="200" rx="4" ry="4" width="80" height="12" />
          <rect x="0"   y="222" rx="4" ry="4" width="170" height="10" />
          <rect x="180" y="222" rx="4" ry="4" width="380" height="10" />
          <rect x="0"   y="242" rx="4" ry="4" width="170" height="10" />
          <rect x="180" y="242" rx="4" ry="4" width="340" height="10" />
          <rect x="0"   y="262" rx="4" ry="4" width="170" height="10" />
          <rect x="180" y="262" rx="4" ry="4" width="360" height="10" />
          <rect x="0"   y="282" rx="4" ry="4" width="170" height="10" />
          <rect x="180" y="282" rx="4" ry="4" width="320" height="10" />

          {/* show more */}
          <rect x="0" y="308" rx="8" ry="8" width="96" height="14" />
          <rect x="100" y="310" rx="5" ry="5" width="10" height="10" />

          {/* examples */}
          <rect x="0" y="344" rx="4" ry="4" width="80" height="12" />
          <rect x="0"  y="366" rx="6" ry="6" width="6"  height="6" />
          <rect x="14" y="362" rx="4" ry="4" width="560" height="12" />
          <rect x="0"  y="388" rx="6" ry="6" width="6"  height="6" />
          <rect x="14" y="384" rx="4" ry="4" width="520" height="12" />
          <rect x="0"  y="410" rx="6" ry="6" width="6"  height="6" />
          <rect x="14" y="406" rx="4" ry="4" width="460" height="12" />

          {/* origin */}
          <rect x="0" y="442" rx="4" ry="4" width="60" height="12" />
          <rect x="0" y="462" rx="4" ry="4" width="560" height="12" />
          <rect x="0" y="482" rx="4" ry="4" width="520" height="12" />
          <rect x="0" y="502" rx="4" ry="4" width="460" height="12" />

          {/* synonyms */}
          <rect x="0" y="538" rx="4" ry="4" width="80"  height="12" />
          <rect x="0" y="558" rx="4" ry="4" width="240" height="12" />
          <rect x="0" y="578" rx="4" ry="4" width="220" height="12" />
          <rect x="0" y="598" rx="4" ry="4" width="260" height="12" />

          {/* antonyms */}
          <rect x="0" y="634" rx="4" ry="4" width="82"  height="12" />
          <rect x="0" y="654" rx="4" ry="4" width="260" height="12" />
          <rect x="0" y="674" rx="4" ry="4" width="200" height="12" />
          <rect x="0" y="694" rx="4" ry="4" width="240" height="12" />
        </ContentLoader>
      </div>

      {/* Mobile ≤ 640px */}
      <div className={styles.mobile}>
        <ContentLoader
          speed={1.2}
          backgroundColor="#e7e7e7"
          foregroundColor="#f3f3f3"
          viewBox="0 0 360 1100"
          width="100%"
          height={1100}
        >
          {/* title (две строки для переносов) */}
          <rect x="0" y="0"  rx="6" ry="6" width="280" height="22" />
          <rect x="0" y="28" rx="6" ry="6" width="200" height="18" />
          {/* icons справа от заголовка */}
          <rect x="300" y="2"  rx="6" ry="6" width="22" height="22" />
          <rect x="330" y="2"  rx="6" ry="6" width="22" height="22" />
          {/* badge под заголовком */}
          <rect x="0" y="54" rx="10" ry="10" width="110" height="20" />

          {/* Meaning */}
          <rect x="0" y="92"  rx="4" ry="4" width="80"  height="12" />
          <rect x="0" y="112" rx="4" ry="4" width="320" height="12" />
          <rect x="0" y="132" rx="4" ry="4" width="300" height="12" />

          {/* Analogs */}
          <rect x="0" y="164" rx="4" ry="4" width="70"  height="12" />
          <rect x="0" y="186" rx="4" ry="4" width="90"  height="10" />
          <rect x="100" y="186" rx="4" ry="4" width="240" height="10" />
          <rect x="0" y="204" rx="4" ry="4" width="90"  height="10" />
          <rect x="100" y="204" rx="4" ry="4" width="212" height="10" />
          <rect x="0" y="222" rx="4" ry="4" width="90"  height="10" />
          <rect x="100" y="222" rx="4" ry="4" width="240" height="10" />
          <rect x="0" y="240" rx="4" ry="4" width="90"  height="10" />
          <rect x="100" y="240" rx="4" ry="4" width="200" height="10" />
          <rect x="0" y="258" rx="4" ry="4" width="90"  height="10" />
          <rect x="100" y="258" rx="4" ry="4" width="230" height="10" />
          {/* Show more */}
          <rect x="0" y="280" rx="8" ry="8" width="92" height="14" />
          <rect x="98" y="282" rx="5" ry="5" width="10" height="10" />

          {/* Examples */}
          <rect x="0" y="314" rx="4" ry="4" width="80" height="12" />
          <rect x="0"  y="336" rx="6" ry="6" width="6" height="6" />
          <rect x="14" y="332" rx="4" ry="4" width="320" height="12" />
          <rect x="0"  y="356" rx="6" ry="6" width="6" height="6" />
          <rect x="14" y="352" rx="4" ry="4" width="300" height="12" />
          <rect x="0"  y="376" rx="6" ry="6" width="6" height="6" />
          <rect x="14" y="372" rx="4" ry="4" width="260" height="12" />

          {/* Origin */}
          <rect x="0" y="408" rx="4" ry="4" width="60" height="12" />
          <rect x="0" y="428" rx="4" ry="4" width="320" height="12" />
          <rect x="0" y="448" rx="4" ry="4" width="300" height="12" />
          <rect x="0" y="468" rx="4" ry="4" width="280" height="12" />

          {/* Synonyms */}
          <rect x="0" y="504" rx="4" ry="4" width="80" height="12" />
          <rect x="0" y="524" rx="4" ry="4" width="240" height="12" />
          <rect x="0" y="544" rx="4" ry="4" width="210" height="12" />
          <rect x="0" y="564" rx="4" ry="4" width="260" height="12" />

          {/* Antonyms */}
          <rect x="0" y="600" rx="4" ry="4" width="82" height="12" />
          <rect x="0" y="620" rx="4" ry="4" width="260" height="12" />
          <rect x="0" y="640" rx="4" ry="4" width="200" height="12" />
          <rect x="0" y="660" rx="4" ry="4" width="240" height="12" />
        </ContentLoader>
      </div>
    </div>
  );
}
