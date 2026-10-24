# ⏰ Simple Time Alarm (Pengingat Sholat / Istirahat)

Aplikasi alarm pengingat waktu interaktif (*Simple Time Alarm*) berbasis web untuk menghitung mundur durasi istirahat atau persiapan waktu sholat yang memicu bunyi nada *beep* otomatis saat durasi berakhir.

---

## 🎯 Konsep Pembelajaran RPL / Pemrograman Web

1. **Web Audio API (`AudioContext`):**
   Sintesis nada audio secara murni melalui kode JavaScript (`OscillatorNode`) tanpa membutuhkan pengunggahan file audio external (`.mp3`).
2. **Interval Management (`setInterval` & `clearInterval`):**
   Mengelola siklus hitung mundur pewaktu *real-time* serta menghentikannya secara aman saat waktu habis atau saat di-reset.
3. **Data Attributes & Preset Value Binding:**
   Menggunakan atribut `data-minutes` pada tombol preset untuk mengisi input durasi secara fleksibel.

---

## 📂 Struktur Folder Proyek

```text
├── index.html       # Display angka hitung mundur, tombol preset, & tombol kontrol
├── style.css        # Desain Neobrutalism hijau-pop, animasi pulse alarm, & timer box
└── script.js        # Logika timer setInterval, Web Audio API synth, & handler DOM
