import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import ArtistList from "../features/ArtistList";
import { artistSearch } from "../shared/api/artist";
import Input from "../shared/components/Input";
import Loader from "../shared/components/Loader";
import useDebounce from "../shared/hooks/useDebounce";
import Artist from "../shared/types/artist";

const Home: React.FC<RouteComponentProps> = () => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 300);
  const [results, setResults] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (debouncedValue !== "") {
      setLoading(true);
      artistSearch(debouncedValue).then(response => {
        setResults(response);
        setLoading(false);
      });
    }
  }, [debouncedValue]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <section data-testid="page-home">
      <Input value={value} onChange={onChange} placeholder="Type artist" />

      {loading && <Loader />}

      {!loading && results.length > 0 && (
        <ArtistList items={results} initialized={debouncedValue !== ""} />
      )}
    </section>
  );
};

export default Home;
