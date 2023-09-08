'use client';
import { AiOutlineClose } from 'react-icons/ai';
import style from './flashCards.module.css';
import { useEffect, useState } from 'react';
import { sectionType, wayakuObject } from '../../../@types/wayakuObjectType';
import { FlashCardHome } from './flashCardHome';
export function FlashCards({
  isShowFlashCards,
  setIsShowFlashCards,
  wayakuObject,
}: {
  isShowFlashCards: boolean;
  setIsShowFlashCards: (isShowFlashCards: boolean) => void;
  wayakuObject: wayakuObject;
}) {
  const [mode, setMode] = useState<'home' | 'cards' | 'result'>('home');
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [questionList, setQuestionList] = useState<string[]>([]); //sectionIDの配列
  const [questionIndex, setQuestionIndex] = useState<number>();
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
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
  return (
    <div
      className={
        style.flashCards +
        ' fixed bottom-0 right-2 left-2 z-40 bg-white border rounded p-2 select-none ' +
        (isShowFlashCards ? style.show + ' top-10' : 'top-full')
      }
    >
      <nav className="flex">
        <h2 className="flex-1">フラッシュカード</h2>
        <button
          onClick={() => setIsShowFlashCards(false)}
          className=" hover:bg-red-300 border rounded p-2 flex-none"
        >
          <AiOutlineClose />
        </button>
      </nav>
      {wayakuObject ? (
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
                    <div>
                      <p className="block select-auto p-2 m-2 border rounded">
                        {
                          wayakuObject.wayaku.section.find(
                            (section) => section['@_sectionID'] === questionList[questionIndex]
                          ).p[1]['#text']
                        }
                      </p>
                    </div>
                    <div>
                      {isShowAnswer ? (
                        <>
                          <p className="block select-auto p-2 m-2 border rounded">
                            {
                              wayakuObject.wayaku.section.find(
                                (section) => section['@_sectionID'] === questionList[questionIndex]
                              ).p[0]['#text']
                            }
                          </p>
                          <button
                            onClick={() => {
                              if (questionIndex === questionList.length - 1) {
                                setMode('result');
                              } else {
                                setQuestionIndex(questionIndex + 1);
                                setIsShowAnswer(false);
                              }
                            }}
                            className="block select-auto p-2 m-2 border rounded"
                          >
                            次へ
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsShowAnswer(true)}
                          className="block select-auto p-2 m-2 border rounded w-full"
                        >
                          答えを見る
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button onClick={() => setIsShowFlashCards(false)}>
                    フラッシュカードを閉じる
                  </button>
                </>
              )}
            </>
          )}
        </section>
      ) : (
        <>
          <p>ファイルを開くか作成してください。</p>
        </>
      )}
    </div>
  );
}
