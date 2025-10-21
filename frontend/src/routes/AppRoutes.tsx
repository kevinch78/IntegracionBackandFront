import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import { Protected } from "./Protected";

// Views
import LoginView from '../views/LoginView';
import ProductsView from '../views/ProductsView';

import HomePage from "../views/HomePage";
import ThreeDemoView from "../views/ThreeDemoView";
import LayoutsView from "../views/LayoutsView";
import SpeechDemoView from "../views/SpeechDemoView";
import GeometryExplorer from "../views/GeometryExplorer";
import SettingsView from "../views/SettingsView";
import TablasMul from "../views/TablasMul";
import ConversorUnid from "../views/ConversorUnid";
import ValidContrasena from "../views/ValidContrasena";
import ContadorClics from "../views/ContadorClics";
import ListaTareas from "../views/ListaTareas";
import { CategoriesView } from "../views/CategoriesView";
import { ProfileView } from "../views/ProfileView";
import ProductDetailView from "../views/ProductDetailView";
import CartView from "../views/CartView";
import AddProductView from '../views/AddProductView';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="three" element={<ThreeDemoView />} />
        <Route path="layouts" element={<LayoutsView />} />
        <Route path="tts" element={<SpeechDemoView />} />
        <Route path="three_2" element={<GeometryExplorer />} />
        <Route path="settings" element={<SettingsView />} />
        <Route path="tablasmul" element={<TablasMul />} />
        <Route path="conversorunid" element={<ConversorUnid />} />
        <Route path="validcontrasena" element={<ValidContrasena />} />
        <Route path="contadorclics" element={<ContadorClics />} />
        <Route path="listareas" element={<ListaTareas />} />

        {/* Rutas Públicas de API */}
        <Route path="api/login" element={<LoginView />} /> {/* Esta ruta no necesita Protected */}

        {/* Rutas Protegidas de API */}
        <Route
          path="api/products"
          element={<Protected><ProductsView /></Protected>}
        />
        <Route
          path="api/products/:id"
          element={<Protected><ProductDetailView /></Protected>}
        />
        <Route
          path="api/profile"
          element={<Protected><ProfileView /></Protected>}
        />
        <Route
          path="api/categories"
          element={<Protected><CategoriesView /></Protected>}
        />
        <Route
          path="api/cart"
          element={<Protected><CartView /></Protected>}
        />
        <Route
          path="api/products/new"
          element={<Protected><AddProductView /></Protected>}
        />
      </Route>
    </Routes>
  );
}