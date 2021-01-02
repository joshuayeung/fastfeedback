import Feedback from "@/components/Feedback";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const feedback = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const sites = await getAllSites();

  console.log(
    sites.map((site) => ({
      params: {
        siteId: site.id.toString(),
      },
    }))
  );

  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  return initialFeedback.map((feedback) => (
    <Feedback key={feedback.id} {...feedback} />
  ));
};

export default SiteFeedback;
