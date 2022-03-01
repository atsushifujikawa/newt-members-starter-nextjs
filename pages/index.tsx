import { fetchApp, fetchMembers, fetchPositions } from "../lib/api";
import { Home, HomeProps } from "../components/Home";

export default function TopPage(props: HomeProps) {
  return <Home {...props} />;
}

export async function getStaticProps() {
  const app = await fetchApp();
  const positions = await fetchPositions();
  const { members, total } = await fetchMembers();
  return {
    props: {
      app,
      positions,
      members,
      total,
    },
  };
}
