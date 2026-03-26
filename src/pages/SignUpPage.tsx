import { motion } from "framer-motion";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { GridBackground } from "@/components/ui/GridBackground";

export function SignUpPage() {
  const navigate = useNavigate();
  const { loginSuccess, loginError, isLoading } = useAuth();

  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      await loginSuccess(codeResponse);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      loginError();
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 relative overflow-hidden">
      <GridBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white border border-slate-200 shadow-xl rounded-3xl p-10 space-y-8 relative z-10"
      >
        <div className="text-center space-y-2">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-semibold mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create an account</h2>
          <p className="text-slate-600 font-medium">Join the GenPath AI platform</p>
        </div>

        <div className="space-y-5">
          <Button
            onClick={() => handleGoogleSignUp()}
            disabled={isLoading}
            className="w-full h-14 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-sm"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </>
            )}
          </Button>

          <p className="text-center text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors">
              Log in
            </Link>
          </p>
        </div>

        <div className="pt-8 text-center">
          <p className="text-xs text-slate-400 font-medium">
            By signing up, you agree to our Terms of Service
          </p>
        </div>
      </motion.div>
    </div>
  );
}
