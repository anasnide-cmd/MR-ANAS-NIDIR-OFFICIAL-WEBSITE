import { useEffect, useRef, useCallback } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';

// --- VIRTUAL NPM LOGIC ---
const CDNS = {
    skypack: (pkg) => `https://cdn.skypack.dev/${pkg}`,
    unpkg: (pkg) => `https://unpkg.com/${pkg}?module`,
    esm: (pkg) => `https://esm.sh/${pkg}`
};

export default function Terminal({ files, onUpdateFiles, onRun, onFixError }) {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);
    const fitAddonRef = useRef(null);
    const commandRef = useRef('');
    
    // Log buffer for messages that arrive before terminal is ready
    const logBuffer = useRef([]);

    const prompt = useCallback((term) => {
        term.write('\r\n\x1b[1;32muser@mr-build\x1b[0m:\x1b[1;34m~/project\x1b[0m$ ');
    }, []);

    const handleCommand = useCallback(async (cmd, term) => {
        if (!cmd) {
            prompt(term);
            return;
        }

        const args = cmd.split(' ').filter(Boolean);
        const command = args[0];

        switch (command) {
            case 'help':
                term.writeln('Available commands:');
                term.writeln('  \x1b[36mnpm install <pkg>\x1b[0m   Install package (via CDN)');
                term.writeln('  \x1b[36mnode [file]\x1b[0m         Run JS file (triggers preview)');
                term.writeln('  \x1b[36mls\x1b[0m                  List files');
                term.writeln('  \x1b[36mcat [file]\x1b[0m          View file content');
                term.writeln('  \x1b[36mtouch [file]\x1b[0m        Create new file');
                term.writeln('  \x1b[36mrm [file]\x1b[0m           Remove file');
                term.writeln('  \x1b[36mclear\x1b[0m               Clear terminal');
                break;

            case 'npm':
                if (args[1] === 'install' || args[1] === 'i') {
                    const pkg = args[2];
                    if (!pkg) {
                        term.writeln('\x1b[31mnpm ERR! missing package name\x1b[0m');
                    } else {
                        term.writeln(`\x1b[32m[npm] resolving ${pkg}...\x1b[0m`);
                        // Simulation
                        await new Promise(r => setTimeout(r, 600)); 
                        term.writeln(`\x1b[32m[npm] fetching metadata...\x1b[0m`);
                        await new Promise(r => setTimeout(r, 400));
                        
                        // Inject into index.html
                        const index = files['index.html'];
                        if (index) {
                            const cdnLink = CDNS.skypack(pkg);
                            const importMap = `\n<script type="module">import * as ${pkg.replace(/[^a-zA-Z]/g,'_')} from '${cdnLink}'; window.${pkg.replace(/[^a-zA-Z]/g,'_')} = ${pkg.replace(/[^a-zA-Z]/g,'_')}; console.log("${pkg} installed successfully");</script>`;
                            
                            // Naive injection before </body>
                            const newContent = index.content.replace('</body>', `${importMap}\n</body>`);
                            
                            // Check if actually replaced (if </body> exists)
                            if (newContent !== index.content) {
                                onUpdateFiles('index.html', newContent);
                                term.writeln(`\x1b[32m+ ${pkg}@latest\x1b[0m`);
                                term.writeln(`\x1b[32madded 1 package in 1.2s\x1b[0m`);
                                term.writeln(`\x1b[90m>> Injected script into index.html\x1b[0m`);
                            } else {
                                term.writeln('\x1b[31m[ERR] Could not find </body> tag in index.html to inject script.\x1b[0m');
                            }
                        } else {
                            term.writeln('\x1b[31m[ERR] index.html not found.\x1b[0m');
                        }
                    }
                } else {
                    term.writeln(`npm: unknown command ${args[1]}`);
                }
                break;

            case 'ls':
                const fileList = Object.keys(files || {}).join('  ');
                term.writeln(`\x1b[34m${fileList}\x1b[0m`);
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
    }, [files, onRun, onUpdateFiles, prompt]);

    // Self-Healing Link Handler
    const handleLinkClick = useCallback((event, uri) => {
        if (uri.startsWith('fix://')) {
            const errorMsg = decodeURIComponent(uri.replace('fix://', ''));
            if (onFixError) {
                xtermRef.current?.writeln(`\r\n\x1b[35m[AI] Analyzing error: ${errorMsg}...\x1b[0m`);
                onFixError(errorMsg);
            }
        }
    }, [onFixError]);

    useEffect(() => {
        if (!terminalRef.current) return;

        let resizeObserver;
        let term;
        let fitAddon;
        let webLinksAddon;

        const initTerminal = () => {
            if (xtermRef.current) return;

            if (terminalRef.current.clientWidth === 0 || terminalRef.current.clientHeight === 0) {
                return; 
            }

            term = new XTerminal({
                cursorBlink: true,
                theme: {
                    background: '#0d1117',
                    foreground: '#c9d1d9',
                    cursor: '#58a6ff',
                    selectionBackground: '#264f78',
                    black: '#000000',
                    red: '#ff5555',
                    green: '#50fa7b',
                    yellow: '#f1fa8c',
                    blue: '#bd93f9',
                    magenta: '#ff79c6',
                    cyan: '#8be9fd',
                    white: '#bfbfbf',
                },
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
                lineHeight: 1.4,
                allowProposedApi: true
            });

            fitAddon = new FitAddon();
            term.loadAddon(fitAddon);
            
            // Custom link handler for "Fix it"
            webLinksAddon = new WebLinksAddon(handleLinkClick);
            term.loadAddon(webLinksAddon);
            
            term.open(terminalRef.current);
            try { fitAddon.fit(); } catch (e) { console.warn("Fit error", e); }

            xtermRef.current = term;
            fitAddonRef.current = fitAddon;

            term.writeln('\x1b[1;34m~ Mr Build Terminal v2.0\x1b[0m');
            term.writeln('Type \x1b[1;32mhelp\x1b[0m for commands.');
            
            if (logBuffer.current.length > 0) {
                logBuffer.current.forEach(msg => {
                     term.write(`\r\n${msg}`);
                });
                logBuffer.current = [];
            }
            
            prompt(term);

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

        resizeObserver = new ResizeObserver(() => {
            if (!xtermRef.current) {
                requestAnimationFrame(initTerminal);
            } else {
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
    }, [handleCommand, handleLinkClick]);


    useEffect(() => {
        window.terminalWrite = (text) => {
            if (xtermRef.current) {
                const term = xtermRef.current;
                // Check if text contains Error pattern
                if (text.includes('[ERR]') || text.includes('Error:')) {
                    // Extract error message for the link
                    const cleanMsg = text.replace(/\x1b\[[0-9;]*m/g, '').replace('[ERR]', '').trim();
                    const encoded = encodeURIComponent(cleanMsg);
                    term.write(`\r\n${text}`);
                    term.writeln(`\r\n\x1b[33m ⚡ [AI] Issue Detected. \x1b[0m\x1b[4m\x1b[36mfix://${encoded}\x1b[0m \x1b[36m(Ctrl+Click to Auto-Fix)\x1b[0m`);
                    prompt(term);
                } else {
                    term.write(`\r\n${text}`);
                    prompt(term);
                }
            } else {
                logBuffer.current.push(text);
            }
        };
    }, [prompt]);

    return (
        <div 
            ref={terminalRef} 
            className="terminal-container"
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        />
    );
}
