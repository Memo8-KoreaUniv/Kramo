import dynamic from 'next/dynamic';

const PostEditor = dynamic(
  () => import('src/components/ToastEditor'),
  { ssr: false }
)

function writePost():JSX.Element {
  return (
    <>
      <PostEditor />
    </>
  )
}

export default writePost;
