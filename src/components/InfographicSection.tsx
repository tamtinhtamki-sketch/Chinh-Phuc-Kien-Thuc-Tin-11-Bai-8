import React, { useState } from 'react';
import { 
  INFOGRAPHIC_STATIONS, 
  InfographicStation 
} from '../data/lesson8Data';
import { 
  Mail, 
  Tag, 
  Share2, 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Layers, 
  ExternalLink,
  BookOpen,
  Maximize2,
  ChevronRight,
  Info
} from 'lucide-react';

interface Props {
  onStartQuiz?: () => void;
  onOpenPresentation?: () => void;
}

export const InfographicSection: React.FC<Props> = ({ onStartQuiz, onOpenPresentation }) => {
  const [selectedStation, setSelectedStation] = useState<InfographicStation>(INFOGRAPHIC_STATIONS[0]);
  const [viewTab, setViewTab] = useState<'mindmap' | 'comparison' | 'cheatsheet'>('mindmap');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 p-6 md:p-8 text-white shadow-xl border border-indigo-700/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-400/30">
              <BookOpen className="w-3.5 h-3.5" />
              Sản phẩm Infographic • Tin học 11 (KNTT)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
              BÀI 8: THỰC HÀNH NÂNG CAO SỬ DỤNG THƯ ĐIỆN TỬ VÀ MẠNG XÃ HỘI
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Sơ đồ tư duy trực quan hóa toàn bộ kiến thức cốt lõi: Làm chủ bộ lọc thư quan trọng &amp; Nhãn Gmail, thiết lập Fanpage và bảo mật trang cá nhân Facebook.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenPresentation && (
              <button
                onClick={onOpenPresentation}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur transition border border-white/20 hover:scale-105 active:scale-95 shadow-sm"
              >
                <Maximize2 className="w-4 h-4 text-amber-400" />
                Trình chiếu Slide
              </button>
            )}
            {onStartQuiz && (
              <button
                onClick={onStartQuiz}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-orange-500/25 hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                Vào Thi Đấu 4 Tổ
              </button>
            )}
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewTab('mindmap')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              viewTab === 'mindmap'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🗺️ 4 Trạm Tư Duy Cốt Lõi
          </button>
          <button
            onClick={() => setViewTab('comparison')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              viewTab === 'comparison'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            ⚖️ So Sánh Nhãn vs Thư Mục
          </button>
          <button
            onClick={() => setViewTab('cheatsheet')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              viewTab === 'cheatsheet'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            📋 Bảng Tra Cứu Nhanh (Cheat Sheet)
          </button>
        </div>

        <span className="text-xs text-slate-400 hidden sm:inline-flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-blue-400" />
          Bấm vào từng trạm để xem mô phỏng &amp; mẹo thi cử
        </span>
      </div>

      {viewTab === 'mindmap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Station Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Hệ thống 4 trạm kiến thức Bài 8:
            </h3>
            {INFOGRAPHIC_STATIONS.map((station) => {
              const isSelected = selectedStation.id === station.id;
              return (
                <div
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className={`group cursor-pointer rounded-xl p-4 transition-all duration-200 border ${
                    isSelected
                      ? 'bg-slate-800/90 border-blue-500 shadow-lg shadow-blue-500/10 scale-[1.01]'
                      : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-md bg-gradient-to-br ${station.color}`}
                      >
                        {station.id === 1 && <Mail className="w-5 h-5" />}
                        {station.id === 2 && <Tag className="w-5 h-5" />}
                        {station.id === 3 && <Share2 className="w-5 h-5" />}
                        {station.id === 4 && <ShieldCheck className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700">
                            {station.stationNumber}
                          </span>
                          <span className="text-xs text-slate-400">{station.badge}</span>
                        </div>
                        <h4 className="font-bold text-slate-100 text-sm md:text-base mt-0.5 group-hover:text-blue-400 transition-colors">
                          {station.title}
                        </h4>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        isSelected ? 'text-blue-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 pl-13">
                    {station.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Station Detail View */}
          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            {/* Station Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${selectedStation.color}`}
                >
                  {selectedStation.id === 1 && <Mail className="w-6 h-6" />}
                  {selectedStation.id === 2 && <Tag className="w-6 h-6" />}
                  {selectedStation.id === 3 && <Share2 className="w-6 h-6" />}
                  {selectedStation.id === 4 && <ShieldCheck className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {selectedStation.stationNumber} • {selectedStation.badge}
                  </span>
                  <h3 className="text-lg md:text-xl font-extrabold text-white">
                    {selectedStation.title}
                  </h3>
                </div>
              </div>

              {selectedStation.id === 1 && (
                <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  is:important
                </div>
              )}
            </div>

            {/* Core Concepts */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Kiến thức trọng tâm:
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {selectedStation.keyConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 hover:border-slate-700 transition"
                  >
                    <div className="text-sm font-bold text-slate-200">{concept.title}</div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {concept.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Steps */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Quy trình thực hành thao tác (SGK):
              </h4>
              <div className="space-y-2">
                {selectedStation.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pitfalls & Exam Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/40 text-xs space-y-1.5">
                <div className="font-bold text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  Cạm bẫy hay nhầm lẫn:
                </div>
                <ul className="text-slate-300 space-y-1 list-disc list-inside">
                  {selectedStation.importantNotes.map((note, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/40 text-xs space-y-1.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Mẹo thi cử &amp; Ghi nhớ:
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedStation.examTips}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison View: Label vs Folder */}
      {viewTab === 'comparison' && (
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Kiến thức then chốt Bài 8 (Trang 39)
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-white">
              SO SÁNH: NHÃN (LABEL GMAIL) VÀ THƯ MỤC (FOLDER MÁY TÍNH)
            </h3>
            <p className="text-sm text-slate-300">
              Điểm phân biệt cốt lõi nhất thường xuất hiện trong tất cả các đề kiểm tra Tin học 11!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Folder Card */}
            <div className="rounded-xl p-5 bg-slate-800/40 border border-slate-700/60 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-700">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                  📁
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Thư mục (Folder) truyền thống</h4>
                  <span className="text-xs text-slate-400">Trong Windows Explorer / macOS</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs md:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Một tệp tin thông thường chỉ nằm trong <strong>duy nhất 1 thư mục</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Muốn tệp xuất hiện ở nhiều thư mục khác nhau, bắt buộc phải <strong>sao chép (Copy)</strong> tệp -&gt; làm tốn dung lượng ổ cứng.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Xóa tệp trong thư mục A sẽ <strong>không làm mất</strong> bản sao chép tệp trong thư mục B.</span>
                </li>
              </ul>
            </div>

            {/* Label Card */}
            <div className="rounded-xl p-5 bg-blue-950/30 border border-blue-500/40 space-y-4 shadow-lg shadow-blue-500/5">
              <div className="flex items-center gap-3 pb-3 border-b border-blue-800/60">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">
                  🏷️
                </div>
                <div>
                  <h4 className="font-bold text-blue-300 text-base">Nhãn (Label) trong Gmail</h4>
                  <span className="text-xs text-blue-400/80">Cơ chế thẻ đánh dấu thông minh</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs md:text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Một bức thư điện tử có thể gắn <strong>đồng thời nhiều nhãn khác nhau</strong> (ví dụ: vừa Học tập, vừa Gia đình).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Chỉ có <strong>duy nhất 1 bản gốc dữ liệu</strong>, gán nhiều nhãn không hề tốn thêm dung lượng hòm thư.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">⚠</span>
                  <span className="font-semibold text-rose-300">
                    Lưu ý đặc biệt SGK: Khi em xoá một thư, thư đó sẽ bị xoá khỏi MỌI NHÃN đính kèm cũng như trong hộp thư đến!
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive diagram box */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💡</div>
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong>Quy tắc ghi nhớ nhanh:</strong> Nhãn giống như dán nhiều mẩu giấy ghi chú nhiều màu lên cùng một quyển sách. Nếu vứt quyển sách vào sọt rác, tất cả mẩu giấy ghi chú đều mất theo!
              </div>
            </div>
            <button
              onClick={() => setSelectedStation(INFOGRAPHIC_STATIONS[1])}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs whitespace-nowrap"
            >
              Xem Trạm 02 Nhãn Gmail
            </button>
          </div>
        </div>
      )}

      {/* Cheatsheet View */}
      {viewTab === 'cheatsheet' && (
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-white">
                BẢNG TÓM TẮT THAO TÁC KỸ THUẬT BÀI 8 (CHEAT SHEET)
              </h3>
              <p className="text-xs text-slate-400">
                Tổng hợp nhanh tất cả các thao tác, đường dẫn cài đặt và câu lệnh tìm kiếm
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sheet Item 1 */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                <Mail className="w-4 h-4" />
                Gmail: Thư quan trọng
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>• Biểu tượng: Dấu hình mũi tên <strong>màu vàng</strong>.</div>
                <div>• Đổi trạng thái: Nháy trực tiếp vào dấu quan trọng.</div>
                <div>• Cú pháp tìm kiếm nhanh: <code className="px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 font-mono">is:important</code></div>
              </div>
            </div>

            {/* Sheet Item 2 */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-cyan-400 text-sm">
                <Tag className="w-4 h-4" />
                Gmail: Quản lý Nhãn (Label)
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>• Tạo nhãn: Menu trái -&gt; Danh sách mở rộng -&gt; Tạo nhãn mới -&gt; Save.</div>
                <div>• Gán nhãn: Chọn thư -&gt; Bấm icon Nhãn trên thanh công cụ -&gt; Chọn nhãn -&gt; Apply.</div>
                <div>• Xóa thư: Xóa thư sẽ mất ở hộp thư đến và mọi nhãn đính kèm.</div>
              </div>
            </div>

            {/* Sheet Item 3 */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-indigo-400 text-sm">
                <Share2 className="w-4 h-4" />
                Facebook: Khởi tạo Fanpage
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>• Nơi tạo: Biểu tượng <strong>Menu 9 dấu chấm</strong> -&gt; Mục Tạo -&gt; Trang.</div>
                <div>• 2 Thông tin bắt buộc: <strong>Tên trang</strong> &amp; <strong>Hạng mục</strong>.</div>
                <div>• Mục đích: Quảng bá hình ảnh, sản phẩm cho tổ chức/lớp học.</div>
              </div>
            </div>

            {/* Sheet Item 4 */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-400 text-sm">
                <ShieldCheck className="w-4 h-4" />
                Facebook: Quyền riêng tư &amp; Gắn thẻ
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>• Đường dẫn: Cài đặt -&gt; Quyền riêng tư / Trang cá nhân và gắn thẻ.</div>
                <div>• Chế độ xem: <strong>Chế độ xem (View As)</strong> để test góc nhìn người khác.</div>
                <div>• Bảo vệ timeline: Bật <strong>Xét duyệt bài viết có gắn thẻ</strong>.</div>
                <div>• Chống quảng cáo bám đuổi: Xóa lịch sử hoạt động ngoài Facebook.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
