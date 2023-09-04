import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { IAlbum } from "../types";
import { ALBUMS } from "../utils/constants";
import { getRandomAlbums } from "../utils/utils";
import { ModalVideo } from "./ModalVideo";
import { AlbumCard } from "./AlbumCard";
import { ModalResults } from "./ModalResults";
import "./App.css";

function App() {
  const [randomAlbums, setRandomAlbums] = useState<IAlbum[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAlbumLink, setSelectedAlbumLink] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setRandomAlbums(getRandomAlbums());
  }, []);

  const handleVote = (index: number) => {
    ALBUMS[randomAlbums[index].id].votes++;
    setRandomAlbums(getRandomAlbums());
    console.log(ALBUMS);
  };

  const openPopup = (link: string) => {
    setShowPopup(true);
    setSelectedAlbumLink(link);
  };

  const openResultsModal = () => {
    setShowResults(true);
  };

  return (
    <div className="App">
      <h1>Выбери альбом!</h1>
      <div className="row">
        {randomAlbums.map((album, index) => (
          <AlbumCard
            album={album}
            key={album.id}
            index={index}
            handleVote={handleVote}
            openPopup={openPopup}
          />
        ))}
        h
      </div>

      <div className="row">
        <div className="col-md-12 text-center">
          <Button onClick={openResultsModal}>Show Results</Button>
        </div>
      </div>

      <ModalVideo
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        selectedAlbumLink={selectedAlbumLink}
      />

      <ModalResults
        showResults={showResults}
        setShowResults={setShowResults}
        ALBUMS={ALBUMS}
      />
    </div>
  );
}

export default App;
