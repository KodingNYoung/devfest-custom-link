import { PageFC } from "@/utils/types";
import ChatApp from "@/components/views";

const Home: PageFC = async ({ searchParams }) => {
  const params = await searchParams;
  const apiKey = params?.apiKey as string;
  const userId = params?.userId as string | undefined;

  return apiKey ? (
    <ChatApp userId={userId} apiKey={apiKey} />
  ) : (
    <div> No API key provider</div>
  );
};

export default Home;
