import Icon from "@/components/atoms/Icon";

const Footer = () => {
  return (
    <footer className="mt-auto sticky bottom-0 border-t border-gray-50 flex items-center justify-center gap-2 text-medium-base text-gray-900 py-5 bg-white">
      <span>Powered by </span>
      <Icon name="icon-eusate" size={20} />
      <span>Eusate</span>
    </footer>
  );
};

export default Footer;
