import Link from "next/link";
import styles from "../styles/ArticleCard.module.css";
import { Content } from "newt-client-js";
import { Member } from "../types/member";

export function ArticleCard({ member }: { member: Content & Member }) {
  return (
    <article className={styles.Article}>
      <Link href={`/member/${member.slug}`}>
        <a href="#" className={styles.Article_Link}>
          <div className={styles.Article_Eyecatch}>
            {member.profileImage ? (
              <img src={member.profileImage.src} alt="" />
            ) : (
              <div className={styles.Article_EyecatchEmpty}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="#CCCCCC"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                </svg>
              </div>
            )}
          </div>
          <div className={styles.Article_Inner}>
            {member.position && (
              <p className={styles.Article_Category}>{member.position.name}</p>
            )}
            <h2 className={styles.Article_Title}>{member.fullName}</h2>
          </div>
        </a>
      </Link>
    </article>
  );
}
