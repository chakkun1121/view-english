'use client';
import { useEffect, useState } from 'react';
import { sectionType, wayakuObject } from '../../../../@types/wayakuObjectType';
import { FlashCardHome } from './flashCardHome';
import { useHotkeys } from 'react-hotkeys-hook';
import { Card } from './Card';
import WinBox from '../../../../winbox';
export function FlashCards({
  wayakuObject,
  close,
  fileContent,
  setFileContent,
}: {
  wayakuObject: wayakuObject | undefined;
  close: () => void;
  fileContent: wayakuObject;
  setFileContent: (wayakuObject: wayakuObject) => void;
}) {
  const [mode, setMode] = useState<'home' | 'cards' | 'result'>('home');
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [questionList, setQuestionList] = useState<string[]>([]); //sectionIDの配列
  const [questionIndex, setQuestionIndex] = useState<number>();
  const [isAnswerWithKeyboard, setIsAnswerWithKeyboard] = useState<boolean>(false);

  useHotkeys('esc', close, {
    enabled: !wayakuObject || mode === 'result',
    preventDefault: true,
  });
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
    }
  }
  function back() {
    if (questionIndex === 0) {
      console.error('戻れません');
    } else {
      setQuestionIndex(questionIndex - 1);
    }
  }
  const currentSection: sectionType = wayakuObject?.wayaku.section.find(
    (section) => section['@_sectionID'] === questionList[questionIndex]
  );
  function setCurrentSection(section: sectionType) {
    setFileContent({
      ...fileContent,
      wayaku: {
        ...fileContent.wayaku,
        section: fileContent.wayaku.section.map((s) => {
          if (s['@_sectionID'] === section['@_sectionID']) {
            return section;
          } else {
            return s;
          }
        }),
      },
    });
  }
  return (
    <WinBox
      title="フラッシュカード"
      top={document.body.clientWidth < 768 ? 0 : 60}
      bottom={document.body.clientWidth < 768 ? 60 : 0}
      y={60}
      width={document.body.clientWidth}
      height={document.body.clientHeight - 60}
      onClose={close}
      className="rounded"
    >
      <div className="p-2 bg-primary h-full dark:text-white">
        {mode === 'home' ? (
          <FlashCardHome
            startCards={startCards}
            isRandom={isRandom}
            setIsRandom={setIsRandom}
            questionCount={questionCount}
            wayakuObject={wayakuObject}
            setQuestionCount={setQuestionCount}
            isAnswerWithKeyboard={isAnswerWithKeyboard}
            setIsAnswerWithKeyboard={setIsAnswerWithKeyboard}
          />
        ) : (
          <>
            {mode === 'cards' ? (
              <Card
                setCurrentSection={setCurrentSection}
                questionIndex={questionIndex}
                questionList={questionList}
                currentSection={currentSection}
                isAnswerWithKeyboard={isAnswerWithKeyboard}
                back={back}
                next={next}
              />
            ) : (
              <button onClick={close} className="dark:text-white">
                フラッシュカードを閉じる
              </button>
            )}
          </>
        )}
      </div>
    </WinBox>
  );
}
