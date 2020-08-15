import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from 'styled-components';
import './App.css';
import Modal from './components/Modal';
import ModalProvider from './context/ModalContext';

const App: React.FC = () => {

  const Home = lazy(() => import("./pages/Home"));

  const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <Suspense fallback={null}>
      <AppWrapper>
        <BrowserRouter>
          <ModalProvider>
            <Modal />
            <Switch>
              <Route exact strict path="/" component={() => <Home />} />
            </Switch>
          </ModalProvider>
        </BrowserRouter>
      </AppWrapper>
    </Suspense>
  );
}

export default App;
