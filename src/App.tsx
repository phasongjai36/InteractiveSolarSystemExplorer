import { useState, useRef, useEffect, useCallback } from 'react';

interface Planet {
  name: string;
  radius: number; // visual radius in px
  orbitRadius: number; // visual orbit radius in px
  realRadius: number; // real radius in km
  distanceFromSun: number; // in million km
  orbitalPeriod: number; // in Earth days
  color: string;
  lightenedColor: string; // precomputed to avoid color calculation in 60fps draw loop
  glowColor: string; // precomputed color with opacity for hover/select glow
  speed: number; // animation speed multiplier
  description: string;
  emoji: string;
}

const rawPlanets = [
  {
    name: 'Mercury',
    radius: 4,
    orbitRadius: 60,
    realRadius: 2439.7,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    color: '#b5b5b5',
    speed: 4.15,
    description: 'The smallest planet and closest to the Sun. It has no atmosphere and extreme temperature variations.',
    emoji: '☿',
  },
  {
    name: 'Venus',
    radius: 7,
    orbitRadius: 95,
    realRadius: 6051.8,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    color: '#e8cda0',
    speed: 1.62,
    description: 'The hottest planet due to its thick CO₂ atmosphere. It rotates backwards compared to most planets.',
    emoji: '♀',
  },
  {
    name: 'Earth',
    radius: 7,
    orbitRadius: 130,
    realRadius: 6371,
    distanceFromSun: 149.6,
    orbitalPeriod: 365.25,
    color: '#4da6ff',
    speed: 1.0,
    description: 'Our home planet — the only known world with liquid water on its surface and life.',
    emoji: '🌍',
  },
  {
    name: 'Mars',
    radius: 5,
    orbitRadius: 170,
    realRadius: 3389.5,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    color: '#e87d4a',
    speed: 0.53,
    description: 'The Red Planet, home to the largest volcano (Olympus Mons) and canyon in the solar system.',
    emoji: '♂',
  },
  {
    name: 'Jupiter',
    radius: 16,
    orbitRadius: 230,
    realRadius: 69911,
    distanceFromSun: 778.5,
    orbitalPeriod: 4333,
    color: '#d4a574',
    speed: 0.084,
    description: 'The largest planet with a Great Red Spot storm larger than Earth. It has 95 known moons.',
    emoji: '♃',
  },
  {
    name: 'Saturn',
    radius: 13,
    orbitRadius: 290,
    realRadius: 58232,
    distanceFromSun: 1434,
    orbitalPeriod: 10759,
    color: '#f0d890',
    speed: 0.034,
    description: 'Famous for its spectacular ring system made of ice and rock particles. It could float in water!',
    emoji: '♄',
  },
  {
    name: 'Uranus',
    radius: 10,
    orbitRadius: 345,
    realRadius: 25362,
    distanceFromSun: 2871,
    orbitalPeriod: 30687,
    color: '#7de8e8',
    speed: 0.012,
    description: 'An ice giant that rotates on its side. Its blue-green color comes from methane in its atmosphere.',
    emoji: '♅',
  },
  {
    name: 'Neptune',
    radius: 9,
    orbitRadius: 395,
    realRadius: 24622,
    distanceFromSun: 4495,
    orbitalPeriod: 60190,
    color: '#4466ff',
    speed: 0.006,
    description: 'The windiest planet with speeds up to 2,100 km/h. It was the first planet found by mathematical prediction.',
    emoji: '♆',
  },
];

// Pre-compute lightened and glow colors once at initialization to eliminate string parsing/formatting in 60fps canvas draw loop
const planets: Planet[] = rawPlanets.map((planet) => ({
  ...planet,
  lightenedColor: lightenColor(planet.color, 40),
  glowColor: planet.color + '80',
}));

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const planetAnglesRef = useRef<number[]>(planets.map(() => Math.random() * Math.PI * 2));
  const lastTimeRef = useRef<number>(0);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 800 });

  // Pre-calculate stars once to avoid 200 modulo/string ops per frame in draw loop
  const starsRef = useRef(
    Array.from({ length: 200 }, (_, i) => {
      const starSeed = 42;
      const xRatio = ((starSeed * (i + 1) * 7919) % 900) / 900;
      const yRatio = ((starSeed * (i + 1) * 6271) % 900) / 900;
      const brightness = 0.3 + ((i * 31) % 70) / 100;
      return {
        xRatio,
        yRatio,
        radius: 0.5 + (i % 3) * 0.5,
        color: `rgba(255, 255, 255, ${brightness})`,
      };
    })
  );

  // Performance optimization: Cache static background (space backdrop, 200 stars, and 8 orbit paths)
  // in an offscreen canvas. This replaces ~1,000 Canvas 2D API calls (beginPath, arc, fill, stroke)
  // per frame (~60,000/sec at 60fps) with a single blit via ctx.drawImage().
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const size = Math.min(window.innerWidth - 40, window.innerHeight - 200, 900);
      setCanvasSize({ width: size, height: size });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getScale = useCallback(() => {
    return canvasSize.width / 900;
  }, [canvasSize]);

  // Pre-render static background (clear, starfield, and orbit lines) whenever canvas size changes
  useEffect(() => {
    const offscreen = document.createElement('canvas');
    offscreen.width = canvasSize.width;
    offscreen.height = canvasSize.height;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    const scale = canvasSize.width / 900;
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;

    // Background fill
    offCtx.fillStyle = '#0a0a1a';
    offCtx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Stars
    starsRef.current.forEach((star) => {
      const sx = star.xRatio * canvasSize.width;
      const sy = star.yRatio * canvasSize.height;
      offCtx.fillStyle = star.color;
      offCtx.beginPath();
      offCtx.arc(sx, sy, star.radius, 0, Math.PI * 2);
      offCtx.fill();
    });

    // Orbit paths
    planets.forEach((planet) => {
      offCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      offCtx.lineWidth = 1;
      offCtx.beginPath();
      offCtx.arc(centerX, centerY, planet.orbitRadius * scale, 0, Math.PI * 2);
      offCtx.stroke();
    });

    bgCanvasRef.current = offscreen;
  }, [canvasSize]);

  const getPlanetPosition = useCallback((planet: Planet, index: number) => {
    const scale = getScale();
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;
    const angle = planetAnglesRef.current[index];
    const orbitRadius = planet.orbitRadius * scale;
    const x = centerX + Math.cos(angle) * orbitRadius;
    const y = centerY + Math.sin(angle) * orbitRadius;
    return { x, y };
  }, [canvasSize, getScale]);

  // Draw function
  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const scale = getScale();
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;

    // Blit pre-rendered background (stars + orbit rings) in a single operation
    if (bgCanvasRef.current) {
      ctx.drawImage(bgCanvasRef.current, 0, 0);
    } else {
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
    }

    // Draw Sun
    const sunRadius = 25 * scale;
    const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sunRadius * 2);
    sunGradient.addColorStop(0, '#fff7e0');
    sunGradient.addColorStop(0.3, '#ffdd44');
    sunGradient.addColorStop(0.6, '#ff9900');
    sunGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, sunRadius * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffdd44';
    ctx.beginPath();
    ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
    ctx.fill();

    // Sun glow animation
    const glowPulse = 1 + Math.sin(timeRef.current * 2) * 0.05;
    const glowGradient = ctx.createRadialGradient(centerX, centerY, sunRadius, centerX, centerY, sunRadius * 3 * glowPulse);
    glowGradient.addColorStop(0, 'rgba(255, 200, 50, 0.3)');
    glowGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, sunRadius * 3 * glowPulse, 0, Math.PI * 2);
    ctx.fill();

    // Draw planets
    planets.forEach((planet, index) => {
      const pos = getPlanetPosition(planet, index);
      const planetRadius = planet.radius * scale;
      const isHovered = hoveredPlanet === planet.name;
      const isSelected = selectedPlanet?.name === planet.name;

      // Planet glow
      if (isHovered || isSelected) {
        const glowGrad = ctx.createRadialGradient(pos.x, pos.y, planetRadius, pos.x, pos.y, planetRadius * 3);
        glowGrad.addColorStop(0, planet.glowColor);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, planetRadius * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Planet body
      const planetGrad = ctx.createRadialGradient(
        pos.x - planetRadius * 0.3,
        pos.y - planetRadius * 0.3,
        0,
        pos.x,
        pos.y,
        planetRadius
      );
      planetGrad.addColorStop(0, planet.lightenedColor);
      planetGrad.addColorStop(1, planet.color);
      ctx.fillStyle = planetGrad;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, planetRadius * (isHovered ? 1.2 : 1), 0, Math.PI * 2);
      ctx.fill();

      // Saturn's rings
      if (planet.name === 'Saturn') {
        ctx.strokeStyle = '#f0d89088';
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.ellipse(pos.x, pos.y, planetRadius * 2, planetRadius * 0.5, 0.3, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Planet name label
      if (isHovered || isSelected) {
        ctx.fillStyle = '#ffffff';
        ctx.font = `${12 * scale}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(planet.name, pos.x, pos.y - planetRadius - 8 * scale);
      }
    });
  }, [canvasSize, getScale, getPlanetPosition, hoveredPlanet, selectedPlanet]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      if (isPlaying) {
        timeRef.current += delta * speed;
        planets.forEach((planet, index) => {
          planetAnglesRef.current[index] += planet.speed * delta * speed * 0.5;
        });
      }

      draw(ctx);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, speed, draw]);

  // Click handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scale = getScale();

    for (let i = planets.length - 1; i >= 0; i--) {
      const planet = planets[i];
      const pos = getPlanetPosition(planet, i);
      const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      const hitRadius = Math.max(planet.radius * scale * 1.5, 15);
      if (dist <= hitRadius) {
        setSelectedPlanet(selectedPlanet?.name === planet.name ? null : planet);
        return;
      }
    }
    setSelectedPlanet(null);
  };

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scale = getScale();

    let found = false;
    for (let i = planets.length - 1; i >= 0; i--) {
      const planet = planets[i];
      const pos = getPlanetPosition(planet, i);
      const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      const hitRadius = Math.max(planet.radius * scale * 1.5, 15);
      if (dist <= hitRadius) {
        setHoveredPlanet(planet.name);
        canvas.style.cursor = 'pointer';
        found = true;
        break;
      }
    }
    if (!found) {
      setHoveredPlanet(null);
      canvas.style.cursor = 'default';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white flex flex-col items-center overflow-hidden">
      {/* Header */}
      <header className="w-full py-4 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
          🌌 Solar System Explorer
        </h1>
        <p className="text-gray-400 mt-1 text-sm md:text-base">Click on any planet to learn more about it</p>
      </header>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 w-full px-4 flex-1">
        {/* Canvas area */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            className="rounded-2xl border border-white/10 shadow-2xl shadow-blue-900/20"
          />
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          {/* Planet Info */}
          {selectedPlanet ? (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full shadow-lg"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${selectedPlanet.lightenedColor}, ${selectedPlanet.color})`,
                  }}
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedPlanet.name}</h2>
                  <span className="text-gray-400 text-sm">{selectedPlanet.emoji}</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{selectedPlanet.description}</p>
              <div className="space-y-3">
                <InfoRow label="Radius" value={`${selectedPlanet.realRadius.toLocaleString()} km`} />
                <InfoRow label="Distance from Sun" value={`${selectedPlanet.distanceFromSun.toLocaleString()} million km`} />
                <InfoRow label="Orbital Period" value={`${selectedPlanet.orbitalPeriod.toLocaleString()} Earth days`} />
                <InfoRow label="Orbital Period" value={`${(selectedPlanet.orbitalPeriod / 365.25).toFixed(2)} Earth years`} />
              </div>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🪐</div>
              <p className="text-gray-400">Click on a planet to view its details</p>
            </div>
          )}

          {/* Controls */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Controls</h3>

            {/* Play/Pause */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
                  isPlaying
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/30'
                    : 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
                }`}
              >
                {isPlaying ? '⏸ Pause' : '▶ Play'}
              </button>
              <button
                onClick={() => {
                  planetAnglesRef.current = planets.map(() => Math.random() * Math.PI * 2);
                }}
                className="py-2.5 px-4 rounded-xl font-medium text-sm bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-all"
              >
                🔀 Reset
              </button>
            </div>

            {/* Speed Control */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-400">Speed</label>
                <span className="text-sm font-mono text-yellow-300">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.1x</span>
                <span>5x</span>
              </div>
            </div>

            {/* Speed Presets */}
            <div className="flex gap-2 mt-3">
              {[0.5, 1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    speed === s
                      ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/40'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Planet Legend */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Planets</h3>
            <div className="grid grid-cols-2 gap-2">
              {planets.map((planet) => (
                <button
                  key={planet.name}
                  onClick={() => setSelectedPlanet(selectedPlanet?.name === planet.name ? null : planet)}
                  className={`flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-all ${
                    selectedPlanet?.name === planet.name
                      ? 'bg-white/10 border border-white/20'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: planet.color }}
                  />
                  <span className="text-gray-300 truncate">{planet.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-3 text-center text-gray-600 text-xs">
        Interactive Solar System Explorer • Not to scale • Educational purposes
      </footer>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-white/5">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  );
}

function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + percent);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + percent);
  const b = Math.min(255, (num & 0x0000ff) + percent);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
