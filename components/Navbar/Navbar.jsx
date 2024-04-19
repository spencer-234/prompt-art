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
            <Link href="#" className="btn pink">
              Create Post
            </Link>
            <Link href="#" className="btn orange">
              My Profile
            </Link>
            <Link href="#" className="desktop">
              <Image
                src="/assets/default.jpg"
                width={45}
                height={45}
                className="user-img"
                alt="profile_picture"
                onClick={() => setMenuOpen((prev) => !prev)}
              />
            </Link>
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
              src="/assets/default.jpg"
              width={45}
              height={45}
              className="user-img mobile"
              onClick={() => setMenuOpen((prev) => !prev)}
              alt="profile_picture"
            />
            {menuOpen && (
              <div className="menu">
                <Link href="#">My Profile</Link>
                <Link href="#">Create Post</Link>
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
