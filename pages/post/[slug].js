import React from 'react';
import { useRouter } from 'next/router';
import { PostDetail, PostWidget, Loader } from '../../components/index.js';
import { getPosts, getPostDetails } from '../../services/index.js';
import { AdjacentPosts } from '../../sections/index.js';
import Head from 'next/head';

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="og:description" content={`${post.excerpt} by ${post.author.name}`} />
        <meta name="og:image" content={post.featuredImage.url} />
        <meta name="og:title" content={post.title} />
        <meta name="og:url" content={`https://csvoyager.vercel.app/post/${post.slug}`} />
      </Head>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            {/* <iframe src={post.pdf.url} width='100%' height='1000px' /> */}
            <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
            {/* <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} /> */}
            <iframe width={700} height={400} src="https://96afa406.sibforms.com/serve/MUIEAOYTzFb4IN5QdKIHqSpuQ_lRwYZs4sLXfKieEhCM4G3Iyzb5aMAZJ1upDU3skC1JlMutqsg1WjwE9QaLbOhuJZS54vYlpschtlNIob897TSFQjhaTccFSKvZTLpW7uh5Bzk6-f07fm37REImlpmNPB9a5QkZefcn92P5Mr2y1OawIhu4odjjcd4yyIqI0EMuF-zlnTO8ql4M" frameBorder={0} scrolling="auto" allowFullScreen style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%'}} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
              {/* <Categories /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}