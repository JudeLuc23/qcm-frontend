import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from './screen/layout';
import Accueil from './screen';
import Login from './screen/login';
import Inscription from './screen/inscription';
import Epreuve from './screen/auteur';
import AddEpreuve from './screen/addEpreuve';
import Evaluation from './screen/evaluation';
import ShowAllEpreuve from './screen/epreuve';

export default function Paths() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout>
                    <Accueil/>
                </Layout>}/>
                <Route path='/login' element={<Layout>
                    <Login/>
                </Layout>}/>
                <Route path='/inscription' element={<Layout>
                    <Inscription/>
                </Layout>}/>
                <Route path='/epreuve' element={<Layout>
                    <Epreuve/>
                </Layout>}/>
                <Route path='/epreuve/add' element={<Layout>
                    <Epreuve>
                        <AddEpreuve/>
                    </Epreuve>
                </Layout>}/>
                <Route path='/all' element={<Layout>
                    <ShowAllEpreuve/>
                </Layout>}/>
                <Route path='/evaluation' element={<Layout>
                    <Evaluation/>
                </Layout>}/>
            </Routes>
        </Router>
    )
}