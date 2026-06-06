import CelcoClient from '@mr/ui/Celco/CelcoClient';

export const metadata = {
  title: 'Celco | Premium Spreadsheet',
  description: 'A high-performance, premium spreadsheet application by Mr. Anas Nidir.',
};

export default function CelcoPage() {
  return (
    <main className="min-h-screen bg-[#020402]">
      <CelcoClient />
    </main>
  );
}
