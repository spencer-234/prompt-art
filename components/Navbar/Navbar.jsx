"use client";

import "./navbar.scss";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const session = true;

  return (
    <nav className="navbar">
      <Image
        src="/assets/logo.png"
        width={200}
        height={100}
        className="logo-image"
      />

      {session && (
        <div className="user-options">
          <div className="desktop">
            <Link href="#" className="btn pink">Create Post</Link>
            <Link href="#" className="btn orange">My Profile</Link>
            <Link href="#" className="desktop">
              <Image
                src="/assets/default.jpg"
                width={45}
                height={45}
                className="user-img"
              />
            </Link>
          </div>
          <div className="mobile">
            <Image
              src="/assets/default.jpg"
              width={45}
              height={45}
              className="user-img mobile"
              onClick={() => setMenuOpen((prev) => !prev)}
            />
            {menuOpen && (
              <div className="menu">
                <Link href="#">My Profile</Link>
                <Link href="#">Create Post</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
