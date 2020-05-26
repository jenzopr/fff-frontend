import { useRouter } from 'next/router'
import Head from 'next/head'
import fetch from "isomorphic-unfetch"
import find from "lodash/find"
import toInteger from "lodash/toInteger"

import { DATA_URL } from "../../constants/urls"

import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Snack from "../../components/Snack"
import SnackList from "../../components/SnackList"

export default function SnackView({requestedSnack}) {
  const router = useRouter()

  // If the page is not generated yet, this will be displayed
  // initially unti getStaticProps() finishes running
  if (router.isFallback) {
    return(
      <>
        <Layout>
          <div>
            Loading ...
          </div>
        </Layout>
      </>
    )
  }

  return(
    <>
      <Layout>
        <Head>
          <title>{requestedSnack.Headline} - Facts for Friends</title>
        </Head>
        <Navbar/>
        <div className="flex flex-wrap justify-center -mx-1 mt-2 overflow-hidden text-justify font-sans">
          <Snack
              snack={requestedSnack}
              fullWidth={true}
          />
        </div>
        <div className="flex flex-wrap justify-center max-w-2xl">
          <h4 className="font-semibold text-lg mb-2 mt-2 text-left tracking-wide">Ähnliche Snacks</h4>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const fetchSnacks = await fetch(DATA_URL);
  const snacks = await fetchSnacks.json();

  const paths = snacks.map(snack => {
    return {
      params: {
        snack: snack.ID.toString()
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const fetchSnacks = await fetch(DATA_URL);
  const snacks = await fetchSnacks.json();

  const requestedSnack = find(snacks, ["ID", toInteger(params.snack)]);

  return {
    props: {
      requestedSnack
    }
  }
}

