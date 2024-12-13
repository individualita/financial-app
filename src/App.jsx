import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


//components 
import Container from './components/layouts/container/Container';
import Welcome from './pages/welcome/Welcome';
import Layout from './components/layouts/Layout/Layout';
import Home from './pages/home/Home';
import Currency from './pages/currency/Currency';
import Plans from './pages/plans/Plans';
import More from './pages/more/More';
import MoreMenu from './pages/more/components/moreMenu/MoreMenu';
import About from './pages/more/components/about/About';
import Contact from './pages/more/components/contact/Contact';
import Notfoundpage from './pages/notfoundpage/Notfoundpage';

//routes
import { routePaths } from './routes/routePaths';


//styles
import './app.scss';



const App = () => {

    return (
        <div className="app">
            <Router>
                <Container > 
                    <Routes>
                        {/*first page */}
                        <Route path="/" element={<Welcome />} />

                        <Route path="/*" element={<Layout />}>
                            {/* Home as a start page in Layout */}
                            <Route path={routePaths.homePath} element={<Home />} />

                            {/*nested routes */}
                            <Route path={routePaths.currencyPath} element={<Currency />} />
                            <Route path={routePaths.plansPath} element={<Plans />}/>
                            <Route path={routePaths.morePath} element={<More />} >
                                <Route path="" element={<MoreMenu />}/>
                                <Route path={routePaths.aboutPath} element={<About />}/>
                                <Route path={routePaths.contactPath} element={<Contact />}/>
                                <Route path="*" element={<Notfoundpage />} />
                            </Route >

                            <Route path="*" element={<Notfoundpage />} />

                        </Route>

                        <Route path="*" element={<Notfoundpage />} />
                    </Routes>
                </Container> 
            </Router>
        </div>
    )
}


export default App;

//refactor code