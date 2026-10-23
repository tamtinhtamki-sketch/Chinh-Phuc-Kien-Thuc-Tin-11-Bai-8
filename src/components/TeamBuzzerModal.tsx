import React, { useState, useEffect } from 'react';
import { Team } from '../data/lesson8Data';
import { Volume2, X, RotateCcw, Zap, Trophy } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  onTeamBuzzed: (teamId: number) => void;
}

export const TeamBuzzerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  teams,
  onTeamBuzzed
}) => {
  const [buzzedList, setBuzzedList] = useState<{ teamId: number; timeMs: number }[]>([]);
  const [startTime] = useState<number>(Date.now());

  useEffect(() => {
    if (!isOpen) {
      setBuzzedList([]);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      let teamId: number | null = null;
      if (e.key === '1') teamId = 1;
      if (e.key === '2') teamId = 2;
      if (e.key === '3') teamId = 3;
      if (e.key === '4') teamId = 4;

      if (teamId) {
        handleBuzz(teamId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, buzzedList]);

  if (!isOpen) return null;

  const handleBuzz = (teamId: number) => {
    // Nếu tổ này chưa bấm
    if (buzzedList.some(b => b.teamId === teamId)) return;

    sound.playBuzzer();
    const now = Date.now();
    const elapsed = now - startTime;

    const newList = [...buzzedList, { teamId, timeMs: elapsed }];
    setBuzzedList(newList);

    if (newList.length === 1) {
      // Người bấm đầu tiên
      onTeamBuzzed(teamId);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setBuzzedList([]);
  };

  const winner = buzzedList.length > 0 ? teams.find(t => t.id === buzzedList[0].teamId) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
            <Zap className="w-3.5 h-3.5" />
            ĐẤU TRƯỜNG BẤM CHUÔNG TỐC ĐỘ
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white">
            CHUÔNG GIÀNH QUYỀN TRẢ LỜI
          </h3>
          <p className="text-xs text-slate-400">
            Nhấn phím [1] [2] [3] [4] trên bàn phím hoặc chạm trực tiếp nút chuông bên dưới
          </p>
        </div>

        {/* Winner Spotlight */}
        {winner && (
          <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400/50 text-center space-y-2 animate-bounce">
            <div className="text-amber-400 font-extrabold text-sm flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" />
              CHÚC MỪNG {winner.name.toUpperCase()} ĐÃ GIÀNH QUYỀN!
            </div>
            <div className="text-xs text-amber-200">
              Tốc độ bấm: <strong>{(buzzedList[0].timeMs / 1000).toFixed(2)}s</strong>
            </div>
          </div>
        )}

        {/* 4 Team Buzzer Buttons */}
        <div className="grid grid-cols-2 gap-3.5">
          {teams.map((team) => {
            const rank = buzzedList.findIndex(b => b.teamId === team.id);
            const hasBuzzed = rank !== -1;

            return (
              <button
                key={team.id}
                disabled={hasBuzzed}
                onClick={() => handleBuzz(team.id)}
                className={`p-5 rounded-2xl border transition-all duration-150 flex flex-col items-center justify-center gap-2 active:scale-95 ${
                  hasBuzzed
                    ? rank === 0
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200 ring-2 ring-amber-400'
                      : 'bg-slate-800/40 border-slate-700 text-slate-400 opacity-70'
                    : 'bg-slate-800 hover:bg-slate-700 hover:border-slate-500 border-slate-700 text-white shadow-lg cursor-pointer'
                }`}
              >
                <span className="text-3xl">{team.avatarIcon}</span>
                <span className="font-bold text-sm">{team.name}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-400">
                  Phím [{team.id}]
                </span>

                {hasBuzzed && (
                  <span className={`text-xs font-black mt-1 px-2.5 py-0.5 rounded-full ${
                    rank === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {rank === 0 ? '👑 BẤM TRƯỚC' : `#${rank + 1} (+${((buzzedList[rank].timeMs - buzzedList[0].timeMs) / 1000).toFixed(2)}s)`}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Làm mới chuông
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
          >
            Đóng &amp; Vào Trả Lời
          </button>
        </div>
      </div>
    </div>
  );
};
