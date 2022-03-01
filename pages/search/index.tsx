import styles from "../../styles/Search.module.css";
import { AppMeta, Content } from "newt-client-js";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "../../components/Layout";
import { fetchApp, fetchMembers } from "../../lib/api";
import { Member } from "../../types/member";
import { htmlToText } from "html-to-text";

export default function Search({ app }: { app: AppMeta }) {
  const router = useRouter();
  const { q, page } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<(Content & Member)[]>([]);
  const [total, setTotal] = useState<number>(0);

  const _page = useMemo(() => {
    return Number(page) || 1;
  }, [page]);

  useEffect(() => {
    (async () => {
      if (typeof q !== "string" || q === "") {
        return;
      }
      const { members, total } = await fetchMembers({
        search: q,
        page: _page,
        limit: 100,
        format: "text",
      });
      setMembers(members);
      setTotal(total);
      setIsLoading(true);
    })();
  }, [q, _page, router]);

  return (
    <Layout app={app} containerStyle={{ flex: 1, display: "flex" }}>
      <Head>
        <title>{app?.name || app?.uid || ""}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {members.length > 0 ? (
        <div className={styles.Search}>
          <p className={styles.Search_Text}>
            Found {total} results for your search
          </p>
          <div className={styles.Search_Results}>
            {members.map((member) => (
              <article key={member._id} className={styles.Article}>
                <Link href={`/member/${member.slug}`}>
                  <a href="#" className={styles.Article_Link}>
                    <h1 className={styles.Article_Title}>{member.fullName}</h1>
                    <p className={styles.Article_Description}>
                      {htmlToText(member.profile)}
                    </p>
                  </a>
                </Link>
              </article>
            ))}
          </div>
        </div>
      ) : (
        isLoading && (
          <div className={styles.Empty}>
            <div className={styles.Empty_Emoji}>😵</div>
            <h1 className={styles.Empty_Title}>Nothing found</h1>
            <p className={styles.Empty_Description}>
              Sorry, but nothing matched search terms…
              <br />
              Please try again with different keywords!
            </p>
          </div>
        )
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const app = await fetchApp();
  return {
    props: {
      app,
    },
  };
}
