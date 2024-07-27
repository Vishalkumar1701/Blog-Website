import React from 'react'
import { Card } from "flowbite-react";
import food from '../assets/images/food.jpg'
import { HiClock } from "react-icons/hi";
import { Badge } from "flowbite-react";

const CompletePost = () => {
    return (
        <div>
            <Card>
                <div className=''>
                    <img className='h-[40rem] w-full object-cover' src={food} alt="blog-img" />
                </div>
                <div>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">
                        Noteworthy technology acquisitions 2021
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-white">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                </div>
                <div className='flex justify-between items-center'>
                    <div className="tags">
                        <Badge className='p-3' color="indigo" size="xl">
                            Food
                        </Badge>
                    </div>
                    <div className="datetime">
                        <Badge className='p-3' color="gray" size="xl" icon={HiClock}>
                            3 days ago
                        </Badge>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default CompletePost
