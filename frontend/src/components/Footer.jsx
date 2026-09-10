function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-[9px] text-white sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-500">
            Privacy Policy
          </a>

          <a href="#" className="hover:text-blue-500">
            Terms of Use
          </a>

          <a href="#" className="hover:text-blue-500">
            Site Map
          </a>
        </div>

        <p>© Copyright 2024. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
