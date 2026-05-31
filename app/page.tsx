"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Floating particle effect (Simplified version of the one in login.html)
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number, particles: any[];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#ffffff";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();

    return () => window.removeEventListener("resize", init);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    // Simulate authentication delay
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsSuccess(true);

      // Redirect to dashboard after a brief "Access Granted" message
      setTimeout(() => {
        router.push("/clients");
      }, 1000);
    }, 1500);
  };

  return (
    <div className="bg-background text-on-background h-[100dvh] w-full font-body-md text-body-md overflow-hidden relative">
      {/* Background Particles */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-20" />

      {/* Background Atmospheric Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-tertiary-fixed-dim/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Main Content Container (Full Page Split Layout) */}
      <main className="relative z-10 flex h-full w-full">
        {/* Left Side: Interactive Brand Visual */}
        <div className="hidden md:flex w-1/2 relative bg-surface-container overflow-hidden items-center justify-center border-r border-outline-variant/30">
          <div className="absolute inset-0">
            <img
              alt="Brand Visual"
              className="w-full h-full object-cover opacity-60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdGBD94xJDlZdRFCK1o_-GIZR5N95sEIbia7hm4nAehITpGPu8CIgOpXPFDRjzuivtsCAQ4yCSq5fSrRUL4bb_euwca-tvepM1sjtpfD_fQqkrfCxVqw_ZQerQZwbKIvW_sqdQKVdyQtKwy4KznDvLqE2Qxy4lzc_hXzAb4VnFWPyr20HlN-vLAStmpbTdomRuxo55EKVw7c3eRezRFFzCYR6DlletpkcGotu0OchvXhwNL-GhEJhV4PHwm5-HkWWh65DfW2AH7wY"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20"></div>
          </div>
          <div className="relative z-20 p-12 text-center max-w-lg">
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-xl bg-primary text-background shadow-xl">
              <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                insights
              </span>
            </div>
            <h2 className="font-headline-lg text-4xl md:text-5xl text-primary mb-6 tracking-tighter">
              Precision Intelligence.
            </h2>
            <p className="text-on-surface-variant font-body-md text-lg leading-relaxed px-6">
              Empower your relationship management with our ultra-precise analytical CRM core. Purpose-built for high-performance workflows.
            </p>
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-xs mx-auto opacity-60">
              <div className="h-1 bg-primary/20 rounded-full"></div>
              <div className="h-1 bg-primary rounded-full"></div>
              <div className="h-1 bg-primary/20 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col bg-surface-container-lowest relative overflow-y-auto custom-scrollbar px-6 md:px-16">
          <div className="w-full max-w-sm mx-auto my-auto flex flex-col space-y-6 py-10 min-h-full justify-center">
            {/* Header */}
            <div className="text-center">
              <h1 className="font-headline-lg text-6xl font-black tracking-tighter text-primary mb-1">
                PURSUA
              </h1>
              <p className="font-body-md text-on-surface-variant text-lg">Welcome back</p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <input
                  className="w-full h-12 px-4 bg-surface-container border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  id="email"
                  placeholder="Email"
                  aria-label="Email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="relative">
                  <input
                    className="w-full h-12 pl-4 pr-12 bg-surface-container border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    id="password"
                    placeholder="Password"
                    aria-label="Password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center w-9 h-9 rounded-full hover:bg-surface-container-high"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>
              <button
                disabled={isAuthenticating || isSuccess}
                className={`w-full h-12 ${isSuccess ? "bg-tertiary-fixed-dim" : "bg-primary"
                  } text-background font-medium rounded-lg hover:opacity-90 transition-all flex items-center justify-center space-x-2 active:scale-[0.98] shadow-lg disabled:opacity-80 disabled:pointer-events-none`}
                type="submit"
              >
                {isAuthenticating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    <span>Access Granted</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-outline-variant"></div>
              <span className="flex-shrink mx-4 font-label-caps text-label-caps text-outline text-center">OR</span>
              <div className="flex-grow border-t border-outline-variant"></div>
            </div>

            {/* Social Login */}
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center space-x-3 h-12 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors group w-full">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
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
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                  />
                </svg>
                <span className="font-body-sm font-medium">Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
