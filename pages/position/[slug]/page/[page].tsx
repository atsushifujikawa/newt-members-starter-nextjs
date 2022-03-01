import { Home, HomeProps } from "../../../../components/Home";
import {
  fetchApp,
  fetchMembers,
  fetchPositions,
  getPages,
} from "../../../../lib/api";

export default function CategoryPage(props: HomeProps) {
  return <Home {...props} />;
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string; page: string };
}): Promise<{ props: HomeProps }> {
  const { slug, page } = params;
  const app = await fetchApp();
  const positions = await fetchPositions();

  const position = positions.find((_category) => _category.slug === slug);
  const { members, total } = position
    ? await fetchMembers({
        position: position._id,
        page: Number(page) || 1,
      })
    : { members: [], total: 0 };
  return {
    props: {
      app,
      positions,
      members,
      total,
      positionSlug: slug,
    },
  };
}

export async function getStaticPaths() {
  const positions = await fetchPositions();
  const paths: { params: { slug: string; page: string } }[] = [];
  await positions.reduce(async (prevPromise, position) => {
    await prevPromise;
    const pages = await getPages({
      position: position._id,
    });
    pages.forEach((page) => {
      paths.push({
        params: {
          slug: position.slug,
          page: page.number.toString(),
        },
      });
    });
  }, Promise.resolve());

  return {
    paths,
    fallback: "blocking",
  };
}
