interface ScoreBarProps {
  label: string;
  score: number;
}

const ScoreBar = ({ label, score }: ScoreBarProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-score-high";
    if (score >= 50) return "bg-score-mid";
    return "bg-score-low";
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between font-body text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{score}/100</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getScoreColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreBar;
