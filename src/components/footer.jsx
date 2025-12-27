import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { TwitterIcon, FacebookIcon } from "lucide-react";
import Logo from '@/assets/Logo.svg';

const footerLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Links */}
        <div className="flex flex-col gap-4 justify-start items-start">
          <img
            src={Logo}
            alt="Logo"
            className="h-20 w-auto object-contain"
          />
          <ul className="flex flex-col gap-2 text-muted-foreground">
            {footerLinks.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.href}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h6 className="text-lg font-semibold">Stay Updated</h6>
          <p className="text-sm text-muted-foreground">
            Subscribe to get the latest updates on passport applications and news.
          </p>
          <form className="flex gap-2 mt-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl"
            />
            <Button className="rounded-xl">Subscribe</Button>
          </form>
        </div>

        {/* Social & Copyright */}
        <div className="flex flex-col gap-4 items-start md:items-end">
          <div className="flex gap-4">
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              <FacebookIcon className="h-5 w-5" />
            </Link>
          </div>
          <span className="text-sm text-muted-foreground mt-auto">
            &copy; {new Date().getFullYear()} Immigration Portal. All rights reserved.
          </span>
        </div>
      </div>
      <Separator />
    </footer>
  );
}
