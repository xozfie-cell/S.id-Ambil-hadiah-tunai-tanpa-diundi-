document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const blueScreen = document.getElementById('blue-screen');
    const fakeAlert = document.getElementById('fake-alert');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const scrollingTextContainer = document.getElementById('scrolling-text');
    const alarmSound = document.getElementById('alarm-sound');
    const alertProgressFill = document.querySelector('.alert-progress-fill');
    const alertProgressText = document.querySelector('.alert-progress-text');
    const cancelBtn = document.getElementById('cancel-btn');
    const actionBtn = document.getElementById('action-btn');
    
    // Configuration
    const CONFIG = {
        panicDuration: 45000, // 45 seconds for maximum panic effect
        alertDelay: 10000, // 10 seconds delay for alert
        scrollingSpeed: 30, // seconds for full scroll animation (slower than before)
        progressDuration: 40000, // 40 seconds for BSOD progress
        alarmVolume: 0.7
    };
    
    // Text data for scrolling effect
    const SCROLLING_TEXTS = [
        "ERROR: CRITICAL_PROCESS_DIED",
        "SYSTEM_THREAD_EXCEPTION_NOT_HANDLED",
        "MEMORY_MANAGEMENT_ERROR_DETECTED",
        "KERNEL_SECURITY_CHECK_FAILURE",
        "DRIVER_IRQL_NOT_LESS_OR_EQUAL",
        "PAGE_FAULT_IN_NONPAGED_AREA",
        "SYSTEM_SERVICE_EXCEPTION",
        "ATTEMPTED_WRITE_TO_READONLY_MEMORY",
        "DATA_BUS_ERROR",
        "INVALID_PROCESS_ATTACH_ATTEMPT",
        "UNEXPECTED_KERNEL_MODE_TRAP",
        "NTFS_FILE_SYSTEM_CORRUPTED",
        "FAT_FILE_SYSTEM_CORRUPTION",
        "VIDEO_TDR_TIMEOUT_DETECTED",
        "VIDEO_SCHEDULER_INTERNAL_ERROR",
        ">>>>>> SCANNING SYSTEM FILES <<<<<<",
        ">>>>>> ANALYZING MEMORY DUMP <<<<<<",
        ">>>>>> DETECTING MALWARE SIGNATURES <<<<<<",
        "ACCESS VIOLATION at address 0x00007FF6A1B45678",
        "STACK BUFFER OVERFLOW DETECTED",
        "UNAUTHORIZED ACCESS ATTEMPT LOGGED",
        "CRYPTOMINING MALWARE DETECTED: Trojan.CoinMiner",
        "RANSOMWARE SIGNATURE FOUND: Razy/FileCoder",
        "ROOTKIT ACTIVITY DETECTED IN KERNEL",
        "DATA EXFILTRATION IN PROGRESS",
        "REMOTE ACCESS TROJAN ESTABLISHING CONNECTION",
        "FIREWALL BREACH DETECTED",
        "ANTIVIRUS SERVICES DISABLED",
        "SYSTEM RESTORE POINTS DELETED",
        "BOOT SECTOR MODIFIED",
        "MASTER FILE TABLE CORRUPTION DETECTED",
        "HARD DRIVE S.M.A.R.T. FAILURE IMMINENT",
        "CPU OVERHEAT PROTECTION TRIGGERED",
        "MEMORY INTEGRITY CHECK FAILED",
        "SECURE BOOT VIOLATION",
        "TPM INTEGRITY CHECK FAILURE",
        "BIOS FIRMWARE COMPROMISED",
        "NETWORK ADAPTER HIJACKED",
        "DNS SETTINGS MODIFIED WITHOUT AUTHORIZATION",
        "ENCRYPTION IN PROGRESS: 34% OF FILES AFFECTED",
        "BACKUP SYSTEMS OFFLINE",
        "AUTOMATIC REPAIR FAILED",
        "SYSTEM RESTORE FAILED",
        "STARTUP REPAIR COULD NOT DETECT THE PROBLEM",
        ">>>>>> INITIATING EMERGENCY PROTOCOL <<<<<<"
    ];
    
    // Initialize
    let panicStartTime = null;
    let panicInterval = null;
    
    // Start the prank
    function startPrank() {
        panicStartTime = Date.now();
        
        // 1. Play alarm sound immediately
        playAlarmSound();
        
        // 2. Enter fullscreen mode
        enterFullscreen();
        
        // 3. Start BSOD progress animation
        startProgressAnimation();
        
        // 4. Generate scrolling text
        generateScrollingText();
        
        // 5. Show alert after delay
        setTimeout(showAlert, CONFIG.alertDelay);
        
        // 6. Set up panic duration timeout
        panicInterval = setTimeout(endPrank, CONFIG.panicDuration);
    }
    
    // Play alarm sound
    function playAlarmSound() {
        alarmSound.volume = CONFIG.alarmVolume;
        alarmSound.play().catch(e => {
            console.log("Audio play failed, trying with user interaction fallback");
            // Fallback: Play on first user interaction
            document.addEventListener('click', function playOnClick() {
                alarmSound.play();
                document.removeEventListener('click', playOnClick);
            }, { once: true });
        });
    }
    
    // Enter fullscreen mode
    function enterFullscreen() {
        const elem = document.documentElement;
        
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    }
    
    // Start BSOD progress animation
    function startProgressAnimation() {
        let progress = 0;
        const interval = 100; // Update every 100ms
        const increment = 100 / (CONFIG.progressDuration / interval);
        
        const progressInterval = setInterval(() => {
            progress += increment;
            if (progress > 100) {
                progress = 100;
                clearInterval(progressInterval);
            }
            
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}% complete`;
        }, interval);
    }
    
    // Generate scrolling text
    function generateScrollingText() {
        // Clear container
        scrollingTextContainer.innerHTML = '';
        
        // Create multiple lines for more dramatic effect
        for (let i = 0; i < 5; i++) {
            const line = document.createElement('div');
            line.className = 'scrolling-line';
            
            // Combine multiple error texts for each line
            let lineText = '';
            const startIdx = i * 9;
            for (let j = 0; j < 9 && startIdx + j < SCROLLING_TEXTS.length; j++) {
                lineText += SCROLLING_TEXTS[startIdx + j] + ' | ';
            }
            
            line.textContent = lineText.repeat(3); // Repeat to make it longer
            scrollingTextContainer.appendChild(line);
            
            // Stagger the animations
            line.style.animationDelay = `${i * 2}s`;
            line.style.animationDuration = `${CONFIG.scrollingSpeed}s`;
        }
    }
    
    // Show alert with loading animation
    function showAlert() {
        fakeAlert.classList.add('show');
        
        // Animate alert progress bar
        let alertProgress = 0;
        const alertInterval = setInterval(() => {
            alertProgress += 0.5;
            alertProgressFill.style.width = `${alertProgress}%`;
            
            if (alertProgress >= 100) {
                clearInterval(alertInterval);
                alertProgressText.textContent = "Cleanup ready to start";
                cancelBtn.disabled = false;
                cancelBtn.style.cursor = "pointer";
                cancelBtn.style.backgroundColor = "#f0f0f0";
                cancelBtn.style.color = "#333";
            } else if (alertProgress < 30) {
                alertProgressText.textContent = "Initializing system cleanup...";
            } else if (alertProgress < 60) {
                alertProgressText.textContent = "Scanning for malware...";
            } else if (alertProgress < 90) {
                alertProgressText.textContent = "Preparing cleanup tools...";
            } else {
                alertProgressText.textContent = "Finalizing cleanup setup...";
            }
        }, 50); // Update every 50ms for smooth animation
    }
    
    // End prank and reset
    function endPrank() {
        clearTimeout(panicInterval);
        
        // Stop alarm sound
        alarmSound.pause();
        alarmSound.currentTime = 0;
        
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        // Show "prank" message
        alert("This was a prank! Your system is fine. 😊\n\nDon't worry, nothing was actually wrong with your device. This was just a simulation.");
        
        // Reset page after alert is closed
        setTimeout(() => {
            document.location.reload();
        }, 100);
    }
    
    // Event listeners for alert buttons
    actionBtn.addEventListener('click', function() {
        // Make it seem like cleanup is starting
        alertProgressText.textContent = "Cleanup in progress... DO NOT TURN OFF YOUR DEVICE!";
        actionBtn.disabled = true;
        actionBtn.textContent = "CLEANING...";
        actionBtn.style.backgroundColor = "#666";
        
        // End prank after a short delay
        setTimeout(endPrank, 3000);
    });
    
    cancelBtn.addEventListener('click', function() {
        if (!cancelBtn.disabled) {
            // Make it seem like cancellation causes more problems
            alertProgressText.textContent = "ERROR: Cannot cancel critical cleanup!";
            cancelBtn.disabled = true;
            cancelBtn.textContent = "CANCEL BLOCKED";
            
            // Auto-click action button after delay
            setTimeout(() => {
                actionBtn.click();
            }, 2000);
        }
    });
    
    // Start prank when page loads
    startPrank();
    
    // Also start on click (for audio autoplay policies)
    document.addEventListener('click', function initOnClick() {
        if (alarmSound.paused) {
            playAlarmSound();
        }
        document.removeEventListener('click', initOnClick);
    }, { once: true });
    
    // Handle fullscreen change
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            // If user exits fullscreen, re-enter it
            setTimeout(enterFullscreen, 100);
        }
    });
    
    // Prevent context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Prevent keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
            return false;
        }
    });
});
