import { FC } from "react";
import { AlbumCardProps } from "../types";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import "./AlbumCard.css";

export const AlbumCard: FC<AlbumCardProps> = ({
  album,
  index,
  handleVote,
  openPopup,
}) => {
  return (
    <div className="col-md-6">
      <Card className="card">
        <Card.Img variant="top" src={album.cover} />
        <Card.ImgOverlay className="card__overlay">
          <Card.Title>{album.title}</Card.Title>
          <Card.Text>{album.band}</Card.Text>
          <Card.Text>Genres: {album.genre.join(", ")}</Card.Text>
          <ButtonGroup className="me-2">
            <Button variant="success" onClick={() => handleVote(index)}>
              Vote
            </Button>
            <Button variant="danger" onClick={() => openPopup(album.link)}>
              Youtube
            </Button>
          </ButtonGroup>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};
