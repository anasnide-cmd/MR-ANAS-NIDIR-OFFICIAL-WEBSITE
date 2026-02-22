'use client';

const CommandGrid = ({ children }) => {
  return (
    <div className="command-grid">
      {children}
      <style jsx>{`
        .command-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-auto-rows: minmax(120px, auto);
            gap: 24px;
            padding: 24px;
            min-height: calc(100vh - 80px); /* Assuming top bar height + margin */
        }
        @media (max-width: 1024px) {
            .command-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; padding: 16px; }
        }
        @media (max-width: 768px) {
            .command-grid { grid-template-columns: 1fr; display: flex; flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export const GridItem = ({ children, colSpan = 3, rowSpan = 1, title, border = true }) => (
    <div className="grid-item">
        {title && <div className="item-header"><h3>{title}</h3></div>}
        <div className="item-content">{children}</div>

        <style jsx>{`
            .grid-item {
                /* Note: colSpan and rowSpan are less relevant for auto-fit grids but we keep them for logic parity */
                background: rgba(15, 23, 42, 0.4);
                backdrop-filter: blur(24px);
                -webkit-backdrop-filter: blur(24px);
                position: relative;
                display: flex;
                flex-direction: column;
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease;
                overflow: hidden;
            }
            .grid-item:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 40px rgba(168, 85, 247, 0.15);
                border-color: rgba(255, 255, 255, 0.2);
            }
            
            .item-header {
                padding: 16px 24px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
            }
            .item-header h3 {
                margin: 0;
                font-size: 1.05rem;
                font-weight: 600;
                color: #f8fafc;
                font-family: 'Inter', 'Roboto', sans-serif;
                letter-spacing: 0.5px;
            }
            
            .item-content { flex: 1; padding: 24px; position: relative; color: #cbd5e1; }
        `}</style>
    </div>
);

export default CommandGrid;
