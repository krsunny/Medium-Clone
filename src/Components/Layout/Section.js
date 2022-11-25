import React, { useCallback, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Section() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <header style={{ paddingLeft: 0 }}>
        <div
          className="p-5 text-center bg-image"
          style={{
            backgroundImage:
              "url('https://cdn-images-1.medium.com/max/2400/1*P81ck71Q_5PJGkKr3YP_2w.png')",
            height: 400,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="d-flex justify-content-center align-items-center " style={{height:'260px'}}>
              <div className="text-white">
                <h1 className="mb-3">Stay curious.</h1>
                <p className="mb-2">
                  Discover stories, thinking, and expertise from writers on any
                  topic.
                </p>
                <a
                  className="btn btn-outline-light btn-lg"
                  role="button"
                  onClick={() => window.scrollTo(0, 400)}
                >
                  Start reading {`->`}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
