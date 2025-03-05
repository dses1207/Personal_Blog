import Link from 'next/link';

type Props = React.ComponentPropsWithoutRef<'a'> & {
  href: string;
};

const CustomLink = ({ href, ...rest }: Props) => {
  const isInternalLink = href.startsWith('/');
  const isAnchorLink = href.startsWith('#');

  if (isInternalLink) {
    return <Link href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default CustomLink;
