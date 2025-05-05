const Footer = () => {
    return (
      <footer className="bg-primary text-white py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold">Bagella</p>
          <p className="text-sm mt-2">Handmade with love ✨ | Est. 2025</p>
          <p className="text-xs mt-4 text-white">
          © {new Date().getFullYear()} Bagella. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
  
  export default Footer