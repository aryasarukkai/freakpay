import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <img src="/freakpay.png" alt="FreakPay" className="w-48 mb-4" />
      <span className="text-6xl text-white">loading... 😜</span>
      <img src="/freakbob.png" alt="FreakBob" className="w-48 mt-4" />
    </div>
  );
};


const MainScreen = ({ onFreakPay, onFreakBobCall }) => (
  <div className="flex flex-col h-screen bg-black text-white p-4">
    <br />
    <br />
    <br />
    <br />
    <div className="h-1/4 flex flex-col items-center justify-center space-y-4">
      <img src="/freakpay.png" alt="FreakPay" className="h-1/2 max-w-full object-contain" />
      <button onClick={onFreakPay} className="w-4/5 max-w-sm">
        <img src="/tap-to-freakpay.png" alt="Ready to FreakPay" className="w-full h-auto" />
      </button>
    </div>
    
    <div className="flex-grow" />
    
    <div className="h-1/4 flex justify-between items-end">
      <img src="/balance.png" alt="Balance" className="h-full max-w-[45%] object-contain" />
      <button onClick={onFreakBobCall} className="h-full max-w-[45%]">
        <img src="/freakbob.png" alt="FreakBob" className="h-full w-auto object-contain" />
      </button>
    </div>
    
    <p className="text-xs text-gray-500 mt-4 text-center">
      This is not a real banking app and should not be considered for any serious transactions. 
      Images used are in the public domain.
    </p>
  </div>
);

const TransactionResult = ({ success, onReturn, onTryAgain }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4">
    <img 
      src={success ? "/thanks.png" : "/failed.png"} 
      alt={success ? "Transaction Successful" : "Transaction Failed"} 
      className="w-4/5 max-w-md mb-8"
    />
    <button 
      onClick={success ? onReturn : onTryAgain} 
      className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-bold"
    >
      {success ? "Return to Main Screen" : "Try Again"}
    </button>
    {!success && (
      <button 
        onClick={onReturn} 
        className="mt-4 bg-gray-600 text-white px-6 py-3 rounded-full text-lg font-bold"
      >
        Return to Home Screen
      </button>
    )}
  </div>
);


// FreakBob Call Component
const FreakBobCall = ({ onClose }) => {
  useEffect(() => {
    const audio = new Audio('/ringtone.mp3');
    audio.play();
    return () => audio.pause();
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center" onClick={onClose}>
      <img src="/freakbob-call.png" alt="FreakBob Calling" className="max-w-full max-h-full" />
    </div>
  );
};

// Main App Component
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showTransaction, setShowTransaction] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [showFreakBobCall, setShowFreakBobCall] = useState(false);

  const handleFreakPay = () => {
    const success = Math.random() > 0.5;
    setTransactionSuccess(success);
    setShowTransaction(true);
  };

  const handleReturn = () => {
    setShowTransaction(false);
  };

  return (
    <AnimatePresence>
      {showSplash ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SplashScreen onFinish={() => setShowSplash(false)} />
        </motion.div>
      ) : showTransaction ? (
        <motion.div
          key="transaction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TransactionResult 
            success={transactionSuccess} 
            onReturn={handleReturn} 
            onTryAgain={handleFreakPay} 
          />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MainScreen 
            onFreakPay={handleFreakPay} 
            onFreakBobCall={() => setShowFreakBobCall(true)} 
          />
          {showFreakBobCall && (
            <FreakBobCall onClose={() => setShowFreakBobCall(false)} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;