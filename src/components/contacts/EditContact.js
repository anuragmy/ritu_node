import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContact, updateContact } from "../../actions/contactAction";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Axios from "axios";

const EditContact = () => {
  let { id } = useParams();
  const location = useLocation();
  const contact = location?.state;

  let history = useHistory();
  const dispatch = useDispatch();
  //const contact = useSelector((state) => state.contact.contact);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
    }
    dispatch(getContact(id));
  }, [contact]);

  const onUpdateContact = (e) => {
    e.preventDefault();

    const update_contact = {
      name,
      email,
      phone,
      id: contact.id,
    };

    Axios.post("http://localhost:3002/update", {
      name: name,
      email: email,
      contactNumber: phone,
    })
      .then((res) => console.log("success", res))
      .catch((err) => console.log(err));
    dispatch(updateContact(update_contact));
    history.push("/");
  };
  return (
    <div className="card border-1m shadow">
      <div className="card-header">Add a Contact</div>
      <div className="card-body">
        <form onSubmit={(e) => onUpdateContact(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button className="btn btn-warning" type="submit">
            Update Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
