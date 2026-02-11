// passport/components/ProgressIndicator.jsx
export default function ProgressIndicator({ currentStep }) {
  const totalSteps = 4;
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-md mx-auto py-8 px-6">
      {/* Progress line + circles container */}
      <div className="relative flex items-center justify-between">
        {/* Background gray line */}
        <div className="absolute left-0 right-0 h-[3px] bg-gray-300 top-1/2 -translate-y-1/2" />

        {/* Orange progress line */}
        <div
          className="absolute left-0 h-[3px] bg-orange-500 top-1/2 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

        {/* Circles */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div
              key={step}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-300
                ${
                  isCompleted
                    ? 'bg-black text-white border-2 border-black'
                    : isActive
                    ? 'bg-orange-500 text-white border-2 border-orange-500 shadow-md'
                    : 'bg-white text-gray-400 border-2 border-gray-400'
                }`}
            >
              {isCompleted ? '✓' : step}
            </div>
          );
        })}
      </div>

      {/* Step text indicator */}
      <div className="mt-4 text-center text-sm font-medium text-gray-600">
        {currentStep}/{totalSteps}
      </div>
    </div>
  );
}