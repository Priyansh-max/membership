import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router} from 'react-router-dom';
import { ChainId , ThirdwebProvider } from '@thirdweb-dev/react';
import { Sepolia } from "@thirdweb-dev/chains";

import App from './App';
import './index.css';
import { StateContextProvider } from './context';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider 
        activeChain={Sepolia}
        clientId='c3b4896d6ec6364d2c9fee07eca676af'
    
    >
        <Router>
            <StateContextProvider>
                <App/> 
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)