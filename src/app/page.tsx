import ApolloClientProvider from "@/components/ApolloClientProvider";
import { Button } from "@/components/ui/button";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";

const GET_HERO = gql(`{ getRandomFact }`)

const Home = async () => {
  const { data } = await client.query({
    query: GET_HERO
  });
  console.log("🚀 ~ Home ~ data:", data)
  return (
    <>
      <ApolloClientProvider>
      <div className="flex flex-row justify-center items-center w-screen h-screen">
        <Button>
          Fun fact!
        </Button>
      </div>
      </ApolloClientProvider>
    </>
  );
}

export default Home
