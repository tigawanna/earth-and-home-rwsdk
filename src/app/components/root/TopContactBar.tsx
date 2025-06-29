export function TopContactBar() {
  return (
    <div className="bg-primary text-primary-content py-2">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            📞 (555) 123-4567
          </span>
          <span className="flex items-center gap-2">
            ✉️ info@earthandhome.com
          </span>
        </div>
        <span>Licensed Real Estate Professionals</span>
      </div>
    </div>
  );
}
