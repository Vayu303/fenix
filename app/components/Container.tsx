interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Permette l'aggiunta di classi personalizzate
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
