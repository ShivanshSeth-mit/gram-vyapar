import React, { useState } from "react";
import { UserProfile, SupportedLanguage } from "../types";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  syncUserProfileToFirestore,
  getUserProfileFromFirestore,
  signOut
} from "../lib/firebase";
import {
  User,
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  KeyRound,
  X,
  CheckCircle2,
  Sparkles,
  LogOut,
  ArrowRight,
  MapPin,
  Building2,
  LogIn,
  UserPlus
} from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
  currentLang: SupportedLanguage;
  requireAuthBeforeUse?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
  currentLang,
  requireAuthBeforeUse = false
}) => {
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "phone">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stateName, setStateName] = useState("Maharashtra");
  const [district, setDistrict] = useState("Pune");
  const [role, setRole] = useState<"entrepreneur" | "counselor">("entrepreneur");
  const [otp, setOtp] = useState("");
  const [stepPhone, setStepPhone] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Firebase Google Sign-In
  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      // Check if profile exists in Firestore or create initial
      let profile = await getUserProfileFromFirestore(fbUser.uid);
      if (!profile) {
        profile = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split("@")[0] || "Entrepreneur",
          phone: fbUser.phoneNumber || phone || "",
          email: fbUser.email || undefined,
          role: "entrepreneur",
          state: stateName,
          district: district,
          udyamNumber: `UDYAM-${fbUser.uid.slice(0, 6).toUpperCase()}`,
          isLoggedIn: true,
          avatarColor: "bg-blue-600"
        };
        await syncUserProfileToFirestore(profile);
      }
      onLoginSuccess(profile);
      onClose();
    } catch (err: any) {
      console.error("Google sign in error:", err);
      if (err?.code === "auth/popup-closed-by-user") {
        setError("Sign-in popup was closed. Please try again.");
      } else if (err?.code === "auth/unauthorized-domain") {
        setError("This domain is being authorized. You can also sign in with Email or Demo.");
      } else {
        setError(err?.message || "Failed to sign in with Google.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Firebase Email & Password Sign-In
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const fbUser = cred.user;

      let profile = await getUserProfileFromFirestore(fbUser.uid);
      if (!profile) {
        profile = {
          id: fbUser.uid,
          name: fbUser.displayName || email.split("@")[0],
          email: fbUser.email || email,
          phone: phone || "",
          role,
          state: stateName,
          district: district,
          udyamNumber: `UDYAM-${fbUser.uid.slice(0, 6).toUpperCase()}`,
          isLoggedIn: true,
          avatarColor: "bg-blue-600"
        };
        await syncUserProfileToFirestore(profile);
      }
      onLoginSuccess(profile);
      onClose();
    } catch (err: any) {
      console.error("Email sign-in error:", err);
      if (err?.code === "auth/user-not-found" || err?.code === "auth/invalid-credential") {
        setError("Account not found or invalid credentials. If you are new, please Sign Up.");
      } else if (err?.code === "auth/wrong-password") {
        setError("Incorrect password. Please verify and try again.");
      } else {
        setError(err?.message || "Failed to sign in.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 3. Firebase Email & Password Sign-Up
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide an email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const fbUser = cred.user;

      const newProfile: UserProfile = {
        id: fbUser.uid,
        name: name.trim() || email.split("@")[0],
        email: fbUser.email || email,
        phone: phone.replace(/\D/g, ""),
        role,
        state: stateName,
        district,
        udyamNumber: `UDYAM-${fbUser.uid.slice(0, 6).toUpperCase()}`,
        isLoggedIn: true,
        avatarColor: "bg-emerald-600"
      };

      // Store in Firestore
      await syncUserProfileToFirestore(newProfile);
      setSuccessMessage("Account created successfully!");
      onLoginSuccess(newProfile);
      onClose();
    } catch (err: any) {
      console.error("Sign-up error:", err);
      if (err?.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please switch to Sign In.");
      } else {
        setError(err?.message || "Failed to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 4. Quick Demo Sign In
  const handleQuickDemoLogin = async () => {
    setLoading(true);
    const demoUser: UserProfile = {
      id: "usr-demo-patil-01",
      name: "Rameshwar Patil",
      phone: "9876543210",
      email: "ramesh.patil@gramvyapar.gov.in",
      role: "entrepreneur",
      state: "Maharashtra",
      district: "Pune",
      udyamNumber: "UDYAM-MH-26-0098712",
      isLoggedIn: true,
      avatarColor: "bg-emerald-600"
    };
    try {
      await syncUserProfileToFirestore(demoUser);
    } catch (e) {
      console.warn("Local demo profile sync notice:", e);
    }
    onLoginSuccess(demoUser);
    setLoading(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      id="login-modal-backdrop"
    >
      <div
        id="login-modal-card"
        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-900 dark:bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <KeyRound className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight block">
                {currentUser?.isLoggedIn
                  ? currentLang === "hi"
                    ? "उद्यमी प्रोफ़ाइल"
                    : "Entrepreneur Profile"
                  : currentLang === "hi"
                  ? "ग्राम व्यापार खाता • साइन इन / साइन अप"
                  : "Gram Vyapar Account • Sign In / Sign Up"}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Connected to Cloud Firestore & Firebase Auth
              </span>
            </div>
          </div>

          {!requireAuthBeforeUse && (
            <button
              type="button"
              id="login-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {currentUser?.isLoggedIn ? (
            /* Logged in state */
            <div className="space-y-4">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
                <div className="w-12 h-12 rounded-2xl bg-blue-900 dark:bg-blue-600 text-white flex items-center justify-center text-lg font-black shadow-xs shrink-0">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white truncate leading-tight">
                    {currentUser.name}
                  </h4>
                  {currentUser.email && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 truncate mt-0.5">
                      {currentUser.email}
                    </p>
                  )}
                  {currentUser.phone && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Phone className="h-3 w-3 text-slate-400" />
                      <span>+91 {currentUser.phone}</span>
                    </p>
                  )}
                  <p className="text-[11px] font-semibold text-blue-800 dark:text-blue-300 mt-1 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{currentUser.udyamNumber || "Verified Entrepreneur"}</span>
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500 dark:text-slate-400">Account Type</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                    {currentUser.role}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500 dark:text-slate-400">Location</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {currentUser.district ? `${currentUser.district}, ${currentUser.state}` : "Maharashtra"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">Firebase Firestore</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Database Synced
                  </span>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  id="profile-logout-btn"
                  onClick={async () => {
                    await signOut(auth);
                    onLogout();
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
                <button
                  type="button"
                  id="profile-continue-btn"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-950 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Continue to App
                </button>
              </div>
            </div>
          ) : (
            /* Sign In / Sign Up Form */
            <div className="space-y-4">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-medium">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Mode Toggle Tabs: Sign In vs Sign Up */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signin");
                    setError(null);
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    authMode === "signin"
                      ? "bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setError(null);
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    authMode === "signup"
                      ? "bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Create Account (Sign Up)</span>
                </button>
              </div>

              {/* 1. Fast Google Sign-in Button */}
              <button
                type="button"
                id="google-signin-btn"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2.5"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
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
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-2 my-2">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  or with email
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              </div>

              {/* Email Sign In Form */}
              {authMode === "signin" && (
                <form onSubmit={handleEmailSignIn} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        id="signin-email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="entrepreneur@example.com"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="password"
                        id="signin-password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="signin-submit-btn"
                    disabled={loading}
                    className="w-full py-3 bg-blue-900 hover:bg-blue-950 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>{loading ? "Signing In..." : "Sign In to Your Account"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {/* Email Sign Up Form */}
              {authMode === "signup" && (
                <form onSubmit={handleEmailSignUp} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        id="signup-name-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Rameshwar Patil"
                        required
                        className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          id="signup-email-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="patil@example.com"
                          required
                          className="w-full pl-9 pr-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Phone (Mobile)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          id="signup-phone-input"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="9876543210"
                          maxLength={10}
                          className="w-full pl-9 pr-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Create Password (min 6)
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="password"
                          id="signup-password-input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          minLength={6}
                          className="w-full pl-9 pr-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Role
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setRole("entrepreneur")}
                          className={`py-2 px-1 text-[11px] font-bold rounded-lg border transition-all ${
                            role === "entrepreneur"
                              ? "bg-blue-900 text-white border-blue-900 shadow-2xs"
                              : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          Entrepreneur
                        </button>
                        <button
                          type="button"
                          onClick={() => setRole("counselor")}
                          className={`py-2 px-1 text-[11px] font-bold rounded-lg border transition-all ${
                            role === "counselor"
                              ? "bg-blue-900 text-white border-blue-900 shadow-2xs"
                              : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          Counselor
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        District
                      </label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="Pune"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        placeholder="Maharashtra"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="signup-submit-btn"
                    disabled={loading}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{loading ? "Creating Account..." : "Create Account & Sync to Firestore"}</span>
                    <Sparkles className="h-4 w-4" />
                  </button>
                </form>
              )}

              {/* Fast 1-Click Demo Testing Option */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                <button
                  type="button"
                  id="quick-demo-login-btn"
                  onClick={handleQuickDemoLogin}
                  disabled={loading}
                  className="w-full py-2 px-3 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 font-bold text-[11px] rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>1-Click Fast Sign In as Demo Entrepreneur (Rameshwar Patil)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
