'use client';
import { useEffect, useState } from 'react';
import { sectionType, wayakuObject } from '../../../../@types/wayakuObjectType';
import { FlashCardHome } from './flashCardHome';
import { useHotkeys } from 'react-hotkeys-hook';
import { FlashCardHeader } from './flashCardHeader';
import { Card } from './Card';
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
  const [isMinimize, setIsMinimize] = useState<boolean>(false);
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
    <div
      className={
        ' fixed inset-x-0 md:inset-x-2 bottom-0 z-40 bg-primary border rounded p-2 select-none' +
        (!isMinimize && ' top-0 md:top-10')
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
                <button onClick={close}>フラッシュカードを閉じる</button>
              )}
            </>
          )}
        </section>
      ) : (
        <section>
          <p>ファイルを開くか作成してください。</p>
        </section>
      )}
    </div>
  );
}
