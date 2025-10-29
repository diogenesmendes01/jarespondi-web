import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log({ email, password, rememberMe });
    // Redirect to onboarding or dashboard
    setLocation("/onboarding");
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log("Google login");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-3xl font-bold text-[#2563EB]">JáResponde</div>
        </div>

        {/* Headline */}
        <h1 className="text-[28px] font-bold text-[#111827] text-center mb-8">
          Bem-vindo de volta! 👋
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-[#374151] mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 px-4 border-[#E5E7EB] rounded-lg text-base focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-10"
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-[#374151] mb-2 block">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 px-4 pr-12 border-[#E5E7EB] rounded-lg text-base focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="h-4 w-4"
            />
            <label
              htmlFor="remember"
              className="text-sm text-[#6B7280] cursor-pointer"
            >
              Lembrar de mim
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-base font-semibold rounded-lg"
          >
            Entrar
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E7EB]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#6B7280]">ou</span>
          </div>
        </div>

        {/* Google Button */}
        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full h-11 border-[#E5E7EB] text-base font-medium text-[#111827] hover:bg-[#F9FAFB] rounded-lg"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continuar com Google
        </Button>

        {/* Links */}
        <div className="mt-6 text-center space-y-4">
          <Link href="/forgot-password">
            <a className="text-sm text-[#2563EB] hover:underline">
              Esqueceu a senha?
            </a>
          </Link>
          <p className="text-sm text-[#6B7280]">
            Não tem conta?{" "}
            <Link href="/register">
              <a className="text-[#2563EB] font-medium hover:underline">
                Criar conta grátis
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
