import client from "@/lib/apolloClient"
import { useEffect, useState } from "react"
import { GET_CATEGORIES, GET_FUN_FACTS, GET_RANDOM_FACT_BY_CATEGORY } from "../graphql/querys"

const useRandomFact = () => {
  const [funFact, setFunFact] = useState('')
  const [loadingFunFact, setLoadingFunFact] = useState(true)

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>('all categories')
  const handleSelectedCategory = (value: string) => setSelectedCategory(value)

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

  return { fetchRandomFact, funFact, loadingFunFact, categories, handleSelectedCategory }
}

export default useRandomFact