import Link from "next/link";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

function PageComponent() {
  const [image, setImage] = useState();
  const [btn, setBtn] = useState(false);
  const handleName = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      setImage(i);
    }
  };
  const handleSubmit = async () => {
    const body = new FormData();
    body.append("image", image);

    const response = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body,
    });
    if (response) {
      setBtn(true);
    }
  };
  return (
    <div>
      <Form.Group controlId="formFile">
        <Form.Label>Upload CSV file</Form.Label>
        <Form.Control type="file" name="image" onChange={handleName} />
      </Form.Group>
      <br />
      <button className="btn btn-primary" onClick={handleSubmit}>
        Upload
      </button>
      <br />
      <br />
      {btn && (
        <Link href="/list">
          <button className="btn btn-primary" onClick={handleSubmit}>
            View CSV Data In Table
          </button>
        </Link>
      )}
    </div>
  );
}

export default PageComponent;
