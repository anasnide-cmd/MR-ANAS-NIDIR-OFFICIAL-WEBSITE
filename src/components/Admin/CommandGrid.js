'use client';

const CommandGrid = ({ children }) => {
  return (
    <div className="command-grid">
      {children}
      <style jsx>{`
        .command-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-auto-rows: minmax(100px, auto);
            gap: 15px;
            padding: 15px;
            background: rgba(0, 0, 0, 0.9);
            min-height: 100vh;
        }
        @media (max-width: 1024px) {
            .command-grid { grid-template-columns: repeat(6, 1fr); }
        }
        @media (max-width: 768px) {
            .command-grid { grid-template-columns: 1fr; display: flex; flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export const GridItem = ({ children, colSpan = 3, rowSpan = 1, title, border = true }) => (
    <div className={`grid-item col-${colSpan} row-${rowSpan} ${border ? 'bordered' : ''}`}>
        {title && <div className="item-header"><h3>{title}</h3></div>}
        <div className="item-content">{children}</div>
        
        {/* Decorative Corners */}
        {border && (
            <>
                <div className="corner tl" />
                <div className="corner tr" />
                <div className="corner bl" />
                <div className="corner br" />
            </>
        )}

        <style jsx>{`
            .grid-item {
                grid-column: span ${colSpan};
                grid-row: span ${rowSpan};
                background: rgba(5, 5, 5, 0.8);
                position: relative;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            .bordered { border: 1px solid rgba(0, 243, 255, 0.1); }
            
            .item-header {
                padding: 10px 15px;
                border-bottom: 1px solid rgba(0, 243, 255, 0.1);
                background: linear-gradient(90deg, rgba(0,243,255,0.05), transparent);
            }
            .item-header h3 {
                margin: 0;
                font-size: 0.7rem;
                color: var(--cia-accent);
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            
            .item-content { flex: 1; padding: 15px; position: relative; }

            .corner {
                position: absolute;
                width: 6px; height: 6px;
                border: 1px solid var(--cia-accent);
                transition: all 0.3s;
            }
            .tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
            .tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
            .bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
            .br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

            .grid-item:hover .corner { width: 100%; height: 100%; opacity: 0.2; }
        `}</style>
    </div>
);

export default CommandGrid;
