'use client';

export default function RetroGrid() {
  return (
    <div className="retro-grid">
      <div className="grid-lines"></div>
      <style jsx>{`
        .retro-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: #020202;
          z-index: 0;
          perspective: 600px;
        }

        .grid-lines {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background-image: 
            linear-gradient(to right, rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: rotateX(60deg);
          animation: grid-move 20s linear infinite;
        }
        
        /* Vignette */
        .retro-grid::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, transparent 0%, #020202 90%);
          z-index: 1;
        }

        @keyframes grid-move {
          0% {
            transform: rotateX(60deg) translateY(0);
          }
          100% {
            transform: rotateX(60deg) translateY(50px);
          }
        }
      `}</style>
    </div>
  );
}
