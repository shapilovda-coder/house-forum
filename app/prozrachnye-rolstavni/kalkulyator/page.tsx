'use client'

import { useEffect } from 'react'

export default function CalculatorPage() {
  useEffect(() => {
    document.title = 'Калькулятор прозрачных рольставней StekloRoll — расчёт цены онлайн'
    
    // Load calculator script
    const script = document.createElement('script')
    script.innerHTML = `
(function(){
  const MIN = 500, MAX = 4000, STEP = 50, MAX_ITEMS = 10;
  const INSTALL_K = 1.10;
  
  function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }
  function fmtRub(n){ return n.toLocaleString('ru-RU') + ' ₽'; }
  function uuid(){ return Math.random().toString(36).slice(2) + Date.now().toString(36); }
  async function copyText(text){ try { await navigator.clipboard.writeText(text); return true; } catch(e){ return false; } }
  function toast(root, msg){ 
    const t = document.createElement('div'); 
    t.textContent = msg; 
    t.style.cssText = 'position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#333; color:#fff; padding:12px 20px; border-radius:8px; z-index:9999; font-size:14px;'; 
    document.body.appendChild(t); 
    setTimeout(() => t.remove(), 2000); 
  }
  
  function calcOne(it, opts){
    const w = clamp(it.w, MIN, MAX);
    const h = clamp(it.h, MIN, MAX);
    const area = (w * h) / 1e6;
    const perimeter = 2 * (w + h) / 1000;
    
    const basePrice = 8500;
    const areaPrice = area * 4500;
    const guidePrice = perimeter * 1200;
    let sum = basePrice + areaPrice + guidePrice;
    
    let driveLabel = 'ручной (ПИМ)';
    let drivePrice = 0;
    if (opts.drive === 'ELECTRO'){
      drivePrice = 8500;
      driveLabel = 'электропривод';
      if (area > 6) { drivePrice += 2500; }
    }
    sum += drivePrice;
    
    if (opts.remote && opts.drive === 'ELECTRO') sum += 1200;
    if (opts.button && opts.drive === 'ELECTRO') sum += 800;
    
    const shaft = h <= 2000 ? 'Ø60' : 'Ø76';
    const box = h <= 2000 ? '205×37' : '250×45';
    const weight = area * 4.5 + (opts.drive === 'ELECTRO' ? 8 : 0);
    
    return { wMm: w, hMm: h, area, shaft, box, driveLabel, drivePrice, weight, sum };
  }
  
  function init(root){
    if (root.__sr_inited) return;
    root.__sr_inited = true;
    
    const elItems = root.querySelector('[data-items]');
    const btnAdd = root.querySelector('[data-add]');
    const elCount = root.querySelector('[data-count]');
    const selDrive = root.querySelector('[data-drive]');
    const chkRemote = root.querySelector('[data-remote]');
    const chkButton = root.querySelector('[data-button]');
    const tbody = root.querySelector('[data-tbody]');
    const elTotal = root.querySelector('[data-total]');
    const elStats = root.querySelector('[data-stats]');
    const btnMake = root.querySelector('[data-make]');
    const btnCopy = root.querySelector('[data-copy]');
    const btnClear = root.querySelector('[data-clear]');
    const taText = root.querySelector('[data-text]');
    
    let items = [{ id: uuid(), w: 3200, h: 2400 }];
    
    function enforceOptions(){
      const isE = selDrive.value === 'ELECTRO';
      chkRemote.disabled = !isE;
      chkButton.disabled = !isE;
      if (!isE) { chkRemote.checked = false; chkButton.checked = false; }
    }
    
    function renderItems(){
      elItems.innerHTML = '';
      items.forEach((it, idx) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = \`
          <div class="item-hd">
            <div style="font-weight:800; color:var(--title);">Полотно \${idx+1}</div>
            <button class="btn icon-danger" type="button" title="Удалить" data-del>×</button>
          </div>
          <div class="item-bd">
            <div class="two">
              <div>
                <label>Ширина, мм</label>
                <div class="stepper">
                  <button type="button" data-act="dec" data-k="w">−</button>
                  <input type="number" inputmode="numeric" min="\${MIN}" max="\${MAX}" step="1" value="\${it.w}" data-k="w" />
                  <button type="button" data-act="inc" data-k="w">+</button>
                </div>
              </div>
              <div>
                <label>Высота, мм</label>
                <div class="stepper">
                  <button type="button" data-act="dec" data-k="h">−</button>
                  <input type="number" inputmode="numeric" min="\${MIN}" max="\${MAX}" step="1" value="\${it.h}" data-k="h" />
                  <button type="button" data-act="inc" data-k="h">+</button>
                </div>
              </div>
            </div>
          </div>
        \`;
        
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
            const inp = card.querySelector(\`input[data-k="\${k}"]\`);
            inp.value = it[k];
            calculate();
          });
        });
        
        elItems.appendChild(card);
      });
      btnAdd.disabled = items.length >= MAX_ITEMS;
      elCount.textContent = \`\${items.length} / \${MAX_ITEMS}\`;
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
        tr.innerHTML = \`
          <td style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">\${r.wMm}×\${r.hMm}</td>
          <td>
            <div style="font-weight:800; color:var(--title);">\${eq.join(', ')}</div>
            <div style="font-size:12px; color:var(--muted);">Вал \${r.shaft}, короб \${r.box}</div>
          </td>
          <td class="right" style="font-weight:900; color:var(--btn);">\${fmtRub(r.sum)}</td>
        \`;
        tbody.appendChild(tr);
      });
      
      const totalFinal = total * INSTALL_K;
      elTotal.textContent = fmtRub(totalFinal);
      elStats.innerHTML = \`
        <div class="chip"><span style="color:var(--muted)">Полотен</span><b>\${items.length} шт</b></div>
        <div class="chip"><span style="color:var(--muted)">Площадь</span><b>\${totalArea.toFixed(2)} м²</b></div>
        <div class="chip"><span style="color:var(--muted)">Вес</span><b>\${totalWeight.toFixed(1)} кг</b></div>
      \`;
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
        lines.push(\`\${i+1}) \${r.wMm}×\${r.hMm} мм — \${eq.join(', ')}\`);
      });
      lines.push('');
      lines.push(\`Итого: \${fmtRub(c.totalFinal)}\`);
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
  
  function boot(){ document.querySelectorAll('[data-stekloroll-calc]').forEach(init); }
  if (document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
  const observer = new MutationObserver(() => boot());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
    `
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Калькулятор прозрачных рольставней
        </h1>
        <p className="text-gray-600 mb-8">
          Рассчитайте стоимость онлайн. Размеры, комплектация, монтаж и доставка включены.
        </p>
        
        <div data-stekloroll-calc className="stekloroll-b2c">
          <style dangerouslySetInnerHTML={{__html: `
            .stekloroll-b2c{ 
              --txt:#000000; --muted:#5F6368; --title:#202124; --bg:#FFFFFF; --bg2:#F8F9FA; --line:#EDEDED; --btn:#FA8669; --link:#1A73E8; --danger:#FF5252;
              font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: var(--txt); line-height: 1.4;
            }
            .stekloroll-b2c *{ box-sizing:border-box; }
            .stekloroll-b2c .wrap{ max-width:1100px; margin:0 auto; }
            .stekloroll-b2c .grid{ display:grid; grid-template-columns: 1fr 1fr; gap:18px; }
            @media (max-width: 980px){ .stekloroll-b2c .grid{ grid-template-columns:1fr; } }
            .stekloroll-b2c .card{ background:var(--bg); border:1px solid var(--line); border-radius:14px; overflow:hidden; }
            .stekloroll-b2c .hd{ padding:14px 16px; background:var(--bg2); border-bottom:1px solid var(--line); }
            .stekloroll-b2c .bd{ padding:16px; }
            .stekloroll-b2c .title{ margin:0 0 6px; font-size:20px; font-weight:800; color:var(--title); }
            .stekloroll-b2c .sub{ margin:0; color:var(--muted); font-size:14px; }
            .stekloroll-b2c .item-card{ border:1px solid var(--line); border-radius:10px; margin-bottom:12px; overflow:hidden; }
            .stekloroll-b2c .item-hd{ padding:10px 12px; background:var(--bg2); display:flex; justify-content:space-between; align-items:center; }
            .stekloroll-b2c .item-bd{ padding:12px; }
            .stekloroll-b2c .two{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
            .stekloroll-b2c label{ display:block; font-size:12px; color:var(--muted); margin-bottom:4px; }
            .stekloroll-b2c .stepper{ display:flex; align-items:center; gap:4px; }
            .stekloroll-b2c .stepper button{ width:32px; height:32px; border:1px solid var(--line); background:#fff; border-radius:6px; cursor:pointer; font-size:16px; }
            .stekloroll-b2c .stepper input{ width:80px; height:32px; border:1px solid var(--line); border-radius:6px; text-align:center; font-size:14px; }
            .stekloroll-b2c .btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:10px 16px; border-radius:8px; border:none; cursor:pointer; font-weight:600; background:var(--btn); color:#fff; font-size:14px; }
            .stekloroll-b2c .btn.secondary{ background:#fff; color:var(--txt); border:1px solid var(--line); }
            .stekloroll-b2c .btn.icon-danger{ width:28px; height:28px; padding:0; background:var(--danger); color:#fff; font-size:18px; }
            .stekloroll-b2c .total{ font-size:32px; font-weight:800; color:var(--title); }
            .stekloroll-b2c .chip{ display:inline-flex; align-items:center; gap:6px; background:var(--bg2); padding:6px 12px; border-radius:20px; font-size:13px; }
            .stekloroll-b2c table{ width:100%; border-collapse:collapse; font-size:14px; }
            .stekloroll-b2c th, .stekloroll-b2c td{ padding:10px; text-align:left; border-bottom:1px solid var(--line); }
            .stekloroll-b2c th{ color:var(--muted); font-weight:500; font-size:12px; }
            .stekloroll-b2c .right{ text-align:right; }
            .stekloroll-b2c textarea{ width:100%; min-height:120px; padding:12px; border:1px solid var(--line); border-radius:8px; font-size:14px; resize:vertical; }
            .stekloroll-b2c .row{ display:flex; gap:10px; align-items:center; margin:8px 0; flex-wrap:wrap; }
            .stekloroll-b2c select{ padding:8px 12px; border:1px solid var(--line); border-radius:6px; font-size:14px; }
            .stekloroll-b2c input[type="checkbox"]{ width:18px; height:18px; }
          `}} />
          
          <div className="wrap">
            <div className="grid">
              <div className="card">
                <div className="hd">
                  <div className="title">Полотна</div>
                  <div className="sub">Добавьте размеры полотен <span data-count>1 / 10</span></div>
                </div>
                <div className="bd">
                  <div data-items></div>
                  <button data-add className="btn" style={{marginTop:8}}>+ Добавить полотно</button>
                  
                  <div style={{marginTop:20, paddingTop:16, borderTop:'1px solid var(--line)'}}>
                    <div className="title" style={{fontSize:16}}>Комплектация</div>
                    <div className="row" style={{marginTop:12}}>
                      <select data-drive>
                        <option value="ELECTRO">Электропривод</option>
                        <option value="MANUAL">Ручной привод</option>
                      </select>
                      <label style={{display:'flex', alignItems:'center', gap:6, margin:0}}>
                        <input type="checkbox" data-remote />
                        <span>Пульт</span>
                      </label>
                      <label style={{display:'flex', alignItems:'center', gap:6, margin:0}}>
                        <input type="checkbox" data-button />
                        <span>Кнопка</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="hd">
                  <div className="title">Результат</div>
                </div>
                <div className="bd">
                  <table>
                    <thead>
                      <tr>
                        <th>Размер</th>
                        <th>Комплектация</th>
                        <th className="right">Цена</th>
                      </tr>
                    </thead>
                    <tbody data-tbody></tbody>
                  </table>
                  
                  <div style={{marginTop:16, paddingTop:16, borderTop:'2px solid var(--line)'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12}}>
                      <div>
                        <div style={{fontSize:12, color:'var(--muted)'}}>Итого с монтажом (+10%)</div>
                        <div data-total className="total">0 ₽</div>
                      </div>
                      <div data-stats style={{display:'flex', gap:8, flexWrap:'wrap'}}></div>
                    </div>
                  </div>
                  
                  <div style={{marginTop:20, display:'flex', gap:10, flexWrap:'wrap'}}>
                    <button data-make className="btn">Сформировать оффер</button>
                    <a href="tel:+74951510979" className="btn secondary">Позвонить</a>
                    <button data-clear className="btn secondary">Очистить</button>
                  </div>
                  
                  <div style={{marginTop:16}}>
                    <textarea data-text placeholder="Текст оффера появится здесь..."></textarea>
                    <button data-copy className="btn secondary" style={{marginTop:8}}>Копировать текст</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
