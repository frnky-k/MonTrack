import { useState, useEffect, createContext, useContext } from 'react';
import { type ReactNode } from 'react';
import Buttons from './components/buttons';
import Navbar from './components/nav';
import About from './components/about';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { LuInstagram } from 'react-icons/lu';
import { FaTelegram } from 'react-icons/fa6';
import { API_URL } from './lib/api';
import AuthTelegram from './components/telegramlogin';

function Home() {
  const [TotalIncome, setTotalIncome] = useState<string | number | undefined>();
  const [TotalExpense, setTotalExpense] = useState<string | number | undefined>();
  const { userId } = useContext(AuthContext)
 
  


  const formatCurrency = (value: any, currecyCode = 'IDR', locale = 'id-ID') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currecyCode,
    }).format(value)
  }

  useEffect(() => {
    async function total_expenses() {
      const res = await fetch(`${API_URL}/total_expenses`, {
        method:'GET',
        credentials:"include"
      })
      const data = await res.json();
      setTotalExpense(data)
    } total_expenses();
  }, [userId]);

  useEffect(() => {
    async function total_income() {
      const res = await fetch(`${API_URL}/total_income`,{
        method:'GET',
        credentials:"include"
      })
      const data = await res.json();
      setTotalIncome(data);
      formatCurrency(data)
    } total_income();
  }, [userId]);


  return (
    <main className='app_main p-5 '>
      <h1 className='text-2xl'>Transactions History</h1>
      <p>View and manage your transactions via Telegram</p>
      <Buttons />
      <section className='flex justify-center gap-10 items-center text-center p-3'>
        <div className='border-l-5 border-l-[#02cf09] w-full md:w-1/2 py-10 text-2xl text-start font-bold text-[#00000]'>

          <div className='grid grid-rows-3 px-2 '>
            <img src='/increase.svg' className='w-6.25'></img>
            <p className='text-sm text-[#6b6375]'>Total Income</p>
            <label className=''>{formatCurrency(TotalIncome)} </label>
          </div>

        </div>
        <div className='border-l-5 border-l-[#c90502] w-full md:w-1/2  py-10 text-2xl text-start font-bold'>
          <div className='grid grid-rows-3 px-2 '>
            <img src='/decrease.svg' className='w-6.25'></img>
            <p className='text-sm text-[#6b6375]'>Total Expense</p>
            <label className=''>{formatCurrency(TotalExpense)} </label>
          </div>
        </div>
      </section>
      <footer>
        <div className='h-0.5 w-full bg-[#f1f5f9] mt-20'></div>
        <div className='flex items-center justify-center mt-5  flex-col'>
          <div className="flex items-center gap-3">
            <img src='/Logo.png' width={45} height={45} alt='logo'
              className='rounded-xl' />
            <h1 className='font-bold text-gray-950'>MonTrack</h1>
          </div>
          <p className='capitalize text-xs text-center p-5 text-[#6b6375]'>Simple Money Tracker synced via Telegram</p>
          <div className="flex gap-5">
            <LuInstagram />
            <FaTelegram />
          </div>
          <p className='capitalize text-xs text-center p-5 text-[#6b6375]'>&copy; 2026 MonTrack. All rights reserved.</p>

        </div>
      </footer>
    </main>


  );
}

type AuthState = "checking" | "authed" | "guest";
export const AuthContext = createContext<{ authState: AuthState; userId: string | null }>({
  authState: "checking",
  userId: null,
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then(async res => {
        if (res.ok) {
          const data = await res.json();
          setUserId(data.user_id);
          setAuthState("authed");
        } else {
          setAuthState("guest");
        }
      })
      .catch(() => setAuthState("guest"));
  }, []);

  return <AuthContext.Provider value={{authState, userId}}>{children}</AuthContext.Provider>;
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const {authState} = useContext(AuthContext);
  // if (authState === "checking") return <LoadingSpinner />;
  return authState === "authed" ? children : <Navigate to="/" replace />;
}

function RedirectIfAuthed({ children }: { children: ReactNode }) {
  const {authState} = useContext(AuthContext);
  // if (authState === "checking") return <LoadingSpinner />;
  return authState === "authed" ? <Navigate to="/dashboard" replace /> : children;
}





export default function Dashboard() {


  return (
    
    <BrowserRouter>
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={
            <RedirectIfAuthed><AuthTelegram /></RedirectIfAuthed>
          } />
          <Route path='/dashboard' element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
      </AuthProvider>
    </BrowserRouter>
  )

}
