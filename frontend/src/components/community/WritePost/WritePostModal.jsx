import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import FileUploader from "./FileUploader"; // Adjust the path as needed
import EmojiPickerComponent from "./EmojiPickerComponent"; // Adjust the path as needed
import LocationButton from "./LocationButton"; // Adjust the path as needed
import LocationSearchModal from "./LocationSearchModal"; // Adjust the path as needed
import MarkdownEditor from "./MarkdownEditor";

const WritePostModal = ({ show, handleClose }) => {
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const [peopleTag, setPeopleTag] = useState(""); // Assuming a simple text input for people tags
  const [placeTag, setPlaceTag] = useState(""); // Assuming a simple text input for place tags
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleAddEmoji = (emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
  };

  const handleShowLocationModal = () => setShowLocationModal(true);
  const handleCloseLocationModal = () => setShowLocationModal(false);

  const handleSaveChanges = async () => {
    const postData = new FormData();
    postData.append("content", content);
    postData.append("peopleTag", peopleTag);
    postData.append("placeTag", placeTag);
    files.forEach((file, index) => {
      postData.append(`image${index}`, file);
    });

    try {
      const response = await fetch("http://localhost/community/post", {
        method: "POST",
        body: postData,
      });

      if (response.ok) {
        console.log("Post submitted successfully");
        handleClose(); // Close the modal after successful submission
      } else {
        console.error("Failed to submit post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Write a Post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formPostContent">
            <Form.Label>Post Content</Form.Label>
            <MarkdownEditor content={content} setContent={setContent} />
          </Form.Group>

          <Form.Group controlId="formPeopleTag">
            <Form.Label>People Tag</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tag people"
              value={peopleTag}
              onChange={(e) => setPeopleTag(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPlaceTag">
            <Form.Label>Place Tag</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tag a place"
              value={placeTag}
              onChange={(e) => setPlaceTag(e.target.value)}
            />
          </Form.Group>

          <FileUploader files={files} setFiles={setFiles} />

          <EmojiPickerComponent
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            handleAddEmoji={handleAddEmoji}
          />

          <LocationButton handleShowLocationModal={handleShowLocationModal} />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>

      <LocationSearchModal
        show={showLocationModal}
        handleClose={handleCloseLocationModal}
      />
    </Modal>
  );
};

export default WritePostModal;