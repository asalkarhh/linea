import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ModalProvider } from './context/ModalContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ModalProvider>
          <AppRoutes />
        </ModalProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}

