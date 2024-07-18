import { useEffect, useState } from 'react';
import axios from 'axios';
import UserModal from './UserModal';

interface User {
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
        large:string
        medium:string
        thumbnail: string
      },
      email:string,
      gender: string,
      location: {
        street: {
          number: number,
          name: string,
        },
        city:string,
        state: string,
        country: string,
        postcode:string,
        coordinates: {
          latitude: string,
          longitude: string
        },
    },
}

const RandomUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('https://randomuser.me/api/?results=30');
                setUsers(res?.data?.results);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            {users.map(user => (
            <div>
              <img src={user.picture.thumbnail}/>
              <div>
                <p>{user.name.title} {user.name.first} {user.name.last}</p>
                <p>Age: {user.dob.age}</p>
                <p>Gender: {user.gender}</p>
                <p>Country: {user.location.country}</p>
              </div>
            </div>
        ))}
        <div>
            <UserModal userList={users}/>
        </div>
        </div>
    );
};

export default RandomUsers;
