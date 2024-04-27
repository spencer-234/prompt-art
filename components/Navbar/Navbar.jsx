"use client";

import "./navbar.scss";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const username = session?.user.email.split('@')[0];

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="navbar">
      <Link href="/">
        <Image
          src="/assets/logo.png"
          width={200}
          height={100}
          className="logo-image"
          alt="logo"
        />
      </Link>

      {session?.user ? (
        <div className="user-options">
          <div className="desktop">
            <Link href="/create" className="btn pink" onClick={() => setMenuOpen(false)}>
              Create Post
            </Link>
            <Link href={`/profile/${username}`} className="btn orange" onClick={() => setMenuOpen(false)}>
              My Profile
            </Link>
              <Image
                src={session?.user.image ? session?.user.image :"/assets/default.jpg"}
                width={50}
                height={50}
                className="user-img"
                alt="profile_picture"
                onClick={() => setMenuOpen((prev) => !prev)}
              />
            {menuOpen && (
              <div className="menu wide">
                <button
                  onClick={() => {
                    setMenuOpen((prev) => !prev);
                    signOut();
                  }}
                  className="sign-out"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          <div className="mobile">
            <Image
              src={session?.user.image ? session?.user.image :"/assets/default.jpg"}
              width={50}
              height={50}
              className="user-img mobile"
              onClick={() => setMenuOpen((prev) => !prev)}
              alt="profile_picture"
            />
            {menuOpen && (
              <div className="menu">
                <Link href={`/profile/${username}`} onClick={() => setMenuOpen(false)}>My Profile</Link>
                <Link href="/create" onClick={() => setMenuOpen(false)}>Create Post</Link>
                <button
                  onClick={() => {
                    setMenuOpen((prev) => !prev);
                    signOut();
                  }}
                  className="sign-out"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="btn orange"
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </nav>
  );
};

export default Navbar;
