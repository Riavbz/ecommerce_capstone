import { useState } from 'react'
import { login } from '../services/AuthService';
import { useNavigate } from 'react-router';
import { useUserStore } from '../store/UserStore';
import Input from '../components/Input';

const Login = () => {
  const { authSuccess } = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
        const data = await login(formData);
        authSuccess({ email: data.email, role: data.role, username: data.username });
        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
  }
  return (
    <div className='min-h-screen bg-linear-to-tr from-pink-200 via-purple-100 to-yellow-100 flex items-center justify-center px-4 py-20'>
        <form 
        className='bg-white/40 backdrop-blur-2xl p-12 md:p-16 rounded-[3rem] border border-white shadow-2xl w-full max-w-lg space-y-10' 
        onSubmit={handleSubmit}
      >
        <div className="text-center space-y-2">
          <h2 className="Gistesy text-7xl text-center mb-4 text-gray-800">Login</h2>
          </div>

          <div className="space-y-6">
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

          <div className='pt-4'>
          <button 
            type="submit"
            className="w-full bg-black text-white py-4 rounded-full font-bold tracking-widest hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-95"
          >
            LOGIN
          </button>
          </div>
      </form>
  </div>
  )
}

export default Login