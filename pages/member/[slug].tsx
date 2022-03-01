import { AppMeta, Content } from "newt-client-js";
import { htmlToText } from "html-to-text";
import styles from "../../styles/Article.module.css";
import Head from "next/head";
import { useMemo } from "react";
import { Layout } from "../../components/Layout";
import { fetchApp, fetchMembers, fetchCurrentMember } from "../../lib/api";
import { Member } from "../../types/member";

export default function ArticlePage({
  app,
  currentMember,
}: {
  app: AppMeta;
  currentMember: (Content & Member) | null;
}) {
  const title = useMemo(() => {
    if (currentMember?.fullName) {
      return currentMember.fullName;
    }
    return app.name || app.uid || "";
  }, [app, currentMember?.fullName]);

  const description = useMemo(() => {
    if (currentMember?.profile) {
      return htmlToText(currentMember.profile).slice(0, 200);
    }
    return "";
  }, [app, currentMember?.profile]);

  const profile = useMemo(() => {
    if (currentMember?.profile) {
      return {
        __html: currentMember.profile,
      };
    }
    return {
      __html: "",
    };
  }, [currentMember?.profile]);

  return (
    <Layout app={app} containerClassName={styles.Container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className={styles.Article}>
        <div className={styles.Article_Eyecatch}>
          {currentMember.profileImage ? (
            <img
              src={currentMember.profileImage.src}
              alt=""
              width="1080"
              height="680"
            />
          ) : (
            <div className={styles.Article_EyecatchEmpty}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60px"
                height="60px"
                viewBox="0 0 24 24"
                fill="#CCCCCC"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
              </svg>
            </div>
          )}
        </div>
        {currentMember.position && (
          <p className={styles.Article_Category}>
            {currentMember.position.name}
          </p>
        )}
        <h1 className={styles.Article_Title}>
          {currentMember?.fullName || ""}
        </h1>
        <div
          className={styles.Article_Body}
          dangerouslySetInnerHTML={profile}
        ></div>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const app = await fetchApp();
  const currentMember = await fetchCurrentMember({ slug });
  return {
    props: {
      app,
      currentMember,
    },
  };
}

export async function getStaticPaths() {
  const { members } = await fetchMembers({
    limit: 1000,
  });
  return {
    paths: members.map((member) => ({
      params: {
        slug: member.slug,
      },
    })),
    fallback: "blocking",
  };
}
