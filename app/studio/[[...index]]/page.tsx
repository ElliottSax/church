export default function StudioPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">Sanity Studio</h1>
        <p className="text-gray-600 mb-4">
          The Sanity Studio is not available in the static deployment.
        </p>
        <p className="text-gray-600">
          Please run the development server locally to access the CMS.
        </p>
      </div>
    </div>
  );
}
