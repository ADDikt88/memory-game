import { useEffect, useState } from "react";

import MemoryApp from "./MemoryApp";

export function ChampionProvider() {
  const [champions, setChampions] = useState([]);
  const [version, setVersion] = useState("");
  //const [randomChampions, setRandomChampions] = useState([]);

  useEffect(() => {
    // Step 1: Get the current version of Data Dragon
    const fetchVersion = async () => {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/api/versions.json"
      );
      const versions = await response.json();
      setVersion(versions[0]); // Latest version
    };

    // Step 2: Get the list of champions
    const fetchChampions = async () => {
      if (version) {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );
        const championData = await response.json();
        setChampions(Object.values(championData.data)); // Set champions as an array
      }
    };

    fetchVersion();
    fetchChampions();
  }, [version]);

  return (
    <div className="main-container">
      <MemoryApp champions={champions} version={version} />
    </div>
  );
}
