import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className={`footer-logo `}>
            <Link href="/">
              <Image
                src="/maui-white-logo.svg"
                alt="MAUI"
                width={153}
                height={48}
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
