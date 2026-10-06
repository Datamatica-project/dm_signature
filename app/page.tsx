import Image from 'next/image';
import { SignatureGenerator } from './_signature-generator/components/SignatureGenerator';

export default function Home() {
  return (
    <main className="min-h-screen px-8 pt-10 pb-16">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-7">
        <header className="flex items-center gap-4">
          <Image
            src="/datamatica_Logo.png"
            alt="DataMatica"
            width={56}
            height={56}
            priority
            className="size-14 shrink-0 object-contain"
          />
          <div className="flex min-w-0 flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-[-0.4px]">메일 서명 생성기</h1>
            <p className="text-muted text-sm">
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
