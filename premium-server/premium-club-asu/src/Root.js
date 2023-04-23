
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy } from "react";
import { useAuthContext } from "./App/hooks/useAuthContext";
import NotFound from "./App/pages/NotFound";
import Loader from './App/pages/components/Loader';
const App = lazy(() => import("./App/App"));
const DashboardApp = lazy(() => import("./DashboardApp/DashboardApp"));

const Root = () => {
    const { user } = useAuthContext()

    //IMPORTING IMAGES
    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }
    const images = importAll(require.context('./App/imgs', false, /\.(png|jpe?g|svg|gif|mp4)$/));

    return (
        <>
            <Suspense fallback={<Loader images={images}/>}>
                <Router>
                    <Routes>
                        <Route path="*" element={<App images={images}/>} >
                            <Route path='*' element={<App images={images}/>} />
                        </Route>
                        {
                            user && (
                                <Route path='/dashboard/*' element={<DashboardApp images={images}/>} >
                                    <Route path="*" element={<DashboardApp images={images} />} />
                                </Route>
                            )
                        }
                    </Routes>
                </Router>
            </Suspense>
        </>
    )
}
export default Root;