import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'

const FooterCom = () => {
    return (
        <Footer container>
            <Footer.Copyright href="/" by="writers_wanderlust" year={2024} />
            <Footer.LinkGroup>
                <Footer.Link href="/about">About</Footer.Link>
                <Footer.Link href="#">Contact</Footer.Link>
            </Footer.LinkGroup>
        </Footer>
    )
}

export default FooterCom
