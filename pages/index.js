import { gql, GraphQLClient } from 'graphql-request';
import Image from "next/image";
import Section from "../components/Section";

export const getStaticProps = async () => {
  const url = `${process.env.GRAPH_CMS_ENDPOINT}${process.env.GRAPH_CMS_ENVIRONMENT}`;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": `Bearer ${process.env.GRAPH_CMS_TOKEN}`
    }
  });

  const query = gql`
    query {
      videos {
        createdAt,
        id,
        title,
        description,
        seen,
        slug,
        tags,
        thumbnail {
          url
        },
        mp4 {
          url
        }
      }
    }
  `;

  const data = await graphQLClient.request(query);
  const videos = data.videos;

  return {
    props: {
      videos
    }
  }
};

const Home = ({ videos }) => {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  return (
    <>
      <div className="app">
        <div className="main-video">
          <Image
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
            layout="responsive"
            width={500}
            height={500}
            sizes="50vw"
          />
        </div>
        <div className="video-feed">
          <Section genre={'Classic'} />
          <Section genre={'Thriller'} />
          <Section genre={'Drama'} />
          <Section genre={'Family'} />
          <Section genre={'Adventure'} />
          <Section genre={'Super Heroes'} />
        </div>
      </div>
    </>
  )
};

export default Home;
