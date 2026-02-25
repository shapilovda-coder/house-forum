'use client'

import { useEffect, useRef } from 'react'

// HTML разметка калькулятора (без script)
const HTML = `
<div class="stekloroll-b2c" data-stekloroll-calc>
  <div class="wrap">
    <div class="title">StekloRoll — калькулятор стоимости</div>
    <div class="sub">Готовая цена для клиента: доставка, монтаж и материалы уже включены.</div>
    <div class="grid">
      <section class="card" aria-label="Полотна">
        <div class="hd">
          <div>
            <div style="font-weight:800; font-size:16px; color:var(--title);">Полотна</div>
            <div style="font-size:12px; color:var(--muted);" data-sr-count>1 / 7</div>
          </div>
          <button class="btn secondary" data-sr-add type="button">+ Добавить</button>
        </div>
        <div class="bd" data-sr-items></div>
      </section>
      <aside class="row">
        <div class="card">
          <div class="hd">
            <div style="font-weight:800; font-size:16px; color:var(--title);">Параметры</div>
          </div>
          <div class="bd row">
            <div>
              <label>Тип привода</label>
              <select data-sr-drive>
                <option value="ELECTRO" selected>Электрический</option>
                <option value="MANUAL">Ручной</option>
              </select>
            </div>
            <div class="two">
              <div>
                <label class="checkbox-label" data-sr-remote-wrap>
                  <input type="checkbox" data-sr-remote />
                  <span>Пульт ДУ</span>
                </label>
                <div class="hint">Доступно только для электропривода</div>
              </div>
              <div>
                <label class="checkbox-label" data-sr-button-wrap>
                  <input type="checkbox" data-sr-button />
                  <span>Кнопка</span>
                </label>
                <div class="hint">Доступно только для электропривода</div>
              </div>
            </div>
            <div class="sep"></div>
            <div class="chips" data-sr-stats></div>
          </div>
        </div>
        <div class="card">
          <div class="hd">
            <div style="font-weight:800; font-size:16px; color:var(--title);">Расчёт</div>
          </div>
          <div class="bd" style="padding:0;">
            <div class="tablewrap">
              <table>
                <thead>
                  <tr>
                    <th>Размер</th>
                    <th>Комплектация</th>
                    <th class="right">Сумма</th>
                  </tr>
                </thead>
                <tbody data-sr-tbody></tbody>
                <tfoot>
                  <tr class="total-row">
                    <th colspan="2" class="right">Итого:</th>
                    <td class="right" data-sr-total>—</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="bd" style="border-top:1px solid var(--line);">
            <div class="row">
              <button class="btn" data-sr-make type="button">Сформировать оффер</button>
              <textarea data-sr-text placeholder="Нажмите «Сформировать оффер»" readonly></textarea>
              <div class="two">
                <button class="btn secondary" data-sr-copy type="button">Скопировать</button>
                <button class="btn secondary" data-sr-clear type="button" style="color:var(--danger);">Очистить</button>
              </div>
              <a class="btn call" href="tel:+79013440412">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.07 22 2 13.93 2 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2z"/>
                </svg>
                Позвонить +7 (901) 344-04-12
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
  <div class="toast" data-sr-toast></div>
</div>
`

// CSS стили
const CSS = `
.stekloroll-b2c{ 
  --txt:#000000; --muted:#5F6368; --title:#202124; --bg:#FFFFFF; --bg2:#F8F9FA; --line:#EDEDED; 
  --btn:#FA8669; --link:#1A73E8; --danger:#FF5252;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; 
  color: var(--txt); line-height: 1.4;
}
.stekloroll-b2c *{ box-sizing:border-box; }
.stekloroll-b2c .wrap{ max-width:1100px; margin:0 auto; padding:0 12px; }
.stekloroll-b2c .title{ margin:0 0 6px; font-size: clamp(18px, 4vw, 22px); font-weight:800; color:var(--title); }
.stekloroll-b2c .sub{ margin:0 0 18px; color:var(--muted); font-size:14px; }
.stekloroll-b2c .grid{ display:grid; grid-template-columns: 1.55fr 1fr; gap:18px; align-items:start; }
@media (max-width: 980px){ .stekloroll-b2c .grid{ grid-template-columns:1fr; gap:14px; } }
.stekloroll-b2c .card{ background:var(--bg); border:1px solid var(--line); border-radius:14px; overflow:hidden; }
.stekloroll-b2c .hd{ padding:14px 16px; background:var(--bg2); border-bottom:1px solid var(--line); display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; }
.stekloroll-b2c .bd{ padding:16px; }
.stekloroll-b2c .btn{ min-height:44px; border:1px solid transparent; background:var(--btn); color:#fff; border-radius:10px; padding:10px 16px; cursor:pointer; font-weight:700; font-size:14px; display:inline-flex; align-items:center; justify-content:center; gap:8px; transition:.18s; white-space:nowrap; text-decoration:none; }
.stekloroll-b2c .btn:hover:not(:disabled){ filter:brightness(.96); }
.stekloroll-b2c .btn:disabled{ opacity:.55; cursor:not-allowed; }
.stekloroll-b2c .btn.secondary{ background:#fff; border-color:var(--line); color:var(--title); }
.stekloroll-b2c .btn.secondary:hover:not(:disabled){ background:var(--bg2); }
.stekloroll-b2c .btn.call{ width:100%; background:var(--link); border-color:var(--link); color:#fff; }
.stekloroll-b2c .btn.call:hover{ filter:brightness(.95); }
.stekloroll-b2c .btn.call svg{ width:18px; height:18px; flex:0 0 18px; }
.stekloroll-b2c label{ display:block; font-size:13px; color:var(--muted); margin-bottom:6px; font-weight:500; }
.stekloroll-b2c select, .stekloroll-b2c textarea{ width:100%; min-height:44px; background:#fff; border:1px solid var(--line); border-radius:10px; padding:10px 14px; color:var(--txt); font-size:15px; font-family:inherit; outline:none; }
.stekloroll-b2c textarea{ min-height:120px; resize:vertical; }
.stekloroll-b2c select:focus, .stekloroll-b2c textarea:focus{ border-color:var(--link); box-shadow:0 0 0 3px rgba(26,115,232,.14); }
.stekloroll-b2c .row{ display:grid; gap:14px; }
.stekloroll-b2c .two{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }
@media (max-width: 520px){ .stekloroll-b2c .two{ grid-template-columns:1fr; } }
.stekloroll-b2c .sep{ height:1px; background:var(--line); margin:6px 0; }
.stekloroll-b2c .checkbox-label{ display:flex; align-items:center; gap:10px; cursor:pointer; min-height:44px; padding:0 8px; border-radius:8px; margin-left:-8px; }
.stekloroll-b2c .checkbox-label:hover{ background:var(--bg2); }
.stekloroll-b2c .checkbox-label input{ width:20px; height:20px; accent-color:var(--link); }
.stekloroll-b2c .checkbox-label.disabled{ opacity:.5; cursor:not-allowed; }
.stekloroll-b2c .hint{ font-size:12px; color:var(--muted); margin-top:-6px; padding-left:30px; }
.stekloroll-b2c .item-card{ border:1px solid var(--line); border-radius:12px; margin-bottom:12px; overflow:hidden; background:#fff; }
.stekloroll-b2c .item-hd{ display:flex; align-items:center; justify-content:space-between; padding:12px 14px; background:#fff; border-bottom:1px solid var(--bg2); }
.stekloroll-b2c .item-bd{ padding:14px; }
.stekloroll-b2c .stepper{ display:flex; align-items:center; border:1px solid var(--line); border-radius:10px; overflow:hidden; background:#fff; }
.stekloroll-b2c .stepper input{ width:100%; border:none; min-height:44px; text-align:center; font-weight:700; font-size:16px; outline:none; -moz-appearance:textfield; color:var(--txt); font-family:inherit; }
.stekloroll-b2c .stepper input::-webkit-outer-spin-button, .stekloroll-b2c .stepper input::-webkit-inner-spin-button{ -webkit-appearance:none; margin:0; }
.stekloroll-b2c .stepper button{ min-width:44px; min-height:44px; border:none; background:var(--bg2); cursor:pointer; font-size:20px; color:var(--muted); padding:0; }
.stekloroll-b2c .stepper button:hover{ background:var(--line); color:var(--title); }
.stekloroll-b2c .chips{ display:flex; gap:8px; flex-wrap:wrap; }
.stekloroll-b2c .chip{ background:var(--bg2); border:1px solid var(--line); border-radius:10px; padding:10px 12px; flex:1; min-width:120px; font-size:13px; }
.stekloroll-b2c .chip b{ display:block; margin-top:2px; font-size:16px; color:var(--title); font-weight:800; }
@media (max-width:600px){ .stekloroll-b2c .chip{ min-width:95px; padding:8px 10px; } .stekloroll-b2c .chip b{ font-size:14px; } }
.stekloroll-b2c .tablewrap{ overflow-x:auto; }
.stekloroll-b2c table{ width:100%; border-collapse:collapse; font-size:14px; }
.stekloroll-b2c th, .stekloroll-b2c td{ border-bottom:1px solid var(--line); padding:12px; vertical-align:top; }
.stekloroll-b2c th{ background:var(--bg2); color:var(--muted); font-size:11px; text-transform:uppercase; letter-spacing:.4px; font-weight:700; }
.stekloroll-b2c .right{ text-align:right; }
.stekloroll-b2c .total-row td, .stekloroll-b2c .total-row th{ background: linear-gradient(135deg, #FA8669 0%, #F76A52 100%); color:#fff; border-bottom:none; font-weight:900; }
.stekloroll-b2c .total-row td{ font-size:18px; }
@media (max-width:600px){ .stekloroll-b2c .total-row td{ font-size:16px; } }
.stekloroll-b2c .toast{ position:fixed; right:18px; bottom:18px; background:#323232; color:#fff; padding:12px 14px; border-radius:10px; font-size:14px; z-index:999999; display:none; box-shadow:0 6px 18px rgba(0,0,0,.18); }
.stekloroll-b2c .toast.show{ display:block; animation: srFade .18s ease-out; }
@keyframes srFade{ from{ opacity:0; transform:translateY(8px);} to{ opacity:1; transform:translateY(0);} }
`

// JS код калькулятора
const JS = `
(function(){
  const PRICE = { 
    canvasPerM2: 6900, weightPerM2: 5.5, guidesPerM: 1922, 
    shaftPerM: {60:1463, 70:2611}, capsule: {60:538, 70:1755}, 
    boxPerM: {205:3861, 250:4876, 300:5222}, coverPerM: {205:4158, 250:4301, 300:5775}, 
    remote: 4400, button: 2200, 
    motor: { ARTALICO: { normal: {40:10000, 60:12000}, radio: {40:12267, 60:13500} } }, 
    manual: { pim: 3870, latchHandles: 252, lockHandles: 1900 }
  };
  const INSTALL_K = 1.10;
  const MAX_ITEMS = 7;
  const MIN = 800, MAX = 5000;
  const STEP = 100;

  function clamp(n, min, max){ n = Number(n); if (!isFinite(n)) n = min; return Math.max(min, Math.min(max, n)); }
  function fmtRub(x){ if (!isFinite(x)) return '—'; return new Intl.NumberFormat('ru-RU').format(Math.round(x)) + ' ₽'; }
  function uuid(){ return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).slice(2, 11); }
  function toast(root, msg){ 
    const t = root.querySelector('[data-sr-toast]'); 
    if (!t) return; 
    t.textContent = msg; 
    t.classList.add('show'); 
    clearTimeout(toast._t); 
    toast._t = setTimeout(() => t.classList.remove('show'), 2200); 
  }
  async function copyText(text){ 
    try{ await navigator.clipboard.writeText(text); return true; }catch(e){ 
      try{ 
        const ta = document.createElement('textarea'); 
        ta.value = text; 
        ta.style.position = 'fixed'; 
        ta.style.left = '-9999px'; 
        document.body.appendChild(ta); 
        ta.select(); 
        const ok = document.execCommand('copy'); 
        document.body.removeChild(ta); 
        return ok; 
      }catch(e2){ return false; }
    }
  }
  function boxByHeight(hMm){ if (hMm < 1700) return 205; if (hMm <= 2750) return 250; return 300; }
  function shaftByWidth(wMm){ return (wMm <= 3000) ? 60 : 70; }
  function motorCatByWeight(weightKg){ return (weightKg <= 40) ? 40 : 60; }

  function calcOne(it, opts){
    const wMm = clamp(it.w, MIN, MAX);
    const hMm = clamp(it.h, MIN, MAX);
    const wM = wMm / 1000;
    const hM = hMm / 1000;
    const area = (wMm * hMm) / 1000000;
    const weight = area * PRICE.weightPerM2;
    const guidesM = hM * 2;
    const box = boxByHeight(hMm);
    const shaft = shaftByWidth(wMm);
    const canvasCost = area * PRICE.canvasPerM2;
    const guidesCost = guidesM * PRICE.guidesPerM;
    const boxCost = (PRICE.boxPerM[box] || 0) * wM;
    const coverCost = (PRICE.coverPerM[box] || 0) * wM;
    const shaftCost = (PRICE.shaftPerM[shaft] || 0) * wM;
    const capsuleCost = (PRICE.capsule[shaft] || 0);
    let driveCost = 0;
    let driveLabel = '';
    if (opts.drive === 'MANUAL'){
      driveCost = PRICE.manual.pim + PRICE.manual.latchHandles + PRICE.manual.lockHandles;
      driveLabel = 'Ручной (ПИМ)';
    } else {
      const cat = motorCatByWeight(weight);
      const motorType = opts.remote ? 'radio' : 'normal';
      driveCost = (PRICE.motor.ARTALICO[motorType][cat] || 0);
      driveLabel = opts.remote ? 'Электро (RADIO) ' + cat : 'Электро ' + cat;
    }
    let controlsCost = 0;
    if (opts.drive === 'ELECTRO'){
      if (opts.remote) controlsCost += PRICE.remote;
      if (opts.button) controlsCost += PRICE.button;
    }
    const sum = canvasCost + guidesCost + boxCost + coverCost + shaftCost + capsuleCost + driveCost + controlsCost;
    return { wMm, hMm, area, weight, box, shaft, driveLabel, sum };
  }

  function init(root){
    if (root.__sr_inited) return;
    root.__sr_inited = true;
    const elItems = root.querySelector('[data-sr-items]');
    const elCount = root.querySelector('[data-sr-count]');
    const btnAdd = root.querySelector('[data-sr-add]');
    const selDrive = root.querySelector('[data-sr-drive]');
    const chkRemote = root.querySelector('[data-sr-remote]');
    const chkButton = root.querySelector('[data-sr-button]');
    const wrapRemote = root.querySelector('[data-sr-remote-wrap]');
    const wrapButton = root.querySelector('[data-sr-button-wrap]');
    const elStats = root.querySelector('[data-sr-stats]');
    const tbody = root.querySelector('[data-sr-tbody]');
    const elTotal = root.querySelector('[data-sr-total]');
    const btnMake = root.querySelector('[data-sr-make]');
    const taText = root.querySelector('[data-sr-text]');
    const btnCopy = root.querySelector('[data-sr-copy]');
    const btnClear = root.querySelector('[data-sr-clear]');
    if (!elItems || !btnAdd || !selDrive || !tbody) return;

    let items = [{ id: uuid(), w: 3200, h: 2400 }];

    function enforceOptions(){
      const isManual = selDrive.value === 'MANUAL';
      if (isManual){
        chkRemote.checked = false;
        chkButton.checked = false;
        chkRemote.disabled = true;
        chkButton.disabled = true;
        wrapRemote.classList.add('disabled');
        wrapButton.classList.add('disabled');
      } else {
        chkRemote.disabled = false;
        chkButton.disabled = false;
        wrapRemote.classList.remove('disabled');
        wrapButton.classList.remove('disabled');
      }
    }

    function renderItems(){
      elItems.innerHTML = '';
      items.forEach((it, idx) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = '<div class="item-hd"><div style="font-weight:800; color:var(--title);">Полотно ' + (idx+1) + '</div><button class="btn icon-danger" type="button" title="Удалить" data-del>×</button></div><div class="item-bd"><div class="two"><div><label>Ширина, мм</label><div class="stepper"><button type="button" data-act="dec" data-k="w">−</button><input type="number" inputmode="numeric" min="' + MIN + '" max="' + MAX + '" step="1" value="' + it.w + '" data-k="w" /><button type="button" data-act="inc" data-k="w">+</button></div></div><div><label>Высота, мм</label><div class="stepper"><button type="button" data-act="dec" data-k="h">−</button><input type="number" inputmode="numeric" min="' + MIN + '" max="' + MAX + '" step="1" value="' + it.h + '" data-k="h" /><button type="button" data-act="inc" data-k="h">+</button></div></div></div></div>';
        
        card.querySelector('[data-del]').addEventListener('click', () => {
          if (items.length <= 1){ toast(root, 'Должно быть минимум 1 полотно'); return; }
          items = items.filter(x => x.id !== it.id);
          renderItems(); calculate();
        });
        
        card.querySelectorAll('input[data-k]').forEach(inp => {
          const k = inp.getAttribute('data-k');
          inp.addEventListener('input', () => {
            const v = inp.value;
            it[k] = (v === '' ? '' : Number(v));
            calculate();
          });
          inp.addEventListener('blur', () => {
            it[k] = clamp(it[k], MIN, MAX);
            inp.value = it[k];
            calculate();
          });
        });
        
        card.querySelectorAll('button[data-act]').forEach(b => {
          b.addEventListener('click', () => {
            const k = b.getAttribute('data-k');
            const act = b.getAttribute('data-act');
            const delta = (act === 'inc' ? STEP : -STEP);
            it[k] = clamp(Number(it[k] || MIN) + delta, MIN, MAX);
            const inp = card.querySelector('input[data-k="' + k + '"]');
            inp.value = it[k];
            calculate();
          });
        });
        
        elItems.appendChild(card);
      });
      btnAdd.disabled = items.length >= MAX_ITEMS;
      elCount.textContent = items.length + ' / ' + MAX_ITEMS;
    }

    function calculate(){
      enforceOptions();
      const opts = { drive: selDrive.value, remote: chkRemote.checked, button: chkButton.checked };
      tbody.innerHTML = '';
      let total = 0, totalArea = 0, totalWeight = 0;
      const rowsSummary = [];
      
      items.forEach((it) => {
        const r = calcOne(it, opts);
        total += r.sum;
        totalArea += r.area;
        totalWeight += r.weight;
        rowsSummary.push(r);
        
        const eq = [];
        if (opts.drive === 'ELECTRO'){
          eq.push(r.driveLabel);
          if (opts.remote) eq.push('пульт');
          if (opts.button) eq.push('кнопка');
        } else {
          eq.push('ручной (ПИМ)');
        }
        
        const tr = document.createElement('tr');
        tr.innerHTML = '<td>' + r.wMm + '×' + r.hMm + '</td><td><div style="font-weight:800; color:var(--title);">' + eq.join(', ') + '</div><div style="font-size:12px; color:var(--muted);">Вал ' + r.shaft + ', короб ' + r.box + '</div></td><td class="right" style="font-weight:900; color:var(--btn);">' + fmtRub(r.sum) + '</td>';
        tbody.appendChild(tr);
      });
      
      const totalFinal = total * INSTALL_K;
      elTotal.textContent = fmtRub(totalFinal);
      elStats.innerHTML = '<div class="chip"><span style="color:var(--muted)">Полотен</span><b>' + items.length + ' шт</b></div><div class="chip"><span style="color:var(--muted)">Площадь</span><b>' + totalArea.toFixed(2) + ' м²</b></div><div class="chip"><span style="color:var(--muted)">Вес</span><b>' + totalWeight.toFixed(1) + ' кг</b></div>';
      root.__sr_calc = { opts, rowsSummary, totalFinal };
    }

    function buildOfferText(){
      const c = root.__sr_calc;
      if (!c) return '';
      const lines = [];
      lines.push('Здравствуйте!');
      lines.push('Подготовили для вас расчёт StekloRoll:');
      lines.push('');
      c.rowsSummary.forEach((r, i) => {
        const eq = [];
        if (c.opts.drive === 'ELECTRO'){
          eq.push('электропривод');
          if (c.opts.remote) eq.push('пульт');
          if (c.opts.button) eq.push('кнопка');
        } else {
          eq.push('ручной привод');
        }
        lines.push((i+1) + ') ' + r.wMm + '×' + r.hMm + ' мм — ' + eq.join(', '));
      });
      lines.push('');
      lines.push('Итого: ' + fmtRub(c.totalFinal));
      lines.push('Цена итоговая: доставка, монтаж и материалы включены.');
      lines.push('');
      lines.push('Если всё верно — подтвердите, пожалуйста, и мы запустим заказ в работу.');
      return lines.join('\\n');
    }

    btnAdd.addEventListener('click', () => {
      if (items.length >= MAX_ITEMS) return;
      items.push({ id: uuid(), w: 3200, h: 2400 });
      renderItems(); calculate();
      toast(root, 'Полотно добавлено');
    });

    selDrive.addEventListener('change', calculate);
    chkRemote.addEventListener('change', calculate);
    chkButton.addEventListener('change', calculate);

    btnMake.addEventListener('click', () => {
      taText.value = buildOfferText();
      toast(root, 'Оффер сформирован');
    });

    btnCopy.addEventListener('click', async () => {
      const text = taText.value || '';
      if (!text){ toast(root, 'Сначала сформируйте оффер'); return; }
      const ok = await copyText(text);
      toast(root, ok ? 'Скопировано ✓' : 'Не удалось скопировать');
    });

    btnClear.addEventListener('click', () => {
      items = [{ id: uuid(), w: 3200, h: 2400 }];
      selDrive.value = 'ELECTRO';
      chkRemote.checked = false;
      chkButton.checked = false;
      taText.value = '';
      renderItems(); calculate();
      toast(root, 'Очищено');
    });

    renderItems(); calculate();
  }

  const root = document.querySelector('[data-stekloroll-calc]');
  if (root) init(root);
})();
`

export default function CalculatorPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = 'Калькулятор прозрачных рольставней StekloRoll — расчёт цены онлайн'
    
    // Добавляем скрипт после рендера HTML
    const script = document.createElement('script')
    script.textContent = JS
    script.dataset.stekloroll = 'calc'
    document.body.appendChild(script)
    
    return () => {
      // Cleanup: удаляем скрипт при unmount
      const existing = document.querySelector('script[data-stekloroll="calc"]')
      if (existing) document.body.removeChild(existing)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: HTML }} />
      </div>
    </div>
  )
}
