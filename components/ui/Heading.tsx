type HeadingProps = {
  Element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title: string;
  className?: string;
};

const Heading = ({ Element, title, className }: HeadingProps) => {
  return <Element className={className || ''}>{title}</Element>;
};

export default Heading;
