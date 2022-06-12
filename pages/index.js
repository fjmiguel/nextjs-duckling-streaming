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

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const data = await graphQLClient.request(query);
  const videos = data.videos;

  const highlitedVideo = randomVideo(videos);

  return {
    props: {
      videos,
      highlitedVideo
    }
  }
};

const Home = ({ videos, highlitedVideo }) => {

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  }

  return (
    <>
      <div className="app">
        <div className="main-video">
          <Image
            src={highlitedVideo.thumbnail.url}
            alt={highlitedVideo.title}
            layout="responsive"
            width={500}
            height={500}
            sizes="50vw"
          />
        </div>
        <div className="video-feed">
          <Section genre={'All'} videos={videos} />
          <Section genre={'Classic'} videos={filterVideos(videos, 'classic')} />
          <Section genre={'Thriller'} videos={filterVideos(videos, 'thriller')} />
          <Section genre={'Drama'} videos={filterVideos(videos, 'drama')} />
          <Section genre={'Family'} videos={filterVideos(videos, 'family')} />
          <Section genre={'Adventure'} videos={filterVideos(videos, 'adventure')} />
          <Section genre={'Super Heroes'} videos={filterVideos(videos, 'super heroes')} />
        </div>
      </div>
    </>
  )
};

export default Home;
