import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-950 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <main className="z-10 w-full flex flex-col items-center justify-center p-4">
        <h1 className="text-gray-500 font-light tracking-[0.2em] text-sm mb-8 uppercase opacity-80">
          Standard Calculator
        </h1>
        <Calculator />
        
        <div className="mt-8 text-center">
            <p className="text-gray-600 text-xs">
                Keyboard navigation enabled
            </p>
        </div>
      </main>

      <footer className="absolute bottom-4 text-gray-700 text-xs">
        &copy; {new Date().getFullYear()} ZenCalc
      </footer>
    </div>
  );
};

export default App;