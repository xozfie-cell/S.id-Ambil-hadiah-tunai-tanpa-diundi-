// Malware Prank Simulation - Script File
// Duration: 10 seconds lockdown, 15 seconds total experience

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
    let countdown = 10;
    let timerInterval;
    let audioContext;
    let oscillators = [];
    let isLocked = true;
    
    // Fullscreen function - dipicu oleh klik pengguna melalui overlay
    function enterFullscreen() {
        const elem = document.documentElement;
        
        if (elem.requestFullscreen && !document.fullscreenElement) {
            elem.requestFullscreen().then(() => {
                console.log("Fullscreen activated!");
            }).catch(e => {
                console.log("Fullscreen error:", e);
            });
        } else if (elem.webkitRequestFullscreen && !document.webkitFullscreenElement) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen && !document.msFullscreenElement) {
            elem.msRequestFullscreen();
        }
        
        // Styling untuk fullscreen
        document.body.style.width = '100vw';
        document.body.style.height = '100vh';
        document.body.style.position = 'fixed';
        document.body.style.top = '0';
        document.body.style.left = '0';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
    }
    
    // Lock device interaction
    function lockDevice() {
        // Prevent default behaviors
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Escape
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                (e.ctrlKey && e.key === 'u') ||
                e.key === 'Escape') {
                e.preventDefault();
                return false;
            }
        }, true);
        
        // Prevent touch gestures
        document.addEventListener('touchmove', e => {
            if (isLocked) {
                e.preventDefault();
            }
        }, { passive: false });
        
        document.addEventListener('gesturestart', e => e.preventDefault());
        
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }
    
    // Dramatic Keygen Sound - START IMMEDIATELY after user interaction
    function createKeygenSound() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create multiple oscillators for complex sound
            for(let i = 0; i < 6; i++) {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Varying frequencies for dramatic effect
                const baseFreq = 40 + (i * 80);
                oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
                
                // Different waveforms
                const types = ['sawtooth', 'square', 'triangle'];
                oscillator.type = types[i % types.length];
                
                // Volume
                gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
                
                oscillator.start();
                oscillators.push({osc: oscillator, gain: gainNode});
                
                // Modulate frequency for dramatic effect
                setInterval(() => {
                    if (oscillator.frequency && isLocked) {
                        const time = Date.now() / 1000;
                        const randomFreq = baseFreq + Math.sin(time * (i+1) * 2) * 50 + Math.cos(time * (i+2)) * 30;
                        oscillator.frequency.setValueAtTime(randomFreq, audioContext.currentTime);
                    }
                }, 80 + Math.random() * 40);
                
                // Modulate volume
                setInterval(() => {
                    if (gainNode.gain && isLocked) {
                        const randomGain = 0.08 + Math.random() * 0.08;
                        gainNode.gain.setValueAtTime(randomGain, audioContext.currentTime);
                    }
                }, 150 + Math.random() * 100);
            }
            
            // Add white noise for more dramatic effect
            const bufferSize = 44100;
            const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            
            const whiteNoise = audioContext.createBufferSource();
            whiteNoise.buffer = noiseBuffer;
            whiteNoise.loop = true;
            
            const noiseGain = audioContext.createGain();
            noiseGain.gain.setValueAtTime(0.03, audioContext.currentTime);
            
            whiteNoise.connect(noiseGain);
            noiseGain.connect(audioContext.destination);
            whiteNoise.start();
            
            oscillators.push({osc: whiteNoise, gain: noiseGain});
            
            console.log("Keygen sound started successfully");
            
        } catch(e) {
            console.log("Audio error:", e);
        }
    }
    
    // Stop all sounds
    function stopSounds() {
        if (audioContext) {
            // Fade out all oscillators
            oscillators.forEach(item => {
                if (item.gain) {
                    item.gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
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
            }, 1500);
        }
    }
    
    // Add dynamic terminal lines - SLOWER pace
    function addTerminalLines() {
        const lines = [
            {text: "Scanning memory sectors...", class: "info", delay: 1000},
            {text: "WARNING: Memory corruption detected at 0x7C00", class: "error", delay: 3000},
            {text: "Checking registry integrity...", class: "info", delay: 5000},
            {text: "ERROR: Registry hive modification detected", class: "error", delay: 7000},
            {text: "Analyzing network packets...", class: "info", delay: 9000},
            {text: "ALERT: Data packets being sent to 185.159.82.45", class: "warning", delay: 11000},
            {text: "Attempting to block connections...", class: "info", delay: 13000},
            {text: "FAILED: Firewall bypass detected", class: "error", delay: 15000},
            {text: "Initializing emergency shutdown...", class: "warning", delay: 17000},
            {text: "SHUTDOWN BLOCKED: Unauthorized process interference", class: "error", delay: 19000},
            {text: "Accessing user credential database...", class: "info", delay: 21000},
            {text: "CRITICAL: Login credentials compromised", class: "error", delay: 23000},
            {text: "Scanning for backup files...", class: "info", delay: 25000},
            {text: "ERROR: Backup files corrupted or missing", class: "error", delay: 27000}
        ];
        
        lines.forEach(line => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = `line ${line.class}`;
                div.textContent = line.text;
                terminal.appendChild(div);
                terminal.scrollTop = terminal.scrollHeight;
            }, line.delay);
        });
    }
    
    // Start the prank
    function startPrank() {
        console.log("🚨 MALWARE PRANK SIMULATION STARTED 🚨");
        
        // Hide auto-click overlay
        autoClickOverlay.style.display = 'none';
        
        // Lock device
        lockDevice();
        
        // Start dramatic sound
        createKeygenSound();
        
        // Start countdown
        countdownElement.textContent = countdown;
        lockdownTimer.textContent = countdown;
        
        // Add dynamic terminal lines (slower pace)
        addTerminalLines();
        
        // Start countdown timer
        timerInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            lockdownTimer.textContent = countdown;
            
            // Change glitch text periodically
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
                "FILES BEING COMPROMISED"
            ];
            
            if (countdown % 3 === 0) {
                glitchText.textContent = texts[Math.floor(Math.random() * texts.length)];
            }
            
            // Show system alert at 5 seconds (gives 5 seconds before end)
            if (countdown === 5) {
                setTimeout(() => {
                    systemAlert.style.display = 'block';
                }, 500);
            }
            
            // End prank at 0 seconds (10 second lockdown)
            if (countdown <= 0) {
                endPrank();
            }
        }, 1000);
    }
    
    // End the prank
    function endPrank() {
        clearInterval(timerInterval);
        
        // Stop sounds
        stopSounds();
        
        // Hide system alert
        systemAlert.style.display = 'none';
        
        // Show prank message after a brief pause
        setTimeout(() => {
            prankMessage.style.display = 'block';
            isLocked = false;
            blockOverlay.style.display = 'none';
            
            // Add final terminal line
            setTimeout(() => {
                const finalLine = document.createElement('div');
                finalLine.className = 'line success';
                finalLine.textContent = "Simulation complete. No actual threat detected. System secure.";
                terminal.appendChild(finalLine);
                terminal.scrollTop = terminal.scrollHeight;
            }, 500);
            
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }, 1000);
    }
    
    // Event listeners
    alertButton.addEventListener('click', () => {
        if (!isLocked) {
            systemAlert.style.display = 'none';
        }
    });
    
    closeButton.addEventListener('click', () => {
        // Show closing message
        prankMessage.innerHTML = `
            <h1 style="color:#0f0">😄 PRANK COMPLETE!</h1>
            <p>This was just a harmless simulation.</p>
            <p style="text-align:left; margin:15px 0; color:#ccc; font-size: 1rem;">
                • No files were accessed or modified<br>
                • No data was stolen<br>
                • Your device is completely safe<br>
                • This was for educational purposes only
            </p>
            <p style="color:#0f0; font-size:1.2rem">Closing in 3 seconds...</p>
        `;
        
        // Close after 3 seconds
        setTimeout(() => {
            window.location.href = "about:blank";
        }, 3000);
    });
    
    // Prevent exiting fullscreen during lockdown
    document.addEventListener('fullscreenchange', () => {
        if (isLocked && !document.fullscreenElement) {
            enterFullscreen();
        }
    });
    
    document.addEventListener('webkitfullscreenchange', () => {
        if (isLocked && !document.webkitFullscreenElement) {
            enterFullscreen();
        }
    });
    
    // Mobile device specific optimizations
    function optimizeForMobile() {
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Mobile optimizations
            document.body.style.fontSize = '14px';
            
            // Prevent zoom
            document.addEventListener('gesturestart', function(e) {
                e.preventDefault();
            });
            
            // Hide address bar (attempt)
            window.scrollTo(0, 1);
            
            // Force portrait orientation
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
            document.head.appendChild(meta);
        }
    }
    
    // Add random visual effects during lockdown
    function addVisualEffects() {
        setInterval(() => {
            if (isLocked) {
                // Random red flashes (less frequent but more dramatic)
                if (Math.random() > 0.9) {
                    document.body.style.backgroundColor = '#300';
                    setTimeout(() => {
                        document.body.style.backgroundColor = '#000';
                    }, 150);
                }
                
                // Random file item highlight
                const files = document.querySelectorAll('.file-item');
                if (files.length > 0 && Math.random() > 0.7) {
                    const randomFile = files[Math.floor(Math.random() * files.length)];
                    randomFile.style.color = '#f00';
                    randomFile.style.fontWeight = 'bold';
                    setTimeout(() => {
                        randomFile.style.color = '';
                        randomFile.style.fontWeight = '';
                    }, 800);
                }
            }
        }, 800);
    }
    
    // Overlay click event to trigger fullscreen and start prank
    autoClickOverlay.addEventListener('click', function() {
        // Enter fullscreen
        enterFullscreen();
        
        // Start prank after a very short delay to ensure fullscreen is activated
        setTimeout(startPrank, 100);
        
        // Optimize for mobile
        optimizeForMobile();
        
        // Add visual effects
        addVisualEffects();
    });
    
    // Also trigger click on overlay automatically after a short delay
    // This is to ensure that even if user doesn't click, the prank starts
    setTimeout(() => {
        if (isLocked) {
            autoClickOverlay.click();
        }
    }, 500);
});
