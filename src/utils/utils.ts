import { ALBUMS } from './constants';

export const getRandomAlbums = () => {
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
