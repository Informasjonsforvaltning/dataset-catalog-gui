import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AppDeleteModal = ({
  modal,
  toggle,
  className,
  title,
  body,
  handleAction
}) => (
  <div>
    <Modal isOpen={modal} toggle={() => toggle} className={className}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter className="d-flex justify-content-center">
        <Button color="danger" onClick={handleAction}>
          Ja, slett datasettet
        </Button>
        <Button color="primary" onClick={toggle}>
          Nei, behold datasettet
        </Button>
      </ModalFooter>
      <ModalFooter />
    </Modal>
  </div>
);

AppDeleteModal.defaultProps = {
  modal: false,
  className: 'null',
  title: 'null',
  body: 'null'
};

AppDeleteModal.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  handleAction: PropTypes.func.isRequired
};

export default AppDeleteModal;
