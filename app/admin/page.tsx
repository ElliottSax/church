export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            The admin dashboard is not available in the static deployment.
          </p>
          <p className="text-gray-600">
            Admin features require authentication and a server-side environment.
          </p>
          <p className="text-gray-600 mt-4">
            Please run the development server locally to access admin features.
          </p>
        </div>
      </div>
    </div>
  );
}
