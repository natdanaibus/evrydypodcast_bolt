import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PodcastAI</h3>
            <p className="text-gray-600">
              Generate podcast-style content from any topic using AI. Listen instantly or download for later.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-primary-600">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-primary-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {year} PodcastAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;