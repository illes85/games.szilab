import { useState, useEffect } from 'react';
import { Play, Gamepad2, Info, ArrowLeft, Trophy, Zap, Search, Menu, X, ChevronRight, Star } from 'lucide-react';

// --- Types ---
interface Game {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  category: string;
  rating: number;
  players: string;
  releaseDate: string;
}

// --- Data ---
const GAMES: Game[] = [
  {
    id: 'tile-o-polis',
    title: 'Tile-o-polis',
    description: 'Építsd fel álmaid városát ebben a stratégiai csempe-lehelyező játékban.',
    longDescription: 'A Tile-o-polis egy addiktív városépítő stratégiai játék, ahol minden döntés számít. Helyezd le okosan az épületeket, utakat és parkokat, hogy maximalizáld a lakosság boldogságát és a bevételedet. Versenyezz a barátaiddal a legszebb és leghatékonyabb város címéért!',
    imageUrl: 'https://images.unsplash.com/photo-1549637642-90187f64f420?auto=format&fit=crop&q=80&w=2674', // Városépítős kép
    category: 'Stratégia',
    rating: 5.0,
    players: 'ÚJ',
    releaseDate: '2026. Jan'
  },
  {
    id: 'space-defender',
    title: 'Galactic Defender',
    description: 'Epikus űrcsaták és végtelen hullámok.',
    longDescription: 'A Föld utolsó védvonalaként te irányítod az X-99 Interceptort. Készülj fel a könyörtelen idegen invázióra! Fejleszd a fegyverrendszereidet, szerezz kísérő drónokat, és győzd le a galaxis leghatalmasabb főellenségeit ebben a modernizált klasszikusban.',
    imageUrl: 'https://images.unsplash.com/photo-1614726365723-49faaa564619?auto=format&fit=crop&q=80&w=2670',
    category: 'Action',
    rating: 4.9,
    players: '45k+',
    releaseDate: '2026. Jan'
  },
  {
    id: 'puzzle-quest',
    title: 'Crystal Logic',
    description: 'Nyugtató elmejáték gyönyörű vizuális világgal.',
    longDescription: 'Merülj el a kristályok misztikus világában. Nincs időkorlát, nincs stressz – csak te és a tiszta logika. Több mint 500 szint, procedurálisan generált kihívások és egy meditatív soundtrack segít ellazulni egy hosszú nap után.',
    imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?auto=format&fit=crop&q=80&w=2670',
    category: 'Puzzle',
    rating: 4.7,
    players: '8k+',
    releaseDate: '2025. Nov'
  }
];

// --- Components ---

const GameCard = ({ game, onClick }: { game: Game; onClick: (g: Game) => void }) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (game.id === 'tile-o-polis') {
      return (
        <a href="/tile-o-polis/" className="contents">
          {children}
        </a>
      );
    }
    return <div onClick={() => onClick(game)} className="contents">{children}</div>;
  };

  return (
    <Wrapper>
      <div className="group relative h-[400px] w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-900 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={game.imageUrl} 
            alt={game.title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary backdrop-blur-sm border border-primary/20">
              {game.category}
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-xs font-bold">{game.rating}</span>
            </div>
          </div>
          
          <h3 className="mb-2 text-2xl font-bold text-white font-mono group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          
          <p className="mb-6 text-sm text-slate-300 line-clamp-2 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            {game.description}
          </p>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-xs text-slate-400 font-mono">{game.players} Játékos</span>
            <button className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors">
              Játék
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Navbar = ({ onHome }: { onHome: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onHome}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary group-hover:scale-110 transition-transform">
            <Gamepad2 className="text-white h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight font-mono">
            SziLab<span className="text-primary">Studio</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Játékok</a>
          <a href="#" className="hover:text-white transition-colors">Ranglista</a>
          <a href="#" className="hover:text-white transition-colors">Stúdió</a>
          <div className="h-4 w-px bg-white/10" />
          <button className="text-white hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-lg border border-white/5 transition-all">
            Belépés
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-white/10 p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-2">
          <a href="#" className="text-lg font-medium text-slate-200">Játékok</a>
          <a href="#" className="text-lg font-medium text-slate-200">Ranglista</a>
          <a href="#" className="text-lg font-medium text-slate-200">Stúdió</a>
          <hr className="border-white/10" />
          <button className="bg-primary text-white py-3 rounded-xl font-bold">
            Belépés
          </button>
        </div>
      )}
    </nav>
  );
};

// --- Main App ---

function App() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  // Scroll to top when game opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeGame]);

  return (
    <div className="min-h-screen bg-background bg-hero-pattern font-sans text-slate-300 selection:bg-primary selection:text-white">
      <Navbar onHome={() => setActiveGame(null)} />

      <main className="pt-24 pb-20">
        {activeGame ? (
          // --- Game View ---
          <div className="container mx-auto px-4 md:px-6 animate-in fade-in zoom-in-95 duration-500">
            <button 
              onClick={() => setActiveGame(null)}
              className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
            >
              <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10">
                <ArrowLeft className="h-4 w-4" />
              </div>
              Vissza a galériához
            </button>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Game Area */}
              <div className="lg:col-span-9 space-y-6">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-primary/10 group">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                     {/* Placeholder UI for the game iframe */}
                    <div className="h-20 w-20 rounded-2xl bg-white/5 flex items-center justify-center animate-pulse">
                      <Gamepad2 className="h-10 w-10 text-slate-600" />
                    </div>
                    <p className="font-mono text-sm text-slate-500">Játék betöltése...</p>
                  </div>
                  {/* Overlay Title for Demo */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded text-xs font-bold tracking-wider uppercase">
                      Live Demo
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white font-mono mb-2">{activeGame.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1"><Zap className="h-4 w-4 text-yellow-400"/> {activeGame.rating}/5</span>
                      <span>•</span>
                      <span>{activeGame.category}</span>
                      <span>•</span>
                      <span>Ver 1.0.2</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all">
                      <Info className="h-4 w-4" />
                      <span>Info</span>
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/25 transition-all">
                      <Trophy className="h-4 w-4" />
                      <span>Toplista</span>
                    </button>
                  </div>
                </div>

                <div className="glass p-8 rounded-2xl">
                   <h3 className="text-lg font-bold text-white mb-4 font-mono">A Játékról</h3>
                   <p className="leading-relaxed text-slate-300">{activeGame.longDescription}</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-3 space-y-6">
                 <div className="glass p-6 rounded-2xl space-y-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Top Játékosok</h3>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${i === 1 ? 'bg-yellow-500 text-black' : 'bg-white/10 text-slate-400'}`}>
                            {i}
                          </span>
                          <span className="text-sm font-medium text-slate-200">User_{9243 + i}</span>
                        </div>
                        <span className="text-xs font-mono text-primary">{50000 - i * 1230}</span>
                      </div>
                    ))}
                 </div>
                 
                 <div className="p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
                    <h3 className="text-white font-bold mb-2">Hívd ki barátaid!</h3>
                    <p className="text-sm text-slate-400 mb-4">Oszd meg az eredményed és versenyezzetek.</p>
                    <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors">
                      Megosztás
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          // --- Home View ---
          <div className="space-y-24">
            
            {/* Hero Section */}
            <section className="relative container mx-auto px-4 md:px-6">
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 aspect-[4/3] md:aspect-[21/9]">
                 <div className="absolute inset-0">
                    <img 
                       src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2670" 
                       alt="Hero" 
                       className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
                 </div>
                 
                 <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-3xl space-y-8">
                    <div className="flex items-center gap-3">
                       <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                          Új Megjelenés
                       </span>
                       <span className="text-slate-300 text-sm font-mono">Season 4</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight font-mono">
                       FUTURE <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">WARFARE</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-300 max-w-xl">
                       A legújabb generációs böngészős játékok, telepítés nélkül. Csatlakozz a SziLab közösséghez és urald a ranglistákat.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                       <button className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2">
                          <Play className="fill-current h-5 w-5" />
                          Játék Most
                       </button>
                       <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-colors">
                          Többet Róla
                       </button>
                    </div>
                 </div>
              </div>
            </section>

            {/* Trending Section */}
            <section className="container mx-auto px-4 md:px-6">
               <div className="flex items-end justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2 font-mono">Népszerű Játékok</h2>
                    <p className="text-slate-400">Amivel most mindenki játszik</p>
                  </div>
                  <a href="#" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors font-medium">
                     Összes megtekintése <ChevronRight className="h-4 w-4" />
                  </a>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {GAMES.map(game => (
                    <GameCard key={game.id} game={game} onClick={setActiveGame} />
                  ))}
               </div>
            </section>

            {/* Features / Why Us */}
            <section className="bg-white/5 border-y border-white/5 py-20">
               <div className="container mx-auto px-4 md:px-6">
                  <div className="grid md:grid-cols-3 gap-12 text-center">
                     <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                           <Zap className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Instant Játék</h3>
                        <p className="text-slate-400">Nincs letöltés, nincs várakozás. Csak kattints és játssz azonnal a böngésződből.</p>
                     </div>
                     <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                           <Trophy className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Globális Ranglista</h3>
                        <p className="text-slate-400">Versenyezz játékosokkal a világ minden tájáról és szerezz egyedi trófeákat.</p>
                     </div>
                     <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                           <Monitor className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Cross-Platform</h3>
                        <p className="text-slate-400">Mentsd el a haladásod és folytasd mobilon, tableten vagy desktopon.</p>
                     </div>
                  </div>
               </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 space-y-6">
               <div className="flex items-center gap-2 text-2xl font-bold font-mono text-white">
                  <Gamepad2 className="h-8 w-8 text-primary" />
                  SziLab Studio
               </div>
               <p className="text-slate-400 max-w-sm">
                  A jövő játékélménye, ma. Független fejlesztőstúdió, amely a minőségre és az innovációra törekszik.
               </p>
            </div>
            <div>
               <h4 className="font-bold text-white mb-6">Navigáció</h4>
               <ul className="space-y-4 text-slate-400">
                  <li><a href="#" className="hover:text-primary transition-colors">Főoldal</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Játékok</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Kapcsolat</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-white mb-6">Közösség</h4>
               <ul className="space-y-4 text-slate-400">
                  <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
               </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
             <p>© 2026 SziLab Studio Games. Minden jog fenntartva.</p>
             <div className="flex gap-6">
                <a href="#" className="hover:text-white">Adatvédelem</a>
                <a href="#" className="hover:text-white">Felhasználási feltételek</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Missing import fix
import { Monitor } from 'lucide-react';

export default App;