import '../styles/globals.scss'
import Layout from "../containers/Layout"; // renders only if "sidebar" prop was passed

function MyApp({ Component, pageProps }) {

  return (
      <Layout sidebar={pageProps?.sidebar || ''}>
      <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
