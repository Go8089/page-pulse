export function getGrade(score: number) {
  if (score >= 95)
    return {
      grade: "A+",
      color: "text-emerald-400",
    };

  if (score >= 90)
    return {
      grade: "A",
      color: "text-sky-400",
    };

  if (score >= 80)
    return {
      grade: "B",
      color: "text-green-400",
    };

  if (score >= 70)
    return {
      grade: "C",
      color: "text-yellow-400",
    };

  if (score >= 60)
    return {
      grade: "D",
      color: "text-orange-400",
    };

  return {
    grade: "F",
    color: "text-red-400",
  };
}