import Link from "next/link";
import { getPostsMetaData } from '@/lib/getPostsData';

// @ts-ignore
function Home({ postsData }) {
  return (
    <div className='info-container m-0-[5%]-0-[5%]'>
      <h1 className="text-blue-700 text-3xl font-bold underline">Hello, Next.js!</h1>
      <hr/>
      {/*
        Render with posts metadata here
      */}
      {postsData.map((metadata: any) => {
        return (
          <div key = {metadata.id}>
            <Link href={`${metadata.id}`} key={metadata.title} >
              {metadata.title}
            </Link>
            <p className='post-description text-red-400'>{metadata.date || metadata.tags}</p>
          </div>
        )
      })}

      <style jsx>{`
        .post-description {
          font-size: 16px;
          color: #000000e6;
        }
      `}</style>
    </div>
  )
}

async function getStaticProps() {
  const postsData = getPostsMetaData();
  return {
    props: {
      postsData: postsData,
    }
  }
}

export default Home

export {
  getStaticProps
}