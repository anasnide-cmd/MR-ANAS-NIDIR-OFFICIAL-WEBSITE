import { useEffect, useRef } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export default function Terminal({ files, onUpdateFiles, onRun }) {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);
    const fitAddonRef = useRef(null);
    const commandRef = useRef('');
    
    // Log buffer for messages that arrive before terminal is ready
    const logBuffer = useRef([]);

    useEffect(() => {
        if (!terminalRef.current) return;

        let resizeObserver;
        let term;
        let fitAddon;

        const initTerminal = () => {
            if (xtermRef.current) return; // Already initialized

            // Double check dimensions
            if (terminalRef.current.clientWidth === 0 || terminalRef.current.clientHeight === 0) {
                return; // Still hidden, wait for next resize event
            }

            // Initialize xterm
            term = new XTerminal({
                cursorBlink: true,
                theme: {
                    background: '#0d1117',
                    foreground: '#c9d1d9',
                    cursor: '#58a6ff',
                    selectionBackground: '#264f78',
                },
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
                lineHeight: 1.4,
            });

            fitAddon = new FitAddon();
            term.loadAddon(fitAddon);
            
            // Open terminal in container
            term.open(terminalRef.current);
            try {
                fitAddon.fit();
            } catch (e) { console.warn("Fit error", e); }

            xtermRef.current = term;
            fitAddonRef.current = fitAddon;

            // Welcome Message
            term.writeln('\x1b[1;34m~ Mr Build Terminal v1.0\x1b[0m');
            term.writeln('Type \x1b[1;32mhelp\x1b[0m for commands.');
            
            // Flush log buffer
            if (logBuffer.current.length > 0) {
                logBuffer.current.forEach(msg => {
                     term.write(`\r\n${msg}`);
                });
                logBuffer.current = [];
            }
            
            prompt(term);

            // Input Handling logic needs to be attached here because term is now available
            term.onData(e => {
                switch (e) {
                    case '\r': // Enter
                        term.write('\r\n');
                        handleCommand(commandRef.current.trim(), term);
                        commandRef.current = '';
                        break;
                    case '\u007F': // Backspace
                        if (commandRef.current.length > 0) {
                            term.write('\b \b');
                            commandRef.current = commandRef.current.slice(0, -1);
                        }
                        break;
                    default:
                        if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7e) || e >= '\u00a0') {
                            commandRef.current += e;
                            term.write(e);
                        }
                }
            });
        };

        // Resize Observer handles both initialization trigger and resizing
        resizeObserver = new ResizeObserver(() => {
            if (!xtermRef.current) {
                // Try to init if visible
                requestAnimationFrame(initTerminal);
            } else {
                // Just fit if already init
                requestAnimationFrame(() => {
                    try { fitAddonRef.current?.fit(); } catch(e) {}
                });
            }
        });

        resizeObserver.observe(terminalRef.current);

        return () => {
            resizeObserver.disconnect();
            if (term) term.dispose();
            xtermRef.current = null;
            fitAddonRef.current = null;
        };
    }, []);

    const prompt = (term) => {
        term.write('\r\n\x1b[1;32muser@mr-build\x1b[0m:\x1b[1;34m~/project\x1b[0m$ ');
    };

    const handleCommand = (cmd, term) => {
        if (!cmd) {
            prompt(term);
            return;
        }

        const args = cmd.split(' ');
        const command = args[0];

        switch (command) {
            case 'help':
                term.writeln('Available commands:');
                term.writeln('  \x1b[36mls\x1b[0m              List files');
                term.writeln('  \x1b[36mcat [file]\x1b[0m      View file content');
                term.writeln('  \x1b[36mtouch [file]\x1b[0m    Create new file');
                term.writeln('  \x1b[36mrm [file]\x1b[0m       Remove file');
                term.writeln('  \x1b[36mnode [file]\x1b[0m     Run JS file (reload preview)');
                term.writeln('  \x1b[36mclear\x1b[0m           Clear terminal');
                break;

            case 'ls':
                const fileList = Object.keys(files || {}).join('  ');
                term.writeln(fileList);
                break;

            case 'cat':
                if (args[1]) {
                    const file = files[args[1]];
                    if (file) {
                        term.writeln(file.content);
                    } else {
                        term.writeln(`cat: ${args[1]}: No such file`);
                    }
                } else {
                    term.writeln('usage: cat [file]');
                }
                break;

            case 'touch':
                if (args[1]) {
                    if (files[args[1]]) {
                        term.writeln(`touch: ${args[1]}: File exists`);
                    } else {
                        onUpdateFiles(args[1], '', 'javascript');
                        term.writeln(`Created ${args[1]}`);
                    }
                } else {
                    term.writeln('usage: touch [file]');
                }
                break;

            case 'rm':
                if (args[1]) {
                    if (files[args[1]]) {
                        onUpdateFiles(args[1], null);
                        term.writeln(`Removed ${args[1]}`);
                    } else {
                        term.writeln(`rm: ${args[1]}: No such file`);
                    }
                } else {
                    term.writeln('usage: rm [file]');
                }
                break;
            
            case 'node':
            case 'npm':
            case 'run':
                term.writeln('>> Restarting Preview environment...');
                if (onRun) onRun();
                break;

            case 'clear':
                term.clear();
                break;

            default:
                term.writeln(`command not found: ${command}`);
        }

        prompt(term);
    };

    // Expose method to write logs safely
    useEffect(() => {
        window.terminalWrite = (text) => {
            if (xtermRef.current) {
                xtermRef.current.write(`\r\n${text}`);
                prompt(xtermRef.current);
            } else {
                // Buffer logs if terminal not ready
                logBuffer.current.push(text);
            }
        };
    }, []);

    return (
        <div 
            ref={terminalRef} 
            className="terminal-container"
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        />
    );
}
