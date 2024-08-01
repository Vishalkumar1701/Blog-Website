import React from 'react'
import { Button, Card } from "flowbite-react";

const Admindashboard = () => {
    return (
        <div className='min-h-screen p-6'>
            <div className="topbar flex flex-wrap gap-10 w-full">

                <Card className="max-w-sm flex-grow-0 flex-shrink-0 basis-1/4">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Users
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Total Users : 100
                    </p>
                    <Button>
                        View all Users
                    </Button>
                </Card>

                <Card className="max-w-sm flex-grow-0 flex-shrink-0 basis-1/4">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Posts
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Total Posts : 100
                    </p>
                    <Button>
                        View all Posts
                    </Button>
                </Card>

                <Card className="max-w-sm flex-grow-0 flex-shrink-0 basis-1/4">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Comments
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Total Comments : 100
                    </p>
                    <Button>
                        View all Comments
                    </Button>
                </Card>
            </div>
            <div className="contentBar">

            </div>
        </div>
    )
}

export default Admindashboard
