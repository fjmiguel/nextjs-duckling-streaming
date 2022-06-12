import { gql, GraphQLClient } from 'graphql-request';

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
  return (
    <div></div>
  )
};

export default Video;
