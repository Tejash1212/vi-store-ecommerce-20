import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { signIn, signUp, resetPassword, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await signIn(email, password);
      setMessage("Logged in successfully");
      navigate("/profile");
    } catch (err: any) {
      setError(err?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await signUp(email, password);
      setMessage("Account created successfully");
      navigate("/profile");
    } catch (err: any) {
      setError(err?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await resetPassword(email);
      setMessage("Password reset email sent");
      setMode("login");
    } catch (err: any) {
      setError(err?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      setMessage("Signed in with Google");
      navigate("/profile");
    } catch (err: any) {
      let errorMessage = err?.message || "Google sign-in failed";

      // Provide helpful guidance for common Firebase auth errors
      if (err?.code === "auth/unauthorized-domain") {
        errorMessage = "Google Sign-In is not enabled for this domain. Please use email/password sign-in or contact support.";
      } else if (err?.code === "auth/popup-blocked") {
        errorMessage = "Pop-up was blocked. Please allow pop-ups and try again.";
      } else if (err?.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in was cancelled. Please try again.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {mode === "login"
                  ? "Sign in to VI Store"
                  : mode === "signup"
                    ? "Create an account"
                    : "Reset password"}
              </CardTitle>
              <CardDescription>
                {mode === "login" && "Welcome back — sign in to continue"}
                {mode === "signup" && "Create your VI Store account"}
                {mode === "reset" &&
                  "Enter your email to receive password reset instructions"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={
                  mode === "login"
                    ? handleLogin
                    : mode === "signup"
                      ? handleSignup
                      : handleReset
                }
                className="space-y-4"
              >
                {mode === "signup" && (
                  <Input
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {mode !== "reset" && (
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                )}

                {error && <p className="text-sm text-destructive">{error}</p>}
                {message && <p className="text-sm text-primary">{message}</p>}

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading
                      ? "Please wait..."
                      : mode === "login"
                        ? "Sign In"
                        : mode === "signup"
                          ? "Create Account"
                          : "Send Reset Email"}
                  </Button>
                  {mode !== "reset" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogle}
                      disabled={loading}
                    >
                      Continue with Google
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-4 text-sm text-muted-foreground flex items-center justify-between">
                <div>
                  {mode === "login" ? (
                    <>
                      <button
                        className="underline"
                        onClick={() => setMode("reset")}
                      >
                        Forgot password?
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {mode === "login" && (
                    <p>
                      New here?{" "}
                      <button
                        className="underline"
                        onClick={() => setMode("signup")}
                      >
                        Create an account
                      </button>
                    </p>
                  )}
                  {mode === "signup" && (
                    <p>
                      Already have an account?{" "}
                      <button
                        className="underline"
                        onClick={() => setMode("login")}
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                  {mode === "reset" && (
                    <p>
                      Remembered?{" "}
                      <button
                        className="underline"
                        onClick={() => setMode("login")}
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
