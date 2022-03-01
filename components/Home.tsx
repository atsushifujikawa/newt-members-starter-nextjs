import { AppMeta, Content } from "newt-client-js";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Cover } from "../components/Cover";
import { Layout } from "../components/Layout";
import { Dropdown } from "../components/Dropdown";
import { ArticleCard } from "../components/ArticleCard";
import { Pagination } from "../components/Pagination";
import { Position } from "../types/position";
import { Member } from "../types/member";

export interface HomeProps {
  app: AppMeta;
  positions: (Content & Position)[];
  members: (Content & Member)[];
  total: number;
  page?: number;
  positionSlug?: string;
}

export function Home({
  app,
  positions,
  members,
  total,
  page = 1,
  positionSlug = "",
}: HomeProps) {
  return (
    <Layout app={app}>
      <Head>
        <title>{app?.name || app?.uid || ""}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {app.cover?.value && <Cover app={app} />}
      <div className={styles.Articles}>
        <Dropdown positions={positions} selected={positionSlug} />
        <div className={styles.Inner}>
          {members.map((member) => (
            <ArticleCard member={member} key={member._id} />
          ))}
        </div>
        <Pagination
          total={total}
          current={page}
          basePath={positionSlug ? `/position/${positionSlug}` : ``}
        />
      </div>
    </Layout>
  );
}
