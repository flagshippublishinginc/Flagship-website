import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header text-primary">
      <div className="header-container">
        <div className="logo">
          <Link href="/">
            <Image
              src="/maui-logo.svg"
              alt="MAUI"
              width={153}
              height={48}
              priority
            />
          </Link>
        </div>

        <div className="header-phone">
          <a
            href="tel:+18082428331"
            className="text-primary text-[14px] font-medium">
            (808) 242-8331
          </a>
        </div>
        <div className="header-right flex items-center gap-6 font-medium text-[14px]">
          <div className="header-search">Search</div>
          <div className="header-cart">Cart</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
