import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Seminar from "./pages/Seminar";

// GitHub Pagesのプロジェクトページ配下 (例: /consul-lp/) にデプロイされるため、
// Viteのbase設定と揃えてルーティングの基準パスをずらす。
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/booking"} component={Booking} />
      <Route path={"/seminar"} component={Seminar} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={routerBase}>
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
