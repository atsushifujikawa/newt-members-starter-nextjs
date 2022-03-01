import { Home, HomeProps } from "../../../components/Home";
import { fetchApp, fetchMembers, fetchPositions } from "../../../lib/api";

export default function CategoryPage(props: HomeProps) {
  return <Home {...props} />;
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string };
}): Promise<{ props: HomeProps }> {
  const { slug } = params;
  const app = await fetchApp();
  const positions = await fetchPositions();

  const position = positions.find((_category) => _category.slug === slug);
  const { members, total } = position
    ? await fetchMembers({
        position: position._id,
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
  return {
    paths: positions.map((position) => ({
      params: {
        slug: position.slug,
      },
    })),
    fallback: "blocking",
  };
}
