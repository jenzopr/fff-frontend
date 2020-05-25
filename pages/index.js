import React, { useState } from "react";
import Head from 'next/head'
import fetch from "isomorphic-unfetch";

import { DATA_URL } from "../constants/urls";

import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import SnackList from "../components/SnackList";
import SearchForm from "../components/SearchForm";

const Index = ({ snacks }) => {
  // Handle search
  const [searchTerm, setSearchTerm] = useState("");

  // Get categories with available Snacks (will be replace by API call)
  const categoriesWithSnacks = ['Alltag', 'Politik', 'Pandemie', 'Krankheit', 'Medikamente'];

  return(
    <>
      <Layout>
        <Head>
          <title>Facts for Friends</title>
        </Head>
        <Navbar
          categories={categoriesWithSnacks}
        />
        <SearchForm 
          searchTerm={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        <SnackList
          snacks={snacks}
          searchTerm={searchTerm}
        />
      </Layout>
    </>
  );
}

Index.getInitialProps = async function() {
  const fetchSnacks = await fetch(DATA_URL);
  const snacks = await fetchSnacks.json();

  return {
    snacks
  };
};

export default Index;