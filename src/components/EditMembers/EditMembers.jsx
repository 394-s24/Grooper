import "./EditMembers.css";
import { useEffect, useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import getUsers from "../../firebase/getUsers";

const EditMembers = ({ showModal, setShowModal }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Members</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="edit-members-list">
          {users.map((user, id) => (
            <div className="edit-members-user" key={id}>
              <FormControl
                type="text"
                placeholder="Search"
                defaultValue={`${user.first_name} ${user.last_name}`}
              />
              <Button variant="danger">X</Button>
            </div>
          ))}
          <div className="edit-members-user">
            <div className="edit-members-placeholder" />
            <Button variant="primary">+</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditMembers;
