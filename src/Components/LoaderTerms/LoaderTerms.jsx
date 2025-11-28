import styles from "./LoaderTerms.module.css";

export default function LoaderTerms() {
  return (
    <>
      {/* Скелетон для breadcrumbs — на уровне документа */}


      <div className={styles.doc}>
            <div className={styles.breadcrumbsSkeleton}>
        <span className={styles.crumbShort} />
        <span className={styles.crumbSep} />
        <span className={styles.crumbLong} />
      </div>
        <div className={styles.updatedSkeleton} />

        <div className={styles.titleSkeleton} />

        {/* Пара абзацев-скелетонов */}
        <div className={styles.paragraphSkeleton} />
        <div className={styles.paragraphSkeleton} />

        {/* Несколько блоков, похожих на заголовок + список */}
        <div className={styles.block}>
          <div className={styles.sectionTitleSkeleton} />
          <div className={styles.listItemSkeleton} />
          <div className={styles.listItemSkeleton} />
          <div className={styles.listItemSkeleton} />
        </div>

        <div className={styles.block}>
          <div className={styles.sectionTitleSkeleton} />
          <div className={styles.paragraphSkeleton} />
          <div className={styles.paragraphSkeletonShort} />
        </div>

        <div className={styles.block}>
          <div className={styles.sectionTitleSkeleton} />
          <div className={styles.listItemSkeleton} />
          <div className={styles.listItemSkeleton} />
        </div>
      </div>
    </>
  );
}
