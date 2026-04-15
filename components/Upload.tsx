"use client"
import {useCallback, useEffect, useRef, useState} from 'react'
import { useAuth } from '@/providers/AuthProvider';
import { CheckCircle2, ImageIcon, UploadIcon } from 'lucide-react';
import {PROGRESS_INCREMENT, REDIRECT_DELAY_MS, PROGRESS_INTERVAL_MS} from "../lib/constants";

interface UploadProps {
    onComplete?: (base64Data: string) => void;
}

function Upload({ onComplete }: UploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { isSignedIn } = useAuth();

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, []);

    const processFile = useCallback((file: File) => {
        if (!isSignedIn) return;

        setFile(file);
        setProgress(0);

        const reader = new FileReader();
        reader.onerror = () => {
            setFile(null);
            setProgress(0);
        };
        reader.onloadend = () => {
            const base64Data = reader.result as string;

            intervalRef.current = setInterval(() => {
                setProgress((prev) => {
                    const next = prev + PROGRESS_INCREMENT;
                    if (next >= 100) {
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                        timeoutRef.current = setTimeout(() => {
                            onComplete?.(base64Data);
                            timeoutRef.current = null;
                        }, REDIRECT_DELAY_MS);
                        return 100;
                    }
                    return next;
                });
            }, PROGRESS_INTERVAL_MS);
        };
        reader.readAsDataURL(file);
    }, [isSignedIn, onComplete]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!isSignedIn) return;
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (!isSignedIn) return;

        const droppedFile = e.dataTransfer.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (droppedFile && allowedTypes.includes(droppedFile.type)) {
            processFile(droppedFile);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isSignedIn) return;

        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };

    return (
        <div className='upload'>
            {!file ? (
                <div className={` dropzone ${isDragging ? 'border-black! bg-zinc-100!' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    >
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        accept=".jpg,.jpeg,.png,.webp"
                        disabled={!isSignedIn}
                        onChange={handleChange}
                    />
                    <div className="flex flex-col items-center pointer-events-none">
                        <div className={`drop-icon ${isDragging ? "bg-zinc-300! text-black!":"bg-zinc-200 text-zinc-500 group-hover:bg-zinc-300 group-hover:text-black"}`}>
                            <UploadIcon size={20} />
                        </div>
                        <p className='text-zinc-900 font-bold text-sm mb-1'>
                            {isSignedIn ? (
                                "Click to upload or just drag and drop"
                            ): ("Sign in or sign up with Puter to upload")}
                        </p>
                        <p className="font-bold mb-1 text-zinc-500 text-xs">Maximum file size 50 MB.</p>
                    </div>
                </div>
            ) : (
                <div className="h-48 rounded-xl border border-zinc-200 bg-white p-6 flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-lg bg-zinc-100 flex items-center justify-center text-black mb-3 border border-zinc-200 size-7">
                            {progress === 100 ? (
                                <CheckCircle2 className="text-green-500" />
                            ): (
                                <ImageIcon className="image" />
                            )}
                        </div>

                        <h3 className='text-black font-semibold text-sm truncate max-w-full px-4'>{file.name}</h3>

                        <div className=' w-full max-w-50 h-1.5 bg-zinc-100 rounded-full mt-3'>
                            <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />

                            <p className="text-zinc-500 text-xs uppercase mt-2">
                                {progress < 100 ? 'Analyzing Floor Plan...' : 'Redirecting...'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Upload
