import React from 'react';
import { User } from './index';

interface UserModalProps {
  user: User;
  onClose: () => void;
}



const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {

  console.log("user", user.name.first);
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className='modal-body'>
          <div className='modal-detail'>
            <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
            <div className='user-details'>
              <h2>{user.name.title} {user.name.first} {user.name.last}</h2>
              <p>Age : {user.dob.age}</p>
              <p>Gender : {user.gender}</p>
              <p>Phone : {user.phone}</p>
              <p>Email : {user.email}</p>
            </div>
          </div>
          <div className='more-details'>
            {user.registered.date ? (
            <p>Date of Register : {user.registered.date}</p>):null}
            {user.id.value ? (
              <p>SSDID : {user.id.value}</p>
            ) : null}
            {user.location.country ? (
            <p>Country : {user.location.country}</p>):null}
            <p>Location : {user.location.street.name},{user.location.postcode}, {user.location.city}, {user.location.state}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
