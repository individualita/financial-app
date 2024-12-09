import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//components 
import Container from './components/layout/container/Container';
import Welcome from './components/pages/welcome/Welcome';
import Dashboard from './components/layout/dashboard/Dashboard';
import Notfoundpage from './components/pages/notfoundpage/Notfoundpage';


//styles
import './app.scss';


const App = () => {

    return (
        <div className="app">
            <Router>
                <Container > 
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/*"element={<Dashboard />} />
                        <Route path="*" element={<Notfoundpage />} />
                    </Routes>
                </Container> 
            </Router>
        </div>
    )
}

export default App;