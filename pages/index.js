import { gql, GraphQLClient } from 'graphql-request';
import Image from "next/image";
import NavBar from '../components/NavBar';
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

  const unSeenVideos = (videos) => {
    return videos.filter(video => Boolean(video.seen) === false);
  };

  const style = {
    width: '100vw',
    height: '50vh',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '50px'
  };

  return (
    <>
    <NavBar />
      <div className="app">
        <div className="main-video">
          <Image
            src={highlitedVideo.thumbnail.url}
            alt={highlitedVideo.title}
            style={style}
            layout="raw"
            width={500}
            height={500}
          />
        </div>
        <div className="video-feed">
          <Section genre={'Recommended for you'} videos={unSeenVideos(videos)} />
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
