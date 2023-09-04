import { Dispatch, FC, SetStateAction } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { IAlbum } from '../types';

export interface ModalResultsProps {
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
  ALBUMS: IAlbum[];
}

export const ModalResults: FC<ModalResultsProps> = ({ showResults, setShowResults, ALBUMS }) => {
  return (
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
  );
};
