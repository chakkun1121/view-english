'use client';
import { AiOutlineClose } from 'react-icons/ai';
import style from './flashCards.module.css';
import { useEffect, useState } from 'react';
import { sectionType, wayakuObject } from '../../../@types/wayakuObjectType';
import { FlashCardHome } from './flashCardHome';
import { useHotkeys } from 'react-hotkeys-hook';
import { VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc';
import { AiFillSound } from 'react-icons/ai';
export function FlashCards({
  wayakuObject,
  close,
}: {
  wayakuObject: wayakuObject | undefined;
  close: () => void;
}) {
  const [mode, setMode] = useState<'home' | 'cards' | 'result'>('home');
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [questionList, setQuestionList] = useState<string[]>([]); //sectionIDの配列
  const [questionIndex, setQuestionIndex] = useState<number>();
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isMinimize, setIsMinimize] = useState<boolean>(false);
  useHotkeys('esc', close, {
    enabled: !wayakuObject,
    preventDefault: true,
  });
  useHotkeys('right,enter', next, {
    enabled: mode === 'cards' && isShowAnswer,
    preventDefault: true,
  });
  useHotkeys('left', back, {
    enabled: mode === 'cards' && isShowAnswer,
    preventDefault: true,
  });
  useHotkeys(
    'space,enter',
    () => {
      setIsShowAnswer(true);
    },
    {
      enabled: mode === 'cards' && !isShowAnswer,
      preventDefault: true,
    }
  );

  function startCards() {
    const sectionList = wayakuObject.wayaku.section.map((section) => section['@_sectionID']);
    if (isRandom) {
      const randomSectionList = sectionList.sort(() => Math.random() - 0.5);
      setQuestionList(randomSectionList.slice(0, questionCount));
    } else {
      setQuestionList([...sectionList]);
    }
    setMode('cards');
    setQuestionIndex(0);
  }
  useEffect(() => {
    setQuestionCount(wayakuObject?.wayaku.section.length || 0);
  }, [wayakuObject]);
  function next() {
    if (questionIndex === questionList.length - 1) {
      setMode('result');
    } else {
      setQuestionIndex(questionIndex + 1);
      setIsShowAnswer(false);
    }
  }
  function back() {
    if (questionIndex === 0) {
      console.error('戻れません');
    } else {
      setQuestionIndex(questionIndex - 1);
      setIsShowAnswer(false);
    }
  }
  const currentSection: sectionType = wayakuObject?.wayaku.section.find(
    (section) => section['@_sectionID'] === questionList[questionIndex]
  );
  return (
    <div
      className={
        style.flashCards +
        ' fixed right-2 left-2 bottom-0 z-40 bg-white border rounded p-2 select-none' +
        (isMinimize ? style.minimize : ' top-10')
      }
    >
      <FlashCardHeader setIsMinimize={setIsMinimize} isMinimize={isMinimize} close={close} />
      {!isMinimize && wayakuObject ? (
        <section className="">
          {mode === 'home' ? (
            <FlashCardHome
              startCards={startCards}
              isRandom={isRandom}
              setIsRandom={setIsRandom}
              questionCount={questionCount}
              wayakuObject={wayakuObject}
              setQuestionCount={setQuestionCount}
            />
          ) : (
            <>
              {mode === 'cards' ? (
                <>
                  <div>
                    {questionIndex + 1} / {questionList.length}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className="block select-auto p-2 m-2 border rounded flex-1">
                        {currentSection.p[1]['#text']}
                      </p>
                      <div className="flex-none">
                        <SpeechButton text={currentSection.p[1]['#text']} lang="ja-JP" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        {isShowAnswer ? (
                          <p className="block select-auto p-2 m-2 border rounded flex-1">
                            {currentSection.p[0]['#text']}
                          </p>
                        ) : (
                          <button
                            onClick={() => setIsShowAnswer(true)}
                            className="block select-auto p-2 m-2 border rounded w-full flex-1"
                          >
                            答えを見る
                          </button>
                        )}
                        <div className="flex-none">
                          <SpeechButton text={currentSection.p[0]['#text']} />
                        </div>
                      </div>
                      {isShowAnswer && (
                        <nav className="flex">
                          <button
                            onClick={back}
                            className="block flex-none p-2 m-2 border rounded px-4"
                            disabled={questionIndex === 0}
                          >
                            戻る
                          </button>
                          <button
                            onClick={next}
                            className="block select-auto p-2 m-2 border rounded flex-1"
                          >
                            次へ
                          </button>
                        </nav>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <button onClick={close}>フラッシュカードを閉じる</button>
              )}
            </>
          )}
        </section>
      ) : (
        <>{!wayakuObject && <p>ファイルを開くか作成してください。</p>}</>
      )}
    </div>
  );
}

function FlashCardHeader({
  setIsMinimize,
  isMinimize,
  close,
}: {
  setIsMinimize: (isMinimize: boolean) => void;
  isMinimize: Boolean;
  close: () => void;
}) {
  return (
    <nav className="flex">
      <h2 className="flex-1">フラッシュカード</h2>
      <button
        onClick={() => setIsMinimize(!isMinimize)}
        className=" hover:bg-gray-300 border rounded p-2 flex-none"
      >
        {!isMinimize ? <VscChromeMinimize /> : <VscChromeMaximize />}
      </button>
      <button onClick={close} className=" hover:bg-red-300 border rounded p-2 flex-none">
        <AiOutlineClose />
      </button>
    </nav>
  );
}

function SpeechButton({ text, lang = 'en-US' }: { text: string; lang?: string }) {
  function speech(text: string, lang: string): void {
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = lang;
    speechSynthesis.speak(uttr);
  }
  return (
    <button
      onClick={() => speech(text, lang)}
      className="border rounded m-2 p-2 bg-gray-100 hover:bg-gray-200"
    >
      <AiFillSound />
    </button>
  );
}
