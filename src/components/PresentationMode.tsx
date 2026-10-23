import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  Play, 
  Sparkles,
  Zap,
  HelpCircle,
  Award
} from 'lucide-react';
import { INFOGRAPHIC_STATIONS } from '../data/lesson8Data';
import { sound } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: () => void;
}

export const PresentationMode: React.FC<Props> = ({
  isOpen,
  onClose,
  onStartGame
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [laserActive, setLaserActive] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });

  const totalSlides = 6;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'l' || e.key === 'L') {
        setLaserActive(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (laserActive) {
      setLaserPos({ x: e.clientX, y: e.clientY });
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  const handleNext = () => {
    sound.playClick();
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden cursor-default select-none"
    >
      {/* Laser pointer circle */}
      {laserActive && (
        <div
          style={{ left: laserPos.x - 10, top: laserPos.y - 10 }}
          className="fixed pointer-events-none w-5 h-5 rounded-full bg-red-500 shadow-[0_0_15px_#ef4444] z-[9999] opacity-90 transition-transform duration-75"
        />
      )}

      {/* Top Slide Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
            SLIDE {currentSlide + 1} / {totalSlides}
          </span>
          <span className="text-sm font-semibold text-slate-300 hidden sm:inline">
            Bài 8: Thực hành nâng cao Thư điện tử &amp; Mạng xã hội (Tin học 11)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLaserActive(!laserActive)}
            title="Bật/Tắt con trỏ Laser (Phím L)"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
              laserActive
                ? 'bg-red-500/30 text-red-300 border-red-500'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            🔴 Laser (L)
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
              showNotes
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            📝 Ghi chú bài giảng
          </button>

          <button
            onClick={toggleFullscreen}
            title="Toàn màn hình (F)"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900 hover:text-white text-slate-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Content Canvas */}
      <div className="flex-1 p-6 md:p-12 flex items-center justify-center overflow-y-auto">
        {/* Slide 0: Cover */}
        {currentSlide === 0 && (
          <div className="max-w-4xl w-full text-center space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest border border-blue-400/30">
              <BookOpen className="w-4 h-4" />
              SÁCH GIÁO KHOA TIN HỌC 11 • KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
              BÀI 8: THỰC HÀNH NÂNG CAO SỬ DỤNG THƯ ĐIỆN TỬ VÀ MẠNG XÃ HỘI
            </h1>
            <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Làm chủ kỹ năng lọc thư thông minh, phân loại nhãn Gmail chuyên nghiệp và thiết lập an toàn thông tin trên mạng xã hội Facebook.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left pt-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-blue-400 font-bold text-sm">🎯 Mục tiêu 1:</div>
                <div className="text-xs md:text-sm text-slate-300 mt-1">
                  Biết đánh dấu và phân loại thư điện tử khoa học, tiết kiệm thời gian tìm kiếm.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-purple-400 font-bold text-sm">🎯 Mục tiêu 2:</div>
                <div className="text-xs md:text-sm text-slate-300 mt-1">
                  Khai thác được một số chức năng nâng cao của mạng xã hội (Fanpage, Quyền riêng tư).
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/25"
              >
                Bắt đầu Thuyết trình
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Slides 1-4: 4 Infographic Stations */}
        {currentSlide >= 1 && currentSlide <= 4 && (() => {
          const station = INFOGRAPHIC_STATIONS[currentSlide - 1];
          return (
            <div className="max-w-5xl w-full space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold text-xs border border-blue-500/30">
                  {station.stationNumber} • {station.badge}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                  {station.title}
                </h2>
              </div>
              <p className="text-sm md:text-base text-slate-300">
                {station.subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {station.keyConcepts.map((c, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-amber-400 font-bold text-sm md:text-base">{c.title}</div>
                    <div className="text-xs md:text-sm text-slate-300 leading-relaxed">{c.desc}</div>
                  </div>
                ))}
              </div>

              {/* Step flow */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Quy trình thao tác chuẩn xác (SGK):
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {station.steps.map((st, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 text-xs text-rose-200">
                <strong>Lưu ý cốt lõi:</strong> {station.importantNotes[0]}
              </div>
            </div>
          );
        })()}

        {/* Slide 5: Game Ready */}
        {currentSlide === 5 && (
          <div className="max-w-3xl w-full text-center space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-400/30">
              <Zap className="w-4 h-4" />
              SẴN SÀNG CHO ĐẤU TRƯỜNG THI ĐUA 4 TỔ
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              BẮT ĐẦU VÒNG THI ĐUA KIẾN THỨC!
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto">
              Gồm 20 câu trắc nghiệm ABCD (đáp án cân đối), 4 câu Đúng/Sai (16 ý chuẩn đề thi) và 4 câu tự luận thực tế.
            </p>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => {
                  onClose();
                  onStartGame();
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-slate-950 font-black text-base md:text-lg shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition flex items-center gap-3"
              >
                <Play className="w-5 h-5 fill-current" />
                VÀO CHƠI &amp; TÍNH ĐIỂM NGAY
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Presenter Notes Drawer (if toggled) */}
      {showNotes && (
        <div className="p-4 bg-slate-900/95 border-t border-indigo-700/60 text-xs text-slate-300 max-h-36 overflow-y-auto">
          <div className="font-bold text-indigo-400 mb-1 flex items-center gap-1.5">
            <span>📝 Ghi chú bài giảng của người thuyết trình:</span>
          </div>
          {currentSlide === 0 && (
            <p>Nhắc học sinh chuẩn bị SGK Tin 11 trang 39. Nêu tình huống thực tế: Hộp thư đến ngập tràn thư cũ, làm sao tìm nhanh bức thư của giáo viên gửi từ tháng trước?</p>
          )}
          {currentSlide === 1 && (
            <p>Nhấn mạnh: Dấu quan trọng màu vàng do Gmail tự động phân tích theo 4 tiêu chí. Cú pháp &quot;is:important&quot; là câu hỏi rất hay xuất hiện trong đề thi giữa kỳ!</p>
          )}
          {currentSlide === 2 && (
            <p>Điểm mấu chốt: Nhãn khác với thư mục. Nhãn dán nhiều thẻ không nhân bản dung lượng. Nhưng khi bấm Xóa thư thì thư mất sạch ở tất cả các nhãn.</p>
          )}
          {currentSlide === 3 && (
            <p>Hỏi học sinh: Vì sao lớp 11A nên tạo Fanpage thay vì chỉ dùng nick cá nhân của lớp trưởng? (Quảng bá, nhiều người quản trị, không giới hạn follow).</p>
          )}
          {currentSlide === 4 && (
            <p>Cảnh báo an toàn số: Hãy kích hoạt &quot;Xét duyệt bài viết có gắn thẻ&quot; và &quot;Chế độ xem (View As)&quot; để tránh bị gắn thẻ bán hàng online, bài viết độc hại bôi nhọ danh dự.</p>
          )}
          {currentSlide === 5 && (
            <p>Mời 4 tổ cử đại diện bấm chuông. Nhắc các tổ có thể dùng &quot;Ngôi sao hy vọng&quot; để nhân đôi điểm số!</p>
          )}
        </div>
      )}

      {/* Slide Controls Bottom Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-t border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition ${
            currentSlide === 0
              ? 'opacity-30 cursor-not-allowed border-slate-800 text-slate-600'
              : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Slide trước
        </button>

        {/* Slide Dots Indicator */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx
                  ? 'w-8 bg-blue-500'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition ${
            currentSlide === totalSlides - 1
              ? 'opacity-30 cursor-not-allowed border-slate-800 text-slate-600'
              : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500 shadow-md'
          }`}
        >
          Slide tiếp
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
