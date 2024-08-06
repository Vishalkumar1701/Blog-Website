import React, { useEffect, useState } from 'react'
import { Button, TextInput, Modal, Select, FileInput, Alert, Table, TableHeadCell, TableHead, TableBody, TableRow, TableCell } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { app } from '../firebase';

import { useSelector } from 'react-redux';

const Userdashboard = () => {

  const { currentUser } = useSelector((state) => state.user)

  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  return (
    <div className='w-full'>
      <h2 className='text-5xl my-4 font-bold px-2 dark:text-gray-300 '>Users</h2>
      <div className="overflow-x-auto w-full">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span className="">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {'Apple MacBook Pro 17"'}
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>
                <span className='font-bold text-red-600'>Delete</span>
              </Table.Cell>
              <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
export default Userdashboard
