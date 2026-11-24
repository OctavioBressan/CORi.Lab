import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalogo.tsx";
import Quote from "./pages/Quote";
import DetalleAlfombra from "./pages/DetalleAlfombra.tsx";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalog />} />
        <Route path="cotizador" element={<Quote />} />
        <Route path="/catalogo/:slug" element={<DetalleAlfombra />}/>
      </Route>
    </Routes>
  );
};

export default App;