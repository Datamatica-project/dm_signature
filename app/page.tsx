import Image from 'next/image';
import { SignatureGenerator } from './_signature-generator/components/SignatureGenerator';

export default function Home() {
  return (
    <main className="min-h-screen px-4 pt-6 pb-16 sm:px-8 sm:pt-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-7">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-4">
          <Image
            src="/headerlogo.png"
            alt="DataMatica"
            width={992}
            height={232}
            priority
            className="h-9 w-auto self-center sm:hidden"
          />
          <Image
            src="/datamatica_Logo.png"
            alt="DataMatica"
            width={56}
            height={56}
            priority
            className="hidden size-14 shrink-0 object-contain sm:block"
          />
          <div className="flex min-w-0 flex-col gap-1.5">
            <h1 className="text-xl font-bold tracking-[-0.4px] sm:text-2xl">메일 서명 생성기</h1>
            <p className="text-muted text-[13px] break-keep sm:text-sm">
              정보를 입력하면 미리보기가 바로 바뀝니다. 마지막에 생성 버튼을 누르면 붙여넣을 HTML
              코드가 나옵니다.
            </p>
          </div>
        </header>
        <SignatureGenerator />
      </div>
    </main>
  );
}
