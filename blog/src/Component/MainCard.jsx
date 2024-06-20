import React from 'react'
import { Card } from "flowbite-react";
import travel from "../assets/images/travel.jpg"

const MainCard = () => {

    const cardData = [
        {
            id: 1,
            heading: 'Travel Blogs',
            btn: 'Read More'
        },
        {
            id: 2,
            heading: 'Food Blogs',
            btn: 'Read More'
        },
        {
            id: 3,
            heading: 'Business Blogs',
            btn: 'Read More'
        },
        {
            id: 4,
            heading: 'Health Blogs',
            btn: 'Read More'
        },
        {
            id: 5,
            heading: 'Book Reviews',
            btn: 'Read More'
        },
        {
            id: 6,
            heading: 'Personal Blogs',
            btn: 'Read More'
        }
    ]

    return (
        <div>
            {
                cardData.map(data => (
                    <Card
                        key={data.id}
                        className="max-w-sm"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc={`${travel}`}
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {data.heading}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {data.btn}
                        </p>
                    </Card>
                ))
            }


        </div>
    )
}

export default MainCard
