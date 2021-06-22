import React from 'react';
import Header from './header';
import Head from 'next/head'
import {Container} from 'semantic-ui-react';

const Layout = (props) =>{

    return(
        
        <Container> 
            <Head>
            <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
           ></link>
            </Head>
            <Header/>
         {props.children}
          
        </Container>
    )
}

export default Layout;