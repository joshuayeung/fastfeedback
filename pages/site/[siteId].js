import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { createFeedback } from "@/lib/db";
import Feedback from "@/components/Feedback";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();

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
  const auth = useAuth();
  const router = useRouter();
  const input = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: input.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: "pending",
    };

    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl id="comment" my={8}>
          <FormLabel>Comment</FormLabel>
          <Input ref={input} name="comment" />
          <Button mt={2} type="submit" fontWeight="medium">
            Add Comment
          </Button>
        </FormControl>
      </Box>

      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
