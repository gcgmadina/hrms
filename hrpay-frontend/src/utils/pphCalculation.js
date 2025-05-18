export function calculateFullPPH21(maritalStatus, dependentsCount, ctc = 0) {
  // Tentukan kategori TK/K berdasarkan marital status dan jumlah tanggungan
  const category = maritalStatus === "Married" ? `K/${dependentsCount}` : `TK/${dependentsCount}`;

  // Hitung PTKP
  const PTKP_BASE = 54000000;
  const PTKP_DEPENDENT = 4500000;
  const PTKP = PTKP_BASE + Math.min(dependentsCount, 3) * PTKP_DEPENDENT;

  // Hitung Penghasilan Kena Pajak (PKP)
  let taxableIncome = Math.max(ctc - PTKP, 0);

  // Tarif pajak progresif
  const taxBrackets = [
    { limit: 60000000, rate: 0.05 },
    { limit: 250000000, rate: 0.15 },
    { limit: 500000000, rate: 0.25 },
    { limit: 5000000000, rate: 0.30 },
    { limit: Infinity, rate: 0.35 }
  ];

  let tax = 0;
  let previousLimit = 0;

  for (const bracket of taxBrackets) {
    if (taxableIncome > previousLimit) {
      let taxableAmount = Math.min(taxableIncome, bracket.limit) - previousLimit;
      tax += taxableAmount * bracket.rate;
      previousLimit = bracket.limit;
    } else {
      break;
    }
  }

  return { category, tax };
}