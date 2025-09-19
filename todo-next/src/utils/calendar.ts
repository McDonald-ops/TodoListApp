export const WEEKDAYS: string[] = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export function getDaysMatrix(date: Date): { label: number; type: "prev" | "curr" }[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const cells: { label: number; type: "prev" | "curr" }[] = [];
  for (let x = firstDayIndex; x > 0; x--) {
    cells.push({ label: prevDays - x + 1, type: "prev" });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ label: i, type: "curr" });
  }
  return cells;
}


