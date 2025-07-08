import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import FileUploader from '@/components/pages/FileUploader';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        <Routes>
          <Route path="/" element={<FileUploader />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;