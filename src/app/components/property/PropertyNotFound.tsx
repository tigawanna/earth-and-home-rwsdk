export function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="text-6xl">🏠</div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-base-content">Property Not Found</h1>
          <p className="text-lg text-base-content/70">
            The property you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <div className="space-x-4">
          <a href="/listings" className="btn btn-primary">
            Browse All Properties
          </a>
          <a href="/" className="btn btn-outline">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
