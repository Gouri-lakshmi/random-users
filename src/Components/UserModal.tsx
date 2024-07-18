import React from 'react'

const UserModal = ({userList}:any) => {
  return (
    <div>
        {userList.map((user:any)=>(
            <h5>{user.name.first}</h5>
        ))}
    </div>
  )
}

export default UserModal