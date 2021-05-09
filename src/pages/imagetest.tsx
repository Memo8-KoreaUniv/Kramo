import Image from 'next/image'

export default function ImageTest() {
  return (
    <>
      <h1>정적 이미지 테스트.</h1>
      <Image src="/test.png" width="128" height="128"></Image>
    </>
  )
}
