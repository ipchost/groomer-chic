import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setAuth }: { setAuth: (val: boolean) => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Пароль будем брать из настроек, пока проверим просто строку
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setAuth(true);
      sessionStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <h1 className="text-2xl font-bold mb-6 text-center">Вход в панель управления</h1>
        <input
          type="password"
          placeholder="Введите пароль администратора"
          className={`w-full p-4 border rounded-2xl mb-4 outline-none transition-all ${error ? 'border-red-500' : 'border-slate-200 focus:border-[#9b1c1c]'}`}
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
        />
        {error && <p className="text-red-500 text-sm mb-4 text-center">Неверный пароль</p>}
        <button type="submit" className="w-full bg-[#373b3e] text-white py-4 rounded-2xl font-bold hover:bg-[#9b1c1c] transition-colors">
          ВОЙТИ
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;