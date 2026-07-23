"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, User, Menu, X, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { LogOut } from "@/actions";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<{
  name: string;
  username: string;
} | null>(null);
  // const [isClient, setIsClient] = useState<boolean>(false);

  const handleLogout = async () => {
    await LogOut(); // panggil server action untuk hapus cookie
    setIsLoggedIn(false);
    router.push("/login"); // redirect ke halaman login
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");

        if (!res.ok) {
          setIsLoggedIn(false);
          setUser(null);
          return;
        }

        const data = await res.json();

        setUser(data);
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <p>Free shipping on orders over $75 | Free returns</p>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="font-bold text-2xl text-gray-900 tracking-tight">
                  Next<span className="text-red-600">Balance</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors duration-200"
                >
                  New Arrivals
                </Link>
              </div>

              <Link
                href="/products"
                className="text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors duration-200"
              >
                Sale
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              {isLoggedIn !== null && (
                <p className="text-gray-700">
                  Welcome to NextBalance {user?.username ?? "Guest"}
                </p>
              )}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Search icon for mobile */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
              >
                <Search size={20} />
              </button>

              {/* Account */}
              <div className="relative group">
                <button className="p-2 text-gray-700 hover:text-gray-900">
                  <User size={20} />
                </button>
                {/* Account dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {!isLoggedIn ? (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Create Account
                      </Link>
                    </>
                  ) : (
                    <>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Wishlist */}
              <Link
                href="/wishlists"
                className="p-2 text-gray-700 hover:text-gray-900"
              >
                <Heart size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden border-t border-gray-200 px-4 py-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/products"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium"
              >
                New Arrivals
              </Link>
              <Link
                href="/men"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium"
              >
                Men
              </Link>
              <Link
                href="/sale"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium"
              >
                Sale
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
