import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
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

    await voteAlbum(albums.filter((a) => a.id === randomAlbums[index].id)[0]);
    await pickAlbum(
      albums.filter((a) => a.id === randomAlbums[1 - index].id)[0]
    );

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

  // TODO: Fix layout
  return (
    <div className="App">
      {fetching ? (
        <Spinner animation="border" />
      ) : (
        <>
          <h1 className="text-center mb-4">Выбери альбом!</h1>
          <Row>
            {randomAlbums.map((album, index) => (
              <Col xs={12} md={6} key={album.id}>
                <AlbumCard
                  album={album}
                  index={index}
                  handleVote={handleVote}
                  openPopup={openPopup}
                />
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button variant="primary" onClick={openResultsModal}>
              Show Results
            </Button>
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
