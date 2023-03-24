import React from "react";
import { createRoot } from "react-dom/client";
import App from './App';
const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer!);
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
root.render(<App/>)

// Green : 1ED79A
// Black : 161B19
// Grey : 1E2423
// White : FFFFFF
// Disabled Green : 698582