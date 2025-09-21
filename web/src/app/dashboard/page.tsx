export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-neutral-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to Baddilha Admin
            </h2>
            <p className="text-gray-400">
              You have successfully logged in to the admin dashboard.
            </p>
          </div>
          <div className="bg-neutral-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-2">
              <p className="text-gray-400">Users: 0</p>
              <p className="text-gray-400">Projects: 0</p>
              <p className="text-gray-400">Tasks: 0</p>
            </div>
          </div>
          <div className="bg-neutral-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-400">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}
