import React from 'react'
import { useUserStore } from '../store/useUserStore'
import UserItem from './UserItem';

const UsersList: React.FC = () => {

  const users = useUserStore(state => state.users);

  return (
    <table className='table table-striped'>
    <thead>
      <tr>
        <th scope="col">First name</th>
        <th scope="col">Last name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Position</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user) => (
          <UserItem user={user} />
        ))
      }
      </tbody>
    </table>
  )
}

export default UsersList