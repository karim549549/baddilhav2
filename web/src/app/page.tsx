export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">🔄 BADDILHA</h1>
          <p className="text-xl text-white/80 mb-2">Universal Link Handler</p>
          <p className="text-lg text-white/60">
            Seamless OAuth authentication for mobile apps
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* API Status Card */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 text-white border border-gray-800/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">API Status</h3>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-white/70 mb-4">Backend API running on Render</p>
            <a
              href="https://baddilhav2.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              View API Docs
            </a>
          </div>

          {/* OAuth Flow Card */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 text-white border border-gray-800/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">OAuth Flow</h3>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-white/70 mb-4">
              Google OAuth with Universal Links
            </p>
            <a
              href="/auth/google/callback?type=test"
              className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              Test OAuth Flow
            </a>
          </div>

          {/* Mobile App Card */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 text-white border border-gray-800/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Mobile App</h3>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-white/70 mb-4">React Native with deep linking</p>
            <div className="text-sm text-white/50">
              Bundle ID: com.baddilha.app
            </div>
          </div>

          {/* Database Card */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 text-white border border-gray-800/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Database</h3>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-white/70 mb-4">Supabase PostgreSQL</p>
            <div className="text-sm text-white/50">Prisma ORM</div>
          </div>

          {/* Storage Card */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 text-white border border-gray-800/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">File Storage</h3>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-white/70 mb-4">Supabase Blob Storage</p>
            <div className="text-sm text-white/50">Image uploads</div>
          </div>

          {/* Deployment Card */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 text-white border border-gray-800/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Deployment</h3>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-white/70 mb-4">Vercel + Render</p>
            <div className="text-sm text-white/50">Auto-deploy from GitHub</div>
          </div>
        </div>

        {/* Todos Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Project Status & Todos
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Completed Tasks */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <h3 className="text-xl font-semibold text-white">
                  ✅ Completed
                </h3>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Deep linking configured in app.json</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Backend callback URL updated</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Deep link handling in React Native</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Universal Link handler created</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>OAuth callback page with Tailwind</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>API types mirrored to mobile app</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Axios service with error handling</span>
                </li>
              </ul>
            </div>

            {/* In Progress */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-xl font-semibold text-white">
                  🔄 In Progress
                </h3>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">⏳</span>
                  <span>Google OAuth configuration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">⏳</span>
                  <span>Vercel deployment setup</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">⏳</span>
                  <span>Token storage implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">⏳</span>
                  <span>Navigation flow completion</span>
                </li>
              </ul>
            </div>

            {/* Current Problems */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-xl font-semibold text-white">
                  ⚠️ Current Issues
                </h3>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">!</span>
                  <span>Google OAuth redirect URI mismatch</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">!</span>
                  <span>Deep link not opening mobile app</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">!</span>
                  <span>Token storage not implemented</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">!</span>
                  <span>Username selection flow incomplete</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">!</span>
                  <span>Apple auth not implemented</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              <h3 className="text-xl font-semibold text-white">
                🎯 Next Steps
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
              <div>
                <h4 className="font-semibold text-white mb-2">Immediate:</h4>
                <ul className="space-y-1">
                  <li>• Deploy web app to Vercel</li>
                  <li>• Update Google OAuth redirect URIs</li>
                  <li>• Test Universal Link flow</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Short-term:</h4>
                <ul className="space-y-1">
                  <li>• Implement secure token storage</li>
                  <li>• Complete username selection flow</li>
                  <li>• Add Apple authentication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/60">
          <p>
            Baddilha Universal Link Handler - Built with Next.js 15 & Tailwind
            CSS
          </p>
        </div>
      </div>
    </div>
  );
}
