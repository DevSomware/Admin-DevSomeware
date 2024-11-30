'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react'
import { useAnimatedBackground } from '../utils-lib/useAnimatedBackground'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const router = useNavigate();
  const [password, setPassword] = useState('')
  const backgroundPosition = useAnimatedBackground()
  const [loading,setLoading] = useState(false)
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
   if(email==""||password==""){
      toast.error("Please fill all the fields")
      return;
   }
   setLoading(true)
   const fetchdata = await fetch(`${import.meta.env.VITE_BASE_URL}/api/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({email,password}),
   })
    const data = await fetchdata.json();
    setLoading(false)
    if(data.success){
      toast.success(data.message)
      Cookies.set("dswadmintoken", data.token, { expires: 7, path: "/" });
      //check user is reset there password or not.
      if(data.forgot){
        toast.message(' First-Time Login: Reset Your Password', {
          description: 'To ensure the security of your account, you are required to change your default password upon your first login. You will be redirected to the Reset Password page to set a new password. Once updated, you can log in again using your new credentials',
        })
     setTimeout(()=>{
      router("/reset")
     },3000)
      return;
      }
      //if everything ok send it back to admin page
      router("/admin")
    }
    else{
      toast.error(data.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
      <Toaster richColors position='bottom-center'/>
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-4 overflow-hidden z-20">
      <motion.div
  className="absolute inset-0 z-0"
  style={{
    background: `radial-gradient(circle at ${backgroundPosition.x * 100}% ${backgroundPosition.y * 100}%, rgba(59, 130, 246, 0.3), transparent 50%)`,
  }}
/>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md z-10"
        >
          <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-gray-800 mb-6 text-center"
              >
                Admin Login
              </motion.h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@devsomeware.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </Button>
                <div className="mt-2 text-right">
                  <Link to="/forgot" className="text-sm text-blue-600 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
            <CodeSnippetBackground />
          </div>
        </motion.div>
      </div>
      <CommunityStats />
    </div>
  )
}

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-30">
      <div className="container mx-auto flex items-center">
        <img
          src="https://aniket-1.s3.ap-south-1.amazonaws.com/LOGO1-removebg-preview.png"
          alt="Devsomeware Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <span className="text-2xl font-bold">Devsomeware</span>
      </div>
    </nav>
  )
}

function CodeSnippetBackground() {
  return (
    <div className="bg-gray-100 bg-opacity-75 p-4 text-sm text-gray-600 overflow-hidden">
      <pre className="whitespace-pre-wrap">
        <code>{`function contribute() {
  if (passion && skills) {
    joinDevsomeware();
    makeOpenSourceAwesome();
  }
}`}</code>
      </pre>
    </div>
  )
}

function CommunityStats() {
  const stats = [
    { label: 'Active Projects', value: "15+" },
    { label: 'Contributors', value: "150+" },
    { label: 'Lines of Code', value: '1M+' },
  ]

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-8 text-white">Our Thriving Community</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-700 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-gray-300 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

