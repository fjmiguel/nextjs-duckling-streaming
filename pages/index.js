import { gql, GraphQLClient } from 'graphql-request';

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
  return (
    <div>
    </div>
  )
};

export default Home;
