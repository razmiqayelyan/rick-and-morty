import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import styles from './App.module.css';


const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const Detail = lazy(() => import('./pages/Detail'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <div className={styles.container}>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/:category" 
                element={
                  <PrivateRoute>
                    <Category />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/:category/:id" 
                element={
                  <PrivateRoute>
                    <Detail />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
