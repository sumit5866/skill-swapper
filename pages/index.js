import { useState } from 'react';
import Image from 'next/image';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function IndexPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("userName", user.displayName);
      window.location.href = "/home";
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1FA2FF, #12D8FA, #A6FFCB)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      textAlign: 'center',
      padding: 20
    }}>
      <div className="logo-container">
        <Image src="/logo.png" alt="Logo" width={140} height={140} className="logo" />
      </div>

      <h1 className="fadeIn" style={{ fontSize: '2.5rem', marginTop: 20 }}>
        Welcome to <span style={{ color: '#FFD700' }}>Skill Swapper</span>
      </h1>

      <p className="fadeIn quote" style={{
        fontSize: '1.2rem',
        marginTop: 10,
        fontStyle: 'italic',
        maxWidth: '400px'
      }}>
        "Swap your skills, not just your time. Let's learn from each other."
      </p>

      <button
        onClick={handleLogin}
        className="fadeIn"
        style={{
          marginTop: 30,
          background: '#fff',
          color: '#333',
          padding: '12px 28px',
          borderRadius: 30,
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          fontWeight: 'bold'
        }}
      >
        Continue with Google
      </button>

      <style jsx>{`
        .logo {
          animation: pulse 2s infinite;
        }
        .fadeIn {
          animation: fadeInUp 1s ease forwards;
          opacity: 0;
        }
        .quote {
          animation-delay: 1s;
        }
        button {
          animation-delay: 1.5s;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
