import { Routes, Route, Navigate } from 'react-router-dom'
import { TitleBar } from './components/TitleBar/TitleBar'
import { Find } from './pages/Find'
import { Home } from './pages/Home'

/* 
  ::: This portion here is to handle GitHub Pages
    For some reason, you cannot navigate directly to a link
    in the React program because it needs enter through '/index.html'
    in the public folder. The public folder will contain dummy
    folders that contain an index.html file that just redirects
    to the entry point with a URL parameter string of ?url={pathname}
    which is checked and saved below...
*/
interface UrlRedirectObjectProps {
  [home:string]:string
}
const queryStringCheck: string | null  = new URLSearchParams( window.location.search ).get('url')
const urlRedirectObject: UrlRedirectObjectProps = {
  home: '/'
}
////////////////////////////
// END OF URL PARAM HANDLING
////////////////////////////

function App() {
  // Check for the URL redirect parameter
  if ( queryStringCheck !== null ) {
    const urlRedirect: string = urlRedirectObject[ queryStringCheck ]
    return <Navigate to={ urlRedirect } />
  } // END OF URL REDIRECT

  return (
    <div className="App">
      <TitleBar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='hikes' >
          <Route path='' element={<>Hikes home</>} />
          <Route path='find' element={ <Find /> } />
          <Route path='popular' element={ <>Popular hikes</> } />
        </Route>
        <Route path='lifestyle'>
          <Route path='' element={<>Lifestyle home</>} />
          <Route path='idk' element={<>Lifestyle IDK</>} />
        </Route>
        <Route path='community'>
          <Route path='' element={<>Community home</>} />
          <Route path='idk' element={<>Community IDK</>} />
        </Route>
        <Route path='resources'>
          <Route path='' element={<>Resources home</>} />
          <Route path='idk' element={<>Resources IDK</>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App