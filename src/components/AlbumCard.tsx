import { FC } from "react";
import { AlbumCardProps } from "../types";
import { Card, Button, ButtonGroup, Badge } from "react-bootstrap";
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
          <Card.Text>
            {album.genre.map((g) => (
              <Badge key={g} pill bg="dark">{`#${g}`}</Badge>
            ))}
          </Card.Text>
          <ButtonGroup size="sm">
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
