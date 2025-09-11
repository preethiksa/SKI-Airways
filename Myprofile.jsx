import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Row, Col, Form, Button, ProgressBar } from "react-bootstrap";

export default function Myprofile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};
  const [profile, setProfile] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:4055/api/userprofile/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
          setEditUser(data);
        })
        .catch((err) => console.error(err));
    }
  }, [userId]);

  if (!profile) return <p>Loading profile...</p>;

  const fields = [
    "firstname",
    "lastname",
    "dateofbirth",
    "mobileno",
    "address",
    "emailid",
    "city",
    "state",
    "gender",
  ];
  const filledFields = fields.filter(
    (field) => editUser[field] && editUser[field].toString().trim() !== ""
  ).length;
  const completionPercent = Math.round((filledFields / fields.length) * 100);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:4055/api/userprofile/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editUser),
        }
      );
      if (!res.ok) throw new Error("Failed to update user");
      alert("Profile updated successfully!");
      setProfile(editUser);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:4055/api/userprofile/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete user");
      alert("Profile deleted!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto" }}>
     
      <Card style={{ borderRadius: "12px", padding: "20px" }}>
        <Card.Body>
          {/* Top Progress Bar (small size) */}
          <h6 className="mb-2">Profile Completion</h6>
          <ProgressBar
            now={completionPercent}
            label={`${completionPercent}%`}
            style={{ height: "12px" }}
            className="mb-4"
          />

          {isEditing ? (
            <>
              <h4 className="mb-3">Edit Profile</h4>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={editUser.firstname || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={editUser.lastname || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Date Of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateofbirth"
                        value={editUser.dateofbirth || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobileno"
                        value={editUser.mobileno || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="emailid"
                        value={editUser.emailid || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={editUser.address || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={editUser.city || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={editUser.state || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        value={editUser.gender || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="success" onClick={handleUpdate}>
                  Update
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </>
          ) : (
            <h5 className="text-muted">
              Welcome, {profile.firstname} {profile.lastname}
            </h5>
          )}
        </Card.Body>
      </Card>

      {!isEditing && (
        <Row className="mt-4 g-3">
          {[
            // { title: "Manage Booking", path: "/manage-booking" },
            { title: "My Booking", path: "/mybooking" },
            { title: "Edit Profile", path: "edit" },
            { title: "Booking", path: "/flightbook" },
            { title: "Home", path: "/" },
          ].map((item, idx) => (
            <Col xs={6} md={3} key={idx}>
              <Card
                className="d-flex align-items-center justify-content-center shadow-sm"
                style={{
                  height: "120px",
                  borderRadius: "12px",
                  textAlign: "center",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "15px",
                }}
                onClick={() =>
                  item.path === "edit" ? setIsEditing(true) : navigate(item.path)
                }
              >
                {item.title}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
