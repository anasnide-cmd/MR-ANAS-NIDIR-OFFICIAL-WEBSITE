'use client';

export default function LensEffects() {
  return (
    <div className="lens-overlay-system">
      <div className="film-grain"></div>
      <div className="vignette"></div>
      <div className="corner-flare-tl"></div>
      <div className="corner-flare-br"></div>
      
      <style jsx>{`
        .lens-overlay-system {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }
        
        .film-grain {
          position: absolute;
          inset: -100%;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.045;
          pointer-events: none;
          animation: grainMove 8s steps(10) infinite;
        }
        
        @keyframes grainMove {
          0%, 100% { transform:translate(0, 0); }
          10% { transform:translate(-5%, -10%); }
          20% { transform:translate(-15%, 5%); }
          30% { transform:translate(7%, -25%); }
          40% { transform:translate(-5%, 25%); }
          50% { transform:translate(-15%, 10%); }
          60% { transform:translate(15%, 0%); }
          70% { transform:translate(0%, 15%); }
          80% { transform:translate(3%, 35%); }
          90% { transform:translate(-10%, 10%); }
        }
        
        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 100%);
          mix-blend-mode: multiply;
        }
        
        .corner-flare-tl {
          position: absolute;
          top: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle at center, rgba(0, 240, 255, 0.05) 0%, transparent 70%);
          filter: blur(100px);
        }
        
        .corner-flare-br {
          position: absolute;
          bottom: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle at center, rgba(112, 0, 255, 0.05) 0%, transparent 70%);
          filter: blur(100px);
        }
      `}</style>
    </div>
  );
}
