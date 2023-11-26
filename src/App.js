import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from './Layout';
import { AuthProvider } from './components/Login/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Layout = route.layout || DefaultLayout;
                            const Page = route.component;
                            const isLoginRoute = route.path === '/'; 

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        isLoginRoute ? (
                                            <Page />
                                        ) : (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        )
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
