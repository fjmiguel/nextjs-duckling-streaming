import Image from "next/image";

const Card = ({ thumbnail }) => {
  return (
    <Image
      src={thumbnail.url}
      alt={thumbnail.title}
      width={300}
      height={200}
    />
  );
};

export default Card;
