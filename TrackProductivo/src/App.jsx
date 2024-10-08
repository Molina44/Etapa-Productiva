import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Users ,BookMarked,BookUser ,Building2 ,GraduationCap  ,  FolderSearch2, BookPlus   } from "lucide-react";
import Sidebar, { SidebarItem, SidebarAccordion } from "./components/Sidebar";
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './configs/ProtectedRoute';
import { Navbar2 } from './components/Navbar';



// Lazy load the pages
// las rutas de todos los modulos [tengo que crear la vista y ubicarlas en el sliderbar]
//son los modulos de la base de datos pero vamos a dividir en secciones 

const HomePage = lazy(() => import('./pages/HomePage'));
const InstructoresPage = lazy(() => import('./pages/InstructoresPage'));
const FichasPage = lazy(() => import('./pages/FichasPage'));
const MatriculasPage = lazy(() => import('./pages/MatriculasPage'));
const SeguimientoPage = lazy(() => import('./pages/seguimientoPage'));
const EtapaPracticaPage = lazy(() => import('./pages/EtapaPracticaPage'));
const ReportesPage = lazy(() => import('./pages/ReportesPage'));
const EstadisticasPage = lazy(() => import('./pages/EstadisticasPage'));
const PerfilPage = lazy(() => import('./pages/PerfilPage'));


export const App = () => {
  // las paginas de cada seccion son su respectiva ruta
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />

        <Route path="/instructores" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <InstructoresPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        
        <Route path="/fichas" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <FichasPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />

        <Route path="/matriculas" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <MatriculasPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />

        <Route path="/seguimientos" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
               <SeguimientoPage/>
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />

        <Route path="/etapapractica" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <EtapaPracticaPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />

        <Route path="/reportes" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <ReportesPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
  
       <Route path="/estadisticas" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <EstadisticasPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        
        <Route path="/perfil" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <PerfilPage/>
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />

      </Routes>
      
    </BrowserRouter>
  );
};

const WithSidebar = ({ children }) => (
  <div className="flex">
    <Sidebar>
      {/* estas son las secciones de el rol de Coordinador  */}
      <SidebarItem nav="/home" icon={<Home size={20} />} text="Home" />
      <SidebarItem nav="/instructores" icon={<Users  size={20} />} text="Instructores" />
      <SidebarItem nav="/fichas" icon={<BookMarked  size={20} />} text="Fichas" />
      <SidebarItem nav="/matriculas" icon={<BookUser  size={20} />} text="Matriculas" />
      {/* <SidebarItem nav="/empresa" icon={<Building2  size={20} />} text="Empresa" /> */}
      <SidebarItem nav="/etapapractica" icon={<GraduationCap   size={20} />} text="Etapa Practica" />
      <SidebarItem nav="/seguimientos" icon={<FolderSearch2  size={20} />} text="Seguimientos" />
      <SidebarItem nav="/reportes" text="Reportes" />
      <SidebarItem nav="/estadisticas" text="Estadisticas" />

{/* 
      <SidebarAccordion icon={<FolderSearch2  size={20} />} text="Seguimientos">
        
      </SidebarAccordion> */}
      {/* fin de secciones de el rol de Coordinador */}




    </Sidebar>
    <div className='w-full bg-white h-screen overflow-auto'>
      <Navbar2 />
      {children}
    </div>
  </div>
);
