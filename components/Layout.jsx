import Head from 'next/head';
import Script from 'next/script';
import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
  <>
  <Head>
    <link rel="shortcut icon" href="/img/logo.png" type="image/x-icon"/>
  </Head>
    <Header />
    {children}
    <Script src="https://kit.fontawesome.com/8f366c7ba6.js" crossOrigin="anonymous"></Script>
  </>
);

export default Layout;