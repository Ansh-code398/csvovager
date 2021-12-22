import React from 'react';
import { useRouter } from 'next/router';
import { PostDetail, PostWidget, Loader } from '/components/index.js';
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
        <meta name="og:description" content={`${post.excerpt} by ${post.author}`} />
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