import React, { useState } from 'react';
import { Team } from '../data/lesson8Data';
import { 
  Trophy, 
  Star, 
  Plus, 
  Minus, 
  Volume2, 
  RotateCcw, 
  Shuffle, 
  Edit3, 
  Check, 
  Flame,
  Award
} from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';

interface Props {
  teams: Team[];
  activeTeamId: number | null;
  onSelectTeam: (teamId: number) => void;
  onUpdateScore: (teamId: number, delta: number) => void;
  onToggleStar: (teamId: number) => void;
  onRenameTeam: (teamId: number, newName: string) => void;
  onResetScores: () => void;
  onSpinRandomTeam: () => void;
  buzzerWinnerId: number | null;
}

export const ScoreBoard: React.FC<Props> = ({
  teams,
  activeTeamId,
  onSelectTeam,
  onUpdateScore,
  onToggleStar,
  onRenameTeam,
  onResetScores,
  onSpinRandomTeam,
  buzzerWinnerId
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempName, setTempName] = useState('');

  // Sắp xếp các tổ theo điểm số giảm dần để xác định huy chương
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  const getRankBadge = (team: Team) => {
    const rankIndex = sortedTeams.findIndex(t => t.id === team.id);
    if (rankIndex === 0 && team.score > 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
          <Trophy className="w-3 h-3 text-amber-400" />
          Hạng 1
        </span>
      );
    }
    if (rankIndex === 1 && team.score > 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-400/20 text-slate-300 text-xs font-bold border border-slate-400/40">
          <Award className="w-3 h-3 text-slate-300" />
          Hạng 2
        </span>
      );
    }
    if (rankIndex === 2 && team.score > 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-700/20 text-amber-500 text-xs font-bold border border-amber-700/40">
          <Award className="w-3 h-3 text-amber-600" />
          Hạng 3
        </span>
      );
    }
    return (
      <span className="text-xs text-slate-500 font-medium">
        Tổ #{team.id}
      </span>
    );
  };

  const handleStartEdit = (team: Team) => {
    setEditingId(team.id);
    setTempName(team.name);
  };

  const handleSaveEdit = (teamId: number) => {
    if (tempName.trim()) {
      onRenameTeam(teamId, tempName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 md:p-5 shadow-xl space-y-4">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm md:text-base tracking-tight">
              BẢNG THI ĐUA 4 TỔ HỌC TẬP
            </h3>
            <span className="text-xs text-slate-400">
              Chọn tổ trả lời hoặc điều chỉnh điểm số linh hoạt
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playBuzzer();
              onSpinRandomTeam();
            }}
            title="Quay ngẫu nhiên chọn một tổ trả lời"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-medium text-xs border border-indigo-500/40 transition hover:scale-105 active:scale-95"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Chọn ngẫu nhiên
          </button>

          <button
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn đặt lại điểm số của cả 4 tổ về 0?")) {
                onResetScores();
              }
            }}
            title="Đặt lại điểm số 4 tổ"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {teams.map((team) => {
          const isActive = activeTeamId === team.id;
          const isBuzzerWinner = buzzerWinnerId === team.id;

          return (
            <div
              key={team.id}
              className={`relative rounded-xl p-3.5 transition-all duration-200 border flex flex-col justify-between ${
                isBuzzerWinner
                  ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : isActive
                  ? 'bg-slate-800/90 border-blue-500 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Star of Hope Badge */}
              {team.starActive && (
                <div className="absolute -top-2.5 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 animate-pulse">
                  <Star className="w-3 h-3 fill-current" />
                  X2 ĐIỂM
                </div>
              )}

              {/* Buzzer Alert */}
              {isBuzzerWinner && (
                <div className="absolute -top-2.5 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 animate-bounce">
                  <Volume2 className="w-3 h-3" />
                  GIÀNH QUYỀN TRẢ LỜI!
                </div>
              )}

              {/* Team Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  {getRankBadge(team)}
                  <button
                    onClick={() => onToggleStar(team.id)}
                    title={team.starActive ? "Tắt Ngôi sao hy vọng" : "Bật Ngôi sao hy vọng (Nhân đôi điểm thưởng/phạt)"}
                    className={`p-1 rounded transition ${
                      team.starActive
                        ? 'text-amber-400 bg-amber-400/10'
                        : 'text-slate-600 hover:text-amber-400'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${team.starActive ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl">{team.avatarIcon}</span>
                  {editingId === team.id ? (
                    <div className="flex items-center gap-1 flex-1">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="w-full bg-slate-900 border border-blue-500 rounded px-1.5 py-0.5 text-xs text-white"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveEdit(team.id)}
                        className="p-1 rounded bg-blue-600 text-white hover:bg-blue-500"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between flex-1 group">
                      <span
                        onClick={() => onSelectTeam(team.id)}
                        className="font-bold text-slate-100 text-xs md:text-sm cursor-pointer hover:text-blue-400 transition truncate"
                      >
                        {team.name}
                      </span>
                      <button
                        onClick={() => handleStartEdit(team)}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-slate-300 transition p-0.5"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Score Number Display */}
                <div
                  onClick={() => onSelectTeam(team.id)}
                  className="cursor-pointer py-1.5 px-2 rounded-lg bg-slate-900/80 border border-slate-800 text-center hover:border-slate-700 transition"
                >
                  <div className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-1.5">
                    {team.score}
                    <span className="text-xs font-semibold text-slate-400">điểm</span>
                  </div>
                  {team.streak >= 2 && (
                    <div className="text-[10px] font-bold text-orange-400 flex items-center justify-center gap-1 mt-0.5">
                      <Flame className="w-3 h-3" />
                      Chuỗi đúng x{team.streak}
                    </div>
                  )}
                </div>
              </div>

              {/* Point Quick Controls */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-1">
                <button
                  onClick={() => onSelectTeam(team.id)}
                  className={`flex-1 py-1 px-2 rounded text-xs font-bold transition text-center ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  {isActive ? 'Đang chọn' : 'Chọn tổ'}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      sound.playClick();
                      onUpdateScore(team.id, -10);
                    }}
                    title="Trừ 10 điểm"
                    className="p-1 rounded bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      sound.playCorrect();
                      triggerConfetti(1500);
                      onUpdateScore(team.id, 10);
                    }}
                    title="Cộng 10 điểm"
                    className="p-1 rounded bg-slate-800 hover:bg-emerald-950 hover:text-emerald-400 text-slate-400 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      sound.playCorrect();
                      triggerConfetti(2500);
                      onUpdateScore(team.id, 20);
                    }}
                    title="Cộng 20 điểm"
                    className="px-1.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 font-bold text-[10px] border border-emerald-500/30 transition"
                  >
                    +20
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
