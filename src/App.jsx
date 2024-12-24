import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

//components 
import Container from './components/layouts/container/Container';
import Welcome from './pages/welcome/Welcome';
import Layout from './components/layouts/layout/Layout';
import Home from './pages/home/Home';
import Currency from './pages/currency/Currency';
import Plans from './pages/plans/Plans';
import More from './pages/more/More';
import MoreMenu from './pages/more/components/moreMenu/MoreMenu';

//routes
import { routePaths } from './routes/routePaths';

// Lazy-loaded components
const Page404Lazy = lazy(() => import('./pages/notfoundpage/NotFoundPage'));
const AboutLazy = lazy(() => import('./pages/more/components/about/About'));
const ContactLazy = lazy(() => import('./pages/more/components/contact/Contact'));

//styles
import './app.scss';

const App = () => {

    return (
        <div className="app">
            <Router>
                <Container > 
                    <Suspense fallback={<div>loading...</div>}>
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
                                    <Route path={routePaths.aboutPath} element={<AboutLazy />}/>
                                    <Route path={routePaths.contactPath} element={<ContactLazy />}/>
                                    <Route path="*" element={<Page404Lazy />} />
                                </Route >

                                <Route path="*" element={<Page404Lazy />} />

                            </Route>
                            <Route path="*" element={<Page404Lazy />}/>
                        </Routes>
                    </Suspense>
                </Container> 
            </Router>
        </div>
    )
}


export default App;

//refactor code