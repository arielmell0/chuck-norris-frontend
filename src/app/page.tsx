"use client"

import ApolloClientProvider from "@/components/ApolloClientProvider";
import { Button } from "@/components/ui/button";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useState } from "react";

const GET_HERO = gql(`{ getRandomFact }`)

const Home = () => {
  const [funFact, setFunFact] = useState('')
  const onFunFactClick = async () => {
    const { data } = await client.query({
      query: GET_HERO,
      fetchPolicy: 'no-cache'
    });
    console.log("🚀 ~ onFunFactClick ~ data:", data.getRandomFact)
    setFunFact(data.getRandomFact)
  }
  return (
    <>
      <div className="flex flex-row justify-center items-center w-screen h-screen">
        <div className="flex flex-col justify-center items-center gap-6">
          <>{funFact}</>
          <Button onClick={onFunFactClick}>
            Fun fact!
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home
