const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const targetStats = `  const updateStat = (id: string, field: 'visits' | 'interactions') => {
    try {
      const mappedId = id === 'home' ? '/' : id.startsWith('/') ? id : \`/\${id}\`;
      const s = [...store.stats.get()];
      let existing = s.find(x => x.page === mappedId);

      if (!existing) {
        existing = { page: mappedId, label: humanizeStatLabel(mappedId), visits: 0, interactions: 0 };
        s.push(existing);
      }

      existing[field] += 1;
      store.stats.set(s);
    } catch (e) {}
  };`;

const replacementStats = `  const updateStat = (id: string, field: 'visits' | 'interactions') => {
    try {
      const mappedId = id === 'home' ? '/' : id.startsWith('/') ? id : \`/\${id}\`;
      const s = [...store.stats.get()];
      let existing = s.find(x => x.page === mappedId);

      if (!existing) {
        existing = { page: mappedId, label: humanizeStatLabel(mappedId), visits: 0, interactions: 0, desktopVisits: 0, tabletVisits: 0, mobileVisits: 0 };
        s.push(existing);
      }

      existing[field] += 1;
      
      // Update device specific stats
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 768) {
          existing.mobileVisits = (existing.mobileVisits || 0) + 1;
        } else if (width < 1024) {
          existing.tabletVisits = (existing.tabletVisits || 0) + 1;
        } else {
          existing.desktopVisits = (existing.desktopVisits || 0) + 1;
        }
      }

      store.stats.set(s);
    } catch (e) {}
  };`;

const targetTimeline = `                    <div 
                      key={item.id} 
                      className="timeline-item reveal" 
                      style={{ animationDelay: \`\${i * 0.1}s\`, cursor: 'pointer' }}
                      onClick={() => setSelectedHistoryItem(item)}
                    >
                      <div className="timeline-dot"></div>
                      <span className="timeline-date">{item.title}</span>
                      <div className="mvv-card" style={{ padding: '30px', transition: '0.3s transform' }}>
                        <p style={{ whiteSpace: 'pre-line', margin: 0 }}>{item.text}</p>
                        <div style={{ marginTop: '15px', color: 'var(--gold)', fontSize: '13px', fontWeight: 700 }}>Haz clic para ampliar →</div>
                      </div>
                    </div>`;

const replacementTimeline = `                    <div 
                      key={item.id} 
                      className="timeline-item reveal" 
                      style={{ animationDelay: \`\${i * 0.1}s\`, cursor: 'pointer' }}
                      onClick={() => setSelectedHistoryItem(item)}
                    >
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <span className="timeline-date">{item.title}</span>
                        <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '20px', margin: '0 0 10px' }}>{item.title}</h4>
                        <p style={{ whiteSpace: 'pre-line', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.text}</p>
                        <div style={{ marginTop: '15px', color: 'var(--gold)', fontSize: '13px', fontWeight: 700 }}>Leer la historia completa →</div>
                      </div>
                    </div>`;

content = content.replace(targetStats, replacementStats);
content = content.replace(targetTimeline, replacementTimeline);

fs.writeFileSync('src/app/page.tsx', content);
console.log('Replacements applied successfully!');
