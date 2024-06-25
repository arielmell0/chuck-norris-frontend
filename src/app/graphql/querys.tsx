import { gql } from "@apollo/client";

export const GET_FUN_FACTS = gql(`{ getRandomFact }`)
export const GET_CATEGORIES = gql(`{ getCategories }`)
export const GET_RANDOM_FACT_BY_CATEGORY = gql`
  query getRandomFactByCategory($category: String!) {
    getRandomFactByCategory(category: $category)
  }
`;