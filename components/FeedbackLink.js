import { Flex, Link } from "@chakra-ui/react";

const FeedbackLink = ({ siteId }) => {
  return (
    <Flex>
      <Link>Leave a comment →</Link>
      <Link>Powered by Fast Feedback</Link>
    </Flex>
  );
};

export default FeedbackLink;
