import './App.css';
import { useEffect, useState } from 'react';
import { Card, Button, Modal, Table } from 'react-bootstrap';

export interface IAlbum {
  id: number;
  title: string;
  band: string;
  cover: string;
  picks: number;
  votes: number;
  link: string;
  genre: string[];
}

export const ALBUMS: IAlbum[] = [
  {
    id: 0,
    title: 'The Death We Seek',
    band: 'Currents',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/23/71/d0/2371d0e0-8994-a3ec-b0e9-e829aa956d0a/cover.jpg/600x600bf-60.jpg',
    picks: 0,
    votes: 0,
    link: 'https://www.youtube.com/embed/QeVRtCXbkhs?si=o07wc8AF9r_VIVu6',
    genre: ['metalcore', 'deathcore', 'djent'],
  },
  {
    id: 1,
    title: '72 Seasons',
    band: 'Metallica',
    cover: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b5/Metallica-72-Seasons.png/800px-Metallica-72-Seasons.png',
    picks: 0,
    votes: 0,
    link: 'https://www.youtube.com/embed/1OeC9CGtWcM?si=m8pLpoEB2OkZNeU4',
    genre: ['thrash', 'heavy', 'metal'],
  },
  {
    id: 2,
    title: 'The Wonders Still Awaiting',
    band: 'Xandria',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/52/96/2052963c-6494-f57b-72c9-24ba4d486047/840588168637.jpg/600x600bf-60.jpg',
    picks: 0,
    votes: 0,
    link: 'https://www.youtube.com/embed/xHtSElUma6E?si=ICmZ09j0il3OHFpj',
    genre: ['symphonic', 'gothic', 'metal'],
  },
];

const getRandomAlbums = () => {
  const randomIndexes: number[] = [];
  while (randomIndexes.length < 2) {
    const randomIndex = Math.floor(Math.random() * ALBUMS.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }
  const randomAlbums = randomIndexes.map((index) => {
    ALBUMS[index].picks++;
    return ALBUMS[index];
  });
  return randomAlbums;
};

function App() {
  const [randomAlbums, setRandomAlbums] = useState<IAlbum[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAlbumLink, setSelectedAlbumLink] = useState('');
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
      <div className="row">
        {randomAlbums.map((album, index) => (
          <div className="col-md-6" key={album.id}>
            <Card>
              <Card.Img variant="top" src={album.cover} />
              <Card.Body>
                <Card.Title>{album.title}</Card.Title>
                <Card.Text>{album.band}</Card.Text>
                <Card.Text>Genres: {album.genre.join(', ')}</Card.Text>
                <Button onClick={() => handleVote(index)}>Vote</Button>
                <Button onClick={() => openPopup(album.link)}>Open Popup</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          <Button onClick={openResultsModal}>Show Results</Button>
        </div>
      </div>
      <Modal show={showResults} onHide={() => setShowResults(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Album</th>
                <th>Votes</th>
                <th>WR, %</th>
              </tr>
            </thead>
            <tbody>
              {ALBUMS.map((album) => (
                <tr key={album.id}>
                  <td>{`${album.title} - ${album.band}`}</td>
                  <td>{album.votes}</td>
                  <td>{((album.votes / album.picks) * 100 || 0).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
