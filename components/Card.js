import Image from "next/image";

const Card = ({ thumbnail }) => {

  const style = {
    width: '20%',
    height: '100%',
    borderRadius: '5%',
    margin: '5px',
    filter: 'drop-shadow(5px 5px 10px #000)'
  };

  return (
    <Image
      style={style}
      src={thumbnail.url}
      alt={thumbnail.title}
      layout='raw'
      width={300}
      height={200}
    />
  );
};

export default Card;
