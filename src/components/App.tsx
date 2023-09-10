import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { IAlbum } from "../types";
import { getRandomAlbums } from "../utils/utils";
import { ModalVideo } from "./ModalVideo";
import { AlbumCard } from "./AlbumCard";
import { ModalResults } from "./ModalResults";
import "./App.css";
import { getAlbums, pickAlbum, voteAlbum } from "../utils/api";

function App() {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [randomAlbums, setRandomAlbums] = useState<IAlbum[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAlbumLink, setSelectedAlbumLink] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    getAlbums()
      .then((albums) => {
        setAlbums(albums);
        setRandomAlbums(getRandomAlbums(albums));
      })
      .finally(() => setFetching(false));
  }, []);

  const handleVote = async (index: number) => {
    setFetching(true);
    await voteAlbum(albums[Number(randomAlbums[index].id)]);
    await pickAlbum(albums[Number(randomAlbums[1 - index].id)]);
    getAlbums()
      .then((albums) => {
        setAlbums(albums);
        setRandomAlbums(getRandomAlbums(albums));
      })
      .finally(() => setFetching(false));
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
      {fetching ? (
        <Spinner />
      ) : (
        <>
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
          </div>

          <div className="row">
            <div className="col-md-12 text-center">
              <Button onClick={openResultsModal}>Show Results</Button>
            </div>
          </div>
        </>
      )}

      <ModalVideo
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        selectedAlbumLink={selectedAlbumLink}
      />

      <ModalResults
        showResults={showResults}
        setShowResults={setShowResults}
        ALBUMS={albums}
      />
    </div>
  );
}

export default App;
