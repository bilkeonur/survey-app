import { Typography } from "@material-tailwind/react";

export function Footer() {

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
        © 2024 Onur BiLKE
        </Typography>
        <ul className="flex items-center gap-4">
          <li>
            <Typography
              variant="small"
              className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">
                Anket Uygulaması
            </Typography>
          </li>
        </ul>
      </div>
    </footer>
  );
}

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
