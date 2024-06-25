"use client"

import ApolloClientProvider from "@/components/ApolloClientProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";

const GET_FUN_FACTS = gql(`{ getRandomFact }`)
const GET_CATEGORIES = gql(`{ getCategories }`)
const GET_RANDOM_FACT_BY_CATEGORY = gql`
  query getRandomFactByCategory($category: String!) {
    getRandomFactByCategory(category: $category)
  }
`;

const Home = () => {
  const [funFact, setFunFact] = useState('')
  const [loadingFunFact, setLoadingFunFact] = useState(true)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>('all categories')

  const fetchRandomFact = async () => {
    setLoadingFunFact(true);
    try {
      let variables = {};
      let query;
      if (selectedCategory !== 'all categories') {
        query = GET_RANDOM_FACT_BY_CATEGORY;
        variables = { category: selectedCategory };
      } else {
        query = GET_FUN_FACTS;
      }

      const { data } = await client.query({
        query,
        variables,
        fetchPolicy: 'no-cache',
      });

      if (selectedCategory !== 'all categories') {
        setFunFact(data.getRandomFactByCategory);
      } else {
        setFunFact(data.getRandomFact);
      }
    } catch (error) {
      console.error("Error fetching fun fact:", error);
      setFunFact("Failed to fetch a fun fact.");
    } finally {
      setLoadingFunFact(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await client.query({
        query: GET_CATEGORIES,
      });
      setCategories(data?.getCategories);
    }
    fetchCategories();
    fetchRandomFact();
  }, [])

  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="px-10 mb-4 text-center">{funFact}</div>
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value={'all categories'}>all categories</SelectItem>
                {categories?.map(category => <SelectItem value={category} key={category}>{category}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
          {
            loadingFunFact ? (
              <ButtonLoading />
            ) : (
              <Button onClick={fetchRandomFact}>
                Fun fact!
              </Button>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Home
