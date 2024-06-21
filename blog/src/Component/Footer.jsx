import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'

const FooterCom = () => {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className="">
                <div className="">
                    <div className="">
                        <Link to="/" className='font-semibold self-center whitespace-nowrap text-sm dark:text-white'>
                            <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white px-2 py-1'>Writers</span>
                            <span className=''>Wanderlust</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title='About' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='/about'
                                    rel='noopener noreferrer'
                                >
                                    About Us
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Follow Us' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='#'
                                    rel='noopener noreferrer'
                                >
                                    Instagram
                                </Footer.Link>
                                <Footer.Link
                                    href='#'
                                    rel='noopener noreferrer'
                                >
                                    Facebook
                                </Footer.Link>
                                <Footer.Link
                                    href='#'
                                    rel='noopener noreferrer'
                                >
                                    Youtube
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Blogs' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='#'
                                    rel='noopener noreferrer'
                                >
                                    Food Blog
                                </Footer.Link>
                                <Footer.Link
                                    href='#'
                                    rel='noopener noreferrer'
                                >
                                    Business Blog
                                </Footer.Link>
                                <Footer.Link
                                    href='#'
                                    rel='noopener noreferrer'
                                >
                                    Travel Blog
                                </Footer.Link>
                                <Footer.Link
                                    href='#'
                                    rel='noopener noreferrer'
                                >
                                    Personal Blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
            </div>

        </Footer>
    )
}

export default FooterCom
