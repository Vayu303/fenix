interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
  max-w-[1920px] px-10 xl:px-40 md:mx-12 sm:mx-10 
  "
    >
      {children}
    </div>
  );
};

export default Container;
