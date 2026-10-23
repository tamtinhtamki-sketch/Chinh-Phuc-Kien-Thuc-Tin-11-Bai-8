/**
 * Đấu Trường Tin Học 11 - Bài 8: Thực Hành Nâng Cao Sử Dụng Thư Điện Tử Và Mạng Xã Hội
 * Đóng gói trọn vẹn: Infographic, 20 MCQ, 4 Đúng/Sai, 4 Tự luận, Thi đua 4 Tổ, Chế độ Thuyết trình.
 */

import React, { useState, useEffect } from 'react';
import { 
  INITIAL_TEAMS, 
  Team, 
  MCQ_QUESTIONS, 
  TRUE_FALSE_QUESTIONS, 
  SHORT_ANSWER_QUESTIONS 
} from './data/lesson8Data';
import { ScoreBoard } from './components/ScoreBoard';
import { InfographicSection } from './components/InfographicSection';
import { MultipleChoiceGame } from './components/MultipleChoiceGame';
import { TrueFalseGame } from './components/TrueFalseGame';
import { ShortAnswerGame } from './components/ShortAnswerGame';
import { TeamBuzzerModal } from './components/TeamBuzzerModal';
import { PresentationMode } from './components/PresentationMode';
import { sound } from './utils/soundEffects';
import { triggerConfetti } from './utils/confetti';
import { 
  Trophy, 
  BookOpen, 
  CheckSquare, 
  HelpCircle, 
  FileText, 
  Volume2, 
  VolumeX, 
  Zap, 
  Maximize2, 
  Download, 
  Sparkles, 
  Flame, 
  Award,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'infographic' | 'mcq' | 'tf' | 'short' | 'podium'>('infographic');
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [activeTeamId, setActiveTeamId] = useState<number | null>(1);
  const [isBuzzerOpen, setIsBuzzerOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [buzzerWinnerId, setBuzzerWinnerId] = useState<number | null>(null);

  // Cập nhật điểm cho tổ
  const handleUpdateScore = (teamId: number, delta: number) => {
    setTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        const multiplier = t.starActive ? 2 : 1;
        const newScore = Math.max(0, t.score + delta * multiplier);
        const newStreak = delta > 0 ? t.streak + 1 : 0;
        return {
          ...t,
          score: newScore,
          streak: newStreak,
          starActive: false // Ngôi sao tự tắt sau khi dùng
        };
      }
      return t;
    }));
  };

  // Trả lời đúng trong MCQ
  const handleAnswerCorrect = (teamId: number, basePoints: number) => {
    handleUpdateScore(teamId, basePoints);
  };

  // Trả lời sai trong MCQ
  const handleAnswerWrong = (teamId: number, penaltyPoints: number) => {
    handleUpdateScore(teamId, -penaltyPoints);
  };

  // Bật/tắt Ngôi sao hy vọng
  const handleToggleStar = (teamId: number) => {
    sound.playClick();
    setTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        return { ...t, starActive: !t.starActive };
      }
      return t;
    }));
  };

  // Đổi tên tổ
  const handleRenameTeam = (teamId: number, newName: string) => {
    setTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        return { ...t, name: newName };
      }
      return t;
    }));
  };

  // Đặt lại điểm
  const handleResetScores = () => {
    sound.playClick();
    setTeams(prev => prev.map(t => ({ ...t, score: 0, streak: 0, starActive: false })));
    setBuzzerWinnerId(null);
  };

  // Bốc thăm chọn tổ ngẫu nhiên
  const handleSpinRandomTeam = () => {
    const randomIndex = Math.floor(Math.random() * teams.length);
    const chosenTeam = teams[randomIndex];
    setActiveTeamId(chosenTeam.id);
    setBuzzerWinnerId(chosenTeam.id);
    setTimeout(() => setBuzzerWinnerId(null), 3000);
  };

  // Khi có tổ bấm chuông
  const handleTeamBuzzed = (teamId: number) => {
    setActiveTeamId(teamId);
    setBuzzerWinnerId(teamId);
    setTimeout(() => setBuzzerWinnerId(null), 4000);
  };

  // Bật/tắt âm thanh
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Tải file HTML duy nhất 100% offline
  const handleDownloadSingleHTML = () => {
    sound.playClick();
    // Tạo link tải file /tro_choi_tin11_bai8.html
    const link = document.createElement('a');
    link.href = '/tro_choi_tin11_bai8.html';
    link.download = 'tro_choi_tin11_bai8_offline.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mở tab HTML duy nhất trong tab mới
  const handleOpenSingleHTML = () => {
    sound.playClick();
    window.open('/tro_choi_tin11_bai8.html', '_blank');
  };

  // Xếp hạng 4 tổ cho Bảng Vàng Trao Giải
  const rankedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 font-black">
              11
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  TIN HỌC 11 (KNTT)
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• BÀI 8</span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight truncate max-w-xs sm:max-w-md">
                Đấu Trường Thư Điện Tử &amp; Mạng Xã Hội
              </h1>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playBuzzer();
                setIsBuzzerOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 font-bold text-xs border border-red-500/40 transition hover:scale-105 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-red-400 fill-current" />
              <span className="hidden md:inline">Chuông 4 Tổ</span>
              <span className="md:hidden">Chuông</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIsPresentationOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-bold text-xs border border-indigo-500/40 transition hover:scale-105 active:scale-95"
            >
              <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Thuyết trình</span>
            </button>

            <button
              onClick={handleDownloadSingleHTML}
              title="Tải về file HTML duy nhất 100% Offline để mở trên máy chiếu lớp học không cần mạng"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs border border-emerald-500/40 transition hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Tải File 1 HTML (Offline)</span>
              <span className="sm:hidden">Tải 1 File</span>
            </button>

            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-xl border transition ${
                isMuted
                  ? 'bg-rose-950/40 border-rose-800 text-rose-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation Sub-Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentTab('infographic');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition flex items-center gap-1.5 ${
                currentTab === 'infographic'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              🗺️ Infographic Bài 8
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentTab('mcq');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition flex items-center gap-1.5 ${
                currentTab === 'mcq'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              📝 20 Trắc Nghiệm ABCD
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentTab('tf');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition flex items-center gap-1.5 ${
                currentTab === 'tf'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              ⚖️ 4 Câu Đúng / Sai
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentTab('short');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition flex items-center gap-1.5 ${
                currentTab === 'short'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              ✍️ 4 Câu Tự Luận
            </button>

            <button
              onClick={() => {
                sound.playVictory();
                triggerConfetti(3500);
                setCurrentTab('podium');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition flex items-center gap-1.5 ${
                currentTab === 'podium'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <Trophy className="w-4 h-4" />
              🏆 Bảng Vàng Vinh Danh
            </button>
          </div>

          <button
            onClick={handleOpenSingleHTML}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold hidden lg:inline-flex items-center gap-1 shrink-0"
          >
            <span>Mở bản HTML độc lập</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
        {/* Dynamic 4-Team Competition Scoreboard */}
        <ScoreBoard
          teams={teams}
          activeTeamId={activeTeamId}
          onSelectTeam={(id) => {
            sound.playClick();
            setActiveTeamId(id);
          }}
          onUpdateScore={handleUpdateScore}
          onToggleStar={handleToggleStar}
          onRenameTeam={handleRenameTeam}
          onResetScores={handleResetScores}
          onSpinRandomTeam={handleSpinRandomTeam}
          buzzerWinnerId={buzzerWinnerId}
        />

        {/* Tab 1: Infographic Section */}
        {currentTab === 'infographic' && (
          <InfographicSection
            onStartQuiz={() => {
              sound.playClick();
              setCurrentTab('mcq');
            }}
            onOpenPresentation={() => {
              sound.playClick();
              setIsPresentationOpen(true);
            }}
          />
        )}

        {/* Tab 2: 20 Multiple Choice Questions */}
        {currentTab === 'mcq' && (
          <MultipleChoiceGame
            teams={teams}
            activeTeamId={activeTeamId}
            onAnswerCorrect={handleAnswerCorrect}
            onAnswerWrong={handleAnswerWrong}
            onSelectTeam={(id) => setActiveTeamId(id)}
          />
        )}

        {/* Tab 3: 4 True / False Questions */}
        {currentTab === 'tf' && (
          <TrueFalseGame
            teams={teams}
            activeTeamId={activeTeamId}
            onAwardPoints={(id, pts) => handleUpdateScore(id, pts)}
            onSelectTeam={(id) => setActiveTeamId(id)}
          />
        )}

        {/* Tab 4: 4 Short Answer Questions */}
        {currentTab === 'short' && (
          <ShortAnswerGame
            teams={teams}
            activeTeamId={activeTeamId}
            onAwardPoints={(id, pts) => handleUpdateScore(id, pts)}
            onSelectTeam={(id) => setActiveTeamId(id)}
          />
        )}

        {/* Tab 5: Podium & Award Ceremony */}
        {currentTab === 'podium' && (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-10 shadow-2xl space-y-8 animate-fadeIn">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                LỄ TRAO GIẢI ĐẤU TRƯỜNG TIN HỌC 11
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white">
                BẢNG VÀNG THÀNH TÍCH 4 TỔ
              </h2>
              <p className="text-sm text-slate-300">
                Tổng kết điểm số các phần thi Infographic, 20 câu trắc nghiệm ABCD, 4 câu Đúng/Sai và 4 câu tự luận thực tế.
              </p>
            </div>

            {/* Podium Visual Stand */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pt-6 max-w-4xl mx-auto">
              {/* Rank 2 (Silver) */}
              <div className="order-2 md:order-1 flex flex-col items-center">
                <div className="text-3xl mb-1">{rankedTeams[1]?.avatarIcon}</div>
                <div className="font-bold text-sm text-slate-200 text-center">{rankedTeams[1]?.name}</div>
                <div className="text-xs text-slate-400 font-semibold mb-2">{rankedTeams[1]?.score} điểm</div>
                <div className="w-full h-32 rounded-t-2xl bg-gradient-to-t from-slate-800 to-slate-700 border-t-4 border-slate-400 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-2xl font-black text-slate-300">#2</span>
                  <span className="text-xs font-bold text-slate-400">HUY CHƯƠNG BẠC</span>
                </div>
              </div>

              {/* Rank 1 (Gold) */}
              <div className="order-1 md:order-2 flex flex-col items-center">
                <div className="text-4xl mb-1 animate-bounce">👑</div>
                <div className="text-3xl mb-1">{rankedTeams[0]?.avatarIcon}</div>
                <div className="font-black text-base text-amber-300 text-center">{rankedTeams[0]?.name}</div>
                <div className="text-sm text-amber-400 font-bold mb-2">{rankedTeams[0]?.score} điểm</div>
                <div className="w-full h-44 rounded-t-2xl bg-gradient-to-t from-amber-600 via-amber-500 to-yellow-400 border-t-4 border-amber-300 flex flex-col items-center justify-center shadow-xl shadow-amber-500/20">
                  <span className="text-3xl font-black text-slate-950">#1</span>
                  <span className="text-xs font-black text-slate-900">QUÁN QUÂN BÀI 8</span>
                </div>
              </div>

              {/* Rank 3 (Bronze) */}
              <div className="order-3 flex flex-col items-center">
                <div className="text-3xl mb-1">{rankedTeams[2]?.avatarIcon}</div>
                <div className="font-bold text-sm text-slate-200 text-center">{rankedTeams[2]?.name}</div>
                <div className="text-xs text-slate-400 font-semibold mb-2">{rankedTeams[2]?.score} điểm</div>
                <div className="w-full h-24 rounded-t-2xl bg-gradient-to-t from-amber-950 to-amber-900 border-t-4 border-amber-700 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-xl font-black text-amber-500">#3</span>
                  <span className="text-xs font-bold text-amber-600">HUY CHƯƠNG ĐỒNG</span>
                </div>
              </div>

              {/* Rank 4 */}
              <div className="order-4 flex flex-col items-center">
                <div className="text-3xl mb-1">{rankedTeams[3]?.avatarIcon}</div>
                <div className="font-bold text-sm text-slate-200 text-center">{rankedTeams[3]?.name}</div>
                <div className="text-xs text-slate-400 font-semibold mb-2">{rankedTeams[3]?.score} điểm</div>
                <div className="w-full h-16 rounded-t-2xl bg-slate-900 border-t-4 border-slate-800 flex flex-col items-center justify-center shadow-sm">
                  <span className="text-lg font-bold text-slate-500">#4</span>
                  <span className="text-[10px] text-slate-500">KHUYẾN KHÍCH</span>
                </div>
              </div>
            </div>

            {/* Actions in Podium */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  sound.playVictory();
                  triggerConfetti(3000);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/20 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Bắn Pháo Hoa Chúc Mừng
              </button>

              <button
                onClick={handleDownloadSingleHTML}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center gap-2 border border-slate-700"
              >
                <Download className="w-4 h-4" />
                Tải File HTML Trò Chơi (Offline)
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500 space-y-1">
        <div>
          Trò chơi giáo dục &amp; Thuyết trình tương tác Tin học 11 • Bài 8: Thực hành nâng cao Thư điện tử và Mạng xã hội (KNTT)
        </div>
        <div className="text-[11px] text-slate-600">
          Được thiết kế chuẩn cấu trúc Đổi mới Giáo dục, đáp án 20 câu trắc nghiệm cân đối, 4 câu đúng/sai, 4 câu tự luận, hoạt động 100% Offline không cần link ngoài.
        </div>
      </footer>

      {/* Fast Buzzer Modal for 4 Teams */}
      <TeamBuzzerModal
        isOpen={isBuzzerOpen}
        onClose={() => setIsBuzzerOpen(false)}
        teams={teams}
        onTeamBuzzed={handleTeamBuzzed}
      />

      {/* Fullscreen Slide Presentation Mode */}
      <PresentationMode
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        onStartGame={() => {
          setIsPresentationOpen(false);
          setCurrentTab('mcq');
        }}
      />
    </div>
  );
}
