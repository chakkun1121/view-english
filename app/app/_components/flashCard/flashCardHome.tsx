'use client';
import { wayakuObject } from '../../../../@types/wayakuObjectType';

export function FlashCardHome({
  startCards,
  isRandom,
  setIsRandom,
  questionCount,
  wayakuObject,
  setQuestionCount,
  isAnswerWithKeyboard,
  setIsAnswerWithKeyboard,
}: {
  startCards: () => void;
  isRandom: boolean;
  setIsRandom: (isRandom: boolean) => void;
  questionCount: number;
  wayakuObject: wayakuObject;
  setQuestionCount: (questionCount: number) => void;
  isAnswerWithKeyboard: boolean;
  setIsAnswerWithKeyboard: (isAnswerWithKeyboard: boolean) => void;
}) {
  return (
    <>
      <button
        onClick={startCards}
        className="bg-gray-200 hover:bg-gray-300 rounded border p-2 disabled:bg-gray-400"
        disabled={isRandom && !questionCount}
        title={isRandom && !questionCount && '出題数を入力してください'}
      >
        フラッシュカードをスタート
      </button>
      <div className="my-4">
        <p>オプション</p>
        <label className="block m-2">
          <input
            className="p-2 w-4 h-4"
            type="checkbox"
            defaultChecked={isRandom}
            onChange={(e) => setIsRandom(e.target.checked)}
          />
          ランダムに出題する
        </label>
        <label className="block m-2">
          <input
            type="checkbox"
            className="p-2 w-4 h-4"
            defaultChecked={isAnswerWithKeyboard}
            onChange={(e) => setIsAnswerWithKeyboard(e.target.checked)}
          />
          キーボードで解答する
        </label>
        <label className="block m-2">
          出題数:
          <input
            className="p-2 disabled:bg-gray-300   dark:disabled:border-none dark:bg-gray-800 rounded border w-20"
            disabled={!isRandom}
            type="number"
            value={questionCount}
            max={wayakuObject.wayaku.section.length}
            min={1}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
          />
          問/全{wayakuObject.wayaku.section.length}問{' '}
          {!isRandom &&
            '※この機能はランダム出題時のみしか利用できません。ランダム出題機能をオフにした場合はすべての問題が順に出題されます。'}
        </label>
      </div>
    </>
  );
}
