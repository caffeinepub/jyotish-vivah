import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Layout from './components/Layout';
import PlanetaryDashboard from './pages/PlanetaryDashboard';
import MatchmakingPage from './pages/MatchmakingPage';
import PanchangPage from './pages/PanchangPage';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PlanetaryDashboard,
});

const planetaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/planetary-dashboard',
  component: PlanetaryDashboard,
});

const matchmakingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/matchmaking',
  component: MatchmakingPage,
});

const panchangRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/panchang',
  component: PanchangPage,
});

const routeTree = rootRoute.addChildren([indexRoute, planetaryRoute, matchmakingRoute, panchangRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
