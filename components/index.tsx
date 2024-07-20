import { useEffect, useState } from 'react';
import axios from 'axios';
import UserModal from './UserModal';


export interface User {
  name: {
    title: string,
    first: string,
    last: string,
  };
  dob: {
    date: string
    age: number
  },
  picture: {
    large: string
    medium: string
    thumbnail: string
  },
  registered: {
    date: string
  }
  email: string,
  gender: string,
  phone: string,
  id: {
    value: string
  },
  location: {
    street: {
      number: number,
      name: string,
    },
    city: string,
    state: string,
    country: string,
    postcode: string,
    coordinates: {
      latitude: string,
      longitude: string
    },
  },
}

const RandomUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Function to fetch users from the API
  const fetchUsers = async (page: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get(`https://randomuser.me/api/?results=30&page=${page}`);
      const newUsers = res?.data?.results;

      if (newUsers.length > 0) {
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        if (users.length + newUsers.length >= 100) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of users on component mount
  useEffect(() => {
    fetchUsers(page);
    setPage((prevPage) => prevPage + 1);
  }, []);

  //Event handler for scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 5) {
        if (hasMore && !loading) {
          fetchUsers(page);
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, hasMore, loading]);

  //function for opening  & closing modal
  const openModal = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };


  return (
    <div className="container">
      {users?.length > 0 ? (
        <div className='random-user'>
          {users.map((user, index) => (
            <div key={index} className="userCard" onClick={() => openModal(user)}>
              <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
              <div className="card-body">
                <div className="card-title">
                  {user.name.title} {user.name.first} {user.name.last}
                </div>
                <p className="card-text">Age: {user.dob.age}</p>
                <p className="card-text">Gender: {user.gender}</p>
                <p className="card-text">Country: {user.location.country}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='no-users'>
          <p>No Users Found !!... </p>
        </div>
      )}
      <div>
        {selectedUser && (
          <UserModal user={selectedUser} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default RandomUsers;
