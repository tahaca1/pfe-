import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="w-20 h-20 rounded-2xl bg-[#EAB308] flex items-center justify-center mb-8 shadow-lg">
            <svg className="w-12 h-12 text-[#0A2647]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18 9l-5-6-4 8-3-2" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-center">InvestAI Assistant</h1>
          <p className="text-xl text-white/80 text-center max-w-md mb-8">
            Votre conseiller financier intelligent, disponible 24h/24
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Analyse IA avancée</p>
                <p className="text-sm text-white/60">Powered by GPT-4</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#EAB308]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#EAB308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M2 12h20" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Recommandations personnalisées</p>
                <p className="text-sm text-white/60">Adaptées à votre profil</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3B82F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Sécurité garantie</p>
                <p className="text-sm text-white/60">Données chiffrées</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 flex items-center gap-2 text-white/60">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30" />
              ))}
            </div>
            <span className="text-sm">+2 847 utilisateurs actifs</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A2647] to-transparent" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] flex items-center justify-center">
              <svg className="w-7 h-7 text-[#EAB308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18 9l-5-6-4 8-3-2" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#0A2647]">InvestAI Assistant</h1>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-[#0A2647] mb-2">
            {isSignUp ? 'Créer un compte' : 'Bienvenue !'}
          </h2>
          <p className="text-[#64748B] mb-8">
            {isSignUp
              ? 'Rejoignez des milliers d\'investisseurs intelligents'
              : 'Connectez-vous pour accéder à votre assistant IA'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1E293B]">Nom complet</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Thomas Martin"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] text-[#1E293B]
                      placeholder-[#64748B] transition-all duration-200
                      focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-[#1E293B]">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="thomas.martin@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] text-[#1E293B]
                    placeholder-[#64748B] transition-all duration-200
                    focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#1E293B]">Mot de passe</label>
                {!isSignUp && (
                  <a href="#" className="text-sm text-[#0A2647] hover:underline">
                    Mot de passe oublié ?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-[#E2E8F0] text-[#1E293B]
                    placeholder-[#64748B] transition-all duration-200
                    focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1E293B]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1E293B]">Confirmer le mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-[#E2E8F0] text-[#1E293B]
                      placeholder-[#64748B] transition-all duration-200
                      focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full mt-6"
              size="lg"
            >
              {isSignUp ? 'Créer mon compte' : 'Se connecter'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#64748B]">Ou continuer avec</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-[#1E293B] font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
              <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-[#1E293B] font-medium">LinkedIn</span>
            </button>
          </div>

          <p className="mt-8 text-center text-[#64748B]">
            {isSignUp ? 'Déjà un compte ?' : 'Pas encore de compte ?'}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#0A2647] font-medium hover:underline"
            >
              {isSignUp ? 'Se connecter' : 'Créer un compte'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
