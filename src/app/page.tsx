"use client"

import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useRandomFact from "./hooks/useRandomFact";

const Home = () => {
  const { fetchRandomFact, funFact, loadingFunFact, categories, handleSelectedCategory } = useRandomFact()

  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="px-10 mb-4 text-center">{funFact}</div>
          <Select onValueChange={handleSelectedCategory}>
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
