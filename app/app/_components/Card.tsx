'use client';
import { useEffect, useState } from 'react';
import { sectionType } from '../../../@types/wayakuObjectType';
import { useHotkeys } from 'react-hotkeys-hook';
import { SpeechButton } from './SpeechButton';

export function Card({
  questionIndex,
  questionList,
  currentSection,
  back,
  next,
}: {
  questionIndex: number | undefined;
  questionList: string[];
  currentSection: sectionType;
  back: () => void;
  next: () => void;
}) {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  useEffect(() => {
    setIsShowAnswer(false);
  }, [questionIndex]);
  useHotkeys('right,enter', next, {
    enabled: isShowAnswer,
    preventDefault: true,
  });
  useHotkeys('left', back, {
    enabled: isShowAnswer,
    preventDefault: true,
  });
  useHotkeys(
    'space,enter',
    () => {
      setIsShowAnswer(true);
    },
    {
      enabled: !isShowAnswer,
      preventDefault: true,
    }
  );
  return (
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
              <button onClick={next} className="block select-auto p-2 m-2 border rounded flex-1">
                次へ
              </button>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
