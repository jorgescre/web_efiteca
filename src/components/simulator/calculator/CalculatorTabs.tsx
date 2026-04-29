import React, { useMemo, useState } from "react";
import {
  CALCULATOR_CONFIG,
  calculateCosts,
  calculateViability,
  compareMortgages,
  euro,
  euro2,
  formatPct,
  parseMoney,
  type AnnualRow,
  type CostsOutput,
  type FinalidadCompra,
  type MortgageCompareOutput,
  type ViabilityOutput
} from "@/components/simulator/calculator/calculatorLogic";
import "@/components/simulator/calculator/calculator.css";

type CalculatorEmbedContent = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

type Props = {
  content?: CalculatorEmbedContent;
};

type TabId = "viab" | "gastos" | "comp";

function ResultBadge({ status }: { status: ViabilityOutput["status"] | null }) {
  if (status === "ok") return <span className="badge b-ok">VIABLE</span>;
  if (status === "warn") return <span className="badge b-warn">VIABLE CON AJUSTES</span>;
  if (status === "bad") return <span className="badge b-bad">NO VIABLE</span>;
  return <span>—</span>;
}

function ViabilityCalculator() {
  const [form, setForm] = useState({
    edadJoven: "",
    edadMayor: "",
    laboral: "",
    ingresos: "",
    deudas: "",
    precio: "",
    ahorros: "",
    finalidad: "" as "" | FinalidadCompra,
    jovenFlag: false,
    tin: "3.50",
    plazo: ""
  });

  const [error, setError] = useState("");
  const [result, setResult] = useState<ViabilityOutput | null>(null);

  const onChange = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCalculate = () => {
    setError("");

    const edadJoven = Number(form.edadJoven);
    const edadMayor = Number(form.edadMayor);
    const ingresos = parseMoney(form.ingresos);
    const deudas = parseMoney(form.deudas) || 0;
    const precio = parseMoney(form.precio);
    const ahorros = parseMoney(form.ahorros);
    const tin = Number(form.tin || 0);
    const plazoUser = form.plazo ? Number(form.plazo) : Number.NaN;

    const missing: string[] = [];
    if (!Number.isFinite(edadJoven) || edadJoven <= 0) missing.push("Edad del titular más joven");
    if (!Number.isFinite(edadMayor) || edadMayor <= 0) missing.push("Edad del titular más mayor");
    if (!form.laboral) missing.push("Situación laboral");
    if (!Number.isFinite(ingresos) || ingresos <= 0) missing.push("Ingresos netos mensuales");
    if (!Number.isFinite(precio) || precio <= 0) missing.push("Precio de la vivienda");
    if (!Number.isFinite(ahorros) || ahorros < 0) missing.push("Ahorros disponibles");
    if (!form.finalidad) missing.push("Finalidad de la compra");
    if (!Number.isFinite(tin) || tin < 0) missing.push("Tipo de interés (TIN)");

    if (missing.length > 0) {
      setError(`Faltan campos obligatorios: ${missing.join(", ")}.`);
      return;
    }

    const viability = calculateViability({
      edadJoven,
      edadMayor,
      laboral: form.laboral,
      ingresos,
      deudas,
      precio,
      ahorros,
      finalidad: form.finalidad as FinalidadCompra,
      jovenFlag: form.jovenFlag,
      tin,
      plazoUser
    });

    setResult(viability);
  };

  const clear = () => {
    setForm({
      edadJoven: "",
      edadMayor: "",
      laboral: "",
      ingresos: "",
      deudas: "",
      precio: "",
      ahorros: "",
      finalidad: "",
      jovenFlag: false,
      tin: "3.50",
      plazo: ""
    });
    setError("");
    setResult(null);
  };

  const extraText = result
    ? [
        `LTV aplicado: ${(result.ltv * 100).toFixed(0)}%`,
        `Gastos est.: ${(result.gastosPct * 100).toFixed(0)}%`,
        `Ahorro mínimo: ${euro.format(Math.round(result.ahorroNecesario))}`,
        result.motivos.length > 0 ? `Motivo(s): ${result.motivos.join(" · ")}` : "Criterios: OK"
      ].join(" · ")
    : "—";

  return (
    <section className="panel active" id="tab-viab" role="tabpanel" aria-labelledby="btn-viab">
      <div className="grid">
        <div className="card">
          <h2>EFITECA · Calculadora de viabilidad hipotecaria (orientativa)</h2>

          <div className="row">
            <div>
              <label>Edad del titular más joven (años)</label>
              <div className="inline">
                <input value={form.edadJoven} onChange={(event) => onChange("edadJoven", event.target.value)} type="number" min={18} max={80} placeholder="Ej: 28" />
                <span className="help" title="Se usa como dato informativo; el plazo se limita por la edad del titular de mayor edad.">i</span>
              </div>
            </div>
            <div>
              <label>Edad del titular más mayor (años)</label>
              <div className="inline">
                <input value={form.edadMayor} onChange={(event) => onChange("edadMayor", event.target.value)} type="number" min={18} max={80} placeholder="Ej: 41" />
                <span className="help" title="El préstamo no puede vencer después de los 75 años (y nunca supera 40 años).">i</span>
              </div>
            </div>
          </div>

          <div className="row single">
            <div>
              <label>Situación laboral</label>
              <div className="inline">
                <select value={form.laboral} onChange={(event) => onChange("laboral", event.target.value)}>
                  <option value="">Selecciona…</option>
                  <option value="Indefinido">Indefinido</option>
                  <option value="Autónomo">Autónomo</option>
                  <option value="Funcionario">Funcionario</option>
                  <option value="Otros">Otros</option>
                </select>
                <span className="help" title="Dato orientativo para el estudio. La decisión final dependerá del análisis completo del banco.">i</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div>
              <label>Ingresos netos mensuales (€)</label>
              <div className="inline">
                <input value={form.ingresos} onChange={(event) => onChange("ingresos", event.target.value)} type="text" inputMode="decimal" placeholder="Ej: 2.800" />
                <span className="help" title="Suma de ingresos netos mensuales del/de los titulares.">i</span>
              </div>
            </div>
            <div>
              <label>Deudas mensuales (€)</label>
              <div className="inline">
                <input value={form.deudas} onChange={(event) => onChange("deudas", event.target.value)} type="text" inputMode="decimal" placeholder="Ej: 250" />
                <span className="help" title="Cuotas mensuales ya existentes (préstamos, tarjetas, etc.).">i</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div>
              <label>Precio de la vivienda (€)</label>
              <div className="inline">
                <input value={form.precio} onChange={(event) => onChange("precio", event.target.value)} type="text" inputMode="decimal" placeholder="Ej: 240.000" />
                <span className="help" title="Precio de compraventa. Los gastos se estiman como un % orientativo configurable.">i</span>
              </div>
            </div>
            <div>
              <label>Ahorros disponibles (€)</label>
              <div className="inline">
                <input value={form.ahorros} onChange={(event) => onChange("ahorros", event.target.value)} type="text" inputMode="decimal" placeholder="Ej: 45.000" />
                <span className="help" title="Capital disponible para entrada y gastos.">i</span>
              </div>
            </div>
          </div>

          <div className="row single">
            <div>
              <label>Finalidad de la compra</label>
              <div className="inline">
                <select value={form.finalidad} onChange={(event) => onChange("finalidad", event.target.value as "" | FinalidadCompra)}>
                  <option value="">Selecciona…</option>
                  <option value="habitual">Vivienda habitual</option>
                  <option value="segunda">Segunda residencia</option>
                  <option value="inversion">Inversión</option>
                </select>
                <span className="help" title="Afecta a la financiación máxima (LTV) orientativa.">i</span>
              </div>
            </div>
          </div>

          <div className="check">
            <input id="v_flag_joven" checked={form.jovenFlag} onChange={(event) => onChange("jovenFlag", event.target.checked)} type="checkbox" />
            <label htmlFor="v_flag_joven" style={{ margin: 0 }}>Perfil joven (≤ 35 años) · permite LTV mayor en vivienda habitual</label>
            <span className="help" title="Ajusta LTV de vivienda habitual (hasta 95%) y el % de gastos estimados por defecto (6% vs 11%).">i</span>
          </div>

          <div className="divider" />

          <div className="row">
            <div>
              <label>Tipo de interés orientativo (TIN anual %)</label>
              <div className="inline">
                <input value={form.tin} onChange={(event) => onChange("tin", event.target.value)} type="number" min={0} step="0.01" placeholder="Ej: 3.50" />
                <span className="help" title="Se usa solo para simular cuota. No se promete tipo ni entidad.">i</span>
              </div>
            </div>
            <div>
              <label>Plazo a simular (años)</label>
              <div className="inline">
                <input value={form.plazo} onChange={(event) => onChange("plazo", event.target.value)} type="number" min={15} max={40} step={1} placeholder="Auto" />
                <span className="help" title="Si lo dejas en blanco, se aplica el plazo máximo permitido por edad (mín. 15 / máx. 40).">i</span>
              </div>
            </div>
          </div>

          <div className="btns">
            <button type="button" className="btn secondary" onClick={clear}>Limpiar</button>
            <button type="button" className="btn" onClick={handleCalculate}>Calcular</button>
          </div>

          {error ? <div className="error">{error}</div> : null}

          <div className="legal">
            • El resultado es orientativo y se basa en criterios habituales del mercado.
            <br />
            • La concesión final y las condiciones dependen del análisis del banco y del perfil completo del cliente.
          </div>
        </div>

        <div>
          <div className="bigResult">
            <div className="title">RESULTADO ORIENTATIVO</div>
            <div className="bigNumber"><ResultBadge status={result?.status ?? null} /></div>

            <div className="miniCards">
              <div className="mini">
                <div className="k">Importe máximo de hipoteca estimado</div>
                <div className="v">{result ? euro.format(Math.round(result.maxHipoteca)) : "—"}</div>
              </div>
              <div className="mini">
                <div className="k">Cuota mensual estimada</div>
                <div className="v">{result ? euro2.format(result.cuota) : "—"}</div>
              </div>
              <div className="mini">
                <div className="k">Plazo aplicado</div>
                <div className="v">{result ? `${result.plazoAplicado} años (máx. ${Math.floor(result.plazoMax)} por edad)` : "—"}</div>
              </div>
              <div className="mini">
                <div className="k">DTI resultante</div>
                <div className="v">{result ? formatPct(result.dti) : "—"}</div>
              </div>
            </div>

            <div className="note">{result?.message ?? ""}</div>

            <div className="ctaBox">
              <a href="/es/contacto/">{result?.cta ?? "Hablar con un gestor"}</a>
              <span className="pill">{extraText}</span>
            </div>

            <div className="legal">
              • Criterios prudentes (DTI recomendado ≤ 35%, máximo absoluto 44%, plazo 15–40 años y vencimiento antes de 75 años).
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CostsCalculator() {
  const ccaaList = useMemo(
    () => Object.keys(CALCULATOR_CONFIG.impuestosOrientativosPorCCAA).sort((a, b) => a.localeCompare(b, "es")),
    []
  );

  const [form, setForm] = useState({
    precio: "",
    tipo: "obra_nueva" as "obra_nueva" | "segunda_mano",
    ccaa: ccaaList.includes("Cataluña") ? "Cataluña" : ccaaList[0],
    habitual: "si" as "si" | "no",
    hipoteca: "si" as "si" | "no",
    joven: "no" as "si" | "no",
    fam: "no" as "si" | "no",
    disc: "no" as "si" | "no",
    tipoImpuesto: ""
  });

  const [error, setError] = useState("");
  const [result, setResult] = useState<CostsOutput | null>(null);

  React.useEffect(() => {
    const taxCfg = CALCULATOR_CONFIG.impuestosOrientativosPorCCAA[form.ccaa as keyof typeof CALCULATOR_CONFIG.impuestosOrientativosPorCCAA];
    if (!taxCfg) return;

    const nextRate = form.tipo === "segunda_mano" ? taxCfg.itp : taxCfg.ajd_cv;
    setForm((prev) => ({ ...prev, tipoImpuesto: nextRate.toFixed(2) }));
  }, [form.ccaa, form.tipo]);

  const onChange = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCalculate = () => {
    setError("");
    const precio = parseMoney(form.precio);
    if (!Number.isFinite(precio) || precio <= 0) {
      setError("Introduce un precio de vivienda válido.");
      return;
    }

    const tipoImpuestoEditablePct = Number(form.tipoImpuesto);
    if (!Number.isFinite(tipoImpuestoEditablePct) || tipoImpuestoEditablePct < 0) {
      setError("Revisa el campo 'Tipos aplicados'. Debe ser un porcentaje válido.");
      return;
    }

    const costs = calculateCosts({
      precio,
      tipoVivienda: form.tipo,
      ccaa: form.ccaa,
      viviendaHabitual: form.habitual === "si",
      hipoteca: form.hipoteca === "si",
      joven: form.joven === "si",
      familiaNumerosa: form.fam === "si",
      discapacidad: form.disc === "si",
      tipoImpuestoEditablePct
    });

    setResult(costs);
  };

  const clear = () => {
    const defaultCcaa = ccaaList.includes("Cataluña") ? "Cataluña" : ccaaList[0];
    const taxCfg = CALCULATOR_CONFIG.impuestosOrientativosPorCCAA[defaultCcaa as keyof typeof CALCULATOR_CONFIG.impuestosOrientativosPorCCAA];

    setForm({
      precio: "",
      tipo: "obra_nueva",
      ccaa: defaultCcaa,
      habitual: "si",
      hipoteca: "si",
      joven: "no",
      fam: "no",
      disc: "no",
      tipoImpuesto: taxCfg?.ajd_cv.toFixed(2) ?? ""
    });

    setError("");
    setResult(null);
  };

  return (
    <section className="panel active" id="tab-gastos" role="tabpanel" aria-labelledby="btn-gastos">
      <div className="grid">
        <div className="card">
          <h2>EFITECA · Calculadora integral de gastos de compra de vivienda</h2>

          <div className="row single">
            <div>
              <label>Precio de la vivienda (€)</label>
              <div className="inline">
                <input value={form.precio} onChange={(event) => onChange("precio", event.target.value)} type="text" inputMode="decimal" placeholder="Ej: 240.000" />
                <span className="help" title="Algunos impuestos pueden liquidarse sobre el mayor valor entre el precio y el valor de referencia catastral, si aplica.">i</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div>
              <label>Tipo de vivienda</label>
              <select value={form.tipo} onChange={(event) => onChange("tipo", event.target.value as "obra_nueva" | "segunda_mano")}> 
                <option value="obra_nueva">Obra nueva</option>
                <option value="segunda_mano">Segunda mano</option>
              </select>
            </div>
            <div>
              <label>Comunidad Autónoma</label>
              <div className="inline">
                <select value={form.ccaa} onChange={(event) => onChange("ccaa", event.target.value)}>
                  {ccaaList.map((ccaa) => (
                    <option value={ccaa} key={ccaa}>{ccaa}</option>
                  ))}
                </select>
                <span className="help" title="Se aplican porcentajes orientativos configurables. Revisa y ajusta los tipos si es necesario.">i</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div>
              <label>¿Vivienda habitual?</label>
              <select value={form.habitual} onChange={(event) => onChange("habitual", event.target.value as "si" | "no")}>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label>¿Compra con hipoteca?</label>
              <select value={form.hipoteca} onChange={(event) => onChange("hipoteca", event.target.value as "si" | "no")}>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="divider" />

          <div className="row">
            <div>
              <label>Joven (orientativo, ≤ 35 años)</label>
              <select value={form.joven} onChange={(event) => onChange("joven", event.target.value as "si" | "no")}>
                <option value="no">No</option>
                <option value="si">Sí</option>
              </select>
            </div>
            <div>
              <label>Familia numerosa</label>
              <select value={form.fam} onChange={(event) => onChange("fam", event.target.value as "si" | "no")}>
                <option value="no">No</option>
                <option value="si">Sí</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div>
              <label>Discapacidad</label>
              <select value={form.disc} onChange={(event) => onChange("disc", event.target.value as "si" | "no")}>
                <option value="no">No</option>
                <option value="si">Sí</option>
              </select>
            </div>
            <div>
              <label>Tipos aplicados (editables)</label>
              <div className="inline">
                <input value={form.tipoImpuesto} onChange={(event) => onChange("tipoImpuesto", event.target.value)} type="number" step="0.01" min={0} placeholder="%" />
                <span className="help" title="Por defecto se carga un tipo orientativo por Comunidad. Puedes editarlo antes de calcular.">i</span>
              </div>
            </div>
          </div>

          <div className="muted">
            * Para segunda mano, este % es ITP. Para obra nueva, este % corresponde a AJD de compraventa (el IVA es 10% por defecto).
          </div>

          <div className="btns">
            <button type="button" className="btn secondary" onClick={clear}>Limpiar</button>
            <button type="button" className="btn" onClick={handleCalculate}>Calcular</button>
          </div>

          {error ? <div className="error">{error}</div> : null}

          <div className="legal">
            • Los importes mostrados son estimaciones orientativas basadas en la información facilitada por el usuario y en la normativa vigente.
            <br />
            • No constituyen una oferta vinculante ni sustituyen el asesoramiento legal o fiscal.
          </div>
        </div>

        <div>
          <div className="bigResult">
            <div className="title">TOTAL GENERAL ESTIMADO</div>
            <div className="bigNumber">{result ? euro.format(Math.round(result.totalGeneral)) : "—"}</div>

            <div className="divider" />

            <div className="resultWrap">
              <div style={{ flex: "1 1 420px" }}>
                <div className="pill" style={{ marginBottom: 10 }}>1) Gastos de compraventa</div>
                <div className="miniCards" style={{ marginTop: 0 }}>
                  <div className="mini">
                    <div className="k">{result?.etiquetaImpuesto ?? "Impuestos"}</div>
                    <div className="v">{result ? euro.format(Math.round(result.impuestos)) : "—"}</div>
                  </div>
                  <div className="mini"><div className="k">Notaría (compraventa)</div><div className="v">{result ? euro.format(Math.round(result.notariaCv)) : "—"}</div></div>
                  <div className="mini"><div className="k">Registro (compraventa)</div><div className="v">{result ? euro.format(Math.round(result.registroCv)) : "—"}</div></div>
                  <div className="mini"><div className="k">Gestoría (orientativo)</div><div className="v">{result ? euro.format(Math.round(result.gestoria)) : "—"}</div></div>
                </div>
                <div className="note">{result?.notaCv ?? ""}</div>
                <div className="mini" style={{ marginTop: 12 }}>
                  <div className="k">Total gastos compraventa</div>
                  <div className="v">{result ? euro.format(Math.round(result.totalCv)) : "—"}</div>
                </div>
              </div>

              <div style={{ flex: "1 1 420px" }}>
                <div className="pill" style={{ marginBottom: 10 }}>2) Gastos de hipoteca (si aplica)</div>
                <div className="miniCards" style={{ marginTop: 0 }}>
                  <div className="mini"><div className="k">Tasación (comprador)</div><div className="v">{result ? euro.format(Math.round(result.tasacion)) : "—"}</div></div>
                  <div className="mini"><div className="k">Gastos a cargo del banco (informativo)</div><div className="v">{result?.bancoInfo ?? "—"}</div></div>
                  <div className="mini"><div className="k">Total hipoteca (comprador)</div><div className="v">{result ? euro.format(Math.round(result.totalHipComprador)) : "—"}</div></div>
                  <div className="mini"><div className="k">AJD préstamo (paga el banco)</div><div className="v">{result ? euro.format(Math.round(result.ajdPrestamo)) : "—"}</div></div>
                </div>
                <div className="note">{result?.notaHip ?? ""}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnnualTable({ rows }: { rows: AnnualRow[] }) {
  if (rows.length === 0) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Año</th>
          <th>Pagos</th>
          <th>Interés</th>
          <th>Principal</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.year}>
            <td>{row.year}</td>
            <td>{euro.format(Math.round(row.pago))}</td>
            <td>{euro.format(Math.round(row.interes))}</td>
            <td>{euro.format(Math.round(row.principal))}</td>
            <td>{euro.format(Math.round(row.saldo))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MortgageComparator() {
  const [form, setForm] = useState({
    principal: "",
    plazo: "",
    tipo: "fijo" as "fijo" | "variable",
    tinA: "",
    tinB: "",
    aperturaA: "",
    aperturaB: "",
    antiA: "",
    antiB: "",
    email: "",
    consent: false
  });

  const [error, setError] = useState("");
  const [result, setResult] = useState<MortgageCompareOutput | null>(null);

  const onChange = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const runCompare = (): MortgageCompareOutput | null => {
    setError("");

    const principal = parseMoney(form.principal);
    const plazo = Number(form.plazo);
    const tinA = Number(form.tinA);
    const tinB = Number(form.tinB);

    if (!Number.isFinite(principal) || principal <= 0) {
      setError("Introduce un importe de préstamo válido.");
      return null;
    }
    if (!Number.isFinite(plazo) || plazo <= 0) {
      setError("Introduce un plazo válido.");
      return null;
    }
    if (plazo > 40) {
      setError("El plazo máximo permitido es 40 años. Ajusta el plazo para continuar.");
      return null;
    }
    if (!Number.isFinite(tinA) || tinA < 0) {
      setError("Revisa el TIN de la opción A.");
      return null;
    }
    if (!Number.isFinite(tinB) || tinB < 0) {
      setError("Revisa el TIN de la opción B.");
      return null;
    }

    const output = compareMortgages({
      principal,
      plazo,
      tipo: form.tipo,
      tinA,
      tinB,
      aperturaA: Number(form.aperturaA || 0),
      aperturaB: Number(form.aperturaB || 0)
    });

    setResult(output);
    return output;
  };

  const clear = () => {
    setForm({
      principal: "",
      plazo: "",
      tipo: "fijo",
      tinA: "",
      tinB: "",
      aperturaA: "",
      aperturaB: "",
      antiA: "",
      antiB: "",
      email: "",
      consent: false
    });
    setError("");
    setResult(null);
  };

  const sendByEmail = () => {
    setError("");
    if (!form.email.trim()) {
      setError("Introduce un email para generar el borrador.");
      return;
    }
    if (!form.consent) {
      setError("Marca el consentimiento explícito antes de generar el email.");
      return;
    }

    const current = result ?? runCompare();
    if (!current) return;

    const subject = encodeURIComponent("EFITECA · Comparación orientativa de hipotecas");
    const body = encodeURIComponent(
`Hola,

Te envío una comparación orientativa (no vinculante) basada en los datos introducidos.

DATOS COMUNES
- Importe: ${form.principal} €
- Plazo: ${form.plazo} años
- Tipo: ${form.tipo}

OPCIÓN A
- Cuota: ${euro2.format(current.cuotaA)}
- Intereses: ${euro.format(Math.round(current.interesesA))}
- Coste total (cuotas): ${euro.format(Math.round(current.totalCuotasA))}
- TAE aprox.: ${Number.isFinite(current.taeA) ? `${(current.taeA * 100).toFixed(2).replace(".", ",")}%` : "—"}
- Comisión apertura: ${form.aperturaA || 0}%

OPCIÓN B
- Cuota: ${euro2.format(current.cuotaB)}
- Intereses: ${euro.format(Math.round(current.interesesB))}
- Coste total (cuotas): ${euro.format(Math.round(current.totalCuotasB))}
- TAE aprox.: ${Number.isFinite(current.taeB) ? `${(current.taeB * 100).toFixed(2).replace(".", ",")}%` : "—"}
- Comisión apertura: ${form.aperturaB || 0}%

Aviso legal:
Los resultados son simulaciones orientativas. No constituyen oferta vinculante ni sustituyen la información precontractual.
EFITECA actúa como intermediario de crédito inmobiliario inscrito (E377).

Un saludo.`
    );

    window.location.href = `mailto:${encodeURIComponent(form.email.trim())}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="panel active" id="tab-comp" role="tabpanel" aria-labelledby="btn-comp">
      <div className="grid">
        <div className="card">
          <h2>EFITECA · Comparador de Hipotecas (2 opciones)</h2>

          <div className="row single">
            <div>
              <label>Importe del préstamo (€)</label>
              <div className="inline">
                <input value={form.principal} onChange={(event) => onChange("principal", event.target.value)} type="text" inputMode="decimal" placeholder="Ej: 200.000" />
                <span className="help" title="El comparador usa sistema de amortización francés.">i</span>
              </div>
            </div>
          </div>

          <div className="row single">
            <div>
              <label>Plazo (años, máx. 40)</label>
              <div className="inline">
                <input value={form.plazo} onChange={(event) => onChange("plazo", event.target.value)} type="number" min={1} max={40} step={1} placeholder="Ej: 30" />
                <span className="help" title="Restricción: no se permiten plazos superiores a 40 años.">i</span>
              </div>
            </div>
          </div>

          <div className="row single">
            <div>
              <label>Tipo de interés</label>
              <select value={form.tipo} onChange={(event) => onChange("tipo", event.target.value as "fijo" | "variable")}>
                <option value="fijo">Fijo</option>
                <option value="variable">Variable (simulación con TIN actual)</option>
              </select>
            </div>
          </div>

          <div className="divider" />

          <div className="row">
            <div>
              <label>Opción A · TIN anual (%)</label>
              <input value={form.tinA} onChange={(event) => onChange("tinA", event.target.value)} type="number" min={0} step="0.01" placeholder="Ej: 3.20" />
            </div>
            <div>
              <label>Opción B · TIN anual (%)</label>
              <input value={form.tinB} onChange={(event) => onChange("tinB", event.target.value)} type="number" min={0} step="0.01" placeholder="Ej: 3.75" />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Comisión apertura A (%)</label>
              <input value={form.aperturaA} onChange={(event) => onChange("aperturaA", event.target.value)} type="number" min={0} step="0.01" placeholder="Ej: 0.50" />
            </div>
            <div>
              <label>Comisión apertura B (%)</label>
              <input value={form.aperturaB} onChange={(event) => onChange("aperturaB", event.target.value)} type="number" min={0} step="0.01" placeholder="Ej: 0.00" />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Amortización anticipada A (%)</label>
              <input value={form.antiA} onChange={(event) => onChange("antiA", event.target.value)} type="number" min={0} step="0.01" placeholder="Ej: 0.25" />
            </div>
            <div>
              <label>Amortización anticipada B (%)</label>
              <input value={form.antiB} onChange={(event) => onChange("antiB", event.target.value)} type="number" min={0} step="0.01" placeholder="Ej: 0.25" />
            </div>
          </div>

          <div className="divider" />

          <div className="row single">
            <div>
              <label>Email (opcional, para “enviar por email”)</label>
              <input value={form.email} onChange={(event) => onChange("email", event.target.value)} type="email" placeholder="nombre@dominio.com" />
              <div className="check" style={{ marginTop: 10 }}>
                <input id="c_consent" checked={form.consent} onChange={(event) => onChange("consent", event.target.checked)} type="checkbox" />
                <label htmlFor="c_consent" style={{ margin: 0 }}>Consiento el tratamiento para enviar la comparación por email (se abrirá mi cliente de correo)</label>
              </div>
            </div>
          </div>

          <div className="btns">
            <button type="button" className="btn secondary" onClick={clear}>Limpiar</button>
            <button type="button" className="btn" onClick={runCompare}>Comparar</button>
          </div>

          <div className="btns" style={{ justifyContent: "flex-start" }}>
            <button type="button" className="btn secondary" onClick={() => window.print()}>Descargar PDF</button>
            <button type="button" className="btn secondary" onClick={sendByEmail}>Enviar por email</button>
          </div>

          {error ? <div className="error">{error}</div> : null}

          <div className="legal">
            • Los resultados mostrados son simulaciones orientativas basadas en los datos introducidos. No constituyen oferta vinculante ni sustituyen la información precontractual.
          </div>
        </div>

        <div>
          <div className="bigResult">
            <div className="title">COMPARACIÓN</div>
            <div className="bigNumber">{result?.winnerMessage ?? "Introduce datos y pulsa “Comparar”"}</div>

            <div className="compareGrid">
              <div className="compareCol">
                <h3>Opción A</h3>
                <div className="muted" style={{ margin: "-2px 0 10px" }}><strong>Tipo:</strong> {result?.tipoTexto ?? "—"}</div>
                <div className="miniCards" style={{ marginTop: 0 }}>
                  <div className="mini"><div className="k">Cuota mensual</div><div className="v">{result ? euro2.format(result.cuotaA) : "—"}</div></div>
                  <div className="mini"><div className="k">Intereses totales</div><div className="v">{result ? euro.format(Math.round(result.interesesA)) : "—"}</div></div>
                  <div className="mini"><div className="k">Coste total (cuotas)</div><div className="v">{result ? euro.format(Math.round(result.totalCuotasA)) : "—"}</div></div>
                  <div className="mini"><div className="k">TAE aprox. (incl. apertura)</div><div className="v">{result ? formatPct(result.taeA) : "—"}</div></div>
                </div>
                <div className="divider" />
                <div className="muted"><strong>Tabla amortización (resumen anual)</strong></div>
                <div style={{ maxHeight: 260, overflow: "auto", borderRadius: 12, border: "1px solid rgba(0,0,0,.08)", marginTop: 8 }}>
                  <AnnualTable rows={result?.rowsA ?? []} />
                </div>
              </div>

              <div className="compareCol">
                <h3>Opción B</h3>
                <div className="muted" style={{ margin: "-2px 0 10px" }}><strong>Tipo:</strong> {result?.tipoTexto ?? "—"}</div>
                <div className="miniCards" style={{ marginTop: 0 }}>
                  <div className="mini"><div className="k">Cuota mensual</div><div className="v">{result ? euro2.format(result.cuotaB) : "—"}</div></div>
                  <div className="mini"><div className="k">Intereses totales</div><div className="v">{result ? euro.format(Math.round(result.interesesB)) : "—"}</div></div>
                  <div className="mini"><div className="k">Coste total (cuotas)</div><div className="v">{result ? euro.format(Math.round(result.totalCuotasB)) : "—"}</div></div>
                  <div className="mini"><div className="k">TAE aprox. (incl. apertura)</div><div className="v">{result ? formatPct(result.taeB) : "—"}</div></div>
                </div>
                <div className="divider" />
                <div className="muted"><strong>Tabla amortización (resumen anual)</strong></div>
                <div style={{ maxHeight: 260, overflow: "auto", borderRadius: 12, border: "1px solid rgba(0,0,0,.08)", marginTop: 8 }}>
                  <AnnualTable rows={result?.rowsB ?? []} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CalculatorTabs({ content }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("viab");

  return (
    <div className="efiteca-calculator">
      {content?.eyebrow ? (
        <p className="text-[13px] font-bold uppercase tracking-[1.4px] text-[#8949ff]">{content.eyebrow}</p>
      ) : null}
      {content?.title ? (
        <h2 className="mt-[10px] max-w-[920px] text-[30px] font-bold leading-[1.06] text-[#080813] md:text-[48px]">{content.title}</h2>
      ) : null}
      {content?.description ? (
        <p className="mt-[16px] max-w-[760px] text-[15px] leading-[1.2] text-[#4b5565] md:text-[17px]">{content.description}</p>
      ) : null}

      <div className="wrap mt-[28px]">
        <div className="tabs" role="tablist" aria-label="Calculadoras EFITECA">
          <button className="tab-btn" role="tab" aria-selected={activeTab === "viab"} onClick={() => setActiveTab("viab")} id="btn-viab" type="button">Viabilidad hipotecaria</button>
          <button className="tab-btn" role="tab" aria-selected={activeTab === "gastos"} onClick={() => setActiveTab("gastos")} id="btn-gastos" type="button">Gastos de compra</button>
          <button className="tab-btn" role="tab" aria-selected={activeTab === "comp"} onClick={() => setActiveTab("comp")} id="btn-comp" type="button">Comparador hipotecas</button>
        </div>

        {activeTab === "viab" ? <ViabilityCalculator /> : null}
        {activeTab === "gastos" ? <CostsCalculator /> : null}
        {activeTab === "comp" ? <MortgageComparator /> : null}
      </div>
    </div>
  );
}
