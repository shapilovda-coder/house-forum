'use client'

import { useEffect } from 'react'

export default function CalculatorPage() {
  useEffect(() => {
    document.title = 'Калькулятор прозрачных рольставней StekloRoll — расчёт цены онлайн'
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
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="stekloroll-b2c">
            <style dangerouslySetInnerHTML={{__html: `
              .stekloroll-b2c{ 
                --txt:#000000; 
                --muted:#5F6368; 
                --title:#202124; 
                --bg:#FFFFFF; 
                --bg2:#F8F9FA; 
                --line:#EDEDED; 
                --btn:#FA8669; 
                --link:#1A73E8; 
                --danger:#FF5252; 
                font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; 
                color: var(--txt); 
                line-height: 1.4; 
              }
              .stekloroll-b2c .wrap{ max-width:1100px; margin:0 auto; padding:0 12px; }
              .stekloroll-b2c .title{ margin:0 0 6px; font-size: clamp(18px, 4vw, 22px); font-weight:800; color:var(--title); }
              .stekloroll-b2c .sub{ margin:0 0 18px; color:var(--muted); font-size:14px; }
              .stekloroll-b2c .grid{ display:grid; grid-template-columns: 1.55fr 1fr; gap:18px; align-items:start; }
              @media (max-width: 980px){ .stekloroll-b2c .grid{ grid-template-columns:1fr; gap:14px; } }
              .stekloroll-b2c .card{ background:var(--bg); border:1px solid var(--line); border-radius:14px; overflow:hidden; }
              .stekloroll-b2c .hd{ padding:14px 16px; background:var(--bg2); border-bottom:1px solid var(--line); }
              .stekloroll-b2c .bd{ padding:16px; }
              .stekloroll-b2c .row{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin:8px 0; }
              .stekloroll-b2c .lbl{ min-width:120px; color:var(--muted); font-size:14px; }
              .stekloroll-b2c input[type="number"], .stekloroll-b2c select{ 
                padding:10px 12px; border:1px solid var(--line); border-radius:10px; font-size:16px; min-width:120px; 
              }
              .stekloroll-b2c .btn{ 
                display:inline-flex; align-items:center; justify-content:center; gap:8px; 
                padding:12px 16px; border-radius:10px; border:none; cursor:pointer; font-weight:700; 
                background:var(--btn); color:#fff; 
              }
              .stekloroll-b2c .btn.secondary{ background:#fff; color:var(--txt); border:1px solid var(--line); }
              .stekloroll-b2c .total{ font-size:28px; font-weight:800; color:var(--title); }
              .stekloroll-b2c .muted{ color:var(--muted); font-size:14px; }
            `}} />
            
            <div className="wrap">
              <div className="grid">
                <div className="card">
                  <div className="hd">
                    <div className="title">Параметры рольставни</div>
                    <div className="sub">Укажите размеры и комплектацию</div>
                  </div>
                  <div className="bd">
                    <div className="row">
                      <span className="lbl">Ширина, мм:</span>
                      <input type="number" id="width" defaultValue="1000" min="500" max="4000" step="100" />
                    </div>
                    <div className="row">
                      <span className="lbl">Высота, мм:</span>
                      <input type="number" id="height" defaultValue="2000" min="500" max="4000" step="100" />
                    </div>
                    <div className="row">
                      <span className="lbl">Тип управления:</span>
                      <select id="control">
                        <option value="manual">Ручное</option>
                        <option value="electric">Электропривод</option>
                      </select>
                    </div>
                    <div className="row">
                      <span className="lbl">Монтаж:</span>
                      <select id="install">
                        <option value="no">Без монтажа</option>
                        <option value="yes">С монтажом</option>
                      </select>
                    </div>
                    <div className="row" style={{marginTop:20}}>
                      <button className="btn" id="calcBtn">Рассчитать стоимость</button>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <div className="hd">
                    <div className="title">Результат расчёта</div>
                  </div>
                  <div className="bd">
                    <div id="result">
                      <p className="muted">Нажмите «Рассчитать стоимость»</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <script dangerouslySetInnerHTML={{__html: `
              document.getElementById('calcBtn').addEventListener('click', function() {
                const width = parseInt(document.getElementById('width').value) || 1000;
                const height = parseInt(document.getElementById('height').value) || 2000;
                const control = document.getElementById('control').value;
                const install = document.getElementById('install').value;
                
                // Base price calculation (simplified)
                const area = (width * height) / 1000000; // m2
                let price = area * 15000; // base price per m2
                
                if (control === 'electric') price += 8000;
                if (install === 'yes') price += 5000;
                
                const formattedPrice = Math.round(price).toLocaleString('ru-RU');
                
                document.getElementById('result').innerHTML = 
                  '<div class="total">' + formattedPrice + ' ₽</div>' +
                  '<p class="muted">Примерная стоимость с установкой</p>' +
                  '<div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;">' +
                  '<a href="tel:+74951510979" class="btn">Позвонить</a>' +
                  '<button class="btn secondary" onclick="alert(\'Заявка отправлена!\')">Сформировать оффер</button>' +
                  '</div>';
              });
            `}} />
          </div>
        </div>
      </div>
    </div>
  )
}
