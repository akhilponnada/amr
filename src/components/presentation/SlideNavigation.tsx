import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  slideNames: string[];
  onNavigate: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function SlideNavigation({
  currentSlide,
  totalSlides,
  slideNames,
  onNavigate,
  onPrev,
  onNext,
}: SlideNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        {/* Center: Navigation Buttons + Progress */}
        <div className="flex items-center gap-4 flex-1 justify-center">
          {/* Left/Right Navigation Buttons */}
          <div className="flex gap-2">
            <Button
              variant="default"
              size="icon"
              onClick={onPrev}
              disabled={currentSlide === 0}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={onNext}
              disabled={currentSlide === totalSlides - 1}
              className="h-9 w-9"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  currentSlide === index
                    ? 'bg-primary w-6'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground hidden md:block">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>
    </div>
  );
}
