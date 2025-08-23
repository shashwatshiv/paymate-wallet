"use client";

import WalletIcon from "./WalletIcon";

export const Footer = () => {
  return (
    <footer className="glass-effect border-t border-gray-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-lg accent-gradient flex items-center justify-center">
              <WalletIcon width={20} height={20}></WalletIcon>
            </div>
            <span
              className="text-gradient font-semibold"
              onClick={() => (window.location.href = "/")}
            >
              Paymate
            </span>
          </div>

          <div className="flex items-center space-x-4"></div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              Made with ❤️ by{" "}
              <span className="text-blue-400 font-medium">
                {" "}
                <a
                  href="https://github.com/shashwatshiv"
                  target="_blank"
                  rel="noreferrer"
                >
                  Shashwat
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
