import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//components 
import Container from '../layout/container/Container';
import Welcome from '../pages/welcome/Welcome';
import Dashboard from '../pages/dashboard/Dashboard';

import Notfoundpage from '../pages/notfoundpage/Notfoundpage';



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