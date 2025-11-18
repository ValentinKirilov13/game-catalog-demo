import { Route, Routes } from "react-router";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/Home/Home";
import Catalog from "./components/catalog/Catalog";
import Details from "./components/details/Details";

export default function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/games">
                        <Route index element={<Catalog />} />
                        <Route path=":gameId/details" element={<Details />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>
    );
}
