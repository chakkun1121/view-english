'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { sectionType } from '../../../../@types/wayakuObjectType';
import { useHotkeys } from 'react-hotkeys-hook';
import { SpeechButton } from './SpeechButton';
import { BsCircle } from 'react-icons/bs';
import { HiXMark } from 'react-icons/hi2';
import EditableText from '../../../_components/editableText';
import { EditButton } from '../../../_components/EditButton';

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
  function handleChange(text: string, place: 'en' | 'ja') {
    setCurrentSection({
      ...currentSection,
      p: [
        {
          ...currentSection.p[0],
          '#text': place === 'en' ? text : currentSection.p[0]['#text'],
        },
        {
          ...currentSection.p[1],
          '#text': place === 'ja' ? text : currentSection.p[1]['#text'],
        },
      ],
    } as sectionType);
  }
  return (
    <>
      <div>
        {questionIndex + 1} / {questionList.length}
      </div>
      <div>
        <div className="flex items-center">
          <EditableText
            text={currentSection.p[1]['#text']}
            canEdit={isEditing}
            onChange={(text: string) => handleChange(text, 'ja')}
            placeHolder="日本語訳を入力"
            lang="ja"
            className="block select-auto p-2 m-2 border rounded flex-1 text-L "
          />
          <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
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
                className="block select-auto p-2 m-2 border rounded dark:text-white"
              >
                解答する
              </button>
            )}
          </div>
        )}
        <div>
          <div className="flex items-center">
            {isShowAnswer ? (
              <EditableText
                text={currentSection.p[0]['#text']}
                canEdit={isEditing}
                onChange={(text: string) => handleChange(text, 'en')}
                placeHolder="英語を入力"
                lang="en"
                className="block select-auto p-2 m-2 border rounded flex-1 text-L "
              />
            ) : (
              <button
                onClick={() => setIsShowAnswer(true)}
                className="block select-auto p-2 m-2 border rounded w-full flex-1 dark:text-white"
              >
                答えを見る
              </button>
            )}
            <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
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
                <button
                  onClick={back}
                  className="block flex-none p-2 m-2 border rounded px-4 dark:text-white"
                >
                  戻る
                </button>
              ) : (
                <></>
              )}
              <button
                onClick={next}
                className="block select-auto p-2 m-2 border rounded flex-1 dark:text-white"
              >
                次へ
              </button>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
