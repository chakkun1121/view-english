'use client';
import { AiFillSound } from 'react-icons/ai';

export function SpeechButton({ text, lang = 'en-US' }: { text: string; lang?: string }) {
  function speech(text: string, lang: string): void {
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = lang;
    speechSynthesis.speak(uttr);
  }
  return (
    <button onClick={() => speech(text, lang)} className="border rounded m-2 p-2 ">
      <AiFillSound className="dark:text-white" />
    </button>
  );
}
