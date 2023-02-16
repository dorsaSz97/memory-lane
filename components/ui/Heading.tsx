type HeadingProps = {
  Element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title: string;
};

const Heading = ({ Element, title }: HeadingProps) => {
  return <Element>{title}</Element>;
};

export default Heading;
