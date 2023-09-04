import { FC } from 'react';
import { AlbumCardProps } from '../types';
import { Card, Button } from 'react-bootstrap';

export const AlbumCard: FC<AlbumCardProps> = ({ album, index, handleVote, openPopup }) => {
  return (
    <div className="col-md-6">
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
  );
};
