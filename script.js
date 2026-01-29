// Malware Prank Simulation - Script File
// REVISI UNTUK FULLSCREEN SEKETIKA

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const countdownElement = document.getElementById('countdown');
    const lockdownTimer = document.getElementById('lockdown-timer');
    const systemAlert = document.getElementById('system-alert');
    const prankMessage = document.getElementById('prank-message');
    const alertButton = document.getElementById('alert-button');
    const closeButton = document.getElementById('close-button');
    const blockOverlay = document.getElementById('block-overlay');
    const terminal = document.getElementById('terminal');
    const glitchText = document.getElementById('glitch-text');
    const autoClickOverlay = document.getElementById('auto-click-overlay');
    
    // Variables
    let countdown = 15; // Dinaikkan menjadi 15 detik untuk durasi panik lebih lama
    let timerInterval;
    let audioContext;
    let oscillators = [];
    let isLocked = true;
    let fullscreenTriggered = false;
    
    // TRICK UNTUK FULLSCREEN SEKETIKA
    function forceFullscreenImmediately() {
        console.log("🚨 MEMAKSA FULLSCREEN SEKETIKA 🚨");
        
        // Method 1: Simulasi klik otomatis untuk memicu fullscreen
        const fakeClickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        
        // Trigger click pada overlay transparan
        autoClickOverlay.dispatchEvent(fakeClickEvent);
        
        // Method 2: Coba langsung request fullscreen dengan berbagai cara
        const enterFullscreen = () => {
            const elem = document.documentElement;
            
            if (elem.requestFullscreen && !document.fullscreenElement) {
                elem.requestFullscreen().then(() => {
                    console.log("Fullscreen berhasil!");
                    fullscreenTriggered = true;
                }).catch(e => {
                    console.log("Fullscreen gagal:", e);
                    // Coba method lain
                    forceFullscreenFallback();
                });
            } else if (elem.webkitRequestFullscreen && !document.webkitFullscreenElement) {
                elem.webkitRequestFullscreen();
                fullscreenTriggered = true;
            } else if (elem.msRequestFullscreen && !document.msFullscreenElement) {
                elem.msRequestFullscreen();
                fullscreenTriggered = true;
            } else {
                forceFullscreenFallback();
            }
        };
        
        // Tunggu sebentar lalu coba fullscreen
        setTimeout(enterFullscreen, 100);
        
        // Coba lagi setelah 500ms jika belum berhasil
        setTimeout(() => {
            if (!fullscreenTriggered && !document.fullscreenElement) {
                console.log("Mencoba fullscreen lagi...");
                enterFullscreen();
            }
        }, 500);
    }
    
    // Fallback jika fullscreen API tidak bekerja
    function forceFullscreenFallback() {
        console.log("Menggunakan fallback CSS fullscreen");
        // Buat ilusi fullscreen dengan CSS
        document.body.style.width = '100vw';
        document.body.style.height = '100vh';
        document.body.style.position = 'fixed';
        document.body.style.top = '0';
        document.body.style.left = '0';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';
        
        // Pada mobile, coba sembunyikan address bar
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            window.scrollTo(0, 1);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        }
    }
    
    // Lock device interaction
    function lockDevice() {
        // Prevent default behaviors
        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            return false;
        }, {capture: true});
        
        // Blok semua keyboard shortcuts
        document.addEventListener('keydown', e => {
            // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Escape, F5, Ctrl+R
            if (e.key === 'F12' || 
                e.key === 'F5' ||
                e.key === 'Escape' ||
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                (e.ctrlKey && e.key === 'u') ||
                (e.ctrlKey && e.key === 'r') ||
                (e.metaKey && e.key === 'r')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            }
        }, true);
        
        // Prevent touch gestures
        document.addEventListener('touchmove', e => {
            if (isLocked) {
                e.preventDefault();
            }
        }, { passive: false, capture: true });
        
        document.addEventListener('gesturestart', e => e.preventDefault(), {capture: true});
        
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        
        // Force hide scrollbars
        document.body.style.msOverflowStyle = 'none';
        document.body.style.scrollbarWidth = 'none';
    }
    
    // Dramatic Keygen Sound - START SEKETIKA
    function createKeygenSound() {
        try {
            // Unlock audio context (required for autoplay)
            const unlockAudio = () => {
                if (audioContext && audioContext.state === 'suspended') {
                    audioContext.resume();
                }
            };
            
            // Create audio context
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Trigger resume on any user interaction
            document.addEventListener('click', unlockAudio, { once: true });
            document.addEventListener('touchstart', unlockAudio, { once: true });
            
            // Create multiple oscillators for complex sound
            for(let i = 0; i < 7; i++) {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    // Varying frequencies for dramatic effect
                    const baseFreq = 30 + (i * 70);
                    oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
                    
                    // Different waveforms
                    const types = ['sawtooth', 'square', 'triangle'];
                    oscillator.type = types[i % types.length];
                    
                    // Volume - start immediately
                    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                    
                    oscillator.start();
                    oscillators.push({osc: oscillator, gain: gainNode});
                    
                    // Modulate frequency for dramatic effect
                    const freqInterval = setInterval(() => {
                        if (oscillator.frequency && isLocked) {
                            const time = Date.now() / 1000;
                            const randomFreq = baseFreq + 
                                Math.sin(time * (i+1) * 1.5) * 60 + 
                                Math.cos(time * (i+2) * 0.8) * 40;
                            oscillator.frequency.setValueAtTime(randomFreq, audioContext.currentTime);
                        } else {
                            clearInterval(freqInterval);
                        }
                    }, 90);
                    
                    // Modulate volume
                    const gainInterval = setInterval(() => {
                        if (gainNode.gain && isLocked) {
                            const randomGain = 0.1 + Math.random() * 0.1;
                            gainNode.gain.setValueAtTime(randomGain, audioContext.currentTime);
                        } else {
                            clearInterval(gainInterval);
                        }
                    }, 180);
                    
                }, i * 150); // Stagger oscillator start times
            }
            
            // Add white noise for more dramatic effect
            setTimeout(() => {
                const bufferSize = audioContext.sampleRate * 2;
                const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
                const output = noiseBuffer.getChannelData(0);
                
                for (let i = 0; i < bufferSize; i++) {
                    output[i] = Math.random() * 2 - 1;
                }
                
                const whiteNoise = audioContext.createBufferSource();
                whiteNoise.buffer = noiseBuffer;
                whiteNoise.loop = true;
                
                const noiseGain = audioContext.createGain();
                noiseGain.gain.setValueAtTime(0.04, audioContext.currentTime);
                
                whiteNoise.connect(noiseGain);
                noiseGain.connect(audioContext.destination);
                whiteNoise.start();
                
                oscillators.push({osc: whiteNoise, gain: noiseGain});
            }, 1000);
            
            console.log("🔊 SUARA KEYGEN DIMULAI SEKETIKA");
            
            // Auto-resume audio context
            setTimeout(() => {
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
            }, 300);
            
        } catch(e) {
            console.log("Audio error:", e);
            // Fallback: coba buat audio element
            createAudioFallback();
        }
    }
    
    // Audio fallback jika Web Audio API gagal
    function createAudioFallback() {
        const audio = new Audio();
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 440;
        oscillator.type = 'square';
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        
        // Modulasi frekuensi
        setInterval(() => {
            oscillator.frequency.value = 200 + Math.random() * 600;
        }, 100);
        
        oscillators.push({osc: oscillator, gain: gainNode});
    }
    
    // Stop all sounds
    function stopSounds() {
        if (audioContext) {
            // Fade out all oscillators
            oscillators.forEach(item => {
                if (item.gain) {
                    item.gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2.0);
                }
            });
            
            // Stop oscillators after fade
            setTimeout(() => {
                oscillators.forEach(item => {
                    if (item.osc && typeof item.osc.stop === 'function') {
                        try {
                            item.osc.stop();
                        } catch(e) {
                            // Ignore errors
                        }
                    }
                });
                oscillators = [];
                
                if (audioContext.state !== 'closed') {
                    audioContext.close();
                }
            }, 2000);
        }
    }
    
    // Add dynamic terminal lines - DIPERLAMBAT untuk efek lebih dramatis
    function addTerminalLines() {
        const lines = [
            {text: "Scanning memory sectors...", class: "info", delay: 1200},
            {text: "WARNING: Memory corruption detected at 0x7C00", class: "error", delay: 3000},
            {text: "Checking registry integrity...", class: "info", delay: 4800},
            {text: "ERROR: Registry hive modification detected", class: "error", delay: 6600},
            {text: "Analyzing network packets...", class: "info", delay: 8400},
            {text: "ALERT: Data packets being sent to 185.159.82.45", class: "warning", delay: 10200},
            {text: "Attempting to block connections...", class: "info", delay: 12000},
            {text: "FAILED: Firewall bypass detected", class: "error", delay: 13800},
            {text: "Initializing emergency shutdown...", class: "warning", delay: 15600},
            {text: "SHUTDOWN BLOCKED: Unauthorized process interference", class: "error", delay: 17400},
            {text: "Accessing user credential database...", class: "info", delay: 19200},
            {text: "CRITICAL: Login credentials compromised", class: "error", delay: 21000},
            {text: "Scanning for backup files...", class: "info", delay: 22800},
            {text: "ERROR: Backup files corrupted or missing", class: "error", delay: 24600},
            {text: "Encrypting sensitive documents...", class: "warning", delay: 26400},
            {text: "PROGRESS: 74% documents encrypted", class: "error", delay: 28200}
        ];
        
        lines.forEach(line => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = `line ${line.class}`;
                div.textContent = line.text;
                terminal.appendChild(div);
                // Scroll terminal ke bawah
                terminal.scrollTop = terminal.scrollHeight;
            }, line.delay);
        });
    }
    
    // Start the prank - SEMUA DIMULAI SEKETIKA
    function startPrank() {
        console.log("🚨 MALWARE PRANK SIMULATION DIMULAI SEKETIKA 🚨");
        
        // 1. Sembunyikan auto-click overlay
        autoClickOverlay.style.display = 'none';
        
        // 2. Kunci perangkat SEKARANG
        lockDevice();
        
        // 3. Mulai suara SEKETIKA
        createKeygenSound();
        
        // 4. Mulai fullscreen SEKETIKA
        forceFullscreenImmediately();
        
        // 5. Set countdown
        countdownElement.textContent = countdown;
        lockdownTimer.textContent = countdown;
        
        // 6. Tambah terminal lines (dengan kecepatan yang lebih realistis)
        addTerminalLines();
        
        // 7. Mulai timer countdown
        timerInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            lockdownTimer.textContent = countdown;
            
            // Ubah glitch text setiap 3 detik
            if (countdown % 3 === 0) {
                const texts = [
                    "SYSTEM BREACH DETECTED",
                    "DATA EXFILTRATION ACTIVE",
                    "CRITICAL SECURITY THREAT",
                    "EMERGENCY LOCKDOWN ACTIVE",
                    "UNAUTHORIZED ACCESS",
                    "MALWARE SIGNATURE FOUND",
                    "SYSTEM INTEGRITY FAILED",
                    "NETWORK INTRUSION DETECTED",
                    "ENCRYPTION IN PROGRESS",
                    "FILES BEING COMPROMISED",
                    "RANSOMWARE ACTIVATED",
                    "DATA THEFT IN PROGRESS"
                ];
                glitchText.textContent = texts[Math.floor(Math.random() * texts.length)];
            }
            
            // Tampilkan system alert di detik ke-10 (memberi waktu 5 detik sebelum berakhir)
            if (countdown === 10) {
                setTimeout(() => {
                    systemAlert.style.display = 'block';
                }, 800);
            }
            
            // Akhiri prank di detik 0
            if (countdown <= 0) {
                endPrank();
            }
        }, 1000);
        
        // 8. Tambah efek visual selama lockdown
        addVisualEffects();
    }
    
    // End the prank
    function endPrank() {
        clearInterval(timerInterval);
        
        // 1. Hentikan suara
        stopSounds();
        
        // 2. Sembunyikan system alert
        systemAlert.style.display = 'none';
        
        // 3. Tampilkan prank message setelah jeda singkat
        setTimeout(() => {
            prankMessage.style.display = 'block';
            isLocked = false;
            blockOverlay.style.display = 'none';
            
            // 4. Tambah final terminal line
            setTimeout(() => {
                const finalLine = document.createElement('div');
                finalLine.className = 'line success';
                finalLine.textContent = "Simulation complete. No actual threat detected. System secure.";
                terminal.appendChild(finalLine);
                terminal.scrollTop = terminal.scrollHeight;
            }, 500);
            
            // 5. Keluar dari fullscreen
            exitFullscreen();
            
        }, 1500);
    }
    
    // Exit fullscreen
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    
    // Add visual effects
    function addVisualEffects() {
        // Random red flashes
        const flashInterval = setInterval(() => {
            if (isLocked) {
                if (Math.random() > 0.85) {
                    document.body.style.backgroundColor = '#400';
                    setTimeout(() => {
                        document.body.style.backgroundColor = '#000';
                    }, 200);
                }
                
                // Random file highlight
                const files = document.querySelectorAll('.file-item');
                if (files.length > 0 && Math.random() > 0.75) {
                    const randomFile = files[Math.floor(Math.random() * files.length)];
                    const originalColor = randomFile.style.color;
                    randomFile.style.color = '#f00';
                    randomFile.style.fontWeight = 'bold';
                    randomFile.style.textShadow = '0 0 10px #f00';
                    
                    setTimeout(() => {
                        randomFile.style.color = originalColor;
                        randomFile.style.fontWeight = '';
                        randomFile.style.textShadow = '';
                    }, 1000);
                }
            } else {
                clearInterval(flashInterval);
            }
        }, 800);
    }
    
    // Event listeners
    alertButton.addEventListener('click', () => {
        if (!isLocked) {
            systemAlert.style.display = 'none';
        }
    });
    
    closeButton.addEventListener('click', () => {
        // Tampilkan pesan penutup
        prankMessage.innerHTML = `
            <h1 style="color:#0f0">😄 PRANK SELESAI!</h1>
            <p>Ingatlah selalu untuk berhati-hati di internet.</p>
            <p style="text-align:left; margin:15px 0; color:#ccc; font-size: 1rem;">
                • Jangan klik link yang mencurigakan<br>
                • Gunakan antivirus yang terupdate<br>
                • Backup data penting secara rutin<br>
                • Waspada terhadap email phishing
            </p>
            <p style="color:#0f0; font-size:1.2rem">Halaman akan tertutup dalam 3 detik...</p>
        `;
        
        // Tutup setelah 3 detik
        setTimeout(() => {
            window.location.href = "about:blank";
        }, 3000);
    });
    
    // Cegah keluar dari fullscreen selama lockdown
    document.addEventListener('fullscreenchange', () => {
        if (isLocked && !document.fullscreenElement) {
            forceFullscreenImmediately();
        }
    });
    
    document.addEventListener('webkitfullscreenchange', () => {
        if (isLocked && !document.webkitFullscreenElement) {
            forceFullscreenImmediately();
        }
    });
    
    document.addEventListener('mozfullscreenchange', () => {
        if (isLocked && !document.mozFullScreenElement) {
            forceFullscreenImmediately();
        }
    });
    
    // Mobile optimization
    function optimizeForMobile() {
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Mobile-specific optimizations
            document.body.style.fontSize = '15px';
            
            // Prevent zoom
            document.addEventListener('gesturestart', function(e) {
                e.preventDefault();
            }, { passive: false });
            
            // Hide address bar
            setTimeout(() => {
                window.scrollTo(0, 1);
            }, 100);
            
            // Force portrait mode jika di mobile
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
            document.head.appendChild(meta);
        }
    }
    
    // Initialize - MULAI SEGALANYA SEKETIKA
    function initialize() {
        console.log("🔧 INITIALIZING PRANK...");
        
        // Optimasi untuk mobile
        optimizeForMobile();
        
        // Mulai prank dengan delay sangat singkat
        setTimeout(startPrank, 50);
    }
    
    // Mulai semuanya
    initialize();
});
