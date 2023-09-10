import { IAlbum } from "../types";

export const getRandomAlbums = (albums: IAlbum[]): IAlbum[] => {
  const randomIndexes: number[] = [];
  while (randomIndexes.length < 2) {
    const randomIndex = Math.floor(Math.random() * albums.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }
  const randomAlbums = randomIndexes.map((index) => albums[index]);
  return randomAlbums;
};
