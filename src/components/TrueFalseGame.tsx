import React, { useState } from 'react';
import { TRUE_FALSE_QUESTIONS, TrueFalseQuestion, Team } from '../data/lesson8Data';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  Award,
  HelpCircle,
  Check,
  X
} from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface Props {
  teams: Team[];
  activeTeamId: number | null;
  onAwardPoints: (teamId: number, points: number) => void;
  onSelectTeam: (teamId: number) => void;
}

export const TrueFalseGame: React.FC<Props> = ({
  teams,
  activeTeamId,
  onAwardPoints,
  onSelectTeam
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Lưu đáp án của người dùng: key là "questionIndex-subItemId" -> boolean
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});

  const currentQ: TrueFalseQuestion = TRUE_FALSE_QUESTIONS[currentIndex];
  const activeTeam = teams.find(t => t.id === activeTeamId);
  const isSubmitted = !!submittedQuestions[currentIndex];

  const handleSelectChoice = (itemId: string, choice: boolean) => {
    if (isSubmitted) return;
    sound.playClick();
    setAnswers(prev => ({
      ...prev,
      [`${currentIndex}-${itemId}`]: choice
    }));
  };

  // Kiểm tra xem đã trả lời đủ 4 ý a, b, c, d chưa
  const allAnswered = currentQ.items.every(
    item => answers[`${currentIndex}-${item.id}`] !== undefined
  );

  const handleSubmit = () => {
    if (!allAnswered || isSubmitted) return;

    sound.playClick();
    setSubmittedQuestions(prev => ({ ...prev, [currentIndex]: true }));

    // Tính số câu đúng
    let correctCount = 0;
    currentQ.items.forEach(item => {
      const userChoice = answers[`${currentIndex}-${item.id}`];
      if (userChoice === item.isCorrect) {
        correctCount += 1;
      }
    });

    // Thang điểm: 1 ý = 10đ, 2 ý = 20đ, 3 ý = 30đ, 4 ý = 40đ
    const earnedPoints = correctCount * 10;

    if (correctCount >= 3) {
      sound.playCorrect();
      triggerConfetti(2500);
    } else if (correctCount > 0) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    if (activeTeamId && earnedPoints > 0) {
      onAwardPoints(activeTeamId, earnedPoints);
    }
  };

  const handleResetCurrent = () => {
    sound.playClick();
    setSubmittedQuestions(prev => {
      const next = { ...prev };
      delete next[currentIndex];
      return next;
    });
    setAnswers(prev => {
      const next = { ...prev };
      currentQ.items.forEach(item => {
        delete next[`${currentIndex}-${item.id}`];
      });
      return next;
    });
  };

  // Tính số câu trả lời đúng nếu đã submit
  const getCorrectCount = () => {
    return currentQ.items.filter(
      item => answers[`${currentIndex}-${item.id}`] === item.isCorrect
    ).length;
  };

  return (
    <div className="space-y-5">
      {/* Top Header Control */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-400 font-black text-sm flex items-center justify-center">
            {currentIndex + 1}/4
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Phần II • Câu Hỏi Đúng / Sai (Mỗi câu 4 ý)
            </span>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Chuẩn cấu trúc Đổi mới THPT</span>
              <span>•</span>
              <span className="text-amber-400 font-medium">Tối đa 40 điểm / câu</span>
            </div>
          </div>
        </div>

        {/* Center: Team selector */}
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Tổ trả lời:</span>
          {activeTeam ? (
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <span>{activeTeam.avatarIcon}</span>
              <span className="text-purple-300">{activeTeam.shortName}</span>
              {activeTeam.starActive && (
                <span className="text-amber-400 text-[10px] font-black bg-amber-400/20 px-1 rounded">
                  ★ x2
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs text-amber-400 font-semibold italic">
              Chưa chọn tổ
            </span>
          )}
          <div className="flex items-center gap-1 ml-2 border-l border-slate-800 pl-2">
            {teams.map(t => (
              <button
                key={t.id}
                onClick={() => onSelectTeam(t.id)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                  activeTeamId === t.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t.shortName}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleResetCurrent}
          title="Làm lại câu này"
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Question Box */}
      <div className="bg-slate-900/95 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6">
        {/* Context Prompt */}
        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-purple-400 uppercase tracking-wider">
              TÌNH HUỐNG THỰC HÀNH CÂU {currentIndex + 1}
            </span>
            <span className="text-slate-500">{currentQ.reference}</span>
          </div>
          <p className="text-sm md:text-base font-semibold text-slate-100">
            {currentQ.context}
          </p>
        </div>

        {/* 4 Sub-items (a, b, c, d) */}
        <div className="space-y-3.5">
          {currentQ.items.map((item) => {
            const userChoice = answers[`${currentIndex}-${item.id}`];
            const isUserAnswered = userChoice !== undefined;
            const isCorrect = userChoice === item.isCorrect;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/50'
                      : 'bg-rose-950/30 border-rose-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 text-purple-300 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700 uppercase">
                      {item.id}
                    </span>
                    <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                      {item.statement}
                    </p>
                  </div>

                  {/* Choice Buttons: ĐÚNG / SAI */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      disabled={isSubmitted}
                      onClick={() => handleSelectChoice(item.id, true)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
                        userChoice === true
                          ? isSubmitted
                            ? item.isCorrect
                              ? 'bg-emerald-600 text-white border-emerald-500'
                              : 'bg-rose-600 text-white border-rose-500'
                            : 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-400/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      ĐÚNG
                    </button>

                    <button
                      disabled={isSubmitted}
                      onClick={() => handleSelectChoice(item.id, false)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
                        userChoice === false
                          ? isSubmitted
                            ? !item.isCorrect
                              ? 'bg-emerald-600 text-white border-emerald-500'
                              : 'bg-rose-600 text-white border-rose-500'
                            : 'bg-rose-600 text-white border-rose-500 ring-2 ring-rose-400/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                      SAI
                    </button>
                  </div>
                </div>

                {/* Explanation after submission */}
                {isSubmitted && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">
                        Đáp án chuẩn:
                      </span>
                      <span className={`font-black px-2 py-0.5 rounded text-[11px] ${
                        item.isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {item.isCorrect ? 'ĐÚNG' : 'SAI'}
                      </span>
                      <span className="text-slate-400 font-normal">
                        ({isCorrect ? 'Bạn chọn đúng' : 'Bạn chọn sai'})
                      </span>
                    </div>
                    <p className="text-slate-400 leading-relaxed italic">
                      {item.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit & Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div>
            {!isSubmitted ? (
              <span className="text-xs text-slate-400">
                Hãy lựa chọn ĐÚNG hoặc SAI cho cả 4 ý (a, b, c, d) rồi bấm Xác nhận.
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-white">
                  Kết quả: Đúng {getCorrectCount()}/4 ý (+{getCorrectCount() * 10} điểm)
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <button
                disabled={!allAnswered}
                onClick={handleSubmit}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-lg ${
                  allAnswered
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/25 hover:scale-105 active:scale-95'
                    : 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                }`}
              >
                Xác Nhận &amp; Chấm Điểm
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
                }}
                disabled={currentIndex === 0}
                className={`p-2 rounded-xl border border-slate-700 bg-slate-800 text-white ${
                  currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-700'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  if (currentIndex < TRUE_FALSE_QUESTIONS.length - 1) setCurrentIndex(prev => prev + 1);
                }}
                disabled={currentIndex === TRUE_FALSE_QUESTIONS.length - 1}
                className={`p-2 rounded-xl border border-slate-700 bg-slate-800 text-white ${
                  currentIndex === TRUE_FALSE_QUESTIONS.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-700'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
