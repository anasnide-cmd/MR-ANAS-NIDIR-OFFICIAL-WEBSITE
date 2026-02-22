export const metadata = {
    title: 'Creovate | AI Creative Studio',
    description: 'A sleek, luxury graphic editor built for the NEX ecosystem.',
};

export default function CreovateLayout({ children }) {
    return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: '#000', color: '#fff' }}>
            {children}
        </div>
    );
}
