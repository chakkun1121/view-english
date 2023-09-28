'use client';
import { useEffect, useState } from 'react';
import { sectionType } from '../../../../@types/wayakuObjectType';
import { useHotkeys } from 'react-hotkeys-hook';
import { SpeechButton } from '../SpeechButton';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';
import { HiXMark } from 'react-icons/hi2';

export function Card({
  questionIndex,
  questionList,
  currentSection,
  setCurrentSection,
  isAnswerWithKeyboard,
  back,
  next,
}: {
  questionIndex: number | undefined;
  questionList: string[];
  currentSection: sectionType;
  setCurrentSection: (section: sectionType) => void;
  isAnswerWithKeyboard: boolean;
  back: () => void;
  next: () => void;
}) {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  useEffect(() => {
    setCurrentAnswer('');
  }, [questionIndex]);
  useEffect(() => {
    setIsShowAnswer(false);
    setIsEditing(false);
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
    'ctrl+enter',
    () => {
      setIsEditing(!isEditing);
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
    }
  );
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
          {isEditing ? (
            <input
              className="block select-auto p-2 m-2 border rounded flex-1 text-L bg-gray-100 focus:bg-gray-300"
              defaultValue={currentSection.p[1]['#text']}
              onChange={(e) =>
                setCurrentSection({
                  ...currentSection,
                  p: [
                    currentSection.p[0],
                    {
                      ...currentSection.p[1],
                      '#text': e.target.value,
                    },
                  ],
                })
              }
            />
          ) : (
            <p
              className="block select-auto p-2 m-2 rounded flex-1"
              onDoubleClick={() => setIsEditing(true)}
            >
              {currentSection.p[1]['#text']}
            </p>
          )}
          <div className="flex-none hidden md:block">
            <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
          </div>
          {isEditing && (
            <div className="flex-none md:none">
              <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
            </div>
          )}
          <div className="flex-none hidden md:block">
            <SpeechButton text={currentSection.p[1]['#text']} lang="ja-JP" aria-label="読み上げ" />
          </div>
        </div>
        {isAnswerWithKeyboard && (
          <div className="flex items-center">
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              className="block select-auto p-2 m-2 border rounded flex-1 text-L bg-gray-100 focus:bg-gray-300"
              placeholder="解答欄"
              disabled={isShowAnswer}
            />
            {isShowAnswer ? (
              <div className="flex-none p-2 m-2">
                {currentAnswer === currentSection.p[0]['#text'] ? <BsCircle /> : <HiXMark />}
              </div>
            ) : (
              <button
                onClick={() => setIsShowAnswer(true)}
                className="block select-auto p-2 m-2 border rounded"
              >
                解答する
              </button>
            )}
          </div>
        )}
        <div>
          <div className="flex items-center">
            {isShowAnswer ? (
              <>
                {isEditing ? (
                  <input
                    className="block select-auto p-2 m-2 border rounded flex-1 text-L bg-gray-100 focus:bg-gray-300"
                    lang="en"
                    defaultValue={currentSection.p[0]['#text']}
                    onChange={(e) =>
                      setCurrentSection({
                        ...currentSection,
                        p: [
                          {
                            ...currentSection.p[0],
                            '#text': e.target.value,
                          },
                          currentSection.p[1],
                        ],
                      })
                    }
                  />
                ) : (
                  <p
                    className="block select-auto p-2 m-2 flex-1"
                    lang="en"
                    onDoubleClick={() => setIsEditing(true)}
                  >
                    {currentSection.p[0]['#text']}
                  </p>
                )}
              </>
            ) : (
              <button
                onClick={() => setIsShowAnswer(true)}
                className="block select-auto p-2 m-2 border rounded w-full flex-1"
              >
                答えを見る
              </button>
            )}
            <div className="flex-none hidden md:block">
              <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
            </div>
            {isEditing && (
              <div className="flex-none md:hidden">
                <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
              </div>
            )}
            <div className="flex-none hidden md:block">
              <SpeechButton
                text={currentSection.p[1]['#text']}
                lang="ja-JP"
                aria-label="読み上げ"
              />
            </div>
          </div>
          {isShowAnswer && (
            <nav className="flex">
              {questionIndex ? (
                <button onClick={back} className="block flex-none p-2 m-2 border rounded px-4">
                  戻る
                </button>
              ) : (
                <></>
              )}
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
function EditButton({ isEditing, setIsEditing }: { isEditing: boolean; setIsEditing: any }) {
  return (
    <button
      onClick={() => setIsEditing(!isEditing)}
      className="block select-auto p-2 m-2 border rounded"
      aria-label="編集"
    >
      {isEditing ? <AiOutlineCheck /> : <FiEdit2 />}
    </button>
  );
}
