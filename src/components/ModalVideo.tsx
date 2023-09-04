import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { ModalVideoProps } from '../types';

export const ModalVideo: FC<ModalVideoProps> = ({ showPopup, setShowPopup, selectedAlbumLink }) => {
  return (
    <Modal show={showPopup} onHide={() => setShowPopup(false)}>
      <Modal.Body>
        <iframe
          width="100%"
          height="272px"
          src={selectedAlbumLink}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Modal.Body>
    </Modal>
  );
};
