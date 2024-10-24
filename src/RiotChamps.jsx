import { useEffect, useState } from "react";

import MemoryApp from "./MemoryApp";

const size = 9;

export function ChampionProvider() {
  const [champions, setChampions] = useState([]);
  const [version, setVersion] = useState("");
  const [selectedChampions, setSelectedChampions] = useState([]);

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
        const championsArray = Object.values(championData.data);
        setChampions(championsArray); // Store the full champion list
        selectRandomChampions(championsArray); // Automatically select 10 random champions after fetching the full list
      }
    };

    fetchVersion();
    fetchChampions();
  }, [version]);

  // Function to select 10 random champions
  const selectRandomChampions = (champions) => {
    const champList = shuffle(champions).slice(0, size);
    const champImgList = [];
    champList.forEach((champion) => {
      const imgChamp = {
        src: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`,
        label: champion.name,
      };
      champImgList.push(imgChamp);
    });
    console.log(champImgList);
    setSelectedChampions(champImgList); // Update the state with the selected champions
  };

  return (
    <div className="main-container">
      <MemoryApp
        selectedChampions={selectedChampions}
        version={version}
        onReselect={() => selectRandomChampions(champions)}
      />
    </div>
  );
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
