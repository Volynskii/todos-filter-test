import '../styles/globals.scss'
import SideBarComponent from "../containers/Sibebar"; // renders only if "sidebar" prop was passed

function MyApp({ Component, pageProps }) {

  return (
      <SideBarComponent sidebar={pageProps?.sidebar || ''}>
      <Component {...pageProps} />
      </SideBarComponent>
  )
}

export default MyApp
