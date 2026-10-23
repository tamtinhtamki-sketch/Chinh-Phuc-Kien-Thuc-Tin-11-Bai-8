import React, { useState } from 'react';
import { SHORT_ANSWER_QUESTIONS, ShortAnswerQuestion, Team } from '../data/lesson8Data';
import { 
  FileText, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Sparkles,
  BookOpen,
  RotateCcw
} from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface Props {
  teams: Team[];
  activeTeamId: number | null;
  onAwardPoints: (teamId: number, points: number) => void;
  onSelectTeam: (teamId: number) => void;
}

export const ShortAnswerGame: React.FC<Props> = ({
  teams,
  activeTeamId,
  onAwardPoints,
  onSelectTeam
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [teamAnswers, setTeamAnswers] = useState<Record<number, string>>({});
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [awardedScores, setAwardedScores] = useState<Record<number, number>>({});

  const currentQ: ShortAnswerQuestion = SHORT_ANSWER_QUESTIONS[currentIndex];
  const activeTeam = teams.find(t => t.id === activeTeamId);

  const handleTextChange = (text: string) => {
    setTeamAnswers(prev => ({
      ...prev,
      [currentIndex]: text
    }));
  };

  const handleGrade = (points: number) => {
    if (!activeTeamId) {
      alert("Vui lòng chọn Tổ trả lời trên thanh trên để ghi điểm!");
      return;
    }

    sound.playCorrect();
    triggerConfetti(2000);
    setAwardedScores(prev => ({
      ...prev,
      [currentIndex]: points
    }));
    onAwardPoints(activeTeamId, points);
  };

  const handleReset = () => {
    sound.playClick();
    setShowModelAnswer(false);
    setTeamAnswers(prev => {
      const next = { ...prev };
      delete next[currentIndex];
      return next;
    });
    setAwardedScores(prev => {
      const next = { ...prev };
      delete next[currentIndex];
      return next;
    });
  };

  return (
    <div className="space-y-5">
      {/* Top Header Control */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-black text-sm flex items-center justify-center">
            {currentIndex + 1}/4
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Phần III • Tự Luận Ngắn Gọn (Tình Huống Thực Tế)
            </span>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Rèn luyện tư duy thực hành &amp; phân tích</span>
              <span>•</span>
              <span className="text-amber-400 font-medium">Tối đa 25 điểm / câu</span>
            </div>
          </div>
        </div>

        {/* Center: Team selector */}
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Tổ trả lời:</span>
          {activeTeam ? (
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <span>{activeTeam.avatarIcon}</span>
              <span className="text-emerald-300">{activeTeam.shortName}</span>
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
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t.shortName}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleReset}
          title="Làm lại câu này"
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-slate-900/95 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider">
              CÂU HỎI TỰ LUẬN {currentIndex + 1}: {currentQ.title}
            </span>
            <span className="text-slate-500">{currentQ.reference}</span>
          </div>
          <h2 className="text-base md:text-xl font-bold text-white leading-relaxed">
            {currentQ.prompt}
          </h2>
        </div>

        {/* Student Answer Input Box */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Câu trả lời của {activeTeam?.name || 'Học sinh'}:</span>
            <span className="text-slate-500 font-normal">Gõ ngắn gọn ý chính</span>
          </label>
          <textarea
            value={teamAnswers[currentIndex] || ''}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Nhập câu trả lời hoặc tóm tắt ý kiến thảo luận của nhóm tại đây..."
            rows={4}
            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 p-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 leading-relaxed"
          />
        </div>

        {/* Toggle Model Answer */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playClick();
              setShowModelAnswer(!showModelAnswer);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
          >
            {showModelAnswer ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-emerald-400" />}
            {showModelAnswer ? "Ẩn đáp án gợi ý & thang điểm" : "Mở đối chiếu đáp án chuẩn & từ khóa"}
          </button>
        </div>

        {/* Model Answer & Rubric Panel */}
        {showModelAnswer && (
          <div className="rounded-xl p-5 bg-slate-950/90 border border-emerald-500/40 space-y-4 animate-fadeIn">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Đáp án chuẩn tham khảo (Trích SGK)
              </div>
              <p className="text-xs md:text-sm text-slate-200 mt-2 leading-relaxed whitespace-pre-line bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                {currentQ.sampleAnswer}
              </p>
            </div>

            {/* Key rubric items */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Từ khoá / Ý then chốt cần có:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                {currentQ.keyPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded bg-slate-900 border border-slate-800"
                  >
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Teacher Fast Grading Controls */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-300">
                  Ban giám khảo / Giáo viên chấm điểm cho {activeTeam?.shortName || 'Tổ'}:
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {[10, 15, 20, 25].map((pts) => (
                  <button
                    key={pts}
                    onClick={() => handleGrade(pts)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white font-bold text-xs border border-emerald-500/40 transition hover:scale-105 active:scale-95"
                  >
                    +{pts} điểm
                  </button>
                ))}
              </div>
            </div>

            {awardedScores[currentIndex] && (
              <div className="text-xs text-emerald-400 font-bold text-right">
                Đã cộng +{awardedScores[currentIndex]} điểm cho câu này!
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              sound.playClick();
              if (currentIndex > 0) {
                setCurrentIndex(prev => prev - 1);
                setShowModelAnswer(false);
              }
            }}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
              currentIndex === 0 ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500' : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Câu trước
          </button>

          <button
            onClick={() => {
              sound.playClick();
              if (currentIndex < SHORT_ANSWER_QUESTIONS.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setShowModelAnswer(false);
              }
            }}
            disabled={currentIndex === SHORT_ANSWER_QUESTIONS.length - 1}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition ${
              currentIndex === SHORT_ANSWER_QUESTIONS.length - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
            }`}
          >
            Câu tiếp theo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
