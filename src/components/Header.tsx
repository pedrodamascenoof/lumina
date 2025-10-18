import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setIsLogged(!!data.session);
      } catch (e) {
        // ignore
      }
    };
    check();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLogged(!!session?.user);
    });

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Lumina Terapias Fortaleza
            </h1>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("inicio")} className="hover:text-primary transition-colors">
              Início
            </button>
            <button onClick={() => scrollToSection("sobre")} className="hover:text-primary transition-colors">
              Sobre
            </button>
            <button onClick={() => scrollToSection("servicos")} className="hover:text-primary transition-colors">
              Serviços
            </button>
            <button onClick={() => scrollToSection("terapeutas")} className="hover:text-primary transition-colors">
              Terapeutas
            </button>
            <button onClick={() => scrollToSection("espaco")} className="hover:text-primary transition-colors">
              Espaço
            </button>
            <button onClick={() => scrollToSection("contato")} className="hover:text-primary transition-colors">
              Contato
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isLogged ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Painel
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={async () => { await supabase.auth.signOut(); window.location.href = '/'; }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
              </Link>
            )}
            <a href="https://wa.me/5585999999999?text=Olá! Gostaria de agendar uma sessão." target="_blank" rel="noopener noreferrer">
              <Button className="btn-hero">
                Agendar Atendimento
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <button onClick={() => scrollToSection("inicio")} className="block w-full text-left hover:text-primary transition-colors py-2">
              Início
            </button>
            <button onClick={() => scrollToSection("sobre")} className="block w-full text-left hover:text-primary transition-colors py-2">
              Sobre
            </button>
            <button onClick={() => scrollToSection("servicos")} className="block w-full text-left hover:text-primary transition-colors py-2">
              Serviços
            </button>
            <button onClick={() => scrollToSection("terapeutas")} className="block w-full text-left hover:text-primary transition-colors py-2">
              Terapeutas
            </button>
            <button onClick={() => scrollToSection("espaco")} className="block w-full text-left hover:text-primary transition-colors py-2">
              Espaço
            </button>
            <button onClick={() => scrollToSection("contato")} className="block w-full text-left hover:text-primary transition-colors py-2">
              Contato
            </button>
            {isLogged ? (
              <Link to="/dashboard" className="block w-full">
                <Button variant="ghost" size="sm" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  Painel
                </Button>
              </Link>
            ) : (
              <Link to="/auth" className="block w-full">
                <Button variant="ghost" size="sm" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
              </Link>
            )}
            <a href="https://wa.me/5585999999999?text=Olá! Gostaria de agendar uma sessão." target="_blank" rel="noopener noreferrer" className="block">
              <Button className="btn-hero w-full">
                Agendar Atendimento
              </Button>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
