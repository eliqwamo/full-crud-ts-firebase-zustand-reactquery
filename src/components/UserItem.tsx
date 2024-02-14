import React, { useState } from "react";
import { useMutation } from "react-query";
import { deleteUser, updateUser } from "../services/userService";
import { useUserStore, User } from "../store/useUserStore";

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const [isEditView, setIsEditView] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [position, setPosition] = useState(user.position);

  const handleDelete = () => {
    deleteUserMutation.mutate();
  };

  const deleteUserMutation = useMutation(() => deleteUser(user.id), {
    onSuccess: () => {
      useUserStore.getState().deleteUser(user.id);
    },
  });


  const updateMutation = useMutation(({id, update}: {id: string; update: Partial<Omit<User, 'id'>>}) => 
  updateUser(id, update), {
    onSuccess: () => {
      useUserStore.getState().updateUser(user.id, {
        firstName,
        lastName,
        email,
        phone,
        position
      });
      setIsEditView(false)
    }
  })


  const handleSubmit = () => {
    updateMutation.mutate({
      id: user.id,
      update: {
        firstName,
        lastName,
        email,
        phone,
        position
      }
    })
  }

  return (
    <>
      {isEditView ? (
        <>
       
          <tr>
            <td>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name@example.com"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <label>First name</label>
              </div>
            </td>
            <td>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name@example.com"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <label>Last name</label>
              </div>
            </td>
            <td>
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email address</label>
              </div>
            </td>
            <td>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name@example.com"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <label>Phone</label>
              </div>
            </td>
            <td>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name@example.com"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
                <label>Position</label>
              </div>
            </td>
            <td>
              <button onClick={handleSubmit} className="btn btn-success btn-sm">Save</button>

              <button
                onClick={() => setIsEditView(!isEditView)}
                className="btn btn-danger btn-sm">Back</button>
            </td>

          </tr>

        </>
      ) : (
        <>
          <tr>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.position}</td>
            <td>
              <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
              {" "}
              <button
                onClick={() => setIsEditView(!isEditView)}
                className="btn btn-warning btn-sm">Update</button>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default UserItem;
