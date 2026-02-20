import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { SiX, SiFacebook, SiInstagram } from 'react-icons/si';
import { Heart, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { marathiStrings } from '@/i18n/marathi';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const NavLinks = () => (
    <>
      <Button variant="ghost" onClick={() => navigate({ to: '/' })}>
        {marathiStrings.navigation.home}
      </Button>
      <Button variant="ghost" onClick={() => navigate({ to: '/planetary-dashboard' })}>
        {marathiStrings.navigation.planetaryPositions}
      </Button>
      <Button variant="ghost" onClick={() => navigate({ to: '/panchang' })}>
        {marathiStrings.navigation.panchang}
      </Button>
      <Button variant="ghost" onClick={() => navigate({ to: '/matchmaking' })}>
        {marathiStrings.navigation.matchmaking}
      </Button>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-warmCream">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-saffron">ज्योतिष विवाह</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLinks />
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="w-full bg-gradient-to-r from-saffron/20 via-deepGold/20 to-terracotta/20">
        <div className="container">
          <div className="relative h-32 md:h-48 overflow-hidden rounded-lg my-4">
            <img
              src="/assets/generated/hero-banner.dim_1200x400.png"
              alt="Jyotish Vivah Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-saffron/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/95 backdrop-blur">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-saffron">ज्योतिष विवाह</h3>
              <p className="text-sm text-muted-foreground">
                पारंपरिक वैदिक ज्योतिष आणि कुंडली जुळणीसाठी आपला विश्वासू साथीदार
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{marathiStrings.footer.quickLinks}</h3>
              <div className="flex flex-col space-y-2">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  {marathiStrings.navigation.home}
                </Link>
                <Link to="/planetary-dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                  {marathiStrings.navigation.planetaryPositions}
                </Link>
                <Link to="/panchang" className="text-sm text-muted-foreground hover:text-foreground">
                  {marathiStrings.navigation.panchang}
                </Link>
                <Link to="/matchmaking" className="text-sm text-muted-foreground hover:text-foreground">
                  {marathiStrings.navigation.matchmaking}
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{marathiStrings.footer.followUs}</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <SiFacebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <SiX className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <SiInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} ज्योतिष विवाह. सर्व हक्क राखीव.
            </p>
            <p className="mt-2 flex items-center justify-center gap-1">
              Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'jyotish-vivah'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
