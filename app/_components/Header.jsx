"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// Define navigation links in one place for easy management
const navigation = [
  { name: "Home", href: "/home" },
  { name: "Book Appointment", href: "/book-appointment" },
  { name: "About Us", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Only show logo on login and signup pages, hide nav links
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <header className="bg-white cursor-pointer">
      <nav
        className="mx-auto flex items-center justify-between py-3 px-6 lg:px-8 container"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MindHaven</span>
            <img
              src="/assets/MindHaven.png"
              alt="logo"
              className="h-12 w-auto" // Adjusted height for better proportion
            />
          </a>
        </div>

        {/* --- Render nav/buttons only if it's NOT an auth page --- */}
        {!isAuthPage && (
          <>
            {/* Mobile Menu Button (Hamburger Icon) */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:gap-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="rounded-md text-sm px-4 py-2 bg-amber-50 font-semibold text-gray-900 hover:bg-amber-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </>
        )}
      </nav>

      {/* --- Mobile Navigation Menu (Dialog) --- */}
      {/* Also hidden on auth pages */}
      {!isAuthPage && (
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">MindHaven</span>
                <img
                  alt="logo"
                  src="/assets/MindHaven.png"
                  className="h-10 w-auto" // Adjusted height
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </header>
  );
}
