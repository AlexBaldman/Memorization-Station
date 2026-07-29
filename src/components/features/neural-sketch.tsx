'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Eraser, Paintbrush, RotateCcw, Save, Trash2, Undo } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NeuralSketchProps {
  onSave: (blob: Blob) => void;
}

export function NeuralSketch({ onSave }: NeuralSketchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState([5]);
  const [mode, setMode] = useState<'brush' | 'eraser'>('brush');
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 512;
    canvas.height = 512;

    // Initial background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory((prev) => [...prev, canvas.toDataURL()]);
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      saveHistory();
    }
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Scale coordinates to canvas resolution
    x = (x / rect.width) * canvas.width;
    y = (y / rect.height) * canvas.height;

    ctx.lineWidth = brushSize[0];
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = mode === 'eraser' ? '#ffffff' : color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);

    const lastItem = newHistory[newHistory.length - 1];
    if (lastItem) {
      const img = new window.Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = lastItem;
    } else {
      clear();
    }
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) onSave(blob);
    }, 'image/png');
  };

  const colors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', 
    '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-4 border-black bg-card rounded-2xl ink-shadow-sm">
        <div className="flex gap-2">
          <Button 
            variant={mode === 'brush' ? 'default' : 'outline'} 
            size="icon" 
            onClick={() => setMode('brush')}
            className="border-2 border-black"
          >
            <Paintbrush className="h-4 w-4" />
          </Button>
          <Button 
            variant={mode === 'eraser' ? 'default' : 'outline'} 
            size="icon" 
            onClick={() => setMode('eraser')}
            className="border-2 border-black"
          >
            <Eraser className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={undo} disabled={history.length === 0} className="border-2 border-black">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={clear} className="border-2 border-black hover:bg-destructive hover:text-white">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              className={cn(
                "h-8 w-8 rounded-full border-2 border-black ink-shadow-sm transition-transform hover:scale-110",
                color === c && mode === 'brush' && "scale-125 ring-2 ring-primary ring-offset-2"
              )}
              style={{ backgroundColor: c }}
              onClick={() => {
                setColor(c);
                setMode('brush');
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-4 w-full sm:w-48">
          <span className="text-[10px] font-headline uppercase shrink-0">Size</span>
          <Slider 
            value={brushSize} 
            onValueChange={setBrushSize} 
            max={50} 
            min={1} 
            step={1} 
            className="flex-grow"
          />
        </div>
      </div>

      <div className="relative aspect-square w-full max-w-[512px] mx-auto bg-white border-8 border-black rounded-[2rem] overflow-hidden ink-shadow-lg cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full touch-none"
        />
      </div>

      <div className="flex justify-end">
        <Button 
            size="lg" 
            onClick={handleExport}
            className="h-16 px-10 font-headline text-xs border-4 border-black ink-shadow-lg hover:bg-accent transition-all"
        >
          <Save className="mr-2 h-5 w-5" /> COMMIT SKETCH
        </Button>
      </div>
    </div>
  );
}