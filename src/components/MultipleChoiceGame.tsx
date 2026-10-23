import React, { useState, useEffect, useRef } from 'react';
import { MCQ_QUESTIONS, MCQQuestion, Team } from '../data/lesson8Data';
import { 
  CheckCircle2, 
  XCircle, 
  Timer, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  Star, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  HelpCircle,
  Award
} from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface Props {
  teams: Team[];
  activeTeamId: number | null;
  onAnswerCorrect: (teamId: number, basePoints: number) => void;
  onAnswerWrong: (teamId: number, penaltyPoints: number) => void;
  onSelectTeam: (teamId: number) => void;
}

export const MultipleChoiceGame: React.FC<Props> = ({
  teams,
  activeTeamId,
  onAnswerCorrect,
  onAnswerWrong,
  onSelectTeam
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const [timerDuration, setTimerDuration] = useState<number>(30); // 15, 30, 45, 0 (off)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [userAnswers, setUserAnswers] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentQuestion = MCQ_QUESTIONS[currentIndex];
  const activeTeam = teams.find(t => t.id === activeTeamId);

  // Khởi động lại đồng hồ khi chuyển câu
  useEffect(() => {
    setSelectedOption(userAnswers[currentIndex]?.selected ?? null);
    setIsAnswered(!!userAnswers[currentIndex]);
    setShowExplanation(!!userAnswers[currentIndex]);
    
    if (timerDuration > 0 && !userAnswers[currentIndex]) {
      setTimeRemaining(timerDuration);
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning(false);
    }
  }, [currentIndex, timerDuration]);

  // Bộ đếm thời gian
  useEffect(() => {
    if (!isTimerRunning || isAnswered || timerDuration === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          sound.playTimeUp();
          setIsTimerRunning(false);
          return 0;
        }
        if (prev <= 6) {
          sound.playTimerTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isAnswered, timerDuration]);

  // Xử lý khi người dùng chọn đáp án
  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    sound.playClick();
    setSelectedOption(index);
    setIsAnswered(true);
    setIsTimerRunning(false);
    setShowExplanation(true);

    const isCorrect = index === currentQuestion.correctIndex;

    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: { selected: index, isCorrect }
    }));

    if (activeTeamId) {
      const basePoints = 20;
      if (isCorrect) {
        sound.playCorrect();
        triggerConfetti(2000);
        onAnswerCorrect(activeTeamId, basePoints);
      } else {
        sound.playIncorrect();
        onAnswerWrong(activeTeamId, 10);
      }
    } else {
      if (isCorrect) {
        sound.playCorrect();
        triggerConfetti(1500);
      } else {
        sound.playIncorrect();
      }
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < MCQ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleResetCurrent = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setTimeRemaining(timerDuration);
    setIsTimerRunning(timerDuration > 0);
    setUserAnswers(prev => {
      const next = { ...prev };
      delete next[currentIndex];
      return next;
    });
  };

  const OPTION_LABELS = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-5">
      {/* Quiz Top Control Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        {/* Left: Progress & Question tracker */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 font-black text-sm flex items-center justify-center">
            {currentIndex + 1}/20
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Phần I • Trắc Nghiệm 4 Lựa Chọn
            </span>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Độ dài 4 đáp án tương đồng</span>
              <span>•</span>
              <span className="text-amber-400 font-medium">+20 điểm / câu</span>
            </div>
          </div>
        </div>

        {/* Center: Selected Team for this Question */}
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Tổ trả lời:</span>
          {activeTeam ? (
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <span>{activeTeam.avatarIcon}</span>
              <span className="text-blue-300">{activeTeam.shortName}</span>
              {activeTeam.starActive && (
                <span className="text-amber-400 text-[10px] font-black bg-amber-400/20 px-1 rounded">
                  ★ x2
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs text-amber-400 font-semibold italic">
              Chưa chọn tổ (Chế độ lớp học)
            </span>
          )}
          <div className="flex items-center gap-1 ml-2 border-l border-slate-800 pl-2">
            {teams.map(t => (
              <button
                key={t.id}
                onClick={() => onSelectTeam(t.id)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                  activeTeamId === t.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Timer & Reset */}
        <div className="flex items-center gap-2">
          {timerDuration > 0 && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm transition ${
                timeRemaining <= 5
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>{timeRemaining}s</span>
            </div>
          )}

          <select
            value={timerDuration}
            onChange={(e) => setTimerDuration(Number(e.target.value))}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300 font-medium"
          >
            <option value={15}>Hẹn giờ 15s</option>
            <option value={30}>Hẹn giờ 30s</option>
            <option value={60}>Hẹn giờ 60s</option>
            <option value={0}>Tắt hẹn giờ</option>
          </select>

          <button
            onClick={handleResetCurrent}
            title="Làm lại câu này"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/95 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6">
        {/* Question Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-blue-400">CÂU HỎI {currentIndex + 1} / 20</span>
            <span className="text-slate-500">{currentQuestion.reference}</span>
          </div>
          <h2 className="text-lg md:text-2xl font-bold text-white leading-relaxed tracking-tight">
            {currentQuestion.question}
          </h2>
        </div>

        {/* 4 Balanced Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {currentQuestion.options.map((option, idx) => {
            const isThisSelected = selectedOption === idx;
            const isThisCorrect = idx === currentQuestion.correctIndex;

            let buttonStyle = 'bg-slate-950/70 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-slate-200';
            let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';

            if (isAnswered) {
              if (isThisCorrect) {
                buttonStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
                badgeStyle = 'bg-emerald-600 text-white border-emerald-500';
              } else if (isThisSelected && !isThisCorrect) {
                buttonStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/40';
                badgeStyle = 'bg-rose-600 text-white border-rose-500';
              } else {
                buttonStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${buttonStyle} ${
                  !isAnswered ? 'hover:scale-[1.01] active:scale-[0.99] cursor-pointer' : 'cursor-default'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 border shadow-sm ${badgeStyle}`}
                >
                  {OPTION_LABELS[idx]}
                </span>
                <span className="text-sm md:text-base font-medium leading-relaxed pt-0.5 flex-1">
                  {option}
                </span>

                {isAnswered && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Feedback & Explanation */}
        {showExplanation && (
          <div
            className={`p-4 md:p-5 rounded-xl border text-sm space-y-2 transition animate-fadeIn ${
              selectedOption === currentQuestion.correctIndex
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <div className="flex items-center gap-2">
                {selectedOption === currentQuestion.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>CHÍNH XÁC! Chúc mừng {activeTeam?.name || 'bạn'}!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span>CHƯA CHÍNH XÁC! Đáp án đúng là {OPTION_LABELS[currentQuestion.correctIndex]}.</span>
                  </>
                )}
              </div>
              <span className="text-xs text-slate-300 font-normal">
                {currentQuestion.reference}
              </span>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">
              <strong>Giải thích chi tiết:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Câu trước
          </button>

          <span className="text-xs text-slate-400 hidden sm:inline">
            Dùng phím mũi tên [←] [→] để chuyển câu
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === MCQ_QUESTIONS.length - 1}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition ${
              currentIndex === MCQ_QUESTIONS.length - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
            }`}
          >
            Câu tiếp theo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 20 Question Jump Grid */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Danh sách 20 câu trắc nghiệm:
          </span>
          <span className="text-xs text-slate-500">
            Đã làm: {Object.keys(userAnswers).length}/20
          </span>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-20 gap-2">
          {MCQ_QUESTIONS.map((q, idx) => {
            const answered = userAnswers[idx];
            const isCurrent = currentIndex === idx;

            let badgeBg = 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700';

            if (answered) {
              if (answered.isCorrect) {
                badgeBg = 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-bold';
              } else {
                badgeBg = 'bg-rose-600/30 border-rose-500 text-rose-300 font-bold';
              }
            }

            if (isCurrent) {
              badgeBg += ' ring-2 ring-blue-500 font-black text-white scale-105';
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  sound.playClick();
                  setCurrentIndex(idx);
                }}
                className={`h-9 rounded-lg border text-xs flex items-center justify-center transition-all ${badgeBg}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
