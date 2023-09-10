import { Dispatch, SetStateAction } from "react";

export interface IAlbum {
  id: string;
  title: string;
  band: string;
  cover: string;
  picks: number;
  votes: number;
  link: string;
  genre: string[];
}

export interface AlbumCardProps {
  album: IAlbum;
  index: number;
  handleVote: (index: number) => void;
  openPopup: (link: string) => void;
}

export interface ModalVideoProps {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  selectedAlbumLink: string;
}
