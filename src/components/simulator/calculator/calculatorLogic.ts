export const CALCULATOR_CONFIG = {
  gastosPctMayores35: 0.11,
  gastosPctJovenes: 0.06,
  dtiRecomendado: 0.35,
  dtiMaximo: 0.44,
  plazoMin: 15,
  plazoMaxAbsoluto: 40,
  edadMaxVencimiento: 75,
  ltv: {
    habitual: 0.9,
    habitualJoven: 0.95,
    segunda: 0.7,
    inversion: 0.6
  },
  ivaObraNueva: 0.1,
  notariaCvPct: 0.004,
  registroCvPct: 0.0018,
  gestoriaFija: 350,
  tasacionFija: 400,
  impuestosOrientativosPorCCAA: {
    "Andalucía": { itp: 7.0, ajd_cv: 1.2, ajd_prestamo: 1.2 },
    "Aragón": { itp: 8.0, ajd_cv: 1.5, ajd_prestamo: 1.5 },
    "Asturias": { itp: 8.0, ajd_cv: 1.2, ajd_prestamo: 1.2 },
    "Baleares": { itp: 8.0, ajd_cv: 1.2, ajd_prestamo: 1.2 },
    "Canarias": { itp: 6.5, ajd_cv: 1.0, ajd_prestamo: 1.0 },
    "Cantabria": { itp: 9.0, ajd_cv: 1.5, ajd_prestamo: 1.5 },
    "Castilla-La Mancha": { itp: 9.0, ajd_cv: 1.5, ajd_prestamo: 1.5 },
    "Castilla y León": { itp: 8.0, ajd_cv: 1.5, ajd_prestamo: 1.5 },
    "Cataluña": { itp: 10.0, ajd_cv: 1.5, ajd_prestamo: 1.5 },
    "C. Valenciana": { itp: 10.0, ajd_cv: 1.5, ajd_prestamo: 1.5 },
    "Extremadura": { itp: 8.0, ajd_cv: 1.5, ajd_prestamo: 1.5 },
    "Galicia": { itp: 9.0, ajd_cv: 1.5, ajd_prestamo: 1.5 },
    "La Rioja": { itp: 7.0, ajd_cv: 1.0, ajd_prestamo: 1.0 },
    "Madrid": { itp: 6.0, ajd_cv: 0.75, ajd_prestamo: 0.75 },
    "Murcia": { itp: 8.0, ajd_cv: 1.5, ajd_prestamo: 1.5 },
    "Navarra": { itp: 6.0, ajd_cv: 0.5, ajd_prestamo: 0.5 },
    "País Vasco": { itp: 7.0, ajd_cv: 0.5, ajd_prestamo: 0.5 },
    "Ceuta": { itp: 6.0, ajd_cv: 0.5, ajd_prestamo: 0.5 },
    "Melilla": { itp: 6.0, ajd_cv: 0.5, ajd_prestamo: 0.5 }
  }
} as const;

export type FinalidadCompra = "habitual" | "segunda" | "inversion";

export type ViabilityInput = {
  edadJoven: number;
  edadMayor: number;
  laboral: string;
  ingresos: number;
  deudas: number;
  precio: number;
  ahorros: number;
  finalidad: FinalidadCompra;
  jovenFlag: boolean;
  tin: number;
  plazoUser: number;
};

export type ViabilityStatus = "ok" | "warn" | "bad";

export type ViabilityOutput = {
  status: ViabilityStatus;
  maxHipoteca: number;
  cuota: number;
  plazoAplicado: number;
  plazoMax: number;
  dti: number;
  ahorroNecesario: number;
  ltv: number;
  gastosPct: number;
  motivos: string[];
  message: string;
  cta: string;
};

export type CostsInput = {
  precio: number;
  tipoVivienda: "obra_nueva" | "segunda_mano";
  ccaa: string;
  viviendaHabitual: boolean;
  hipoteca: boolean;
  joven: boolean;
  familiaNumerosa: boolean;
  discapacidad: boolean;
  tipoImpuestoEditablePct: number;
};

export type CostsOutput = {
  etiquetaImpuesto: string;
  impuestos: number;
  notariaCv: number;
  registroCv: number;
  gestoria: number;
  totalCv: number;
  notaCv: string;
  tasacion: number;
  bancoInfo: string;
  totalHipComprador: number;
  ajdPrestamo: number;
  notaHip: string;
  totalGeneral: number;
};

export type AnnualRow = {
  year: number;
  pago: number;
  interes: number;
  principal: number;
  saldo: number;
};

export type MortgageCompareInput = {
  principal: number;
  plazo: number;
  tipo: "fijo" | "variable";
  tinA: number;
  tinB: number;
  aperturaA: number;
  aperturaB: number;
};

export type MortgageCompareOutput = {
  cuotaA: number;
  cuotaB: number;
  interesesA: number;
  interesesB: number;
  totalCuotasA: number;
  totalCuotasB: number;
  taeA: number;
  taeB: number;
  tipoTexto: "Fijo" | "Variable";
  rowsA: AnnualRow[];
  rowsB: AnnualRow[];
  winnerMessage: string;
};

export const euro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

export const euro2 = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export function formatPct(value: number): string {
  return Number.isFinite(value) ? `${(value * 100).toFixed(2).replace(".", ",")}%` : "—";
}

export function parseMoney(value: string): number {
  const source = String(value ?? "").trim();
  if (!source) return Number.NaN;

  const normalized = source
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^0-9.-]/g, "");

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function monthlyPaymentFrench(principal: number, annualTinPct: number, years: number): number {
  const monthlyRate = annualTinPct / 100 / 12;
  const months = Math.round(years * 12);
  if (!Number.isFinite(principal) || !Number.isFinite(monthlyRate) || !Number.isFinite(months) || principal <= 0 || months <= 0) {
    return Number.NaN;
  }
  if (monthlyRate === 0) return principal / months;
  return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
}

export function amortizationAnnualSummary(principal: number, annualTinPct: number, years: number): AnnualRow[] {
  const payment = monthlyPaymentFrench(principal, annualTinPct, years);
  const monthlyRate = annualTinPct / 100 / 12;
  const months = Math.round(years * 12);

  if (!Number.isFinite(payment)) return [];

  let balance = principal;
  let month = 0;
  const rows: AnnualRow[] = [];

  for (let year = 1; year <= years; year += 1) {
    let intY = 0;
    let prinY = 0;
    let payY = 0;

    for (let m = 0; m < 12; m += 1) {
      month += 1;
      if (month > months) break;

      const interest = balance * monthlyRate;
      let principalPaid = payment - interest;
      if (principalPaid > balance) principalPaid = balance;

      balance -= principalPaid;
      intY += interest;
      prinY += principalPaid;
      payY += principalPaid + interest;

      if (balance <= 0.0001) {
        balance = 0;
        break;
      }
    }

    rows.push({ year, pago: payY, interes: intY, principal: prinY, saldo: balance });
    if (balance <= 0) break;
  }

  return rows;
}

export function taeApprox(principal: number, annualTinPct: number, years: number, openingFeePct: number): number {
  const fee = principal * (openingFeePct / 100);
  const payment = monthlyPaymentFrench(principal, annualTinPct, years);
  const months = Math.round(years * 12);
  if (!Number.isFinite(payment) || principal <= 0 || months <= 0) return Number.NaN;

  const initialCashflow = principal - fee;
  if (initialCashflow <= 0) return Number.NaN;

  let rate = annualTinPct / 100 / 12;
  for (let i = 0; i < 50; i += 1) {
    const f = initialCashflow - payment * (1 - Math.pow(1 + rate, -months)) / rate;
    const df = -payment * (((months * Math.pow(1 + rate, -months - 1)) * rate - (1 - Math.pow(1 + rate, -months))) / (rate * rate));
    const step = f / df;
    rate -= step;

    if (!Number.isFinite(rate) || rate <= -0.99) rate = 0.0001;
    if (Math.abs(step) < 1e-10) break;
  }

  return Math.pow(1 + rate, 12) - 1;
}

export function calculateViability(input: ViabilityInput): ViabilityOutput {
  const plazoMaxEdad = CALCULATOR_CONFIG.edadMaxVencimiento - input.edadMayor;
  const plazoMax = clamp(
    Math.min(CALCULATOR_CONFIG.plazoMaxAbsoluto, plazoMaxEdad),
    0,
    CALCULATOR_CONFIG.plazoMaxAbsoluto
  );

  const edadImpidePlazoMin = plazoMax < CALCULATOR_CONFIG.plazoMin;
  let ltv: number = CALCULATOR_CONFIG.ltv[input.finalidad];
  if (input.finalidad === "habitual" && input.jovenFlag) {
    ltv = CALCULATOR_CONFIG.ltv.habitualJoven;
  }

  const ltvOk = Number.isFinite(ltv) && ltv > 0 && ltv <= 1;
  const maxHipoteca = input.precio * ltv;

  const gastosPct = input.jovenFlag ? CALCULATOR_CONFIG.gastosPctJovenes : CALCULATOR_CONFIG.gastosPctMayores35;
  const gastosEstimados = input.precio * gastosPct;
  const ahorroNecesario = (input.precio - maxHipoteca) + gastosEstimados;

  const loanNeed = Math.max(0, (input.precio + gastosEstimados) - input.ahorros);
  const importeFinanciar = Math.min(maxHipoteca, loanNeed);

  const plazoAplicado = Number.isFinite(input.plazoUser) && input.plazoUser > 0
    ? clamp(input.plazoUser, CALCULATOR_CONFIG.plazoMin, Math.floor(plazoMax))
    : Math.floor(plazoMax);

  const cuota = monthlyPaymentFrench(importeFinanciar, input.tin, plazoAplicado);
  const dti = (cuota + input.deudas) / input.ingresos;

  const deficitAhorro = ahorroNecesario - input.ahorros;
  const ahorrosSuficientes = deficitAhorro <= 0;
  const umbralLigero = Math.max(2000, ahorroNecesario * 0.05);
  const ahorrosLigeramenteInsuf = deficitAhorro > 0 && deficitAhorro <= umbralLigero;
  const ahorrosClaramenteInsuf = deficitAhorro > umbralLigero;

  const financingGap = Math.max(0, loanNeed - maxHipoteca);
  const fueraFinanciacion = financingGap > 0;

  let viableSoloConAjustePlazo = false;
  if (
    Number.isFinite(input.plazoUser)
    && input.plazoUser > 0
    && input.plazoUser < Math.floor(plazoMax)
    && !edadImpidePlazoMin
  ) {
    const cuotaMaxPlazo = monthlyPaymentFrench(importeFinanciar, input.tin, Math.floor(plazoMax));
    const dtiMaxPlazo = (cuotaMaxPlazo + input.deudas) / input.ingresos;
    if (Number.isFinite(dtiMaxPlazo) && dtiMaxPlazo <= CALCULATOR_CONFIG.dtiMaximo) {
      viableSoloConAjustePlazo = true;
    }
  }

  let status: ViabilityStatus = "ok";

  if (
    edadImpidePlazoMin
    || !ltvOk
    || (Number.isFinite(dti) && dti > CALCULATOR_CONFIG.dtiMaximo)
    || ahorrosClaramenteInsuf
    || (fueraFinanciacion && !ahorrosLigeramenteInsuf)
  ) {
    status = "bad";
  } else if (
    (Number.isFinite(dti) && dti > CALCULATOR_CONFIG.dtiRecomendado && dti <= CALCULATOR_CONFIG.dtiMaximo)
    || ahorrosLigeramenteInsuf
    || fueraFinanciacion
    || viableSoloConAjustePlazo
  ) {
    status = "warn";
  } else if (!(Number.isFinite(dti) && dti <= CALCULATOR_CONFIG.dtiRecomendado) || !ahorrosSuficientes) {
    status = "warn";
  }

  const motivos: string[] = [];
  if (edadImpidePlazoMin) motivos.push("Edad impide plazo mínimo");
  if (!ltvOk) motivos.push("LTV no válido");
  if (Number.isFinite(dti) && dti > CALCULATOR_CONFIG.dtiMaximo) motivos.push("DTI > 44%");
  if (Number.isFinite(dti) && dti > CALCULATOR_CONFIG.dtiRecomendado && dti <= CALCULATOR_CONFIG.dtiMaximo) motivos.push("DTI 35–44%");
  if (ahorrosLigeramenteInsuf) motivos.push("Ahorro ligeramente insuficiente");
  if (ahorrosClaramenteInsuf) motivos.push("Ahorro claramente insuficiente");
  if (fueraFinanciacion) motivos.push("Fuera de financiación (LTV)");
  if (viableSoloConAjustePlazo) motivos.push("Mejora con plazo máximo");

  let message = "";
  let cta = "";

  if (status === "ok") {
    message = "Con los datos indicados, la operación podría ser viable dentro de los criterios habituales del mercado.";
    cta = "Habla con un gestor y confirma tu estudio personalizado";
  } else if (status === "warn") {
    message = "La operación podría ser viable, pero está ajustada por ingresos, ahorro o endeudamiento.";
    cta = "Un gestor puede revisar alternativas para tu caso";
  } else {
    message = "Con los datos actuales, la operación no encaja en los criterios habituales, pero existen opciones para mejorar el perfil.";
    cta = "Te explicamos cómo mejorar tu viabilidad";
  }

  return {
    status,
    maxHipoteca,
    cuota,
    plazoAplicado,
    plazoMax,
    dti,
    ahorroNecesario,
    ltv,
    gastosPct,
    motivos,
    message,
    cta
  };
}

export function calculateCosts(input: CostsInput): CostsOutput {
  const taxCfg = CALCULATOR_CONFIG.impuestosOrientativosPorCCAA[input.ccaa as keyof typeof CALCULATOR_CONFIG.impuestosOrientativosPorCCAA]
    ?? { itp: 8, ajd_cv: 1.5, ajd_prestamo: 1.5 };

  let tipoAplicado = input.tipoImpuestoEditablePct;
  const anyReduction = input.viviendaHabitual && (input.joven || input.familiaNumerosa || input.discapacidad);
  if (input.tipoVivienda === "segunda_mano" && anyReduction) {
    tipoAplicado = Math.max(4.0, tipoAplicado - 1.0);
  }

  let impuestos = 0;
  let impuestoDetalle = "";
  let etiquetaImpuesto = "";

  if (input.tipoVivienda === "obra_nueva") {
    const iva = input.precio * CALCULATOR_CONFIG.ivaObraNueva;
    const ajdCv = input.precio * (tipoAplicado / 100);
    impuestos = iva + ajdCv;
    impuestoDetalle = `IVA (10%) + AJD compraventa (${tipoAplicado.toFixed(2)}%)`;
    etiquetaImpuesto = "Impuestos (IVA + AJD)";
  } else {
    impuestos = input.precio * (tipoAplicado / 100);
    impuestoDetalle = `ITP (${tipoAplicado.toFixed(2)}%)`;
    etiquetaImpuesto = "Impuestos (ITP)";
  }

  const notariaCv = input.precio * CALCULATOR_CONFIG.notariaCvPct;
  const registroCv = input.precio * CALCULATOR_CONFIG.registroCvPct;
  const gestoria = CALCULATOR_CONFIG.gestoriaFija;
  const totalCv = impuestos + notariaCv + registroCv + gestoria;

  const tasacion = input.hipoteca ? CALCULATOR_CONFIG.tasacionFija : 0;
  const totalHipComprador = tasacion;
  const ajdPrestamo = input.precio * (taxCfg.ajd_prestamo / 100);

  const bancoInfo = input.hipoteca ? "Notaría + Registro + AJD préstamo (Ley 5/2019)" : "—";
  const totalGeneral = totalCv + totalHipComprador;

  return {
    etiquetaImpuesto,
    impuestos,
    notariaCv,
    registroCv,
    gestoria,
    totalCv,
    notaCv: `Tipo aplicado: ${impuestoDetalle}. (Orientativo; puede variar por normativa autonómica, valor de referencia catastral y circunstancias personales.)`,
    tasacion,
    bancoInfo,
    totalHipComprador,
    ajdPrestamo,
    notaHip: input.hipoteca
      ? `Se muestra AJD del préstamo (${taxCfg.ajd_prestamo.toFixed(2)}%) a título informativo. El total del comprador incluye tasación.`
      : "Indica “Compra con hipoteca: Sí” para ver esta sección.",
    totalGeneral
  };
}

export function compareMortgages(input: MortgageCompareInput): MortgageCompareOutput {
  const cuotaA = monthlyPaymentFrench(input.principal, input.tinA, input.plazo);
  const cuotaB = monthlyPaymentFrench(input.principal, input.tinB, input.plazo);

  const months = input.plazo * 12;
  const totalCuotasA = cuotaA * months;
  const totalCuotasB = cuotaB * months;

  const interesesA = totalCuotasA - input.principal;
  const interesesB = totalCuotasB - input.principal;

  const taeA = taeApprox(input.principal, input.tinA, input.plazo, input.aperturaA);
  const taeB = taeApprox(input.principal, input.tinB, input.plazo, input.aperturaB);

  const rowsA = amortizationAnnualSummary(input.principal, input.tinA, input.plazo);
  const rowsB = amortizationAnnualSummary(input.principal, input.tinB, input.plazo);

  const feeA = input.principal * (input.aperturaA / 100);
  const feeB = input.principal * (input.aperturaB / 100);
  const costA = totalCuotasA + feeA;
  const costB = totalCuotasB + feeB;

  let winnerMessage = "";
  if (costA < costB) {
    winnerMessage = "Opción A parece más conveniente por menor coste total estimado (incl. apertura).";
  } else if (costB < costA) {
    winnerMessage = "Opción B parece más conveniente por menor coste total estimado (incl. apertura).";
  } else {
    winnerMessage = "Ambas opciones tienen un coste total estimado muy similar (incl. apertura).";
  }

  return {
    cuotaA,
    cuotaB,
    interesesA,
    interesesB,
    totalCuotasA,
    totalCuotasB,
    taeA,
    taeB,
    tipoTexto: input.tipo === "variable" ? "Variable" : "Fijo",
    rowsA,
    rowsB,
    winnerMessage
  };
}
