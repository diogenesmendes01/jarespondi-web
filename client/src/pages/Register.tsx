import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Check } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Register() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 33;
    if (/[A-Z]/.test(password)) strength += 33;
    if (/[0-9]/.test(password)) strength += 34;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const hasMinLength = formData.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert("Você precisa aceitar os termos de uso");
      return;
    }
    // TODO: Implement registration logic
    console.log(formData);
    // Redirect to onboarding
    setLocation("/onboarding");
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
    console.log("Google signup");
  };

  const formatPhone = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, "");
    // Format as +55 (11) 99999-9999
    if (digits.length <= 2) return `+${digits}`;
    if (digits.length <= 4) return `+${digits.slice(0, 2)} (${digits.slice(2)}`;
    if (digits.length <= 9)
      return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4)}`;
    return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9, 13)}`;
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-3xl font-bold text-[#2563EB]">JáRespondi</div>
        </div>

        {/* Headline */}
        <h1 className="text-[28px] font-bold text-[#111827] text-center mb-8">
          Crie sua conta grátis 🚀
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-[#374151] mb-2 block">
              Nome Completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="João Silva"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-11 px-4 border-[#E5E7EB] rounded-lg text-base focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-10"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-[#374151] mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-11 px-4 border-[#E5E7EB] rounded-lg text-base focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-10"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-[#374151] mb-2 block">
              Telefone
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🇧🇷</span>
              <Input
                id="phone"
                type="tel"
                placeholder="+55 (11) 99999-9999"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: formatPhone(e.target.value) })
                }
                className="h-11 pl-12 pr-4 border-[#E5E7EB] rounded-lg text-base focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-10"
                required
              />
            </div>
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-11 px-4 pr-12 border-[#E5E7EB] rounded-lg text-base focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-opacity-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Password Strength Bar */}
            {formData.password && (
              <div className="mt-2">
                <div className="h-1 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength <= 33
                        ? "bg-[#EF4444]"
                        : passwordStrength <= 66
                        ? "bg-[#F59E0B]"
                        : "bg-[#10B981]"
                    }`}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <Check
                      className={`h-3 w-3 ${hasMinLength ? "text-[#10B981]" : "text-[#9CA3AF]"}`}
                    />
                    <span>Mín 8 caracteres</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <Check
                      className={`h-3 w-3 ${hasUppercase ? "text-[#10B981]" : "text-[#9CA3AF]"}`}
                    />
                    <span>Uma maiúscula</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <Check
                      className={`h-3 w-3 ${hasNumber ? "text-[#10B981]" : "text-[#9CA3AF]"}`}
                    />
                    <span>Um número</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              className="h-4 w-4 mt-0.5"
              required
            />
            <label htmlFor="terms" className="text-sm text-[#6B7280] cursor-pointer leading-relaxed">
              Aceito os{" "}
              <a href="#" className="text-[#2563EB] underline">
                Termos de Uso
              </a>{" "}
              e{" "}
              <a href="#" className="text-[#2563EB] underline">
                Política de Privacidade
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-base font-semibold rounded-lg"
          >
            Criar Conta Grátis
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
          onClick={handleGoogleSignup}
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
        <div className="mt-6 text-center">
          <p className="text-sm text-[#6B7280]">
            Já tem uma conta?{" "}
            <Link href="/login">
              <a className="text-[#2563EB] font-medium hover:underline">Fazer login</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
