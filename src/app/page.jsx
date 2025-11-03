//vincent crooks

import Catalog from './components/Catalog';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Mini-Storefront</h1>
        <Catalog />
      </div>
    </main>
  );
}
