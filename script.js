// --- STATE APLIKASI ---
let timerInterval = null;
let totalSeconds = 0;
let audioCtx = null;

// --- AMBIL ELEMEN DOM ---
const timerBox = document.getElementById("timer-box");
const statusLabel = document.getElementById("status-label");
const timeDisplay = document.getElementById("time-display");
const customMinutesInput = document.getElementById("custom-minutes");
const presetBtns = document.querySelectorAll(".btn-preset");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");

// --- FUNGSI PRODUKSI BUNYI BEEP (Web Audio API) ---
function playBeepSound() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        // Buat oscillator untuk suara nada tinggi
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.value = 880; // Nada A5 (880 Hz)
        
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
        console.log("Audio Context Error: ", e);
    }
}

// --- FORMAT WAKTU (MM:SS) ---
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedMins = String(mins).padStart(2, "0");
    const formattedSecs = String(secs).padStart(2, "0");
    return `${formattedMins}:${formattedSecs}`;
}

// --- FUNGSI TAMPILKAN WAKTU ---
function updateDisplay() {
    timeDisplay.textContent = formatTime(totalSeconds);
}

// --- LOGIKA HITUNG MUNDUR ---
function startTimer() {
    let minutes = parseInt(customMinutesInput.value);

    if (isNaN(minutes) || minutes <= 0) {
        alert("Harap masukkan durasi menit yang valid!");
        return;
    }

    totalSeconds = minutes * 60;
    updateDisplay();

    // Reset State UI
    timerBox.className = "timer-display-box running";
    statusLabel.textContent = "Sedang Berjalan...";
    btnStart.disabled = true;
    btnStop.disabled = false;
    customMinutesInput.disabled = true;

    // Inisialisasi Audio Context saat interaksi pertama
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    timerInterval = setInterval(() => {
        totalSeconds--;
        updateDisplay();

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            triggerAlarm();
        }
    }, 1000);
}

// --- TRIGER ALARM KETIKA WAKTU HABIS ---
function triggerAlarm() {
    timerBox.className = "timer-display-box alarm";
    statusLabel.textContent = "🔔 WAKTU HABIS! ISTIRAHAT / SHOLAT!";
    
    // Bunyikan alarm berulang ala nada dering (misal: berbunyi 8 kali berturut-turut)
    let count = 0;
    let ringInterval = setInterval(() => {
        playBeepSound();
        count++;
        if (count >= 8) { // Mengulang sebanyak 8 kali beep
            clearInterval(ringInterval);
        }
    }, 300); // Jeda antar beep 300 milidetik (cepat & berdering)
}

// --- STOP / RESET TIMER ---
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 0;

    updateDisplay();
    timerBox.className = "timer-display-box";
    statusLabel.textContent = "Siap Diatur";

    btnStart.disabled = false;
    btnStop.disabled = true;
    customMinutesInput.disabled = false;
}

// --- EVENT LISTENERS ---
btnStart.addEventListener("click", startTimer);
btnStop.addEventListener("click", stopTimer);

presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (timerInterval) return; // Abaikan jika timer sedang berjalan
        const mins = btn.getAttribute("data-minutes");
        customMinutesInput.value = mins;
        totalSeconds = parseInt(mins) * 60;
        updateDisplay();
    });
});

// Inisialisasi awal
updateDisplay();
