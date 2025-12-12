export const metadata = {
  title: 'Member Portal | Minneapolis Community of Christ',
  description: 'Access your member dashboard and resources',
};

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Member Portal</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            The member portal is not available in the static deployment.
          </p>
          <p className="text-gray-600">
            Authentication and member features require a server-side environment.
          </p>
          <p className="text-gray-600 mt-4">
            Please contact the church office for member resources and information.
          </p>
        </div>
      </div>
    </div>
  );
}
