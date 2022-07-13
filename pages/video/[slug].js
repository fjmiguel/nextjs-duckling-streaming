import { gql, GraphQLClient } from 'graphql-request';
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const url = `${process.env.GRAPH_CMS_ENDPOINT}${process.env.GRAPH_CMS_ENVIRONMENT}`;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": `Bearer ${process.env.GRAPH_CMS_TOKEN}`
    }
  });

  const query = gql`
    query($pageSlug: String!) {
      video(where: {
        slug: $pageSlug
      })
      {
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

  const graphQLVariables = {
    pageSlug,
  };

  const data = await graphQLClient.request(query, graphQLVariables);
  const video = data.video;

  return {
    props: {
      video
    }
  }
};

const Video = ({ video }) => {
  const [watching, setWatching] = useState(false)
  return (
    <>
      <Image
        src={video.thumbnail.url}
        alt={video.title}
        className='video-image'
        layout='fill'
      />
      <div className='info'>
        <p>{video.tags.join(', ')}</p>
        <p>{video.description}</p>
        <Link href={`/`}><a>go back</a></Link>
        <button
          className="video-overlay"
          onClick={() => {
            watching ? setWatching(false) : setWatching(true)
          }}
        >PLAY</button>
      </div>
      {watching && (
        <video width="100%" controls>
          <source src={video.mp4.url} type="video/mp4" />
        </video>
      )}
    </>
  )
};

export default Video;
