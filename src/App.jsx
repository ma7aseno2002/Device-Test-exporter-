// src/App.jsx
import React, { useState } from 'react';

const initialDevice = {
  name: 'iPhone13 Pro Max 128GB',
  completionRate: '73.1%',
  reportDate: '2025.11.30',
  tests: {
    external: [
      { id: 'multitouch', label: 'Multitouch', state: 'pass' },
      { id: 'speaker', label: 'Speaker', state: 'pass' },
      { id: 'front_mic', label: 'Front Microphone', state: 'pass' },
      { id: 'top_mic', label: 'Top Microphone', state: 'untested' },
      { id: 'headphone_jack', label: 'Headphone Jack', state: 'untested' },
      { id: 'wireless_charging', label: 'Wireless Charging', state: 'pass' },
      { id: 'telephoto', label: 'Telephoto Camera', state: 'pass' },
      { id: 'front_camera', label: 'Front Camera', state: 'pass' },
      { id: 'rear_face_detect', label: 'Rear Face Detect', state: 'pass' },
      { id: 'home_button', label: 'Home Button', state: 'untested' },
      { id: 'touchscreen', label: 'Touchscreen', state: 'pass' },
      { id: 'earphones', label: 'Earphones and Mic', state: 'pass' },
      { id: 'receiver', label: 'Receiver', state: 'pass' },
      { id: 'connector', label: 'Connector', state: 'untested' },
      { id: 'rear_camera', label: 'Rear Camera', state: 'pass' },
      { id: 'ultra_wide', label: 'Ultra Wide Camera', state: 'pass' },
      { id: 'flash', label: 'Flash', state: 'pass' },
      { id: 'volume', label: 'Volume Control', state: 'pass' },
      { id: 'sleep', label: 'Sleep/Wake Button', state: 'pass' },
      { id: 'screen', label: 'Screen Display', state: 'pass' }
    ],
    sensors: [
      { id: 'accelerometer', label: 'Accelerometer', state: 'pass' },
      { id: 'gyroscope', label: 'Gyroscope', state: 'pass' },
      { id: 'proximity', label: 'Proximity Sensor', state: 'pass' },
      { id: 'compass', label: 'Compass', state: 'pass' },
      { id: 'barometer', label: 'Barometer', state: 'pass' },
      { id: 'faceid', label: 'Face ID', state: 'pass' },
      { id: 'lidar', label: 'LiDAR Scanner', state: 'fail' },
      { id: '3dtouch', label: '3D Touch', state: 'untested' },
      { id: 'touchid', label: 'Touch ID', state: 'untested' }
    ],
    internal: [
      { id: 'call', label: 'Call Function', state: 'pass' },
      { id: 'memory', label: 'Memory', state: 'pass' },
      { id: 'cpu', label: 'CPU', state: 'pass' },
      { id: 'storage', label: 'Storage', state: 'pass' },
      { id: 'spec', label: 'Specification', state: 'pass' },
      { id: 'vibration', label: 'Vibration', state: 'pass' }
    ],
    wireless: [
      { id: 'gps', label: 'GPS', state: 'pass' },
      { id: 'wifi', label: 'Wi-Fi', state: 'pass' },
      { id: 'cellular', label: 'Cellular Network', state: 'pass' },
      { id: 'bluetooth', label: 'Bluetooth', state: 'pass' },
      { id: 'nfc', label: 'NFC', state: 'fail' }
    ]
  }
};

const stateColor = (s) => {
  if (s === 'pass') return '#2e9bff';
  if (s === 'fail') return '#ff6b6b';
  return '#cdddee';
};

function svgFor(iconName, color = '#2e9bff') {
  switch (iconName) {
    case 'multitouch':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h3v9H3zM8 7h3v14H8zM13 3h3v18h-3z"/></svg>`;
    case 'speaker':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18c-4-1-7-2-9-5 4-2 4-6 9-7z"/></svg>`;
    case 'camera':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="2"/></svg>`;
    case 'sensor':
      return `<svg width="18" height="18" viewBox="0 0 24 24" stroke="${color}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M2 12h20" stroke-width="1.2"/></svg>`;
    case 'wifi':
      return `<svg width="18" height="18" viewBox="0 0 24 24" stroke="${color}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12c3-5 9-8 14-6M2 16c3-3 7-5 10-4M2 20c4-2 8-3 12-2" stroke-width="1.2"/></svg>`;
    case 'nfc':
      return `<svg width="18" height="18" viewBox="0 0 24 24" stroke="${color}" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke-width="1.2"/></svg>`;
    default:
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="2"/></svg>`;
  }
}

export default function App() {
  const [device, setDevice] = useState(initialDevice);

  const cycle = (section, idx) => {
    const copy = JSON.parse(JSON.stringify(device));
    const item = copy.tests[section][idx];
    const next = item.state === 'untested' ? 'pass' : item.state === 'pass' ? 'fail' : 'untested';
    item.state = next;
    setDevice(copy);
  };

  const buildEbayHtml = (d) => {
    const css = `
      body{font-family:Arial,Helvetica,sans-serif;color:#222;}
      .report-wrap{max-width:680px;margin:0 auto;border:1px solid #e6eef8;border-radius:6px;padding:12px;background:#fff;}
      .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
      .title{font-weight:700;color:#2e9bff;font-size:18px}
      .meta{font-size:12px;color:#66788f}
      .section-title{background:#f3fbff;padding:6px 8px;border-radius:4px;color:#2e9bff;font-weight:600;margin-top:12px;margin-bottom:8px;font-size:14px}
      table.tests{width:100%;border-collapse:collapse}
      table.tests td{padding:6px 8px;border-bottom:1px dashed #eef6fb;vertical-align:middle;font-size:13px}
      .icon-cell{width:30px}
      .label{padding-left:6px}
      .state-dot{width:12px;height:12px;border-radius:50%;display:inline-block;border:2px solid #ffffff;vertical-align:middle}
      .legend{margin-top:10px;font-size:12px;color:#909fb2}
      .legend .key{display:inline-block;margin-right:12px}
      .footer-note{font-size:12px;color:#8895a6;margin-top:10px}
    `;

    const renderRow = (item, iconKind) => {
      const color = stateColor(item.state);
      const iconSvg = svgFor(iconKind || 'camera', color);
      return `
        <tr>
          <td class="icon-cell">${iconSvg}</td>
          <td class="label">${escapeHtml(item.label)}</td>
          <td style="width:80px;text-align:right"><span class="state-dot" style="background:${color};border-color:${color}"></span></td>
        </tr>
      `;
    };

    const externalRows = d.tests.external.map((it) => renderRow(it, pickIcon(it.id)));
    const sensorRows = d.tests.sensors.map((it) => renderRow(it, 'sensor'));
    const internalRows = d.tests.internal.map((it) => renderRow(it, 'camera'));
    const wirelessRows = d.tests.wireless.map((it) => renderRow(it, 'wifi'));

    const html =
`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Test Report - ${escapeHtml(d.name)}</title>
<style>${css}</style>
</head>
<body>
  <div class="report-wrap">
    <div class="header">
      <div>
        <div class="title">Device Test Report — ${escapeHtml(d.name)}</div>
        <div class="meta">Completion Rate: <strong>${escapeHtml(d.completionRate)}</strong> · Report Date: <strong>${escapeHtml(d.reportDate)}</strong></div>
      </div>
      <div style="text-align:right">
        <div style="font-size:12px;color:#66788f">Refurbished / Tested</div>
      </div>
    </div>

    <div class="section-title">General tests — External Hardware</div>
    <table class="tests" role="table">${externalRows.join('')}</table>

    <div class="section-title">Sensors</div>
    <table class="tests" role="table">${sensorRows.join('')}</table>

    <div class="section-title">Internal Hardware</div>
    <table class="tests" role="table">${internalRows.join('')}</table>

    <div class="section-title">Wireless</div>
    <table class="tests" role="table">${wirelessRows.join('')}</table>

    <div class="legend">
      <span class="key"><span style="display:inline-block;width:10px;height:10px;background:${stateColor('pass')};border-radius:50%;margin-right:6px"></span>Pass</span>
      <span class="key"><span style="display:inline-block;width:10px;height:10px;background:${stateColor('fail')};border-radius:50%;margin-right:6px"></span>Fail</span>
      <span class="key"><span style="display:inline-block;width:10px;height:10px;background:${stateColor('untested')};border-radius:50%;margin-right:6px"></span>Untested</span>
    </div>

    <div class="footer-note">This device was tested after refurbishing. Results reflect the state of hardware & sensors at time of test.</div>
  </div>
</body>
</html>`;

    return html;
  };

  function pickIcon(id) {
    if (/camera|telephoto|rear|front|ultra|flash/i.test(id)) return 'camera';
    if (/mic|microphone|earphones|receiver|speaker|call/i.test(id)) return 'speaker';
    if (/touch|screen|home|volume|sleep|button/i.test(id)) return 'multitouch';
    if (/wifi|gps|bluetooth|cellular|nfc/i.test(id)) return 'wifi';
    return 'camera';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const downloadHtml = () => {
    const html = buildEbayHtml(device);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${device.name.replace(/\s+/g, '_')}_report.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: 20, maxWidth: 980, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>{device.name}</h1>
          <div style={{ color: '#66788f', fontSize: 13 }}>Completion: {device.completionRate} · {device.reportDate}</div>
        </div>
        <div>
          <button onClick={downloadHtml} style={buttonStyle}>Export eBay HTML</button>
        </div>
      </header>

      <main style={{ background: '#fff', padding: 14, borderRadius: 8, border: '1px solid #eef6fb' }}>
        <section style={{ marginBottom: 12 }}>
          <h2 style={{ margin: '6px 0', color: '#2e9bff' }}>General tests</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
            <div>
              <h3 style={{ color: '#2e9bff' }}>External Hardware</h3>
              <div>{device.tests.external.map((it, idx) => (
                <TestRow key={it.id} item={it} onClick={() => cycle('external', idx)} />
              ))}</div>
            </div>

            <div>
              <h3 style={{ color: '#2e9bff' }}>Sensors</h3>
              <div>{device.tests.sensors.map((it, idx) => (
                <TestRow key={it.id} item={it} onClick={() => cycle('sensors', idx)} />
              ))}</div>
            </div>

            <div>
              <h3 style={{ color: '#2e9bff' }}>Internal Hardware</h3>
              <div>{device.tests.internal.map((it, idx) => (
                <TestRow key={it.id} item={it} onClick={() => cycle('internal', idx)} />
              ))}</div>
            </div>

            <div>
              <h3 style={{ color: '#2e9bff' }}>Wireless</h3>
              <div>{device.tests.wireless.map((it, idx) => (
                <TestRow key={it.id} item={it} onClick={() => cycle('wireless', idx)} />
              ))}</div>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ margin: '6px 0', color: '#2e9bff' }}>Professional tests</h2>
          <p style={{ color: '#6d7f90', marginTop: 6 }}>Refer to exported HTML for printable summary suitable for eBay listing.</p>
        </section>
      </main>
    </div>
  );
}

const buttonStyle = {
  background: '#2e9bff',
  color: '#fff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: 6,
  cursor: 'pointer'
};

function TestRow({ item, onClick }) {
  const color = item.state === 'pass' ? '#2e9bff' : item.state === 'fail' ? '#ff6b6b' : '#cdddee';
  const labelStyle = { display: 'inline-block', marginLeft: 8 };
  const dotStyle = { width: 12, height: 12, borderRadius: 12, background: color, display: 'inline-block', marginLeft: 8 };
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        borderRadius: 8,
        cursor: 'pointer',
        border: item.state === 'pass' ? '1px solid #e6f4ff' : item.state === 'fail' ? '1px solid #fff0f0' : '1px solid transparent',
        marginBottom: 6
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: svgForPreview(item) }} />
      <div style={labelStyle}>{item.label}</div>
      <div style={{ marginLeft: 'auto' }}><span style={dotStyle} /></div>
    </div>
  );
}

function svgForPreview(item) {
  const color = item.state === 'pass' ? '#2e9bff' : item.state === 'fail' ? '#ff6b6b' : '#9fbbe0';
  if (/camera|telephoto|rear|front|ultra|flash/i.test(item.id)) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="2"/></svg>`;
  }
  if (/mic|microphone|earphones|receiver|speaker|call/i.test(item.id)) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18c-4-1-7-2-9-5 4-2 4-6 9-7z"/></svg>`;
  }
  if (/wifi|gps|bluetooth|cellular|nfc/i.test(item.id)) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" stroke="${color}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12c3-5 9-8 14-6M2 16c3-3 7-5 10-4" stroke-width="1.2"/></svg>`;
  }
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="2"/></svg>`;
}
