import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getAllPostsPath, getPostData } from '@/lib/getPostsData';

const components = {
  h1: (props: any) => <h1 style = {{
    fontSize: 'calc(1rem + 1.5vw)',
    color: 'black',
    margin: '1vh 0 1vh 0', }}
    {...props} />,

  p: (props: any) => <p style = {{
    fontSize: 'calc(1rem + 0.1vw)',
    color: '#000000e6',
    margin: '0vh 0 1vh 0' }}
    {...props} />,
}

// @ts-ignore
function Blog({ postMetadata, postContent }) {
  return (
    <div>
      <div className = 'blog-content'>
        <MDXRemote {...postContent} components = {components} />
      </div>

      <style jsx>{`
        .blog-content {
          display: flex;
          flex: 100%;
          flex-direction: column;
          margin: 1vw 25vw 1vw 25vw;
          width: 50vw;
          max-width: 50vw;
        }
      `}</style>
    </div>
  )
}

async function getStaticPaths() {
  const paths = getAllPostsPath();
  return {
    paths,
    fallback: false,
  }
}

// @ts-ignore
export async function getStaticProps({params}) {
  const postData = getPostData(params.id);
  const mdxSource = await serialize(postData.content);
  return {
    props: {
      postMetadata: postData.metadata,
      postContent: mdxSource,
      id: params.id,
    }
  }
}

export default Blog;
export {
  getStaticPaths
}