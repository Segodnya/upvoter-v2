import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { IAlbum } from '../types';

export interface ModalResultsProps {
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
  ALBUMS: IAlbum[];
}

export const ModalResults: FC<ModalResultsProps> = ({ showResults, setShowResults, ALBUMS }) => {
  const [sortColumn, setSortColumn] = useState<string>('winrate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('desc');
    }
  };

  const sortedAlbums = ALBUMS.sort((a, b) => {
    if (sortColumn === 'album') {
      const aTitle = `${a.title} - ${a.band}`;
      const bTitle = `${b.title} - ${b.band}`;
      return sortOrder === 'asc' ? aTitle.localeCompare(bTitle) : bTitle.localeCompare(aTitle);
    } else if (sortColumn === 'votes') {
      return sortOrder === 'asc' ? a.votes - b.votes : b.votes - a.votes;
    } else if (sortColumn === 'winrate') {
      const aWinrate = (a.votes / a.picks) * 100 || 0;
      const bWinrate = (b.votes / b.picks) * 100 || 0;
      return sortOrder === 'asc' ? aWinrate - bWinrate : bWinrate - aWinrate;
    }
    return 0;
  });

  return (
    <Modal show={showResults} onHide={() => setShowResults(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered>
          <thead>
            <tr>
              <th onClick={() => handleSort('album')} style={{ cursor: 'pointer' }}>
                Album
              </th>
              <th onClick={() => handleSort('votes')} style={{ cursor: 'pointer' }}>
                Votes
              </th>
              <th onClick={() => handleSort('winrate')} style={{ cursor: 'pointer' }}>
                WR, %
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAlbums.map((album) => (
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
  );
};
