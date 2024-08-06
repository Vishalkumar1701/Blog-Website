import React, { useEffect, useState } from 'react'
import { Button, TextInput, Modal, Select, FileInput, Alert, Table, TableHeadCell, TableHead, TableBody, TableRow, TableCell, ModalHeader, ModalBody } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { app } from '../firebase';

import { useSelector } from 'react-redux';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Userdashboard = () => {

  const { currentUser } = useSelector((state) => state.user)

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('')

  const getAllUsers = async () => {
    try {
      const res = await fetch(`/api/user/getusers`);
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        setUsers(data.users);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      };
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    if (currentUser.isAdmin) {
      getAllUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/users/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {

    }
  }

  const handleDeleteUser = async () => {
    try{
      const res = await fetch(`api/user/delete/${userIdToDelete}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(res.ok){
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
        getAllUsers();
      } else {
        console.log(data.message);
      }
    }
    catch(error){
      console.log(error.message);
    }
  };

  return (
    <div className='w-full'>
      <h2 className='text-5xl my-4 font-bold px-2 dark:text-gray-300 '>Users</h2>
      <div className="overflow-x-auto w-full">
        {
          currentUser.isAdmin && users.length > 0 ? (
            <>
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Date Created</Table.HeadCell>
                  <Table.HeadCell>User Image</Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                  <Table.HeadCell>E-Mail</Table.HeadCell>
                  <Table.HeadCell>Admin</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {
                  users.map((user) => (
                    <Table.Body key={user._id} className="divide-y">
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                          <img className='w-10 h-10 rounded-full object-cover' src={user.profilePicture} alt={user.username} />
                        </Table.Cell>
                        <Table.Cell>{user.username}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.isAdmin ? <FaCheck className='text-green-500' /> : <FaTimes className='text-red-500' />}</Table.Cell>
                        <Table.Cell className='cursor-pointer' onClick={() => {
                          setShowModal(true)
                          setUserIdToDelete(user._id);
                        }}>
                          <span className='font-bold text-red-600  hover:underline'>Delete</span>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))
                }
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className='w-full text-teal-500 self-center text-sm py-7'
                >
                  Show more
                </button>
              )}
            </>
          ) : 'No users available yet!'
        }

      </div>
      <Modal popup show={showModal} onClose={() => setShowModal(false)} size='md'>
        <ModalHeader>
          Delete User
        </ModalHeader>
        <ModalBody>
          <h4 className='mb-4'>Are you sure you want to delete this user</h4>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleDeleteUser}>
              Yes, I'm sure
            </Button>

            <Button color='gray' onClick={() => setShowModal(false)}>
              No, Cancel
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
export default Userdashboard
