import Icon from "@/components/atoms/Icon";

const Footer = () => {
  return (
    <footer className="mt-auto sticky bottom-0 border-t border-gray-50 flex items-center justify-center gap-2 text-medium-base text-gray-900 py-5 bg-white">
      <span>Powered by </span>
      <Icon name="icon-eusate" size={20} />
      <span>Eusate</span>
      <div className="absolute bottom-0 left-0 w-full shadow-[0px_-10px_20px_10px_rgba(255,255,255,1)]  h-full pointer-events-none -z-1" />
    </footer>
  );
};

export default Footer;
