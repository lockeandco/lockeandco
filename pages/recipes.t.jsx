import Head from 'next/head'
import { Component } from 'react'
import * as Recipes from '../content/recipes/pineapple-basil-smash.md'

export default class Home extends Component {
  render() {
    // console.log(attributes)
    console.log(Recipes)
    return (
      <>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
        <article></article>
      </>
    )
  }
}
