import ContentLoader from 'react-content-loader'; 
import styles from "./LoaderIdioms.module.css"

export default function LoaderIdioms() {
  return (
  <div className={styles.container}>
    <ContentLoader speed={1.2} backgroundColor="#e7e7e7" foregroundColor="#f3f3f3" height={180}> 
        {/* Title */}
        <rect x="0"   y="0"  rx="4" ry="4" width="260" height="18" />

        {/* Action icons (speaker / bookmark) */}
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

        {/* Read more -> (кнопка+стрелка справа внизу) */}
        <rect x="520" y="152" rx="7" ry="7" width="96" height="14" />
        <rect x="620" y="154" rx="5" ry="5" width="10" height="10" />
    </ContentLoader>

    <ContentLoader speed={1.2} backgroundColor="#e7e7e7" foregroundColor="#f3f3f3" height={180}> 
        {/* Title */}
        <rect x="0"   y="0"  rx="4" ry="4" width="260" height="18" />

        {/* Action icons (speaker / bookmark) */}
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

        {/* Read more -> (кнопка+стрелка справа внизу) */}
        <rect x="520" y="152" rx="7" ry="7" width="96" height="14" />
        <rect x="620" y="154" rx="5" ry="5" width="10" height="10" />
    </ContentLoader>

    <ContentLoader speed={1.2} backgroundColor="#e7e7e7" foregroundColor="#f3f3f3" height={180}> 
        {/* Title */}
        <rect x="0"   y="0"  rx="4" ry="4" width="260" height="18" />

        {/* Action icons (speaker / bookmark) */}
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

        {/* Read more -> (кнопка+стрелка справа внизу) */}
        <rect x="520" y="152" rx="7" ry="7" width="96" height="14" />
        <rect x="620" y="154" rx="5" ry="5" width="10" height="10" />
    </ContentLoader>

  </div>

  );
}
