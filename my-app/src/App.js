import { useState } from "react";

const SITES = {
  levelup: { name: "LevelUp ID", color: "#D95F3B", icon: "📘", tag: "N1–N5 Reference" },
  bunpou:  { name: "Bunpou N5 Done", color: "#3B8FD9", icon: "🧩", tag: "N5 Quiz & Drill" },
};

// ── Jadwal Harian Shiawase Gakkou ──
const weekdaySlots = [
  { time: "05:30", icon: "🌅", act: "Bangun + minum air putih 500ml", tag: null, note: null },
  { time: "05:45", icon: "🏃", act: "Jogging pagi min. 3 km (±30 menit)", tag: "Fitness", note: "Wajib tiap hari — ini cardio harian kamu!" },
  { time: "06:20", icon: "🚿", act: "Mandi & persiapan", tag: null, note: null },
  { time: "06:40", icon: "🍚", act: "Sarapan (nasi + lauk sekolah — ambil porsi wajar)", tag: "Diet", note: "Ikut menu sekolah oke, atur porsi nasinya" },
  { time: "07:00", icon: "🧩", act: "Bunpou N5 Done — Quiz Kosakata/Kanji Sesi (20 mnt)", tag: "Bunpou", note: "Slot pagi sebelum apel, manfaatkan!" },
  { time: "07:20", icon: "📇", act: "Anki deck review — vocab & kanji (20 mnt)", tag: "Anki", note: null },
  { time: "08:15", icon: "🎌", act: "Apel / Chore (kegiatan sekolah)", tag: null, note: null },
  { time: "09:00", icon: "⭐", act: "GOLDEN HOUR — LevelUp ID + Grammar N3 mandiri (60 mnt)", tag: "LevelUp", note: "Ini slot emas! Sensei belum datang — manfaatkan penuh" },
  { time: "10:00", icon: "📖", act: "Review catatan kelas + persiapan materi hari ini (30 mnt)", tag: "Jepang", note: null },
  { time: "10:30", icon: "🏫", act: "KELAS (Sensei masuk)", tag: null, note: "Fokus 100%, catat grammar baru" },
  { time: "12:00", icon: "🍱", act: "Makan siang (nasi setengah porsi + lauk protein)", tag: "Diet", note: "Kurangi nasi, perbanyak lauk & sayur" },
  { time: "12:30", icon: "🎧", act: "Shadow speaking / audio MnN (20 mnt)", tag: "Jepang", note: null },
  { time: "12:50", icon: "😴", act: "Power nap 10–15 menit (opsional)", tag: null, note: "Bantu otak fresh untuk kelas sore" },
  { time: "13:00", icon: "⏸️", act: "Jeda 30 mnt — baca ulang catatan pagi", tag: null, note: null },
  { time: "13:30", icon: "🏫", act: "KELAS SIANG", tag: null, note: "Aktif tanya kalau ada yang kurang paham" },
  { time: "15:00", icon: "🔄", act: "Kegiatan harian (lihat jadwal per hari di bawah)", tag: "Varies", note: null },
  { time: "16:00", icon: "📝", act: "Review materi kelas hari ini + tulis 5 kalimat JP baru", tag: "Jepang", note: "Segera review sebelum lupa" },
  { time: "17:00", icon: "🏋️", act: "Latihan bodyweight (Senin/Rabu/Jumat — 30 mnt)", tag: "Fitness", note: "Push-up, squat, plank — tanpa gym pun bisa!" },
  { time: "17:30", icon: "🆓", act: "Bebas / istirahat / social", tag: null, note: null },
  { time: "19:00", icon: "📚", act: "BENKYOUKAI — Fokus soal N3 / LevelUp ID N3 section", tag: "LevelUp", note: "Jam belajar terjadwal — manfaatkan semaksimal mungkin" },
  { time: "20:00", icon: "📇", act: "Anki review sesi malam (15 mnt)", tag: "Anki", note: null },
  { time: "20:15", icon: "🧩", act: "Bunpou — Quiz sesi penutup atau review kanji (15 mnt)", tag: "Bunpou", note: null },
  { time: "20:30", icon: "📺", act: "Drama JP subtitle JP / NHK Web Easy (30 mnt)", tag: "Jepang", note: null },
  { time: "21:30", icon: "😴", act: "Tidur — wajib 7–8 jam untuk recovery & memori", tag: null, note: null },
];

const daySpecific = [
  { day: "Senin & Selasa", icon: "💬", act: "Kaiwa Renshuu bersama Sensei", color: "#C8913A", tip: "Ini kesempatan emas! Gunakan grammar N3 yang baru dipelajari. Catat vocab baru yang muncul saat kaiwa." },
  { day: "Rabu & Kamis",   icon: "⚽", act: "Undou Shimasu (Olahraga)", color: "#4A9E6B", tip: "Ini sudah menggantikan sesi gym. Tambahkan bodyweight ringan di sore hari tetap OK, tapi jangan dipaksakan." },
  { day: "Jumat",          icon: "📋", act: "Rapat bersama Sensei", color: "#5B5BD6", tip: "Manfaatkan rapat untuk tanya langsung tentang grammar atau vocab yang kamu bingungkan minggu ini." },
  { day: "Sabtu & Minggu", icon: "🌿", act: "Libur — Refreshing & Self-Study Bebas", color: "#9C4DC8", tip: "Minimal 1 jam belajar mandiri per hari. Selebihnya refreshing! Jangan diisi full belajar — otak perlu reset." },
];

const months = [
  {
    num: 1, label: "Bulan 1", theme: "Fondasi",
    accent: "#C8913A",
    jp: {
      title: "MnN Bab 21–30 · Solidkan N5",
      tasks: [
        "MnN Bab 21–30 — sinkronkan dengan materi kelas Shiawase Gakkou",
        "Anki: 15 kosakata baru/hari, manfaatkan slot 07:20 & 20:00",
        "5 kanji baru/hari (target 150 kanji bulan ini)",
        "Kaiwa renshuu Senin/Selasa — aktif bicara, jangan malu!",
        "Catat vocab baru yang sensei sebut tapi tidak ada di MnN",
        "Tulis diary 3 kalimat/hari dalam bahasa Jepang sebelum tidur",
      ],
      sites: [
        { site: "bunpou", usage: "Quiz Kosakata Sesi & Quiz Kanji Sesi jam 07:00 dan 20:15 — drill vocab N5 yang paralel dengan materi kelas hari itu" },
        { site: "bunpou", usage: "Bunpou Bab — setelah kelas, cross-check grammar MnN bab yang baru dipelajari dengan penjelasan di sini" },
        { site: "levelup", usage: "Buka section N5 saat Golden Hour (09:00–10:00) — baca materi grammar sebagai preview sebelum sensei mengajar" },
      ],
    },
    fitness: {
      title: "Jogging Base + Bodyweight",
      tasks: [
        "Jogging 3 km sudah terjadwal tiap pagi ✅ (jangan skip!)",
        "Tambah bodyweight 3x seminggu sore hari: Senin, Rabu, Jumat",
        "Senin: Push-up 4 set + plank 3x60 detik",
        "Rabu: Squat 4 set + lunges + calf raise",
        "Jumat: Full body ringan (push + squat + core)",
        "Porsi nasi: ambil setengah porsi, perbanyak lauk & sayur",
        "Minum air 2,5–3 liter/hari — bawa botol ke kelas",
      ],
    },
    target: "150 kanji · N5 grammar solid · Turun ±1.5 kg",
  },
  {
    num: 2, label: "Bulan 2", theme: "Naik Level",
    accent: "#4A9E6B",
    jp: {
      title: "MnN Bab 31–40 · Masuk N4",
      tasks: [
        "MnN Bab 31–40, paralel dengan kelas Shiawase",
        "Mulai buku grammar N4: Try! N4 atau Shin Kanzen N4",
        "Anki: 15–20 vocab/hari + review konsisten",
        "Kanji kumulatif: target 300 kanji",
        "Kaiwa renshuu — coba gunakan grammar N4 baru saat percakapan",
        "Mulai conversation mandiri 2x/minggu via HelloTalk di waktu bebas",
      ],
      sites: [
        { site: "bunpou", usage: "Tetap Quiz Sesi tiap pagi & malam untuk N5 — fondasi harus tetap kuat saat menambah materi N4" },
        { site: "levelup", usage: "Golden Hour (09:00) pindah ke section N4 LevelUp ID — baca grammar N4 sebagai preview sebelum kelas pagi" },
        { site: "levelup", usage: "Daftar vocab N4 di LevelUp ID — jadikan sumber pembuatan Anki deck bulan ini" },
      ],
    },
    fitness: {
      title: "Tingkatkan Intensitas",
      tasks: [
        "Jogging: tingkatkan pace atau tambah jarak (3.5–4 km)",
        "Bodyweight sore tetap 3x/minggu, naikkan repetisi",
        "Undoushimasu Rabu/Kamis — keluarkan energi penuh!",
        "Protein: fokus ke lauk sekolah (telur, ikan, tempe — minta lebih)",
        "Kurangi nasi terus, biasakan setengah porsi",
        "Weekly weigh-in tiap Senin pagi",
      ],
    },
    target: "N4 grammar 40% · 300 kanji · Turun ±1.5 kg lagi",
  },
  {
    num: 3, label: "Bulan 3", theme: "MnN Tamat!",
    accent: "#C84B4B",
    jp: {
      title: "MnN Bab 41–50 TAMAT + N3 Dimulai",
      tasks: [
        "Tamatkan MnN Buku 2 Bab 41–50 🎉",
        "Mulai grammar N3: Try! N3 / Shin Kanzen N3",
        "Anki vocab aktif: target 1.500–2.000 kosakata",
        "Kanji kumulatif: 400–450 kanji",
        "Kaiwa renshuu — targetkan percakapan level N3",
        "1 set latihan soal JLPT N3 tiruan per minggu (Sabtu/Minggu)",
      ],
      sites: [
        { site: "levelup", usage: "Golden Hour khusus section N3 LevelUp ID — uruti grammar N3 secara sistematis setiap pagi" },
        { site: "levelup", usage: "Vocab list N3 di LevelUp ID → salin ke Anki deck N3 baru. Ini jadi sumber vocab utama bulan ini" },
        { site: "bunpou", usage: "Bunpou sebagai warm-up 10 mnt sebelum benkyoukai malam — aktifkan otak sebelum belajar serius" },
      ],
    },
    fitness: {
      title: "Progressive + Body Composition",
      tasks: [
        "Jogging pagi: tambah 1 hari sprint interval (30 detik lari cepat, 30 santai, repeat)",
        "Bodyweight: tingkatkan ke push-up dengan variasi (wide, narrow, pike)",
        "Undoushimasu Rabu/Kamis tetap maksimal",
        "Porsi makan tetap dijaga — protein prioritas",
        "Ukur lingkar perut setiap 2 minggu",
        "Foto progres bulanan untuk motivasi",
      ],
    },
    target: "MnN TAMAT! · N3 grammar 40% · Total turun ±4–5 kg",
  },
  {
    num: 4, label: "Bulan 4", theme: "Simulasi",
    accent: "#5B5BD6",
    jp: {
      title: "Mock Test N3 + Conversation Intensif",
      tasks: [
        "2 set soal N3 full mock test per minggu (Sabtu & Minggu)",
        "Analisis kesalahan — fokus section yang masih merah",
        "Grammar N3 100% selesai",
        "Kanji: 500+ kumulatif",
        "Kaiwa renshuu — roleplay situasi nyata (kantor, perjalanan, dll)",
        "Tonton drama Jepang subtitle JP tiap malam (30 mnt)",
      ],
      sites: [
        { site: "levelup", usage: "Saat salah di mock test, langsung cari penjelasan grammar-nya di LevelUp ID section N3 — jangan cuma tanda tangan merah" },
        { site: "levelup", usage: "Section kanji N3 LevelUp ID — drill kanji yang sering keluar di soal latihan yang masih salah" },
        { site: "bunpou", usage: "Bunpou jam 07:00 sebagai warm-up kognitif sebelum Golden Hour — aktifkan otak lebih cepat di pagi hari" },
      ],
    },
    fitness: {
      title: "Shape & Definition",
      tasks: [
        "Jogging tetap tiap pagi — ini rutin terbaik yang sudah jalan",
        "Bodyweight naik ke 4x/minggu (tambah Kamis sore)",
        "Undoushimasu Rabu/Kamis tetap diikuti penuh",
        "Core training: plank variasi + sit-up + leg raise",
        "Tidur cukup — jangan dipotong karena belajar malam",
        "Target: mulai terlihat lebih kencang & berisi",
      ],
    },
    target: "Mock test score 55–65% · Body fat mulai kelihatan berkurang",
  },
  {
    num: 5, label: "Bulan 5", theme: "Puncak",
    accent: "#9C4DC8",
    jp: {
      title: "Final Polish + N3 Siap Tempur",
      tasks: [
        "Mock test N3 tiap Sabtu, target score 65%+",
        "Review semua grammar yang sering salah (LevelUp ID)",
        "Anki intensif: 50+ kartu review per hari",
        "Kaiwa renshuu — sekarang harus nyaman ngobrol 10–15 menit spontan",
        "NHK Web Easy: baca 1 artikel per hari tanpa kamus",
        "1 minggu sebelum ujian: STOP materi baru, review + istirahat cukup",
      ],
      sites: [
        { site: "levelup", usage: "Final review semua grammar N3 di LevelUp ID — baca ulang semua poin yang pernah ditandai sejak bulan 3" },
        { site: "levelup", usage: "Gunakan untuk reading endurance: baca section panjang bahasa Jepang tanpa berhenti, latih stamina membaca" },
        { site: "bunpou", usage: "Di hari-hari penuh tekanan menjelang ujian, Bunpou Quiz N5 bisa jadi confidence boost — ingat betapa jauh kamu sudah berkembang!" },
      ],
    },
    fitness: {
      title: "Maintain & Jaga Konsistensi",
      tasks: [
        "Jogging pagi tetap — JANGAN skip karena ujian mendekat!",
        "Olahraga pagi justru bikin fokus belajar lebih tajam",
        "Bodyweight tetap 3x/minggu — sudah jadi kebiasaan seharusnya",
        "Target akhir berat: 65–67 kg, tampak berisi & kencang",
        "Rayakan setiap milestone kecil — penting untuk mental",
        "Ingat: tubuh sehat = otak sehat = ujian lancar",
      ],
    },
    target: "N3 siap tempur 🎌 · Berat target 65–67 kg 💪",
  },
];

const tagColors = {
  Bunpou: SITES.bunpou.color, LevelUp: SITES.levelup.color,
  Fitness: "#4A9E6B", Diet: "#C84B4B", Jepang: "#C8913A",
  Anki: "#9C4DC8", Varies: "#5B5BD6",
};

export default function App() {
  const [activeMonth, setActiveMonth] = useState(0);
  const [tab, setTab] = useState("jadwal");
  const [showNotes, setShowNotes] = useState(false);
  const m = months[activeMonth];

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", fontFamily: "'Georgia', 'Times New Roman', serif", color: "#1C1108" }}>

      {/* Accent strip */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${months.map(x => x.accent).join(",")})` }} />

      {/* Header */}
      <div style={{ background: "#1C1108", padding: "32px 24px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 10% 50%, rgba(200,145,58,0.10) 0%, transparent 55%), radial-gradient(ellipse at 90% 30%, rgba(74,158,107,0.08) 0%, transparent 55%)" }} />
        <div style={{ maxWidth: 840, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 5, color: "#C8913A", textTransform: "uppercase", marginBottom: 8 }}>Shiawase Gakkou · 5-Month Plan</div>
              <h1 style={{ margin: 0, fontSize: "clamp(24px,4.5vw,36px)", fontWeight: 400, color: "#F5F0E8", lineHeight: 1.2 }}>
                日本語 N3 <span style={{ color: "#C8913A" }}>×</span> Tubuh Ideal
              </h1>
              <p style={{ margin: "8px 0 0", color: "#6a5a42", fontSize: 13 }}>21 tahun · 163cm · 72kg · MnN Bab 20 · Diklat aktif</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { l: "BMI", v: "27.1", s: "→ target 23–24", c: "#C84B4B" },
                { l: "Target", v: "65–67kg", s: "−5 s/d −7 kg", c: "#4A9E6B" },
                { l: "Sisa MnN", v: "30 bab", s: "Bab 21→50", c: "#C8913A" },
              ].map(s => (
                <div key={s.l} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, padding: "10px 14px", textAlign: "center", minWidth: 80 }}>
                  <div style={{ fontSize: 9, color: "#6a5a42", letterSpacing: 2, textTransform: "uppercase" }}>{s.l}</div>
                  <div style={{ fontSize: 16, color: s.c, fontWeight: 700, margin: "3px 0 2px" }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: "#4a3a28" }}>{s.s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* School banner */}
          <div style={{ marginTop: 16, background: "rgba(200,145,58,0.12)", border: "1px solid rgba(200,145,58,0.3)", borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>🏫</span>
            <span style={{ fontSize: 13, color: "#C8C0A8", lineHeight: 1.5 }}>
              Jadwal disesuaikan penuh dengan rutinitas <strong style={{ color: "#C8913A" }}>Shiawase Gakkou</strong> — jogging pagi, kelas, kaiwa renshuu, undoushimasu, benkyoukai, hingga sabtu-minggu bebas.
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#EDE7DA", borderBottom: "1px solid #D0C8B8" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px", display: "flex" }}>
          {[
            { id: "jadwal", label: "⏰ Jadwal Harian" },
            { id: "roadmap", label: "📅 Roadmap Bulanan" },
            { id: "hari", label: "📆 Jadwal Per Hari" },
            { id: "resources", label: "🔗 Resource Guide" },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: "none", border: "none", padding: "11px 14px",
              color: tab === t.id ? "#1C1108" : "#8a7862",
              borderBottom: tab === t.id ? "2.5px solid #C8913A" : "2.5px solid transparent",
              cursor: "pointer", fontSize: 12.5, fontFamily: "inherit",
              fontWeight: tab === t.id ? 700 : 400, transition: "all 0.2s", whiteSpace: "nowrap",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 840, margin: "0 auto", padding: "24px 24px 60px" }}>

        {/* ── JADWAL HARIAN ── */}
        {tab === "jadwal" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ color: "#7a6a52", fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                Jadwal hari kerja (Senin–Jumat). Disesuaikan dengan struktur harian Shiawase Gakkou.
              </p>
              <button onClick={() => setShowNotes(!showNotes)} style={{
                background: showNotes ? "#C8913A" : "white",
                border: "1.5px solid #C8913A", color: showNotes ? "white" : "#C8913A",
                padding: "6px 12px", borderRadius: 6, cursor: "pointer",
                fontSize: 11, fontFamily: "inherit", whiteSpace: "nowrap",
              }}>
                {showNotes ? "✓ Tips ON" : "💡 Tips OFF"}
              </button>
            </div>

            {weekdaySlots.map((s, i) => (
              <div key={i}>
                <div style={{
                  display: "flex", gap: 12, padding: "11px 0",
                  borderBottom: "1px solid #E4DDD0", alignItems: "flex-start",
                }}>
                  <div style={{ minWidth: 44, fontSize: 12, color: "#C8913A", fontFamily: "monospace", flexShrink: 0, paddingTop: 2 }}>{s.time}</div>
                  <span style={{ fontSize: 17, flexShrink: 0 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#2a1a08", lineHeight: 1.5 }}>{s.act}</div>
                    {showNotes && s.note && (
                      <div style={{ fontSize: 11.5, color: "#7a6052", marginTop: 3, fontStyle: "italic" }}>→ {s.note}</div>
                    )}
                  </div>
                  {s.tag && s.tag !== "Varies" && (
                    <div style={{
                      background: `${tagColors[s.tag]}15`, border: `1px solid ${tagColors[s.tag]}40`,
                      color: tagColors[s.tag], fontSize: 9, padding: "3px 7px",
                      borderRadius: 5, fontWeight: 700, letterSpacing: 0.8,
                      flexShrink: 0, textTransform: "uppercase", marginTop: 2,
                    }}>{s.tag}</div>
                  )}
                  {s.tag === "Varies" && (
                    <div style={{
                      background: "#5B5BD615", border: "1px solid #5B5BD640",
                      color: "#5B5BD6", fontSize: 9, padding: "3px 7px",
                      borderRadius: 5, fontWeight: 700, letterSpacing: 0.8, flexShrink: 0, marginTop: 2,
                    }}>PER HARI</div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16, background: "#FFF8EE", border: "1.5px solid #C8913A33", borderRadius: 10, padding: 16 }}>
              <p style={{ margin: 0, fontSize: 13, color: "#5a3a18", lineHeight: 1.7 }}>
                <strong style={{ color: "#C8913A" }}>⭐ Golden Hour (09:00–10:30)</strong> adalah slot paling berharga harimu. Sensei belum masuk, suasana tenang — gunakan penuh untuk LevelUp ID dan review mandiri. Jangan dipakai untuk scrolling HP!
              </p>
            </div>
          </div>
        )}

        {/* ── JADWAL PER HARI ── */}
        {tab === "hari" && (
          <div>
            <p style={{ color: "#7a6a52", fontSize: 13, margin: "0 0 20px", lineHeight: 1.6 }}>
              Aktivitas 15:00 setelah kelas berbeda tiap hari. Ini cara optimalkan masing-masing.
            </p>
            {daySpecific.map((d, i) => (
              <div key={i} style={{
                background: "white", border: `1.5px solid ${d.color}33`,
                borderLeft: `4px solid ${d.color}`, borderRadius: 12,
                padding: 20, marginBottom: 12,
              }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{d.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: d.color, letterSpacing: 2, textTransform: "uppercase" }}>{d.day}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1C1108", marginTop: 2 }}>{d.act}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#4a3828", lineHeight: 1.65, background: `${d.color}08`, padding: "10px 14px", borderRadius: 8 }}>
                  💡 {d.tip}
                </div>
                {d.day === "Senin & Selasa" && (
                  <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      "Sebelum kaiwa: catat 5 topik yang ingin kamu bicarakan",
                      "Saat kaiwa: gunakan grammar N3 yang baru dipelajari minggu ini",
                      "Setelah kaiwa: tulis vocab baru yang muncul ke Anki",
                    ].map((t, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: d.color, marginTop: 7, flexShrink: 0 }} />
                        <span style={{ fontSize: 12.5, color: "#3a2818" }}>{t}</span>
                      </div>
                    ))}
                  </div>
                )}
                {d.day === "Sabtu & Minggu" && (
                  <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      "Sabtu pagi: 1 set full mock test N3 (setelah jogging & sarapan)",
                      "Sabtu sore: analisis kesalahan mock test, cari penjelasan di LevelUp ID",
                      "Minggu: bebas tapi minimal 1 jam Anki + baca NHK Web Easy",
                      "Minggu: refreshing keluar, tapi coba bicara Jepang ke diri sendiri!",
                    ].map((t, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: d.color, marginTop: 7, flexShrink: 0 }} />
                        <span style={{ fontSize: 12.5, color: "#3a2818" }}>{t}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Weekly map */}
            <div style={{ background: "white", border: "1.5px solid #D0C8B8", borderRadius: 12, padding: 20, marginTop: 4 }}>
              <div style={{ fontSize: 10, color: "#8a7862", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Peta Aktivitas Mingguan</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                {[
                  { d: "Sen", items: ["Kelas", "Kaiwa", "Bodyweight"], c: "#C8913A" },
                  { d: "Sel", items: ["Kelas", "Kaiwa", "Review"], c: "#C8913A" },
                  { d: "Rab", items: ["Kelas", "Undou", "Bodyweight"], c: "#4A9E6B" },
                  { d: "Kam", items: ["Kelas", "Undou", "Anki"], c: "#4A9E6B" },
                  { d: "Jum", items: ["Kelas", "Rapat", "Bodyweight"], c: "#5B5BD6" },
                  { d: "Sab", items: ["Mock Test", "Review", "Bebas"], c: "#9C4DC8" },
                  { d: "Min", items: ["NHK Easy", "Anki", "Refresh"], c: "#9C4DC8" },
                ].map((day, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: day.c, marginBottom: 6, letterSpacing: 1 }}>{day.d}</div>
                    {day.items.map((item, j) => (
                      <div key={j} style={{
                        background: `${day.c}12`, border: `1px solid ${day.c}25`,
                        borderRadius: 5, padding: "3px 4px",
                        fontSize: 10, color: "#3a2818", marginBottom: 4, lineHeight: 1.3,
                      }}>{item}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ROADMAP BULANAN ── */}
        {tab === "roadmap" && (
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {months.map((mon, i) => (
                <button key={i} onClick={() => setActiveMonth(i)} style={{
                  background: activeMonth === i ? mon.accent : "white",
                  border: `1.5px solid ${activeMonth === i ? mon.accent : "#D0C8B8"}`,
                  color: activeMonth === i ? "white" : "#6a5842",
                  padding: "8px 14px", borderRadius: 8,
                  cursor: "pointer", fontFamily: "inherit", fontSize: 13,
                  fontWeight: activeMonth === i ? 700 : 400,
                  boxShadow: activeMonth === i ? `0 4px 12px ${mon.accent}44` : "none",
                  transition: "all 0.2s",
                }}>
                  <div>{mon.label}</div>
                  <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{mon.theme}</div>
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ background: "white", border: `1.5px solid ${m.accent}33`, borderTop: `3px solid ${m.accent}`, borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 18 }}>🎌</span>
                  <div>
                    <div style={{ fontSize: 9, color: m.accent, letterSpacing: 3, textTransform: "uppercase" }}>Bahasa Jepang</div>
                    <div style={{ fontSize: 12, color: "#6a5a42", marginTop: 1 }}>{m.jp.title}</div>
                  </div>
                </div>
                {m.jp.tasks.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 9, marginBottom: 9, alignItems: "flex-start" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: m.accent, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, color: "#3a2a18", lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "white", border: "1.5px solid #4A9E6B33", borderTop: "3px solid #4A9E6B", borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 18 }}>💪</span>
                  <div>
                    <div style={{ fontSize: 9, color: "#4A9E6B", letterSpacing: 3, textTransform: "uppercase" }}>Fisik & Diet</div>
                    <div style={{ fontSize: 12, color: "#6a5a42", marginTop: 1 }}>{m.fitness.title}</div>
                  </div>
                </div>
                {m.fitness.tasks.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 9, marginBottom: 9, alignItems: "flex-start" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4A9E6B", marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, color: "#3a2a18", lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 14, background: "white", border: "1.5px solid #D0C8B8", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 9, color: "#8a7862", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>🔗 Cara Pakai Website Bulan Ini</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {m.jp.sites.map((s, i) => {
                  const site = SITES[s.site];
                  return (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 12px", background: `${site.color}07`, border: `1px solid ${site.color}22`, borderLeft: `3px solid ${site.color}`, borderRadius: 8 }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{site.icon}</span>
                      <div>
                        <div style={{ fontSize: 11, color: site.color, fontWeight: 700, marginBottom: 3 }}>{site.name}</div>
                        <div style={{ fontSize: 12.5, color: "#4a3a28", lineHeight: 1.55 }}>{s.usage}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: 14, background: `${m.accent}0C`, border: `1.5px solid ${m.accent}33`, borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22 }}>🎯</span>
              <div>
                <div style={{ fontSize: 9, color: m.accent, letterSpacing: 3, textTransform: "uppercase" }}>Target Akhir Bulan {m.num}</div>
                <div style={{ fontSize: 14, color: "#2a1a08", marginTop: 4, fontStyle: "italic" }}>{m.target}</div>
              </div>
            </div>

            <div style={{ marginTop: 14, background: "white", borderRadius: 10, padding: "14px 18px", border: "1px solid #D0C8B8" }}>
              <div style={{ fontSize: 9, color: "#8a7862", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Timeline 5 Bulan</div>
              <div style={{ display: "flex", gap: 6 }}>
                {months.map((mon, i) => (
                  <div key={i} style={{ flex: 1, cursor: "pointer" }} onClick={() => setActiveMonth(i)}>
                    <div style={{ height: 6, borderRadius: 3, background: i <= activeMonth ? mon.accent : "#E4DDD0", transition: "background 0.3s" }} />
                    <div style={{ fontSize: 9, color: i === activeMonth ? mon.accent : "#B4A890", textAlign: "center", marginTop: 4 }}>B{mon.num}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RESOURCE GUIDE ── */}
        {tab === "resources" && (
          <div>
            {Object.values(SITES).map(site => (
              <div key={site.name} style={{ background: "white", border: `1.5px solid ${site.color}33`, borderTop: `3px solid ${site.color}`, borderRadius: 12, padding: 22, marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 26 }}>{site.icon}</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: site.color }}>{site.name}</div>
                    <div style={{ fontSize: 12, color: "#8a7862" }}>{site.tag}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {(site.name === "Bunpou N5 Done" ? [
                    { f: "Quiz Kosakata Sesi", u: "Drill vocab N5 — jam 07:00 & 20:15 tiap hari", p: "Bulan 1–2 utama" },
                    { f: "Quiz Kanji Sesi", u: "Drill kanji dengan progress tracking", p: "Bulan 1–3" },
                    { f: "Bunpou Bab", u: "Cross-check grammar per bab MnN setelah kelas", p: "Bulan 1–2" },
                    { f: "Dashboard", u: "Pantau progress, jangan ada yang merah", p: "Semua bulan" },
                    { f: "Quiz Kanji", u: "Warm-up 10 mnt sebelum benkyoukai malam", p: "Bulan 1–5" },
                    { f: "Kosakata", u: "Referensi vocab sebelum buat Anki deck baru", p: "Bulan 1–2" },
                  ] : [
                    { f: "Section N5", u: "Review fondasi saat Golden Hour bulan pertama", p: "Bulan 1" },
                    { f: "Section N4", u: "Preview grammar N4 sebelum sensei mengajar", p: "Bulan 2–3" },
                    { f: "Section N3", u: "Panduan urutan grammar N3 secara sistematis", p: "Bulan 3–5" },
                    { f: "Vocab List", u: "Sumber pembuatan Anki deck per level", p: "Bulan 2–5" },
                    { f: "Kanji List", u: "Salin ke Anki per level (N5→N4→N3)", p: "Semua bulan" },
                    { f: "Grammar N3", u: "Kamus saat analisis kesalahan mock test", p: "Bulan 4–5" },
                  ]).map((item, i) => (
                    <div key={i} style={{ background: `${site.color}07`, border: `1px solid ${site.color}20`, borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: site.color }}>{item.f}</span>
                        <span style={{ fontSize: 9, background: `${site.color}20`, color: site.color, padding: "2px 5px", borderRadius: 4, flexShrink: 0, marginLeft: 4 }}>{item.p}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#4a3828", lineHeight: 1.5 }}>{item.u}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ background: "white", border: "1.5px solid #D0C8B8", borderRadius: 12, padding: 22 }}>
              <div style={{ fontSize: 10, color: "#8a7862", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Ekosistem Lengkap Kamu</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { name: "Shiawase Gakkou", role: "Kelas + Kaiwa + Undou", tier: "CORE", c: "#C8913A" },
                  { name: "Bunpou N5 Done", role: "Quiz drill harian N5", tier: "PRIMARY", c: SITES.bunpou.color },
                  { name: "LevelUp ID", role: "Referensi N5→N3", tier: "PRIMARY", c: SITES.levelup.color },
                  { name: "Minna no Nihongo", role: "Buku struktural utama", tier: "PRIMARY", c: "#C84B4B" },
                  { name: "Anki", role: "Flashcard vocab & kanji", tier: "WAJIB", c: "#9C4DC8" },
                  { name: "Try! N3", role: "Grammar N3 sistematis", tier: "WAJIB", c: "#5B5BD6" },
                  { name: "HelloTalk", role: "Conversation partner", tier: "PENDUKUNG", c: "#4A9E6B" },
                  { name: "NHK Web Easy", role: "Reading berita simpel JP", tier: "PENDUKUNG", c: "#4A9E6B" },
                  { name: "Jogging 3km", role: "Cardio harian (sudah jalan!)", tier: "FITNESS", c: "#C8913A" },
                ].map((item, i) => (
                  <div key={i} style={{ background: `${item.c}08`, border: `1px solid ${item.c}22`, borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 9, color: item.c, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>{item.tier}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#1C1108" }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "#7a6852", marginTop: 2 }}>{item.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
