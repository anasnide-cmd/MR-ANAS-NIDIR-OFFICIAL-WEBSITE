'use client';
import { useState, useEffect, useRef } from 'react';
import { 
    Modal, 
    Input, 
    Button, 
    Chip,
    Kbd
} from "@heroui/react";
import { Sparkles, Command, Search, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AICommandPalette({ isOpen, onClose, onCommand }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                 setQuery('');
                 inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;
        onCommand(query.trim());
        onClose();
    };

    const suggestions = [
        { label: 'Fix Bugs', icon: <Sparkles size={14} className="text-[#00f0ff]" />, cmd: 'Fix all bugs in this file' },
        { label: 'Add Documentation', icon: <Search size={14} className="text-[#00f0ff]" />, cmd: 'Add detailed comments to the code' },
        { label: 'Refactor Code', icon: <Command size={14} className="text-[#00f0ff]" />, cmd: 'Refactor this to use modern ES6 syntax' },
        { label: 'Optimize Performance', icon: <Rocket size={14} className="text-[#00ff88]" />, cmd: 'Optimize this code for maximum performance' },
    ];

    return (
        <Modal.Root 
            isOpen={isOpen} 
            onOpenChange={(open) => !open && onClose()}
        >
            <Modal.Backdrop 
                className="bg-black/60 backdrop-blur-md"
            />
            <Modal.Container className="pt-[10vh] sm:pt-[15vh]">
                <Modal.Dialog className="bg-[#050505]/95 border border-[#00f0ff]/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden p-0 rounded-2xl max-w-xl">
                    <Modal.Body className="p-0">
                        <form onSubmit={handleSubmit} className="p-5 border-b border-white/5 bg-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#00f0ff] animate-pulse" />
                            <Input
                                ref={inputRef}
                                value={query}
                                onValueChange={setQuery}
                                placeholder="Execute Neural Command..."
                                variant="underlined"
                                className="w-full"
                                classNames={{
                                    input: "text-xl text-white font-black placeholder:text-white/10 h-12 tracking-wide",
                                    inputWrapper: "border-[#00f0ff]/30 group-data-[focus=true]:border-[#00f0ff] after:bg-[#00f0ff] after:shadow-[0_0_10px_#00f0ff]",
                                }}
                                startContent={
                                    <Sparkles size={22} className="text-[#00f0ff] animate-pulse drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] mr-3" />
                                }
                                endContent={
                                    <div className="hidden sm:flex items-center gap-2">
                                        <Kbd keys={["enter"]} className="bg-white/5 text-[#00f0ff]/40 border-none font-black text-[10px]">ENTER</Kbd>
                                    </div>
                                }
                            />
                        </form>
                        
                        <div className="p-5 bg-black/40">
                            <div className="text-[9px] font-black text-[#00f0ff]/40 tracking-[4px] mb-4 uppercase flex items-center gap-3">
                                <Search size={10} />
                                <span>SUGGESTED PROTOCOLS</span>
                                <div className="flex-1 h-[1px] bg-white/5" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <AnimatePresence>
                                    {isOpen && suggestions.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 + 0.1 }}
                                        >
                                            <Button
                                                size="md"
                                                variant="flat"
                                                className="w-full justify-start bg-white/5 border border-white/5 text-white/50 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/40 transition-all font-black text-xs h-10 tracking-tighter"
                                                startContent={item.icon}
                                                onClick={() => {
                                                    setQuery(item.cmd);
                                                    setTimeout(() => onCommand(item.cmd), 150);
                                                    onClose();
                                                }}
                                            >
                                                {item.label}
                                            </Button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                        
                        <div className="p-3 px-5 border-t border-white/5 bg-black/60 flex items-center justify-between">
                             <div className="text-[10px] text-white/20 font-bold flex items-center gap-2">
                                 <Command size={10} />
                                 <span>NEURAL LINK V3 ACTIVE</span>
                             </div>
                             <div className="flex items-center gap-4 text-[10px] text-white/20 font-black">
                                 <span>ESC TO DISCARD</span>
                             </div>
                        </div>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Root>
    );
}

import { Rocket } from 'lucide-react';
