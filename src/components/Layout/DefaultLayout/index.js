import { Children } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function defaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}
export default defaultLayout;
